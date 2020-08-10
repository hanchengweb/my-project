<template>
  <div class="buttonLineSelf clearfix">
    <a-button-group class="actionsBtnGroup"
                    style="width: 100%">
      <a-button :icon="button.icon||'-'"
                v-for="button in localButtons.actions"
                :key="`button-key-${button.name}`"
                :style="button.style||''"
                :disabled="button.name!='切换图表形式'?!custAddDisabled:false"
                @click="button.btnClick && button.btnClick(button)">
        {{button.name}}
      </a-button>
      <!-- 新增按钮 -->
      <a-button :icon="button.icon||'-'"
                v-for="button in add"
                v-if="!localButtons.hideAdd"
                :key="`button-key-${button.name}`"
                :disabled="!checkAddDisabled"
                @click="btnClick(button)">
        {{button.name}}
      </a-button>
      <!-- 删除按钮 -->
      <a-button :icon="button.icon||'-'"
                v-for="button in noFlagDel"
                v-if="localButtons.showNoFlagDel"
                :key="`button-key-${button.name}`"
                :disabled="!checkActionDisabled"
                @click="btnClick(button)">
        {{button.name}}
      </a-button>
      <!-- 也是删除按钮 -->
      <a-button v-if="del && del.length && !localButtons.hideDel"
                v-for="item in del"
                :icon="item.icon||'-'"
                :key="`button-key-${item.name}`"
                :disabled="!checkDelDisabled"
                @click="btnClick(item)">
        {{item.name}}
      </a-button>
      <!-- 启用按钮 -->
      <a-button v-if="flagActions && flagActions.length && !localButtons.hideFlag && data.hasOwnProperty('flag')"
                v-for="item in flagActions"
                :icon="item.icon||'-'"
                :key="`button-key-${item.name}`"
                :disabled="!checkActionDisabled"
                @click="btnClick(item)">
        {{item.name}}
      </a-button>
      <!-- 上下线按钮 -->
      <a-button v-if="statusActions && statusActions.length && !localButtons.hideFlag && lineShow"
                v-for="item in statusActions"
                :icon="item.icon||'-'"
                :key="`button-key-${item.name}`"
                :disabled="!checkActionDisabled"
                @click="btnClick(item)">
        {{item.name}}
      </a-button>
      <!-- 提交审核 撤销提交审核 -->
      <a-button v-if="postCheckActions && postCheckActions.length && !localButtons.hideFlag && postCheckShow"
                v-for="item in postCheckActions"
                :icon="item.icon||'-'"
                :key="`button-key-${item.name}`"
                :disabled="!postcheckActionDisabled"
                @click="btnClick(item)">
        {{item.name}}
      </a-button>
      <!-- 审核按钮 -->
      <a-button v-if="checkActions && checkActions.length  && checkbShow"
                v-for="item in checkActions"
                :icon="item.icon||'-'"
                :key="`button-key-${item.name}`"
                :disabled="!checkActionDisabled"
                @click="btnClick(item)">
        {{item.name}}
      </a-button>
      <!-- 计划审核按钮 -->
      <a-button v-if="checkPlanShow"
                icon="api"
                :disabled="!checkActionDisabled"
                @click="btnPlanClick">
        审核
      </a-button>
      <!-- 标位主图 -->
      <a-button v-if="materActions && materActions.length && localButtons.masterShow"
                v-for="item in materActions"
                :icon="item.icon||'-'"
                :key="`button-key-${item.name}`"
                :disabled="!checkActionDisabled"
                @click="btnClick(item)">
        {{item.name}}
      </a-button>
      <!-- 同步缓存按钮 -->
      <a-button :icon="button.icon||'-'"
                v-for="button in cacheSingle"
                v-if="!cache.hideSingle"
                :key="`button-key-${button.name}`"
                :disabled="!checkCacheDisabled"
                @click="cacheUpdateBtnClick(button)">
        {{button.name}}
      </a-button>
      <!-- 更新通知按钮 -->
      <a-button :icon="button.icon||'-'"
                v-for="button in updateSingle"
                v-if="!update.hideSingle"
                :key="`button-key-${button.name}`"
                :disabled="!checkCacheDisabled"
                @click="cacheUpdateBtnClick(button)">
        {{button.name}}
      </a-button>
      <!-- 全部缓存按钮 -->
      <a-button :icon="button.icon||'-'"
                v-for="button in cacheAll"
                v-if="!cache.hideAll && false"
                :key="`button-key-${button.name}`"
                :disabled="!checkCacheDisabled"
                @click="cacheBtnClick(button)">
        {{button.name}}
      </a-button>
      <a-button v-for="button in localButtons.actionsAfter"
                :icon="button.icon||'-'"
                :key="`button-key-${button.name}`"
                :disabled="!checkBaseDisabled&&!button.noDisabled"
                @click="button.btnClick(button)">
        {{button.name}}
      </a-button>
    </a-button-group>
    <!--<div class="fr clearfix inOut">-->
    <!--<img src="/static/img/components/buttonLine/in.png" alt="" class="block fl mr-18 pointer"/>-->
    <!--<img src="/static/img/components/buttonLine/out.png" alt="" class="block fl pointer"/>-->
    <!--</div>-->
  </div>
