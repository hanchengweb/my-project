<template>
  <div>
    <dbTable :dbTable="dbTable"
             style="height: 99%;"></dbTable>
    <modalCompanyHotel :modalData="modalData"></modalCompanyHotel>
    <a-modal title="关联投放对象"
             v-model="materVisible"
             :width="modalWidth"
             ref="readTerminalHis"
             :maskClosable="false"
             :destroyOnClose="true"
             :style="modalStyle"
             @ok="handleOk"
             class="selfModal modalSelfPure readTerminalHis"
             :footer="null">
      <!-- <a-icon :type="!isFullScreen?'fullscreen':'fullscreen-exit'"
              class="fullScreenIcon"
              @click="toFullScreen" /> -->
      <div class="fullScreenIcon" @click="toFullScreen">
        <img src="/static/img/analysis/menu/maximize.png" v-if="!isFullScreen" alt="">
        <img src="/static/img/analysis/menu/minimize.png" v-else alt="">
      </div>
      <searchSelf :search="materModal.searchTable.search"></searchSelf>
      <tabsTable class="bottomTable"
                 :tabsTableJson="materModal.searchTable"
                 :style="`height:${modalHeight}px`"></tabsTable>
    </a-modal>
    <a-modal title="关联投放物料"
             v-model="materFligure"
             :width="modalWidthMater"
             ref="readTerminalHis"
             :maskClosable="false"
             :destroyOnClose="true"
             :style="modalStyleMater"
             @ok="handleOk"
             class="selfModal modalSelfPure readTerminalHis"
             :footer="null">
      <!-- <a-icon :type="!isFullScreenMater?'fullscreen':'fullscreen-exit'"
              class="fullScreenIcon"
              @click="toFullScreenMater" /> -->
      <div class="fullScreenIcon fullScreenIconNew" @click="toFullScreenMater">
        <img src="/static/img/analysis/menu/maximize.png" v-if="!isFullScreenMater" alt="">
        <img src="/static/img/analysis/menu/minimize.png" v-else alt="">
      </div>
        <fligureTable :table="dbTable.tabsTable.table" :search="dbTable.tabsTable.search" style="height:100%"></fligureTable>
    </a-modal>
  </div>
</template>
<script>

