<template>
  <div>
    <div class="managerPlan-bar clearfix">
    <div class="clearfix">
        <div v-for="(item,index) in getReadStatusList" v-if="item.status==null" :key="index" :class="['managerPlan-li clearfix',selectStatus[index]?'active':'']"  @click="changeStatusNew(item,index)">
          <img v-if="item.status==null" src="/static/img/components/buttonLine/checkgo.png" alt="" class="managerPlan-icon">
          <img v-else-if="item.status==0" src="/static/img/components/buttonLine/daishangxian.png" alt="" class="managerPlan-icon">
          <img v-else-if="item.status==1" src="/static/img/components/buttonLine/yishangxian.png" alt="" class="managerPlan-icon">
          <img v-else src="/static/img/components/buttonLine/yixiaxian.png" alt="" class="managerPlan-icon">
          <div class="managerPlan-info">
            <div class="managerPlan-top">
              <span v-if="item.status==null">计划总数:</span>
              <span v-else-if="item.status==0">待上线计划:</span>
              <span v-else-if="item.status==1">已上线计划:</span>
              <span v-if="item.status==2">已下线计划:</span>
              <span class="managerPlan-num">{{item.total}}</span></div>
            <div class="managerPlan-bom clearfix">
              <div class="managerPlan-spa" v-for="(itemc,indexc) in item.datas" :key="indexc">{{itemc.ownerTypeName}}:<span class="managerPlan-num">{{itemc.total}}</span></div>
            </div>
          </div>
        </div>
        <div v-for="(item,index) in getReadAuditStatusList" v-if="item.auditStatus==0" :key="index"  :class="['managerPlan-li managerPlan-li2 clearfix',selectAuditStatus[index]?'active':'']" @click="changeAuditStatusNew(item,index)">
          <img v-if="item.auditStatus==0" src="/static/img/components/buttonLine/checkgo.png" alt="" class="managerPlan-icon">
          <img v-else-if="item.auditStatus==1" src="/static/img/components/buttonLine/daishangxian.png" alt="" class="managerPlan-icon">
          <img v-else-if="item.auditStatus==2" src="/static/img/components/buttonLine/tongguo.png" alt="" class="managerPlan-icon">
          <img v-else src="/static/img/components/buttonLine/weitongguo.png" alt="" class="managerPlan-icon">
          <div class="managerPlan-info">
            <div class="managerPlan-top">
              <span v-if="item.auditStatus==0">待提交审核计划:</span>
              <span v-else-if="item.auditStatus==1">待审核计划:</span>
              <span v-else-if="item.auditStatus==2">审核通过计划:</span>
              <span v-if="item.auditStatus==3">审核未通过计划:</span>
              <span class="managerPlan-num">{{item.total}}</span></div>
            <div class="managerPlan-bom clearfix">
              <div class="managerPlan-spa" v-for="(itemc,indexc) in item.datas" :key="indexc">{{itemc.ownerTypeName}}:<span class="managerPlan-num">{{itemc.total}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix">
        <div v-for="(item,index) in getReadAuditStatusList" v-if="item.auditStatus!=0" :key="index"  :class="['managerPlan-li managerPlan-li2 clearfix',selectAuditStatus[index]?'active':'']" @click="changeAuditStatusNew(item,index)">
          <img v-if="item.auditStatus==0" src="/static/img/components/buttonLine/checkgo.png" alt="" class="managerPlan-icon">
          <img v-else-if="item.auditStatus==1" src="/static/img/components/buttonLine/daishangxian.png" alt="" class="managerPlan-icon">
          <img v-else-if="item.auditStatus==2" src="/static/img/components/buttonLine/tongguo.png" alt="" class="managerPlan-icon">
          <img v-else src="/static/img/components/buttonLine/weitongguo.png" alt="" class="managerPlan-icon">
          <div class="managerPlan-info">
            <div class="managerPlan-top">
              <span v-if="item.auditStatus==0">新增计划:</span>
              <span v-else-if="item.auditStatus==1">待审核计划:</span>
              <span v-else-if="item.auditStatus==2">审核通过计划:</span>
              <span v-if="item.auditStatus==3">审核未通过计划:</span>
              <span class="managerPlan-num">{{item.total}}</span></div>
            <div class="managerPlan-bom clearfix">
              <div class="managerPlan-spa" v-for="(itemc,indexc) in item.datas" :key="indexc">{{itemc.ownerTypeName}}:<span class="managerPlan-num">{{itemc.total}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix">
        <div v-for="(item,index) in getReadStatusList" v-if="item.status!=null" :key="index" :class="['managerPlan-li clearfix',selectStatus[index]?'active':'']"  @click="changeStatusNew(item,index)">
          <img v-if="item.status==null" src="/static/img/components/buttonLine/checkgo.png" alt="" class="managerPlan-icon">
          <img v-else-if="item.status==0" src="/static/img/components/buttonLine/daishangxian.png" alt="" class="managerPlan-icon">
          <img v-else-if="item.status==1" src="/static/img/components/buttonLine/yishangxian.png" alt="" class="managerPlan-icon">
          <img v-else src="/static/img/components/buttonLine/yixiaxian.png" alt="" class="managerPlan-icon">
          <div class="managerPlan-info">
            <div class="managerPlan-top">
              <span v-if="item.status==null">计划总数:</span>
              <span v-else-if="item.status==0">待上线计划:</span>
              <span v-else-if="item.status==1">已上线计划:</span>
              <span v-if="item.status==2">已下线计划:</span>
              <span class="managerPlan-num">{{item.total}}</span></div>
            <div class="managerPlan-bom clearfix">
              <div class="managerPlan-spa" v-for="(itemc,indexc) in item.datas" :key="indexc">{{itemc.ownerTypeName}}:<span class="managerPlan-num">{{itemc.total}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { getData } from '../../api/common'
import { isEmptyObject, isArray, isJson } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { getDate, getDay } from '../../libs/date'
export default {
  data () {
    return {
      getReadAuditStatusList: [],
      getReadStatusList: [],
      selectAuditStatus: [false, false, false],
      selectStatus: [false, false, false]
    }
  },
  methods: {
    changeAuditStatusNew (item, index) {
      this.selectStatus = [false, false, false, false]
      this.selectAuditStatus = [false, false, false, false]
      this.selectAuditStatus[index] = true
      //   this.searchData.auditStatus = item.auditStatus
      //   this.searchData.status = ''
      this.$router.push({path: '/advert/managerPlan', query: {auditStatus: item.auditStatus}})
    },
    changeStatusNew (item, index) {
      this.selectAuditStatus = [false, false, false, false]
      //   this.searchData.auditStatus = ''
      //   this.searchData.status = item.status == null ? '' : item.status
      let statuss = item.status == null ? '' : item.status
      this.selectStatus = [false, false, false, false]
      this.selectStatus[index] = true

      this.$router.push({path: '/advert/managerPlan', query: {status: statuss}})
    },
    getReadAuditStatus () {
      getData({
        name: 'p_manager_adPlan_readAuditStatusCalssification_get',
        data: {},
        type: ''
      }).then(res => {
        this.getReadAuditStatusList = res.data
      })
      getData({
        name: 'p_manager_adPlan_readStatusCalssification_get',
        data: {},
        type: ''
      }).then(res => {
        this.getReadStatusList = res.data
      })
    }
  },
  created () {
    this.getReadAuditStatus()
  },
  computed: {
  },
  watch: {

  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
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
      padding:5px 20px;
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
.managerPlan-bar{
  .managerPlan-li{
    width:calc(33.3333% - 22.5px);
    float: left;
    box-sizing: border-box;
    height: 120px;
    margin-right:30px;
    border:1px solid transparent;
    padding:10px;
    margin-bottom: 10px;
    background-color:#fff;
    cursor: pointer;
  }
  .active{border:1px solid #0084c9}
  .managerPlan-li:nth-child(3n+3){
    margin-right:0;
  }
  .managerPlan-icon{
    float: left;
    width: 44px;
    height: 42px;
    margin:29px 16px;
  }
  .managerPlan-info{
    float: left;
    border-left:1px solid #eaeaea;
    font-family:PingFangSC-Medium;
    font-size:16px;
    color:#0084c9;
    line-height: 50px;
    text-align: left;
    width: calc(100% - 98px)
  }
  .managerPlan-top{
    border-bottom: 1px solid #f4f4f4;
    margin-left:10px;
  }
  .managerPlan-spa{
    width:33.333%;
    float: left;
  }
  .managerPlan-num{
    color: #0cd8d5;
    margin-left: 5px;
    font-size: 18px;
    vertical-align: bottom;
  }
  .managerPlan-bom{
    padding-left:10px;
  }
}
.readTerminalHis {
  top:50px;
  .ant-modal-body {
    padding: 0 !important;
  }
}
</style>