</template>
<script>
import { getUrlData, getData } from '@/api/common'
import { isEmptyObject } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
// import {treeTabs} from '@/api/baseData'
import { treeTabs, cacheAllTabs, cacheSingleTabs, updateSingleTabs } from '@/api/hotelBaseData'
import { sortSubmitData, delDataReturn, changeFirstUrl } from '../../libs/util'

export default {
  props: {
    buttons: {},
    data: {},
    type: '',
    urls: {},
    name: ''
  },
  data () {
    return {
      delDataArr: [],
      subAccess: {},
      localButtons: {},
      cache: {
        hideSingle: false,
        hideAll: false
      },
      update: {
        hideSingle: false,
        hideAll: false
      },
      cacheSingle: [{
        name: '同步REDIS缓存',
        methods: 'post',
        type: 'cacheSingle',
        typeName: 'cache',
        icon: 'swap',
        data: {},
        default: true
      }],
      updateSingle: [{
        name: '更新通知',
        methods: 'get',
        type: 'updateSingle',
        typeName: 'update',
        icon: 'message',
        data: {},
        default: true
      }],
      cacheAll: [{
        name: '全部缓存',
        methods: 'post',
        type: 'cacheAll',
        icon: 'swap',
        data: {
          tag: 'all'
        },
        default: true
      }],
      add: [{
        name: '新增',
        type: 'add',
        icon: 'plus',
        modal: true,
        default: true,
        urlParams: {
          // type: 'application/json'
        }
      }],
      noFlagDel: [{
        name: '删除',
        methods: 'delete',
        type: 'del',
        icon: 'close',
        data: {},
        default: true
      }],
      del: [{
        name: '删除',
        methods: 'delete',
        type: 'del',
        icon: 'close',
        isFlag: true,
        data: {},
        default: true,
        arr: [1]
      }],
      flagActions: [{
        name: '启用',
        type: 'flag',
        icon: 'check-circle',
        data: { flag: 1 },
        default: true
      }, {
        name: '作废',
        type: 'flag',
        icon: 'stop',
        data: { flag: 2 },
        default: true
      }],
      statusActions: [{
        name: '上线',
        type: 'status',
        icon: 'check-circle',
        data: { status: 1 },
        default: true
      }, {
        name: '下线',
        type: 'status',
        icon: 'stop',
        data: { status: 2 },
        default: true
      }],
      postCheckActions: [{
        name: '提交审核',
        type: 'postCheckup',
        icon: 'check-circle',
        data: { auditStatus: 1 },
        default: true
      }, {
        name: '撤销审核',
        type: 'postCheckdown',
        icon: 'stop',
        data: { auditStatus: 0 },
        default: true
      }],
      checkActions: [{
        name: '审核通过',
        type: 'checkb',
        icon: 'check-circle',
        data: { status: 1 },
        default: true
      }, {
        name: '审核不过',
        type: 'checkb',
        icon: 'stop',
        data: { status: 2 },
        default: true
      }],
      materActions: [{
        name: '标为主图',
        type: 'doMaster',
        icon: 'check-circle',
        data: { mater: 0 },
        default: true
      }, {
        name: '撤销主图',
        type: 'removeMaster',
        icon: 'stop',
        data: { mater: 1 },
        default: true
      }],
      choseTr: {},
      choseTree: {},
      lineShow: false,
      postCheckShow: false,
      checkbShow: false,
      checkPlanShow: false
    }
  },
  created () {
    this.localButtons = this.buttons
    this.cache.hideSingle = !cacheSingleTabs.includes(this.name)
    this.update.hideSingle = !updateSingleTabs.includes(this.name)
    this.cache.hideAll = !cacheAllTabs.includes(this.name)
    if (this.$route.name == 'programActivity' || this.name == 'platformPlan' || this.name == 'groupPlan' || this.name == 'hotelPlan') {
      // 活动配置上线下线按钮显示
      this.lineShow = true
    }
    if (this.$route.name == 'platformPlan' || this.$route.name == 'groupPlan' || this.$route.name == 'hotelPlan' ||
    this.$route.name == 'platformMatter' || this.$route.name == 'groupMatter' || this.$route.name == 'hotelMatter') {
      // 提交审核
      this.postCheckShow = true
    }
    const queryAuditStatus = this.$route.query.auditStatus
    const queryStatus = this.$route.query.status
    if (this.name == 'managerPlan') {
      if (queryAuditStatus == 1) {
        this.checkPlanShow = true
      }
      if (queryStatus == 0 || queryStatus == 1 || queryStatus == 2) {
        this.lineShow = true
      }
    }
    if (this.$route.name == 'managerAdMaterial') {
      if (queryAuditStatus == 1) {
        this.checkbShow = true
      }
    }
  },
  computed: {

    ...mapState({
      getChoseTr: state => state.data.choseTr,
      getTree: state => state.data.tree,
      getTabs: state => state.data.tabs,
      getSubAcess: state => state.access.subAccess
    }),
    checkDelDisabled () {
      if (this.$route.name == 'enviroImage' && this.data.hotelId) {
        return true
      }
      if (this.name == 'hotelInfo' && this.data.hotelId) {
        return true
      }
      if (this.type === 'main') {
        if (this.$route.params.access < 2) {
          return false
        }
      }
      if (this.type === 'sub') {
        if (this.subAccess[this.name] < 2) {
          return false
        }
      }
      if (isEmptyObject(this.data)) {
        return false
      }
      if (!isEmptyObject(this.choseTr)) {
        if (this.choseTr.edit === 0) {
          return false
        }
      }
      if ((this.name == 'adMaterial' || this.name == 'adPlanChannel') && (this.$route.name == 'platformPlan' || this.$route.name == 'groupPlan' || this.$route.name == 'hotelPlan')) {
        if (this.choseTr.status == 1 || this.choseTr.auditStatus == 1) {
          return false
        }
      }
      if (this.$route.name != 'programActivity' && this.name != 'platformPlan' && this.name != 'groupPlan' && this.name != 'hotelPlan') {
        if (this.data.flag && this.data.flag !== 0 && !this.localButtons.hideFlag) {
          return false
        }
      } else {
        if (this.data.status !== 0 && !this.localButtons.hideFlag) {
          return false
        }
      }
      return true
    },
    checkActionDisabled () {
      if (this.type === 'main') {
        if (this.$route.params.access < 2) {
          return false
        }
      }
      if (this.type === 'sub') {
        if (this.subAccess[this.name] < 2) {
          return false
        }
      }
      if (isEmptyObject(this.data)) {
        return false
      }
      if (!isEmptyObject(this.choseTr)) {
        if (this.choseTr.edit == 0) {
          return false
        }
      }
      if (this.data.edit == 0) {
        return false
      }
      return true
    },
    postcheckActionDisabled () {
      if (this.type === 'main') {
        if (this.$route.params.access < 2) {
          return false
        }
      }
      if (this.type === 'sub') {
        if (this.subAccess[this.name] < 2) {
          return false
        }
      }
      if (isEmptyObject(this.data)) {
        return false
      }
      if (this.data.auditStatus == 2) {
        return false
      }
      return true
    },
    checkBaseDisabled () {
      if (this.type === 'main') {
        if (this.$route.params.access < 2) {
          return false
        }
      }
      if (this.type === 'sub') {
        if (this.subAccess[this.name] < 2) {
          return false
        }
      }
      if (isEmptyObject(this.data)) {
        if (Object.keys(this.choseTree).length) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    checkCacheDisabled () {
      if (this.type === 'main') {
        if (this.$route.params.access < 2) {
          return false
        }
      }
      if (this.type === 'sub') {
        if (this.subAccess[this.name] < 2) {
          return false
        }
      }

      if (isEmptyObject(this.data)) {
        if (Object.keys(this.choseTree).length) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    checkAddDisabled () {
      // 投放计划上线以及待审核、审核通过的状态不能新增
      // if (this.$route.name == 'platformPlan' && (this.choseTr.status == 1 || this.choseTr.auditStatus == 1)) {
      //   return false
      // }
      // if (this.$route.name == 'groupPlan' && (this.choseTr.status == 1 || this.choseTr.auditStatus == 1)) {
      //   return false
      // }
      // if (this.$route.name == 'hotelPlan' && (this.choseTr.status == 1 || this.choseTr.auditStatus == 1)) {
      //   return false
      // }
      if ((this.name == 'adPlanChannel' || this.name == 'adMaterial') && (this.choseTr.status == 1 || this.choseTr.auditStatus == 1)) {
        return false
      }
      if (this.name == 'hotelInfo' && this.data.hotelId) {
        return false
      }
      if (this.type === 'main') {
        if (this.$route.params.access < 2) {
          return false
        }
      }
      if (this.type === 'sub') {
        if (this.subAccess[this.name] < 2) {
          return false
        }
        if (!isEmptyObject(this.choseTr)) {
          if (this.choseTr.edit == 0) {
            return false
          }
        }
      }
      return true
    },
    custAddDisabled () { // 自定义新增
      if (this.$route.name == 'platformPlan' && (this.choseTr.status == 1 || this.choseTr.auditStatus == 1)) {
        return false
      }
      if (this.$route.name == 'groupPlan' && (this.choseTr.status == 1 || this.choseTr.auditStatus == 1)) {
        return false
      }
      if (this.$route.name == 'hotelPlan' && (this.choseTr.status == 1 || this.choseTr.auditStatus == 1)) {
        return false
      }
      if (this.name == 'groupHotelSign' && this.$route.params.access < 2) {
        return false
      }
      return true
    }

  },
  watch: {
    getTabs (val) {
    },
    getSubAcess (val) {
      this.subAccess = val
    },
    data (val) {
    },
    buttons (val) {
      this.localButtons = this.buttons
    },
    name (val) {
      if (this.type === 'sub' && this.buttons.subData && this.buttons.subData[val]) {
        this.localButtons = { ...this.localButtons, ...this.buttons.subData[val] }
      }
      if (this.type === 'sub') {
        this.cache.hideSingle = !cacheSingleTabs.includes(this.name)
        this.update.hideSingle = !updateSingleTabs.includes(this.name)
        this.cache.hideAll = !cacheAllTabs.includes(this.name)
      }
    },
    getChoseTr (val) {
      this.choseTr = val
    },
    getTree (val) {
      this.choseTree = val
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
      'updateTreeNode',
      'handleModalData'
    ]),
    returnActionDisabled () {

    },
    handleMenuClick (e) {
    },
    btnClickFlag (item) {
      this.$message.loading('修改中...')
      getData(item.selfBtn ? item.urlParams : {
        name: this.urls[item.type],
        data: { ...this.data, ...item.val },
        type: !(this.urls.noJson && this.urls.noJson[item.type]) && 'application/json'
      }).then(res => {
        if (res) {
          if (res.showTip) {
            this.$message.error((res.data.key + res.data.msg), 2)
          } else {
            this.$message.success('修改成功!', 2)
            if (this.type != 'sub') {
              this.handleChangeTableStatus(this.$route.name)
            } else {
              this.handleChangeSubTableStatus(this.$route.name)
            }
            if (this.type != 'sub' && item.type == 'update') {
              this.updateTreeNode(res.data)
            }
          }
        } else {
          this.$message.error('系统出错了', 2)
        }
      })
    },
    cacheUpdateData (item) {
      let middleName = item.typeName === 'cache' ? 'syscroCache' : `send${this.name.slice(0, 1).toUpperCase() + this.name.slice(1)}Update`,
        name = `${changeFirstUrl(this.name)}_${this.name}_${middleName}_${item.methods}`, /// hotel/manager/company/syscroCache
        data = this.localButtons.cache && this.localButtons.cache.data || {},
        icon = item.icon
      if (this.buttons.cache && this.buttons.cache.useUrlCacheStatus && this.buttons.cache.cacheUrl && item.typeName === 'cache') name = this.buttons.cache.cacheUrl
      if (this.buttons.update && this.buttons.update.useUrlUpdateStatus && this.buttons.update.updateUrl && item.typeName === 'update') name = this.buttons.update.updateUrl
      item.icon = 'loading'
      getData({
        name: name,
        data: { ...item.data, ...data }
        // type: !(this.urls.noJson && this.urls.noJson[item.type]) && 'application/json'
      }).then(res => {
        if (res.code == '200') {
          if (item.typeName === 'cache') {
            res.data.success && this.$message.success('缓存成功!')
            !res.data.success && this.$message.error(res.data.message || `缓存失败!`)
          } else {
            this.$message.success('更新通知成功!')
          }
        }
        item.icon = icon
      }, err => {
        item.icon = icon
      })
    },
    delData (item) {
      if (this.$route.name == 'programActivity' || this.name == 'platformPlan' || this.name == 'groupPlan' || this.name == 'hotelPlan') {
        if (item.type == 'del' && this.data.status != 0 && !this.localButtons.hideFlag && item.isFlag) {
          this.$message.info('所有的数据，只有处于新增状态才可以删除，启用与作废的数据都不能删除')
          return false
        }
      } else if (this.$route.name == 'enviroImage' || this.name == 'hotelInfo') {

      } else {
        if (item.type == 'del' && this.data.flag != 0 && !this.localButtons.hideFlag && item.isFlag) {
          this.$message.info('所有的数据，只有处于新增状态才可以删除，启用与作废的数据都不能删除')
          return false
        }
      }
      // let name = `${this.name.indexOf('wx') > -1 ? 'o' : 'h'}_${this.name}_i_${item.type == 'del' ? 'delete' : 'put'}`,
      let name = `${changeFirstUrl(this.name)}_${this.name}_i_${item.type == 'del' ? 'delete' : 'put'}`
      let data = sortSubmitData({ ...this.data, ...item.data }, this.name) || {}
      data = delDataReturn(this.name, data)
      // 上线下线
      if (this.$route.name === 'programActivity') {
        name = `l_activityPage_i_put`
        data = {
          num: data.num,
          name: data.name,
          redirectUrl: data.redirectUrl,
          endtime: data.endtime,
          starttime: data.starttime,
          status: data.status,
          id: data.id
        }
        // 删除
        if (item.type == 'del') {
          name = `l_activityPage_i_delete`
        }
      }
      if (this.name === 'platformPlan') {
        if (item.type == 'postCheckup') {
          name = `p_manager_adPlan_doAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else if (item.type == 'postCheckdown') {
          name = `p_manager_adPlan_removeAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else {
          if (item.data.status == 1) {
            name = `p_manager_adPlan_doOnline_put`
          }
          if (item.data.status == 2) {
            name = `p_manager_adPlan_doOffline_put`
          }
          data = {
            status: data.status,
            id: data.id
          }
          // 删除
          if (item.type == 'del') {
            name = `p_manager_adPlan_delete_delete`
          }
        }
      }
      if (this.name === 'groupPlan') {
        if (item.type == 'postCheckup') {
          name = `p_manager_adPlan_doAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else if (item.type == 'postCheckdown') {
          name = `p_manager_adPlan_removeAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else {
          if (item.data.status == 1) {
            name = `p_manager_adPlan_doOnline_put`
          }
          if (item.data.status == 2) {
            name = `p_manager_adPlan_doOffline_put`
          }
          data = {
            status: data.status,
            id: data.id
          }
          // 删除
          if (item.type == 'del') {
            name = `p_manager_adPlan_delete_delete`
          }
        }
      }
      if (this.name === 'hotelPlan') {
        if (item.type == 'postCheckup') {
          name = `p_manager_adPlan_doAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else if (item.type == 'postCheckdown') {
          name = `p_manager_adPlan_removeAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else {
          if (item.data.status == 1) {
            name = `p_manager_adPlan_doOnline_put`
          }
          if (item.data.status == 2) {
            name = `p_manager_adPlan_doOffline_put`
          }
          data = {
            status: data.status,
            id: data.id
          }
          // 删除
          if (item.type == 'del') {
            name = `p_manager_adPlan_delete_delete`
          }
        }
      }
      if (this.$route.name === 'programHotelunit') {
        name = `l_creditThreshold_${this.data.id}_put`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = 'l_creditThreshold_i_delete'
        }
      }
      // 启用
      if (this.$route.name === 'programIndex') {
        name = `l_activityPageHome_updateOne_put`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `l_activityPageHome_i_delete`
        }
      }

      // 启用
      if (this.$route.name === 'programUnit') {
        name = `l_creditThresholdDefault_${data.id}_put`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `l_creditThresholdDefault_i_delete`
        }
      }

      if (this.$route.name === 'programUser') {
        name = `l_memberUser_i_put`
        data = {
          id: data.id,
          flag: data.flag
        }
      }
      if (this.$route.name === 'programSystem') {
        name = `l_systemImage_updateOne_put`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `l_systemImage_i_delete`
        }
      }
      if (this.$route.name === 'programCreditGrade') {
        name = `l_hotelCreditGrade_i_put`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `l_hotelCreditGrade_i_delete`
        }
      }

      if (this.$route.name === 'programCreditPlan') {
        name = `l_hotelCreditPlan_i_put`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `l_hotelCreditPlan_i_delete`
        }
      }
      if (this.$route.name === 'enviroImage') {
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `h_hotelEnviroImage_i_delete`
        }
        if (item.type == 'doMaster') {
          name = `h_hotelEnviroImage_doMaster__PUT`
          data = this.data
        }
        if (item.type == 'removeMaster') {
          name = `h_hotelEnviroImage_removeMaster__PUT`
          data = this.data
        }
      }
      if (this.name === 'hotelInfo') {
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `h_hotelInfo_i_delete`
        }
      }
      if (this.name === 'platFormCard') {
        name = `u_goodsCategory_updateOne_post`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `u_goodsCategory_i_delete`
        }
      }
      if (this.name === 'groupCard' || this.name === 'groupCardOther') {
        name = `u_consumerGoodsCategory_i_put`
        data = {
          id: data.id,
          flag: data.flag,
          companyCode: data.companyCode,
          systemDefault: data.systemDefault
        }
        if (item.type == 'del') {
          name = `u_consumerGoodsCategory_i_delete`
        }
      }
      if (this.name === 'groupCoupTemp' || this.name === 'groupCoupTempOther') {
        // name = `u_consumerCouponTemplate_put`
        name = 'u_consumerCouponTemplate_updateFlag_i_put'
        data = {
          id: data.tpmId,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `u_consumerCouponTemplate_delete_i_delete`
        }
      }
      if (this.name === 'panelEdition') {
        name = `p_version_i_put`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `p_version_i_delete`
        }
      }
      if (this.name === 'programNews') {
        name = `l_homeNews_customerAdd_post`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `l_homeNews_i_delete`
        }
      }
      if (this.name === 'programCarousel') {
        name = `l_homeBanner_customerAdd_post`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `l_homeBanner_i_delete`
        }
      }
      if (this.name === 'homeBannerDetail') {
        name = `l_homeBannerDetail__post`
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `l_homeBannerDetail_i_delete`
        }
      }
      if (this.$route.name === 'platformMatter') {
        if (item.type == 'postCheckup') {
          name = `p_manager_adMaterial_doAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else if (item.type == 'postCheckdown') {
          name = `p_manager_adMaterial_removeAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else {
          name = `p_manager_adMaterial_updateFlag_put`
          data = {
            id: data.id,
            flag: data.flag
          }
          if (item.type == 'del') {
            name = `p_manager_adMaterial_delete_delete`
          }
        }
      }
      if (this.$route.name === 'groupMatter') {
        if (item.type == 'postCheckup') {
          name = `p_manager_adMaterial_doAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else if (item.type == 'postCheckdown') {
          name = `p_manager_adMaterial_removeAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else {
          name = `p_manager_adMaterial_updateFlag_put`
          data = {
            id: data.id,
            flag: data.flag
          }
          if (item.type == 'del') {
            name = `p_manager_adMaterial_delete_delete`
          }
        }
      }
      if (this.$route.name === 'hotelMatter') {
        if (item.type == 'postCheckup') {
          name = `p_manager_adMaterial_doAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else if (item.type == 'postCheckdown') {
          name = `p_manager_adMaterial_removeAudit_put`
          data = {
            id: data.id,
            auditStatus: data.auditStatus
          }
        } else {
          name = `p_manager_adMaterial_updateFlag_put`
          data = {
            id: data.id,
            flag: data.flag
          }
          if (item.type == 'del') {
            name = `p_manager_adMaterial_delete_delete`
          }
        }
      }
      if (this.name === 'adMaterial') {
        data = {
          id: data.id,
          flag: data.flag
        }
        if (item.type == 'del') {
          name = `p_manager_adMaterial_delete_delete`
        }
      }
      if (this.name === 'adPlanChannel') {
        data = {
          id: data.id,
          planId: this.localButtons.planId
        }
        if (item.type == 'del') {
          name = `p_manager_adPlanChannel_delete_delete`
        }
      }
      if (this.name === 'managerPlan') {
        data = {
          id: data.id
        }
        if (item.type == 'status') {
          if (item.data.status == 1) {
            name = `p_manager_adPlan_doOnline_put`
          }
          if (item.data.status == 2) {
            name = `p_manager_adPlan_doOffline_put`
          }
        }
        if (item.type == 'checkb') {
          if (item.data.status == 1) {
            name = `p_manager_adPlan_doAuditAccess_put`
          }
          if (item.data.status == 2) {
            name = `p_manager_adPlan_doAuditReject_put`
          }
        }
      }
      if (this.$route.name === 'managerAdMaterial') {
        data = {
          id: data.id
        }
        if (item.type == 'checkb') {
          if (item.data.status == 1) {
            name = `p_manager_adMaterial_doAuditAccess_put`
          }
          if (item.data.status == 2) {
            name = `p_manager_adMaterial_doAuditReject_put`
          }
        }
      }
      getData({
        name: name,
        data: data
        // type: !(this.urls.noJson && this.urls.noJson[item.type]) && 'application/json'
      }).then(res => {
        if (this.$route.name == 'platformPlan' || this.$route.name == 'hotelPlan' || this.$route.name == 'groupPlan') { // 投放计划删除相关投放对象或关联物料事更新整个数据
          this.handleChangeTableStatus(this.$route.name)
        } else if (this.type != 'sub') {
          this.handleChangeTableStatus(this.$route.name)
        } else {
          this.handleChangeSubTableStatus(this.$route.name)
        }
        res.data && item.type == 'flag' && this.handleModalData({
          type: this.type,
          action: 'update',
          data: res.data
        })
      })
    },
    updateBtnClick (item) {

    },
    cacheUpdateBtnClick (item) {
      let isSingle = item.type === 'cacheSingle' || item.type === 'updateSingle'
      if (isSingle && treeTabs.indexOf(this.$route.name) > -1 && isEmptyObject(this.choseTree) && this.type != 'sub') {
        this.$message.info('请先选择左侧树内容!')
        return false
      }
      if (isSingle && isEmptyObject(this.choseTr) && this.type == 'sub') {
        this.$message.info('请先选择上面表格内容!')
        return false
      }
      this.cacheUpdateData(item)
    },
    btnPlanClick () {
      // 计划审核
      this.buttons.checkPlan()
    },
    btnClick (item) {
      if (treeTabs.indexOf(this.$route.name) > -1 && isEmptyObject(this.choseTree) && this.type != 'sub') {
        this.$message.info('请先选择左侧树内容!')
        return false
      }
      if (isEmptyObject(this.choseTr) && this.type == 'sub') {
        this.$message.info('请先选择上面表格内容!')
        return false
      }
      if (item.default) {
        let backData = (this.buttons && this.buttons.sortBtnClick) && this.buttons.sortBtnClick(item) || {
          status: true,
          message: ''
        }
        if (!backData.status) {
          this.$message.info(backData.message)
          return false
        }
        if (item.modal || item.type == 'check') {
          this.$emit('show-modal', item.type)
        } else if (isEmptyObject(this.data)) {
          this.$message.info('请先选择当前表格内容!')
          return false
        } else {
          this.delData(item)
        }
      }
    }

  }
}
</script>
<style lang="less">
.buttonLineSelf {
  text-align: left;
  background-color: #fff;
  height: 42px;

  .inOut {
    img {
      height: 24px;
    }
  }

  .ant-btn {
    /*height: 24px;*/
    /*font-size: 12px;*/
    /*line-height: 24px;*/
    /*min-width: 88px;*/
    /*margin-right: 20px;*/
    border-top-width: 0;
    border-bottom-width: 0;
    font-size: 12px;
    line-height: 42px;
    height: 42px;
    min-width: 88px;

    &.operation {
      line-height: 32px;
      height: 32px;
      border-top-width: 1px;
      border-bottom-width: 1px;
      position: absolute;
      right: 22px;
      top: 5px;

      .anticon-appstore {
        display: block;
        float: left;
        font-size: 18px;
        margin-top: 6px;
        color: #3bc18a;
      }
    }
  }

  .operation {
    .ant-btn {
    }
  }

  .ant-btn-group > .ant-btn:first-child:not(:last-child),
  .ant-btn-group > span:first-child:not(:last-child) > .ant-btn {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  .ant-btn-group > .ant-btn:last-child:not(:first-child),
  .ant-btn-group > span:last-child:not(:first-child) > .ant-btn {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>
