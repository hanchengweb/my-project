<template>
<div>
  <div class="planNav clearfix">
      <a-button class="planNavBtns" type="primary" icon="rollback" @click="rollback">返回</a-button>
      <p class="planTitle">{{planTitle}}</p>
    </div>
    <searchTable v-if="tableShow" :searchTableJson="searchTable" style="height:calc(100% - 50px);"></searchTable>
  <fligureTable v-else :table="searchTable.table" :search="searchTable.search" style="height:calc(100% - 50px)"></fligureTable>
  <img v-if="tableShow" src="/static/img/components/buttonLine/changeTable.png" alt="" class="changeStimg" @click="changeTableLines('img')" title="切换形式">
  <img v-else src="/static/img/components/buttonLine/changeImg.png" alt="" class="changeStimg" @click="changeTableLines('table')" title="切换形式">
  <a-modal title="查询"
             v-model="materSearch"
             width="820px"
             ref="readTerminalHis"
             :maskClosable="false"
             :destroyOnClose="true"
             :style="modalStyle"
             @ok="handleOk"
             class="selfModal modalSelfPure readTerminalHis"
             :footer="null">
        <div>
          <searchChangeTwo :searchComplete="searchComplete"></searchChangeTwo>
          <div class="searchBar">
              <div class="searchBarli clearfix">
                <div class="searchBarli-li">
                    <span class="searchBarli-spa">物料名称：</span>
                    <a-input class="selectIput" v-model="searchData.name" style="width:436px"/>
                </div>
            </div>
            <div class="searchBarli clearfix">
                <div class="searchBarli-li">
                    <span class="searchBarli-spa">路径：</span>
                    <a-input class="selectIput" v-model="searchData.path" style="width:436px"/>
                </div>
            </div>
              <div class="searchBarli clearfix" style="text-align:center">
                <div style="display:inline-block">
                  <a-button class="buttonBtns" type="primary" icon="search" @click="doSearch">搜索</a-button>
                  <button class="ant-btn ant-btn-primary buttonBtns" @click="refSearch">重置</button>
                </div>
              </div>
          </div>
        </div>
    </a-modal>
</div>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import searchChangeTwo from './../components/searchChange/searchChangeTwo'
import fligureTable from './../components/fligureTable/fligureTable'
import {mapActions, mapState} from 'vuex'
import {getConst } from '../../api/hotelConst'
import { getData } from '@/api/common'
import { debug } from 'util'
import { fullScreen } from '../../assets/mixins/fullScreen'
import {isArray, isJson, isEmptyObject} from '../../libs/tool'
import Cookies from 'js-cookie'
import {
  TOKEN_KEY, getCompany
} from '@/libs/util'