import dbTable from '@/view/components/dbTable/dbTable'
import fligureTable from './../components/fligureTable/fligureTable'
import modalCompanyHotel from './../components/modalCompanyHotel/modalCompanyHotel'
import { getFlag } from '@/api/const'
import { getConst } from '../../api/hotelConst'
import { getUrlData, getData } from '../../api/common'
import { isEmptyObject, isArray, isJson } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl } from '@/libs/util'
import tabsTable from '@/components/tabsTable/tabsTable'
import searchSelf from '@/components/search/search'
import { getDate, getDay } from '../../libs/date'
import { fullScreen } from '../../assets/mixins/fullScreen'
import moment from 'moment'
export default {
  components: {
    dbTable,
    tabsTable,
    searchSelf,
    modalCompanyHotel,
    fligureTable
  },
  mixins: [fullScreen],
  data () {
    return {
      materFligure: false,
      dbTable: {
        searchTable: {
          table: {
            type: 'main',
            nameTitle: 'platformPlan',
            // banDblClick: true, // 双击编辑禁止
            // useUrlStatus: true,
            // url: 'p_manager_adPlan_readSystemPlan_get',
            data: {
              flag: '',
              page: '0',
              size: '10'
            },
            sortReturnData: this.sortReturnData,
            deleteColumnsIndex: 1,
            urls: {},
            // hideSearch: true, // 隐藏查询按钮
            buttons: {
            },
            modal: {
              sortReturnModalData: this.sortReturnModalData,
              data: {
                code: []
              }
            }

          },
          search: {
            isShowHigh: true,
            timeSearch: true, // 存在时间重置问题
            sortReturnSearchData: this.sortReturnSearchData,
            nameArray: [{
              name: '计划名称', type: 'input', span: '4', dataIndex: 'name'
            }, {
              name: '审核状态', type: 'select', data: [], span: '6', dataIndex: 'auditStatus'
            }, {
              name: '投放状态', type: 'select', data: [], span: '6', dataIndex: 'status'
            }],
            highArray: [
              {name: '投放开始时间', type: 'timeRange', span: '6', dataIndex: ['startTime']}
            ]
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '关联投放物料', key: 'adMaterial' },
              { name: '关联投放对象', key: 'adPlanChannel' }
            ]
          },
          search: {},
          table: {
            name: 'adMaterial',
            title: 'adMaterial',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            // beforeBanDblClickTr: this.beforeBanDblClickTr,
            banDblClick: true,
            deleteColumnsIndex: {
              // adMaterial: 1,
              // adPlanChannel: 1
            },
            // useUrlStatus: true,
            url: 'p_manager_adMaterial_findByPlanId_get',
            data: {
              page: '0',
              size: '10',
              planId: '111222'
            },
            sortReturnData: this.sortReturnDataCredit,
            tabData: {},
            urls: {},
            buttonsOther: true,
            buttons: {
              actions: [{
                name: '切换图表形式',
                type: 'add',
                btnClick: this.btnClickChange
              }
              // {
              //   name: '新增',
              //   type: 'add',
              //   icon: 'plus',
              //   btnClick: this.btnClick2
              // }
              ],
              subData: {
                adMaterial: {
                  actions: [{
                    name: '切换图表形式',
                    type: 'add',
                    btnClick: this.btnClickChange
                  }
                  // {
                  //   name: '新增',
                  //   type: 'add',
                  //   icon: 'plus',
                  //   btnClick: this.btnClick2
                  // }
                  ],
                  hideAdd: false
                },
                adPlanChannel: {
                  actions: [{
                    name: '新增',
                    type: 'add',
                    icon: 'plus',
                    btnClick: this.btnClick
                  }],
                  hideAdd: true
                }
              },
              hideFlag: true
            },
            modal: {
              sortReturnModalData: this.sortReturnModalData2,
              data: {
                code: []
              },
              upload: {
                material: {
                  imgList: '',
                  sortReturnUploadFile: this.sortReturnUploadFile
                // imageScale: 1.7778// 裁剪宽比
                }
              },
              onModalChange: this.onModalChange
            }
          }
        }
      },
      choseTreeData: {},
      modalData: {
        title: '关联投放对象',
        visible: false,
        first: true,
        planId: ''
      },
      materVisible: false,
      materModal: {
        modalWidth: '1200px',
        searchTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '物料列表', key: 'avalibleMaterial' }
            ]
          },
          search: {
            type: 'extra',
            isShowHigh: false,
            defaultVals: {},
            nameArray: []
          },
          table: {
            name: 'avalibleMaterial',
            title: 'avalibleMaterial',
            // url: 'u_goodsCategory_page_get',
            type: 'extra',
            keyName: 'ii',
            multiple: true,
            // beforeBanDblClickTr: this.beforeBanDblClickTr,
            banDblClick: true,
            deleteColumnsIndex: {
              avalibleMaterial: 4
            },
            rowSelection: {
              type: 'checkbox',
              onChange: this.materonRowChange
            },
            pagination: {
              namePagin: 'avalibleMaterial',
              sortReturnPagination: this.sortReturnPagination,
              buttons: [{
                name: '确定',
                onClick: this.matersure,
                type: 'primary',
                style: 'height:28px;font-size:12px;line-height:28px;border-radius:28px;margin-top:-3px;margin-left:-45px;width:90px;text-align:center;margin-right:10px'
              }, {
                name: '取消',
                onClick: this.matercancel,
                type: 'default',
                style: 'height:28px;font-size:12px;border-radius:28px;line-height:28px;margin-top:-3px;width:90px;text-align:center;'
              }]
            },
            hideButtonSearch: true,
            sortReturnData: this.sortReturnData2,
            data: {
              page: '0',
              size: '10',
              flag: '1',
              name: '',
              companyCode: ''
            },
            tabData: {},
            urls: {},
            buttons: {
              hideFlag: true,
              hideAdd: true,
              hideDel: true
            }
          }
        }
      },
      materChooseRows: [],
      searchData: {
        name: '',
        startTimeBegin: '',
        startTimeEnd: '',
        status: '',
        auditStatus: ''
      },
      auditStatusList: [],
      statusList: [],
      timeValue: undefined,
      file: {
        fileName: ''
      }
    }
  },
  methods: {
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledRangeTime (_, type) {},
    panelChange (value) { // 确定选择时间
      // this.searchData.startTimeBegin = getDay(value[0])
      // this.searchData.startTimeEnd = getDay(value[1])
    },
    changeAuditStatus (value) { // 选择审核状态
      this.searchData.auditStatus = value
      this.searchResf()
    },
    changeTofStatus (value) { // 选择计划状态
      this.searchData.status = value
      this.searchResf()
    },
    doSearch () { // 搜索
      this.searchData.startTimeBegin = getDay(this.timeValue[0])
      this.searchData.startTimeEnd = getDay(this.timeValue[1])
      this.searchResf()
    },
    refSearch () { // 重置
      this.searchData.name = ''
      this.searchData.startTimeBegin = ''
      this.searchData.startTimeEnd = ''
      this.searchData.auditStatus = ''
      this.searchData.status = ''
      this.timeValue = undefined
      this.searchResf()
    },
    searchResf () {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...this.searchData }
      this.changeStatus()
    },
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
      // 'handleChangeTreeStatus',
      'handleChangeExtraTableStatus',
      'handleChangeProgramCredit',
      'handleTabs',
      'handleModalData',
      'handleChangeRouterName'
    ]),
    btnClick (item) {
      this.modalData.visible = true
      this.modalData.first = false
      // this.modal.searchTable.table.data.bannerId = this.dbTable.tabsTable.table.data.bannerId
    },
    btnClick2 (item) {
      this.materVisible = true
      this.materChooseRows = []
    },
    btnClickChange () {
      this.materFligure = true
    },
    handleOk () {

    },
    sortReturnSearchData (data) {
      if (data.startTime != '') {
        data.startTimeBegin = getDate(data.startTime[0]) + ' 00:00:00'
        data.startTimeEnd = getDate(data.startTime[1]) + ' 23:59:59'
      } else {
        data.startTimeBegin = ''
        data.startTimeEnd = ''
      }
      return data
    },
    sortReturnModalData (data) {
      if (data.startTime) {
        data.startTime = getDay(data.startTime)
        data.endTime = getDay(data.endTime)
      }
      return data
    },
    sortReturnModalData2 (values) {
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
    choseTree (data) {
      // console.log(data)
      this.choseTreeData = data
      this.modal.searchTable.table.data.companyCode = data.code
      this.handleChangeExtraTableStatus(Math.random())
    },
    sortReturnData (data) {
      data && data.length && data.forEach((item, i) => {

      })
      return data
    },
    sortReturnDataCredit (data) {
      // console.log(data)
      return data
    },
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    },
    getStatus () { // 计划状态
      getConst('status').then(res => {
        this.statusList = res

        this.dbTable.searchTable.search.nameArray[2].data = res
      })
    },
    getAuditStatus () { // 审核状态
      getConst('auditStatus').then(res => {
        this.auditStatusList = res
        this.dbTable.tabsTable.table.modal.data.auditStatus = res

        this.dbTable.searchTable.search.nameArray[1].data = res
      })
    },
    getCategory () { // 物料类别
      getConst('category').then(res => {
        this.dbTable.tabsTable.table.modal.data.category = res
        // this.dbTable.searchTable.search.nameArray[0].data = res
      })
    },
    materonRowChange (selectedRowKeys, selectedRows) { // 选择关联物料
      this.materChooseRows = selectedRows
    },
    matercancel () { // 取消关联投放物料
      this.materVisible = false
    },
    matersure () { // 确定关联投放物料
      if (this.materChooseRows.length == 0) {
        this.$message.info('请选择物料')
      } else {
        let materialIds = ''
        this.materChooseRows.forEach(item => {
          materialIds += item.id + ','
        })
        materialIds = materialIds.substring(0, materialIds.lastIndexOf(','))
        getData({
          name: 'p_manager_adPlan_relatedMaterial_POST',
          data: {
            planId: this.dbTable.tabsTable.table.data.planId,
            materialIds: materialIds
          },
          type: ''
        }).then(res => {
          this.materVisible = false
        })
      }
    }
  },
  created () {
    this.getCategory()
    this.getStatus()
    this.getAuditStatus()
  },
  computed: {
    ...mapState({
      getChoseTr: state => state.data.choseTr,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getSubSearch: state => state.data.subSearch,
      getSubPegination: state => state.data.subPegination
    })
  },
  watch: {
    materVisible (val) {
      val && this.$nextTick(() => {
        this.handleChangeProgramCredit(Math.random())// 初始化，提交更新
        // this.handleChangeProgramCredit(1)
        // this.handleChangeRouterName('avalibleMaterial' + Math.random())
      })
      !val && this.$nextTick(() => {
        // this.handleChangeRouterName('adMaterial' + Math.random())
        this.handleChangeTableStatus(Math.random())
        this.handleTabs('adMaterial')
      })
    },
    materFligure (val) {
      val && this.$nextTick(() => {
        this.dbTable.tabsTable.table.hideButtonSearch = true
      })
      !val && this.$nextTick(() => {
        this.dbTable.tabsTable.table.hideButtonSearch = false
        this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...{page: 1, size: 10} }
        if (!val.reset) this.changeStatus()
      })
    },
    getPegination (val) {
      if (!this.modalData.visible) {
        if (val.namePagin == 'avalibleMaterial') {
          this.materModal.searchTable.table.data = { ...this.materModal.searchTable.table.data, ...val }
          this.handleChangeProgramCredit(Math.random())
        } else {
          this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
          if (!val.reset) this.changeStatus()
        }
      }
    },
    getSearch (val) {
      if (!this.modalData.visible) {
        this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
        if (!val.reset) this.changeStatus()
      }
    },
    getSubPegination (val) {
      if (!this.modalData.visible) {
        this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
        if (!val.reset) this.changeStatus('sub')
      }
    },
    getSubSearch (val) {
      if (!this.modalData.visible) {
        this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
        if (!val.reset) this.changeStatus('sub')
      }
    },
    getChoseTr (val) {
      if (!this.modalData.visible) {
        if (!isEmptyObject(val) && val.creater) {
          this.dbTable.tabsTable.table.data.planId = val.id
          // this.dbTable.tabsTable.table.modal.baseData.add.planId = val.id
          this.dbTable.tabsTable.table.buttons.planId = val.id
          this.materModal.searchTable.table.data.planId = val.id
          this.dbTable.tabsTable.table.modal.data.planId = val.id
          this.modalData.planId = val.id
          this.modalData.first = true
          this.changeStatus('sub')
        }
      }
    }
  },
  mounted () {
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
<style lang="less">
@import "../../assets/css/modal/modal";
.clearfix {
    zoom: 1;
}
.clearfix:after{
    content: "020";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.readTerminalHis {
  .ant-modal-body {
    padding: 0;
    height: calc(100% - 38px)
  }
}
.ant-modal{
  padding-bottom: 0;
}
.searchBar{
    background-color:#fff;
    .searchBarli{
      padding:10px 20px;
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
  }
}
</style>
