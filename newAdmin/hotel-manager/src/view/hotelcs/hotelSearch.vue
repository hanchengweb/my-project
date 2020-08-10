<template>
  <div class="singleTableSelf">
    <!-- 表格操作 -->
    <buttonSearch :table="table"
                  :search="search"
                  :data="choseTr"
                  :name="name"
                  @show-modal="showModal"
                  v-if="!table.hideButtonSearch"></buttonSearch>
    <tabsLine :tabsJson="table.tabs"
              :table="table"
              v-if="table.showTableTabs"
              style="margin:0"></tabsLine>
    <!-- 表格内容 -->
    <div class="figureOut clearfix">
        <a-spin :spinning="spinning">
            <div  v-for="(item,index) in figureList" :key="index" :class="item.active?'active figureli':'figureli'" @click="customRowFu(item,index)" @mouseover="customOver(item,index)" @mouseout="customOut(item,index)" ref="wraps">
              <div class="figureli-top" :style="{'height':figureliHeight}">
                <img alt="" :src="item.imgSrc">
                <div class="figureli-top-mask" v-if="item.mask" :style="{'height':figureliHeight}"></div>
              </div>
              <div class="figureli-bottom">
                <div class="figureli-title">{{item.name}}</div>
                <div class="figureli-con">
                  <div class="figureli-item">
                    <span>宽高：</span>
                    <span>{{item.width}}x{{item.height}}</span>
                  </div>
                  <div class="figureli-item figureli-item-right">
                    <span>类别：</span>
                    <span>{{item.categoryName}}</span>
                  </div>
                  <div class="figureli-item">
                    <span>大小：</span>
                    <span>{{item.size}}{{item.sizeUnit}}</span>
                  </div>
                  <div class="figureli-item figureli-item-right">
                    <span>归属：</span>
                    <span>{{item.ownerTypeName}}</span>
                  </div>
                  <div class="figureli-item">
                    <span>投放状态：</span>
                    <span  style="color:#8CD042">{{item.stateName}}</span>
                  </div>
                  <div class="figureli-item figureli-oneline">
                    <span>主计划名称：</span>
                    <span>{{item.planName}}</span>
                  </div>
                  <div class="figureli-item figureli-oneline">
                    <span>计划开始时间：</span>
                    <span>{{item.startTime}}</span>
                  </div>
                  <div class="figureli-item figureli-oneline">
                    <span>计划结束时间：</span>
                    <span>{{item.endTime}}</span>
                  </div>
                  <div class="figureli-item figureli-oneline">
                    <span>路径：</span>
                    <span>{{item.path}}</span>
                  </div>
                </div>
              </div>
            </div>
        </a-spin>
    </div>
    <!-- 弹框 -->
    <modalSelf :modalVisible="modalVisible"
               :urls="table.urls"
               :data="choseTr"
               :type="table.type"
               :modalData="table.modal"
               :title="modalTitle"
               :name="name"
               @hide-modal="hideModal"
               v-if="modalVisible && table.modal">
    </modalSelf>
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
          <div class="searchBar">
              <div class="searchBarli clearfix">
                  <div class="searchBarli-li">
                      <span class="searchBarli-spa">归属类型：</span>
                      <a-select  style="width: 118px" v-model="searchData.ownerType">
                          <a-select-option v-for="(item,index) in ownerTypeList" :value="item.code" :key="index">{{item.name}}</a-select-option>
                      </a-select>
                  </div>
              </div>
              <div class="searchBarli clearfix">
                  <div class="searchBarli-li">
                      <span class="searchBarli-spa">投放状态：</span>
                      <a-select  style="width: 118px" v-model="searchData.state">
                          <a-select-option v-for="(item,index) in stateList" :value="item.code" :key="index">{{item.name}}</a-select-option>
                      </a-select>
                  </div>
              </div>
              <div class="searchBarli clearfix">
                  <div class="searchBarli-li">
                      <span class="searchBarli-spa">投放开始时间：</span>
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
              <div class="searchBarli clearfix" style="text-align:center;padding-left:0">
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
import pagination from '@/components/pagination/pagination'
import buttonLine from '@/components/buttonLine/buttonLine'
import tableSelf from '@/components/table/table'
import tabsLine from '@/components/tabsLine/tabsLine'
import modalSelf from '@/components/modal/modaleTest'
import buttonSearch from '@/components/buttonSearch/buttonSearch'
import { getData } from '@/api/common'
import {getConst } from '@/api/hotelConst'
import { getDate, getDay } from '../../libs/date'
import { fullScreen } from '../../assets/mixins/fullScreen'
import { mapState, mapActions } from 'vuex'
import { isEmptyObject, isArray } from '@/libs/tool'
import { resetData, TOKEN_KEY, getCompany } from '@/libs/util'
import Cookies from 'js-cookie'
import moment from 'moment'
export default {
  components: {
    pagination,
    buttonLine,
    tableSelf,
    modalSelf,
    buttonSearch,
    tabsLine
  },
  data () {
    return {
      materSearch: false,
      table: {
        type: 'main',
        deleteColumnsIndex: 1,
        useUrlStatus: true,
        url: 'p_adunit_queryToHotel_get',
        data: {
          companyCode: '111',
          hotelId: '111',
          page: '0',
          size: '10'
        },
        sortReturnData: this.sortReturnData,
        urls: {},
        hideSearch: true, // 隐藏查询按钮
        buttons: {
          hideAdd: true,
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
              sortReturnUploadFile: this.sortReturnUploadFile
              // imageScale: 1.7778// 裁剪宽比
            }
          },
          onModalChange: this.onModalChange
        }
      },
      search: {

      },
      total: {},
      choseTr: {},
      modalVisible: false,
      modalTitle: '',
      name: '',
      figureList: [],
      spinning: true,
      chooseIndex: 0,
      timeValue: undefined,
      timeValue2: undefined,
      searchData: {
        startTimeBegin: '',
        startTimeEnd: '',
        stopTimeBegin: '',
        stopTimeEnd: '',
        ownerType: '',
        state: ''
      },
      ownerTypeList: [],
      modalData: {
        title: '关联投放对象',
        visible: false,
        first: true,
        planId: '',
        complete: this.complete
      },
      stateList: [],
      timeValuestartTimeBegin: '',
      timeValuestartTimeEnd: '',
      timeValuestopTimeBegin: '',
      timeValuestopTimeEnd: '',
      figureliHeight: 0
    }
  },
  mixins: [fullScreen],
  computed: {
    ...mapState({
      getTabs: state => state.data.tabs,
      getChangeTableStatus: state => state.change.changeTableStatus,
      getChangeSubTableStatus: state => state.change.changeSubTableStatus,
      getModalData: state => state.data.modalData
    })
  },
  watch: {
    getTabs (val) {
      if (this.table.type == 'sub' && this.table.multiple && val) {
        this.name = val
      }
    },
    getChangeTableStatus (val) {
      let _this = this
      val && _this.getData('main')
      if (val && _this.table.type === 'sub') {
        _this.data = []
      }
    },
    getChangeSubTableStatus (val) {
      val && this.getData('sub')
    },
    getModalData (val) {
      if (val && !isEmptyObject(val)) {
        val.type === 'sub' ? this.handleChangeSubTableStatus(this.$route.name) : this.handleChangeTableStatus(this.$route.name)
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
    getPegination (total) {
      this.total = total
    },
    customRowFu (choseTr, index) {
      this.chooseIndex = index
      this.figureList.forEach(item => {
        item.active = false
      })
      this.figureList[index].active = true
      this.$forceUpdate()
      this.choseTr = choseTr
    },
    customOver (choseTr, index) {
      this.figureList.forEach(item => {
        item.mask = false
        item.active = false
      })
      this.figureList[index].mask = true
      this.figureList[index].active = true
    },
    customOut (choseTr, index) {
      this.figureList[index].mask = false
      this.figureList[index].active = false
    },
    showModal (data) {
      this.modalVisible = true
      this.modalTitle = data
    },
    hideModal () {
      this.modalVisible = false
      this.modalTitle = ''
    },
    handleOk () {

    },
    doSearch () { // 搜索
      this.searchData.startTimeBegin = this.timeValuestartTimeBegin == '' ? '' : getDay(this.timeValuestartTimeBegin)
      this.searchData.startTimeEnd = this.timeValuestartTimeEnd == '' ? '' : getDay(this.timeValuestartTimeEnd)
      this.searchData.stopTimeBegin = this.timeValuestopTimeBegin == '' ? '' : getDay(this.timeValuestopTimeBegin)
      this.searchData.stopTimeEnd = this.timeValuestopTimeEnd == '' ? '' : getDay(this.timeValuestopTimeEnd)
      this.table.custSreach.showDot = true
      this.materSearch = false
      this.searchResf()
    },
    custSreachClick () { // 点击查询
      this.materSearch = true
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
      this.searchData.state = ''
      this.materSearch = false
      this.table.custSreach.showDot = false
      this.searchResf()
    },
    searchResf () {
      this.table.data = { ...this.table.data, ...this.searchData }
      this.getData()
    },
    getOwnerType () { // 归属者类型
      getConst('ownerType').then(res => {
        this.ownerTypeList = res
      })
    },
    getState () { // 投放状态
      getConst('state').then(res => {
        this.stateList = res
      })
    },
    hotelSreachClick () { // 选择酒店
      this.modalData.visible = true
      this.modalData.first = false
    },
    complete (selectCompanyObject, selectHotelObject) {
      this.table.data.companyCode = selectCompanyObject[0].code
      this.table.data.hotelId = selectHotelObject[0].id
      this.getData()
    },
    getData () {
      this.spinning = true
      getData({
        name: this.table.url,
        data: this.table.data
        // type: 'application/json;charset=UTF-8'
      }).then(res => {
        res.data && res.data.length && res.data.forEach((item, i) => {
          item.imgSrc = `${process.env.UPLOAD_ROOT}hotel-panel/hotel/panel/manager/adMaterial/readImage?path=${item.path}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
          item.active = false
          item.mask = false
          if (item.category == 1) {
            item.categoryName = '视频'
          }
          if (item.category == 2) {
            item.categoryName = '图片'
          }
          if (item.ownerType == 1) {
            item.ownerTypeName = '平台'
          }
          if (item.ownerType == 1) {
            item.ownerTypeName = '平台'
          }
          if (item.ownerType == 2) {
            item.ownerTypeName = '集团'
          }
          if (item.ownerType == 3) {
            item.ownerTypeName = '酒店'
          }
          if (item.state == 0) {
            item.stateName = '待投放'
          }
          if (item.state == 1) {
            item.stateName = '已投放'
          }
          if (item.state == 2) {
            item.stateName = '已过期'
          }
        })
        // if (res.data && res.data.length && res.data.length != this.chooseIndex) {
        //   res.data[this.chooseIndex].active = true
        // }
        if (res.data && res.data.length) {
          this.choseTr = res.data[0]
          this.figureList = res.data
        } else {
          this.figureList = []
        }
        this.spinning = false
        this.$nextTick(() => {
          this.figureliHeight = this.$refs.wraps && this.$refs.wraps.length > 0 ? this.$refs.wraps[0].clientWidth * (1080 / 1920) + 'px' : 0
          this.$forceUpdate()
        })
      })
    },
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
      'handleModalData',
      'handleChoseTr',
      'handleChoseHotel',
      'handleChangeHotelTableStatus',
      'handleChangeExtraTableStatus',
      'handleSubChoseTr'
    ])
  },
  created () {
    this.table.data.companyCode = JSON.parse(getCompany()).companyCode
    this.table.data.hotelId = JSON.parse(getCompany()).hotelid
    this.getOwnerType()
    this.getState()
    this.getData()
  }
}
</script>
<style lang="less">
@import "../../assets/css/modal/modal";
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
.singleTableSelf {
  position: relative;
  overflow: hidden;
  .table {
    height: calc(100% - 80px);
  }
  .paginationSelf {
    position: absolute;
    bottom: 0;
    text-align: left;
  }
}
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
.figureOut{
  height: 100%;
  overflow: auto;
  padding-bottom: 100px;
  background-color: #F2F4F8
}
.active{border:1px solid #0084c9 !important}
.figureli{
    width: calc(20% - 8px);
    float: left;
    margin: 0px 10px 10px 0;
    background-color:#fff;
    border:1px solid transparent;
    cursor: pointer;
    .figureli-top{
      width: 100%;
      background-color:#ccc;
      position: relative;
      img{width:100%;height:100%}
      .figureli-top-mask{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #dadada;
        top: 0;
        opacity: 0.67;
        z-index:100;
        transition:opacity 0.5s;
      }
    }
    .figureli-title{
      border:1px solid #f5f5f5;
      font-family:PingFangSC-Medium;
      font-size:14px;
      color:#333333;
      height:30px;
      line-height: 30px;
      padding-left:10px;
      text-align: left;
    }
    .figureli-con{
      overflow: hidden;
      padding:10px 0;
    }
    .figureli-item{
      font-family:PingFangSC-Regular;
      font-size:12px;
      color:#333333;
      float: left;
      text-align: left;
      padding-left:10px;
      width: 60%;
      font-weight: normal;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      height:20px;
      line-height: 20px;
    }
    .figureli-item-right{
      width:40%
    }
    .figureli-oneline{
      width: 100%
    }
}
.figureli:nth-child(5n+5){
  margin-right:0
}
.modalSelfPure .ant-modal-body{
  padding:0
}
</style>