export default {
  components: {
    searchTable,
    fligureTable,
    searchChangeTwo
  },
  mixins: [fullScreen],
  data () {
    return {
      materSearch: false,
      searchTable: {
        table: {
          type: 'main',
          nameTitle: 'managerAdMaterial',
          deleteColumnsIndex: 1,
          // useUrlStatus: true,
          url: 'p_manager_adMaterial_readAll_get',
          data: {
            code: '',
            page: '0',
            size: '10',
            auditStatus: '0'
          },
          banDblClick: true,
          sortReturnData: this.sortReturnData,
          urls: {},
          hideSearch: true, // 隐藏查询按钮
          buttons: {
            // 隐藏按钮
            hideAdd: true,
            hideFlag: true,
            hideDel: true
          },
          custSreach: { // 自定义查询功能
            custSreachVisible: false,
            showDot: false,
            btnClick: this.custSreachClick
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

        }
      },
      codeName: [],
      file: {
        fileName: ''
      },
      tableShow: true,
      searchComplete: {
        completeOwntype: this.completeOwntype,
        completeScope: this.completeScope,
        ownerTypeSelect: '',
        ownerIdentifierSelect: '',
        scopeSelect: '',
        scopeIdentifierSelect: ''
      },
      saveInfo: {
        ownerTypeSelect: '',
        ownerIdentifierSelect: '',
        scopeSelect: '',
        scopeIdentifierSelect: ''
      },
      searchData: {
        path: '',
        name: '',
        ownerType: '',
        ownerIdentifier: '',
        scope: '',
        companyCode: '',
        hotelId: ''
        // scopeIdentifier: ''
      },
      planTitle: ''
    }
  },
  methods: {
    doSearch () { // 搜索
      this.searchTable.table.custSreach.showDot = true
      this.materSearch = false
      this.searchResf()
    },
    refSearch () { // 重置
      this.searchData.name = ''
      this.searchData.path = ''
      this.searchData.ownerType = ''
      this.searchData.ownerIdentifier = ''
      this.searchData.scope = ''
      this.searchData.companyCode = ''
      this.searchData.hotelId = ''
      this.materSearch = false
      this.searchTable.table.custSreach.showDot = false
      this.saveInfo.ownerTypeSelect = ''
      this.saveInfo.ownerIdentifierSelect = ''
      this.saveInfo.scopeSelect = ''
      this.saveInfo.scopeIdentifierSelect = ''
      this.handleChangeRefSearch(Math.random())
      this.searchResf()
    },
    searchResf () {
      this.searchTable.table.data = { ...this.searchTable.table.data, ...this.searchData }
      // this.handleChangeRouterName('managerAdMaterial' + Math.random())
      this.changeStatus()
    },
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeProgramCredit',
      'handleChangeRefSearch',
      'handleTabs',
      'handleChangeRouterName'
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
    handleOk () {

    },
    custSreachClick () { // 点击查询
      this.materSearch = true

      this.searchComplete.ownerTypeSelect = this.saveInfo.ownerTypeSelect
      this.searchComplete.ownerIdentifierSelect = this.saveInfo.ownerIdentifierSelect
      this.searchComplete.scopeSelect = this.saveInfo.scopeSelect
      this.searchComplete.scopeIdentifierSelect = this.saveInfo.scopeIdentifierSelect
    },
    btnClickChange () {
      this.materFligure = true
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
    completeOwntype (ownerType, ownerIdentifier) {
      if (ownerIdentifier == '') {
        this.searchData.ownerIdentifier = ''
      } else if (ownerType == 3) {
        this.searchData.ownerIdentifier = ownerIdentifier.id
      } else if (ownerType == 2) {
        this.searchData.ownerIdentifier = ownerIdentifier.code
      } else {
        this.searchData.ownerIdentifier = ''
      }
      this.searchData.ownerType = ownerType
      this.saveInfo.ownerTypeSelect = ownerType
      this.saveInfo.ownerIdentifierSelect = ownerIdentifier
    },
    completeScope (scope, scopeIdentifier) {
      if (scopeIdentifier == '') {
        this.searchData.companyCode = ''
        this.searchData.hotelId = ''
      } else if (scope == 3) {
        this.searchData.companyCode = scopeIdentifier.companyCode
        this.searchData.hotelId = scopeIdentifier.id
      } else if (scope == 2) {
        this.searchData.companyCode = scopeIdentifier.code
        this.searchData.hotelId = ''
      } else {
        this.searchData.companyCode = ''
        this.searchData.hotelId = ''
      }
      this.searchData.scope = scope
      this.saveInfo.scopeSelect = scope
      this.saveInfo.scopeIdentifierSelect = scopeIdentifier
    },
    rollback () {
      this.$router.push({path: '/advert/managerAdMaterialInfo'})
    },
    getCategory () { // 物料类别
      getConst('category').then(res => {
        this.searchTable.table.modal.data.category = res
      })
    },
    getAuditStatus () {
      getConst('auditStatus').then(res => {
        this.searchTable.table.modal.data.auditStatus = res
      })
    }
  },
  computed: {
    ...mapState({
      getChangeTableStatus: state => state.change.changeTableStatus,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search
    })
  },
  watch: {
    getPegination (val) {
      if (val.namePagin != 'companylist' && val.namePagin != 'hotelslist') {
        if (!val.reset) {
          this.changeStatus(val)
        } else {
          this.searchTable.table.data = {...this.searchTable.table.data, ...val}
        }
      }
    },
    getSearch (val) {
      if (val.namePagin != 'companylist' && val.namePagin != 'hotelslist') {
        if (!val.reset) {
          this.changeStatus(val)
        } else {
          this.searchTable.table.data = {...this.searchTable.table.data, ...val}
        }
      }
    }
  },
  created () {
    const queryAuditStatus = this.$route.query.auditStatus
    this.searchTable.table.data.auditStatus = queryAuditStatus
    if (queryAuditStatus.length == 0) {
      this.planTitle = '所有物料'
    } else if (queryAuditStatus == 1) {
      this.planTitle = '待审核物料'
    } else if (queryAuditStatus == 2) {
      this.planTitle = '审核通过物料'
    } else if (queryAuditStatus == 3) {
      this.planTitle = '审核未通过物料'
    } else if (queryAuditStatus == 0) {
      this.planTitle = '待提交审核物料'
    }
    this.getCategory()
    this.getAuditStatus()
  },
  mounted () {
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
<style lang="less" scoped>
  .changeStimg{
    position: absolute;
    top:57px;
    right:20px;
    z-index:1000;
    width: 30px;
    cursor: pointer;
  }
.searchBar{
    background-color:#fff;
    .searchBarli{
      padding:15px 20px;
      padding-left: 100px;
      border-bottom:1px solid #d9d9d9
    }
  .searchBarli-li{
      float: left;
      font-family:STHeitiSC-Medium;
      font-size:12px;
      color:#333333;
      margin-right: 20px
  }
  .selectIput{
      width:180px;
  }
  .buttonBtns{
    width: 82px;
    margin-right: 20px;
    border-radius: 100px;
    float: left;
  }
}
.searchBarli-spa{
  width:100px;
  display:inline-block;
  text-align: right;
}
.planNav{
  background-color:#fff;
  text-align: center;
  height: 40px;
  line-height: 40px;
  margin-bottom: 4px;
  .planNavBtns{
    float:left;margin:5px 0 0 5px;
  }
  .planTitle{

  }
}
</style>
