<template>
  <div>
    <div class="planNav clearfix">
      <a-button class="planNavBtns" type="primary" icon="rollback" @click="rollback">返回</a-button>
      <p class="planTitle">{{planTitle}}</p>
    </div>
    <dbTable :dbTable="dbTable"
             style="height:calc(100% - 50px);"></dbTable>
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
        <fligureTable :table="dbTable.tabsTable.table" :search="dbTable.tabsTable.search" style="height:100%;"></fligureTable>
    </a-modal>
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
                      <span class="searchBarli-spa">投放开始时间：</span>
                      <!-- <a-range-picker
                        v-model="timeValue"
                        style="width:436px"
                        format="YYYY-MM-DD"
                      /> -->
                      <a-date-picker
                        format="YYYY-MM-DD HH:mm:ss"
                        style="width:229px"
                        :disabledDate="disabledDateStartTimeBegin"
                        v-model="timeValuestartTimeBegin"
                        :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                      />
                      -
                      <a-date-picker
                        format="YYYY-MM-DD HH:mm:ss"
                        style="width:229px"
                        :disabledDate="disabledDateStartTimeEnd"
                        v-model="timeValuestartTimeEnd"
                        :showTime="{ defaultValue: moment('23:59:59', 'HH:mm:ss') }"
                      />
                  </div>
              </div>
              <div class="searchBarli clearfix">
                  <div class="searchBarli-li">
                      <span class="searchBarli-spa">投放结束时间：</span>
                      <!-- <a-range-picker
                        v-model="timeValue2"
                        style="width:436px"
                        format="YYYY-MM-DD"
                      /> -->
                      <a-date-picker
                        format="YYYY-MM-DD HH:mm:ss"
                        style="width:229px"
                        :disabledDate="disabledDateStopTimeBegin"
                        v-model="timeValuestopTimeBegin"
                        :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                      />
                      -
                      <a-date-picker
                        format="YYYY-MM-DD HH:mm:ss"
                        style="width:229px"
                        :disabledDate="disabledDateStopTimeEnd"
                        v-model="timeValuestopTimeEnd"
                        :showTime="{ defaultValue: moment('23:59:59', 'HH:mm:ss') }"
                      />
                  </div>
              </div>
              <div class="searchBarli clearfix" v-if="showSelectStatus">
                  <div class="searchBarli-li">
                      <span class="searchBarli-spa">计划状态：</span>
                      <a-select  style="width: 118px" v-model="searchData.status">
                          <a-select-option v-for="(item,index) in statusList" :value="item.code" :key="index">{{item.name}}</a-select-option>
                      </a-select>
                  </div>
              </div>
              <div class="searchBarli clearfix" v-if="showSelectAuditStatus">
                  <div class="searchBarli-li">
                      <span class="searchBarli-spa">审核状态：</span>
                      <a-select  style="width: 118px" v-model="searchData.auditStatus">
                          <a-select-option v-for="(item,index) in auditStatusList" :value="item.code" :key="index">{{item.name}}</a-select-option>
                      </a-select>
                  </div>
              </div>
              <div class="searchBarli clearfix">
                  <div class="searchBarli-li">
                      <span class="searchBarli-spa">计划名称：</span>
                      <a-input class="selectIput" v-model="searchData.name" style="width:436px"/>
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
    <a-modal title="审核"
             v-model="materCheck"
             width="600px"
             height="600px"
             ref="readTerminalHis"
             :maskClosable="false"
             :destroyOnClose="true"
             :style="modalStyle"
             @ok="handleOk"
             class="selfModal modalSelfPure readTerminalHis"
             :footer="null">
        <div class="materCheckCon">
            <div class="materCheckConli clearfix" style="height:100px;line-height:100px;">
              <div class="labels">审核意见</div>
              <a-textarea v-model="statusauditOption" class="materCheckConIpt" style="resize:none;height:78px;margin-top:10px;"></a-textarea>
            </div>
            <div class="materCheckConli clearfix">
              <div class="labels">审核状态</div>
              <a-radio-group name="radioGroup" class="materCheckConIpt" v-model="statusCheck">
                <a-radio :value="1">审核通过</a-radio>
                <a-radio :value="2">审核不通过</a-radio>
              </a-radio-group>
            </div>
            <div class="materCheckBtn clearfix">
              <button type="button" class="ant-btn ant-btn-default" @click="doAuditReject">取 消</button>
              <button type="button" class="ant-btn ant-btn-primary" @click="doAuditAccess">确 定</button>
            </div>
        </div>
    </a-modal>
  </div>
</template>
<script>

