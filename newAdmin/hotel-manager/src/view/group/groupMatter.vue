<template>
<div>
	<searchTable v-if="tableShow" :searchTableJson="searchTable" style="height:100%;"></searchTable>
  <fligureTable v-else :table="searchTable.table" :search="searchTable.search" style="height:100%;"></fligureTable>
  <img v-if="tableShow" src="/static/img/components/buttonLine/changeTable.png" alt="" class="changeStimg" @click="changeTableLines('img')" title="切换形式">
  <img v-else src="/static/img/components/buttonLine/changeImg.png" alt="" class="changeStimg" @click="changeTableLines('table')" title="切换形式">
</div>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import fligureTable from './../components/fligureTable/fligureTable'
import {mapActions, mapState} from 'vuex'
import {getConst } from '../../api/hotelConst'
import { getData } from '@/api/common'
import { debug } from 'util'
import {isArray, isJson, isEmptyObject} from '../../libs/tool'
import Cookies from 'js-cookie'
import {
  TOKEN_KEY, getCompany
} from '@/libs/util'

export default {
  components: {
    searchTable,
    fligureTable
  },
  data () {
    return {
      searchTable: {
        table: {
          type: 'main',
          deleteColumnsIndex: 0,
          useUrlStatus: true,
          url: 'p_manager_adMaterial_readCompanyAdMaterial_get',
          data: {
            code: '',
            page: '0',
            size: '10'
          },
          sortReturnData: this.sortReturnData,
          urls: {},
          buttons: {
            // 隐藏按钮
          },
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            data: {
              code: []
            },
            upload: {
              material: {
                imgList: '',
                sortReturnUploadFile: this.sortReturnUploadFile,
                imageScale: 1.7778// 裁剪宽比
              }
            },
            onModalChange: this.onModalChange
          }
        },
        search: {
          sortReturnSearchData: this.sortReturnSearchData,
          nameArray: [{
            name: '状态', type: 'select', data: [], span: '4', dataIndex: 'flag'
          }, {
            name: '审核状态', type: 'select', data: [], span: '6', dataIndex: 'auditStatus'
          }]
        }
      },
      codeName: [],
      file: {
        fileName: ''
      },
      tableShow: true
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeProgramCredit',
      'handleTabs'
    ]),
    sortReturnData (data) {
      let _this = this
      data && data.length && data.forEach((item, i) => {
        _this.codeName.forEach((satItems, k) => {
          if (data[i].code == _this.codeName[k].code) {
            data[i].codeName = _this.codeName[k].name
          }
        })
      })
      return data
    },
    sortReturnModalData (values) {
      let status = false
      if (isJson(values.material.value)) {
        status = !values.material.value.status
        if (!values.material.value.status) {
          this.$message.error(values.material.value.msg)
        } else {
          values.material = ''
        }
      } else if (isArray(values.material.value)) {
        values.material = values.material.value[0]
      }
      if (this.file.fileName) values.imageName = this.file.fileName
      let data = new FormData()
      for (let i in values) {
        if (i == 'apkVersion' || i == 'jsVersion') values[i] = parseFloat(values[i])
        data.append(i, values[i])
      }
      return {type: 'formData', data: data, noSubmitByPage: status}
    },
    changeStatus (val) {
      this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      this.handleChangeTableStatus(Math.random())
    },
    onModalChange (val, key, form) {
      if (key === 'logo' && val.value && isArray(val.value) && val.value[0] && this.file.fileName && this.file.fileSuffix) {
        form.setFieldsValue({fileName: this.file.fileName})
        form.setFieldsValue({fileSuffix: this.file.fileSuffix})
      }
    },
    sortReturnUploadFile (file) {
      if (file && file.name) {
        this.file = {
          fileName: file.name.substring(0, file.name.lastIndexOf('.')),
          fileSuffix: file.name.substring(file.name.lastIndexOf('.') + 1)
        }
      }
    },
    // 切换形式
    changeTableLines (text) {
      if (text == 'table') {
        let _this = this
        this.tableShow = true
        this.$nextTick(() => {
          this.handleChangeTableStatus(Math.random())
        })
      } else {
        this.tableShow = false
      }
    },
    getCategory () { // 物料类别
      getConst('category').then(res => {
        this.searchTable.table.modal.data.category = res
        // this.dbTable.searchTable.search.nameArray[0].data = res
      })
    },
    getAuditStatus () {
      getConst('auditStatus').then(res => {
        this.searchTable.table.modal.data.auditStatus = res
        this.searchTable.search.nameArray[1].data = res
      })
    },
    getFlag () {
      getConst('flag').then(res => {
        this.searchTable.search.nameArray[0].data = res
      })
    }
  },
  computed: {
    ...mapState({
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search
    })
  },
  watch: {
    getPegination (val) {
      console.log(val)
      if (!val.reset) {
        this.changeStatus(val)
      } else {
        this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      }
    },
    getSearch (val) {
      if (!val.reset) {
        this.changeStatus(val)
      } else {
        this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      }
    }
  },
  created () {
    this.getFlag()
    this.getCategory()
    this.getAuditStatus()
    const companyCodes = JSON.parse(getCompany()).companyCode
    this.searchTable.table.data.ownerIdentifier = companyCodes
  },
  mounted () {
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
<style lang="less">
  .changeStimg{
    position: absolute;
    top:13px;
    right:20px;
    z-index:1000;
    width: 30px;
    cursor: pointer;
  }
</style>
