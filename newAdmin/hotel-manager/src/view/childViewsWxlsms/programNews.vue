<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import {mapActions, mapState} from 'vuex'
import {getConst } from '../../api/hotelConst'
import { getData } from '@/api/common'
import { debug } from 'util'
import {isArray, isJson, isEmptyObject} from '../../libs/tool'
import Cookies from 'js-cookie'
import {
  TOKEN_KEY
} from '@/libs/util'

export default {
  components: {
    searchTable
  },
  data () {
    return {
      searchTable: {
        table: {
          type: 'main',
          deleteColumnsIndex: 2,
          useUrlStatus: true,
          url: 'l_homeNews_page_get',
          data: {
            code: '',
            page: '0',
            size: '10'
          },
          sortReturnData: this.sortReturnData,
          urls: {},
          hideSearch: true, // 隐藏查询按钮
          buttons: {
            // 隐藏按钮
            hideDel: false
          },
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            data: {
              code: []
            },
            upload: {
              image: {
                imgList: '',
                sortReturnUploadFile: this.sortReturnUploadFile,
                imageScale: 1// 裁剪宽比
              }
            },
            onModalChange: this.onModalChange
          }
        },
        search: {

        }
      },
      codeName: [],
      file: {
        fileName: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus'
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
      if (isJson(values.image.value)) {
        status = !values.image.value.status
        if (!values.image.value.status) {
          this.$message.error(values.image.value.msg)
        } else {
          values.image = ''
        }
      } else if (isArray(values.image.value)) {
        values.image = values.image.value[0]
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
  },
  mounted () {
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