import dbTable from '@/view/components/dbTable/dbTable'
import fligureTable from './../components/fligureTable/fligureTable'
import searchChangeTwo from './../components/searchChange/searchChangeTwo'
import { getFlag } from '@/api/const'
import { getConst, getUserTypeWx, getCompanys } from '../../api/hotelConst'
import { getUrlData, getData } from '../../api/common'
import { isEmptyObject, isArray, isJson } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl } from '@/libs/util'
import { fullScreen } from '../../assets/mixins/fullScreen'
import tabsTable from '@/components/tabsTable/tabsTable'
import searchSelf from '@/components/search/search'
import { getDate, getDay } from '../../libs/date'
import moment from 'moment'
export default {
  components: {
    dbTable,
    tabsTable,
    searchSelf,
    fligureTable,
    searchChangeTwo
  },
  mixins: [fullScreen],
  data () {
    return {
      materFligure: false,
      materSearch: false,
      materCheck: false,
      statusCheck: 1,
      statusauditOption: '',
      dbTable: {
        searchTable: {
          table: {
            type: 'main',
            nameTitle: 'managerPlan',
            banDblClick: true, // 双击编辑禁止
            // useUrlStatus: true,
            // url: 'p_manager_adPlan_readAll_get',
            data: {
              flag: '',
              page: '0',
              size: '10'
            },
            sortReturnData: this.sortReturnData,
            deleteColumnsIndex: 1,
            urls: {},
            hideSearch: true, // 隐藏查询按钮
            buttons: {
              // hideFlag: true,
              auditStatus: '',
              hideAdd: true,
              hideDel: true,
              checkPlan: this.checkPlan
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
              }
            }

          },
          search: {
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
              hideFlag: true,
              hideAdd: true,
              hideDel: true,
              actions: [{
                name: '切换图表形式',
                type: 'add',
                btnClick: this.btnClickChange
              }],
              subData: {
                adMaterial: {
                  actions: [{
                    name: '切换图表形式',
                    type: 'add',
                    btnClick: this.btnClickChange
                  }]
                },
                adPlanChannel: {
                  actions: []
                }
              }
            },
            modal: {
              leadClikc: this.leadClikc,
              sortReturnModalData: this.sortReturnModalData2,
              data: {
                companyCode: []
              },
              upload: {
                material: {
                  imgList: '',
                  sortReturnUploadFile: this.sortReturnUploadFile
                // imageScale: 1.7778// 裁剪宽比
                }
              },
              onModalChange: this.onModalChange,
              baseData: {
                add: {
                }
              }
            }
          }
        }
      },
      visible: false,
      choseTreeData: {},
      userTypeWx: {},
      companyCodeWx: {},
      searchComplete: {
        completeOwntype: this.completeOwntype,
        completeScope: this.completeScope,
        ownerTypeSelect: '',
        ownerIdentifierSelect: '',
        scopeSelect: '',
        scopeIdentifierSelect: '',
        getTabName: ''
      },
      saveInfo: {
        ownerTypeSelect: '',
        ownerIdentifierSelect: '',
        scopeSelect: '',
        scopeIdentifierSelect: ''
      },
      showSelectStatus: false,
      showSelectAuditStatus: false,
      searchData: {
        name: '',
        startTimeBegin: '',
        startTimeEnd: '',
        stopTimeBegin: '',
        stopTimeEnd: '',
        ownerType: '',
        ownerIdentifier: '',
        scope: '',
        companyCode: '',
        hotelId: '',
        status: '',
        auditStatus: ''
        // scopeIdentifier: ''
      },
      timeValue: undefined,
      timeValue2: undefined,
      planTitle: '',
      statusList: [],
      auditStatusList: [],
      timeValuestartTimeBegin: '',
      timeValuestartTimeEnd: '',
      timeValuestopTimeBegin: '',
      timeValuestopTimeEnd: '',
      file: {
        fileName: ''
      }
    }
  },
  methods: {
    moment,
    disabledDateStartTimeBegin (current) {
      if (this.timeValuestartTimeEnd != '') {
        return current && current > moment(this.timeValuestartTimeEnd)
      }
    },
    disabledDateStartTimeEnd (current) {
      if (this.timeValuestartTimeBegin != '') {
        return current && current < moment(this.timeValuestartTimeBegin)
      }
    },
    disabledDateStopTimeBegin (current) {
      if (this.timeValuestopTimeEnd != '') {
        return current && current > moment(this.timeValuestopTimeEnd)
      }
    },
    disabledDateStopTimeEnd (current) {
      if (this.timeValuestopTimeBegin != '') {
        return current && current < moment(this.timeValuestopTimeBegin)
      }
    },
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    doSearch () { // 搜索
      this.searchData.startTimeBegin = this.timeValuestartTimeBegin == '' ? '' : getDay(this.timeValuestartTimeBegin)
      this.searchData.startTimeEnd = this.timeValuestartTimeEnd == '' ? '' : getDay(this.timeValuestartTimeEnd)
      this.searchData.stopTimeBegin = this.timeValuestopTimeBegin == '' ? '' : getDay(this.timeValuestopTimeBegin)
      this.searchData.stopTimeEnd = this.timeValuestopTimeEnd == '' ? '' : getDay(this.timeValuestopTimeEnd)
      if (this.searchData.scope == 2 || this.searchData.scope == 3) {
        if (this.searchData.companyCode == '' && this.searchData.hotelId == '') {
          this.$message.info('请添加投放对象匹配!')
          return false
        }
      }
      this.dbTable.searchTable.table.custSreach.showDot = true
      this.materSearch = false
      this.searchResf()
    },
    refSearch () { // 重置
      this.searchData.name = ''
      this.searchData.startTimeBegin = ''
      this.searchData.startTimeEnd = ''
      this.searchData.stopTimeBegin = ''
      this.searchData.stopTimeEnd = ''
      this.timeValuestartTimeBegin = ''
      this.timeValuestartTimeEnd = ''
      this.timeValuestopTimeBegin = ''
      this.timeValuestopTimeEnd = ''
      this.searchData.ownerType = ''
      this.searchData.ownerIdentifier = ''
      this.searchData.scope = ''
      this.searchData.companyCode = ''
      this.searchData.hotelId = ''
      this.searchData.status = ''
      this.searchData.auditStatus = ''
      this.timeValue = undefined
      this.timeValue2 = undefined
      this.materSearch = false
      this.dbTable.searchTable.table.custSreach.showDot = false

      this.saveInfo.ownerTypeSelect = ''
      this.saveInfo.ownerIdentifierSelect = ''
      this.saveInfo.scopeSelect = ''
      this.saveInfo.scopeIdentifierSelect = ''
      this.handleChangeRefSearch(Math.random())
      this.searchResf()
    },
    searchResf () {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...this.searchData }
      // this.handleChangeRouterName('managerPlan' + Math.random())
      // let _this = this
      // setTimeout(function () {
      //   _this.handleChangeRouterName('adMaterial' + Math.random())
      // }, 100)
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
      'handleChangeRefSearch',
      'handleChangeRouterName'
    ]),
    disabledDate (current) {
      console.log(current)
      return current && current && current > moment().endOf('day') || current < moment().subtract(6, 'months')
    },
    btnClick (item) {
      this.visible = true
      this.modal.searchTable.table.data.bannerId = this.dbTable.tabsTable.table.data.bannerId
    },
    handleOk () {

    },
    checkPlan () {
      // 审核
      this.materCheck = true
      this.statusauditOption = ''
      this.statusCheck = 1
    },
    doAuditAccess () {
      let urls = 'p_manager_adPlan_doAuditAccess_put'
      if (this.statusCheck == 2 && this.statusauditOption.trim().length <= 0) {
        this.$message.info('请填写审核意见')
        return false
      }
      if (this.statusCheck == 2) {
        urls = 'p_manager_adPlan_doAuditReject_put'
      }
      getData({
        name: urls,
        data: {status: this.statusCheck, auditOption: this.statusauditOption, id: this.dbTable.tabsTable.table.data.planId},
        type: ''
      }).then(res => {
        this.materCheck = false
        this.handleChangeTableStatus(Math.random())
      })
    },
    doAuditReject () {
      this.materCheck = false
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
    sortReturnSearchData (data) {
      if (data.beginTime) {
        data.beginTime = getDate(data.beginTime)
        data.endTime = getDate(data.endTime)
      }
      this.modal.searchTable.table.data = { ...this.modal.searchTable.table.data, ...data }
      this.handleChangeExtraTableStatus(Math.random())
      return data
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
    getAuditStatus () { // 审核状态
      getConst('auditStatus').then(res => {
        this.auditStatusList = res
        this.dbTable.tabsTable.table.modal.data.auditStatus = res
      })
    },
    getStatus () { // 计划状态
      getConst('status').then(res => {
        this.statusList = res
      })
    },
    getCategory () { // 物料类别
      getConst('category').then(res => {
        this.dbTable.tabsTable.table.modal.data.category = res
      })
    },
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
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
      // this.changeStatus()
    },
    rollback () {
      this.$router.push({path: '/advert/managerPlanInfo'})
    }
  },
  created () {
    const queryAuditStatus = this.$route.query.auditStatus
    const queryStatus = this.$route.query.status
    this.dbTable.searchTable.table.data.auditStatus = queryAuditStatus == undefined ? '' : queryAuditStatus
    this.dbTable.searchTable.table.data.status = queryStatus == undefined ? '' : queryStatus
    this.searchData.auditStatus = queryAuditStatus == undefined ? '' : queryAuditStatus
    this.searchData.status = queryStatus == undefined ? '' : queryStatus
    if (!queryStatus) {
      if (queryAuditStatus == 0) {
        this.planTitle = '待提交审核计划'
      } else if (queryAuditStatus == 1) {
        this.planTitle = '待审核计划'
      } else if (queryAuditStatus == 2) {
        this.planTitle = '审核通过计划'
      } else if (queryAuditStatus == 3) {
        this.planTitle = '审核未通过计划'
      }
      this.showSelectStatus = true
    }
    if (!queryAuditStatus) {
      if (queryStatus.length == 0) {
        this.planTitle = '所有计划'
        this.showSelectStatus = true
      } else if (queryStatus == 0) {
        this.planTitle = '待上线计划'
      } else if (queryStatus == 1) {
        this.planTitle = '已上线计划'
      } else if (queryStatus == 2) {
        this.planTitle = '已下线计划'
      }
      this.showSelectAuditStatus = true
    }
    this.getAuditStatus()
    this.getStatus()
    this.getCategory()
  },
  computed: {
    ...mapState({
      getChangeTableStatus: state => state.change.changeTableStatus,
      getChoseTr: state => state.data.choseTr,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getSubSearch: state => state.data.subSearch,
      getSubPegination: state => state.data.subPegination,
      getTabs: state => state.data.tabs
    })
  },
  watch: {
    getTabs (val) {
      this.searchComplete.getTabName = val
    },
    visible (val) {
      val && this.$nextTick(() => {
        // this.handleChangeProgramCredit(Math.random())// 初始化，提交更新
        // this.handleChangeProgramCredit(1)
        this.changeStatus()
        // this.handleTabs('programNewsList')
        // this.handleChangeSubTableStatus(Math.random())
      })
      if (!val) {
        // this.choseTreeData = {}
        // this.handleChangeSubTableStatus(Math.random())
        this.handleTabs('homeBannerDetail')
      }
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
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.tabsTable.table.data.planId = val.id
        this.dbTable.tabsTable.table.modal.baseData.add.planId = val.id
        this.dbTable.tabsTable.table.buttons.planId = val.id
        this.changeStatus('sub')
      }
      // else {
      //   this.dbTable.tabsTable.table.data.planId = 123
      //   this.dbTable.tabsTable.table.modal.baseData.add.planId = 123
      //   this.dbTable.tabsTable.table.buttons.planId = 123
      // }
    },
    getPegination (val) {
      if (!this.materSearch) {
        this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
        if (!val.reset) this.changeStatus()
      }
    },
    getSearch (val) {
      if (!this.materSearch) {
        this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
        if (!val.reset) this.changeStatus()
      }
    },
    getSubPegination (val) {
      if (!this.materSearch) {
        this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
        if (!val.reset) this.changeStatus('sub')
      }
    },
    getSubSearch (val) {
      if (!this.materSearch) {
        this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
        if (!val.reset) this.changeStatus('sub')
      }
    },
    getChangeTableStatus () {
      // this.getReadAuditStatus()
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
.searchBar{
    background-color:#fff;
    .searchBarli{
      padding:15px 20px;
      padding-left:100px;
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
    //float: left;
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
.materCheckCon{
  padding: 20px;
  .materCheckConli{
    border:1px solid #e6e6e6;
    width: 544px;
    height: 50px;
    line-height: 50px;
    margin-bottom:20px;
    .labels{
      float: left;
      background:#f0f2f4;
      color: #666666;
      width: 20%;
      height: 100%;
      box-sizing: border-box;
      padding-right:10px;
      text-align: right;
      border-right:1px solid #e6e6e6
    }
    .materCheckConIpt{
      float: left;
      width: calc(75% - 20px);
      margin:0 12px;
    }
  }
  .materCheckBtn{
    width: 240px;
    margin:0 auto;
    button{
      width: 100px;
      height: 34px;
      margin-right: 20px;
      float: left;
      line-height: 34px;
    }
  }
}

.readTerminalHis {
  .ant-modal-body {
    padding: 0 !important;
    height: calc(100% - 38px)
  }
}
.ant-modal{
  padding-bottom: 0 !important;
}
</style>
