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
    <!-- <tableSelf class="table"
               :table="table"
               @get-pegination="getPegination"
               @get-choseTr="getChoseTr"
               @show-modal="showModal"></tableSelf> -->
    <div class="figureOut clearfix">
        <a-spin :spinning="spinning">
            <div  v-for="(item,index) in figureList" :key="index" :class="item.active?'active figureli':'figureli'"  v-on:dblclick="dbcustomRowFu(item)" @click="customRowFu(item,index)">
              <div class="figureli-top"><img alt="" :src="item.imgSrc"></div>
              <div class="figureli-bottom">
                <div class="figureli-title">{{item.name}}</div>
                <div class="figureli-con">
                  <div class="figureli-item">
                    <span>宽高：</span>
                    <span>{{item.measurement}}</span>
                  </div>
                  <div class="figureli-item figureli-item-right">
                    <span>类别：</span>
                    <span>{{item.categoryName}}</span>
                  </div>
                  <div class="figureli-item">
                    <span>大小：</span>
                    <span>{{item.sizes}}</span>
                  </div>
                  <!-- <div class="figureli-item figureli-item-right">
                    <span>归属：</span>
                    <span>{{item.ownerTypeName}}</span>
                  </div>
                  <div class="figureli-item">
                    <span>审核状态：</span>
                    <span>{{item.auditStatusName}}</span>
                  </div>
                  <div class="figureli-item figureli-item-right">
                    <span>状态：</span>
                    <span>{{item.flagName}}</span>
                  </div> -->
                  <div class="figureli-item figureli-oneline">
                    <span>创建时间：</span>
                    <span>{{item.createTime}}</span>
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
    <!-- 分页 -->
    <pagination class="paginationSelf"
                :data="total"
                :type="table.type"
                v-if="!table.hidePegination"
                :pagination="table.pagination"
                :table="table"></pagination>
    <!-- 弹框 -->
    <modalSelf :modalVisible="modalVisible"
               :urls="table.urls"
               :data="choseTr"
               :type="table.type"
               :modalData="table.modal"
               :title="modalTitle"
               :name="name"
               @hide-modal="hideModal"
               v-if="modalVisible && table.modal"></modalSelf>
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
import { mapState, mapActions } from 'vuex'
import { isEmptyObject, isArray } from '@/libs/tool'
import { resetData, TOKEN_KEY } from '../../../libs/util'
import Cookies from 'js-cookie'
export default {
  props: {
    table: {},
    search: {}
  },
  components: {
    pagination,
    buttonLine,
    tableSelf,
    modalSelf,
    buttonSearch,
    tabsLine
  },
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
    dbcustomRowFu (choseTr) {
      if (!this.table.buttonsOther) {
        this.showModal('update')
      }
    },
    showModal (data) {
      this.modalVisible = true
      this.modalTitle = data
    },
    hideModal () {
      this.modalVisible = false
      this.modalTitle = ''
    },
    getData () {
      this.spinning = true
      let auditStatusList = this.table.modal.data.auditStatus
      let categoryList = this.table.modal.data.category
      getData({
        name: this.table.url,
        data: this.table.data,
        type: ''
      }).then(res => {
        res.data.content && res.data.content.length && res.data.content.forEach((item, i) => {
          item.imgSrc = `${process.env.UPLOAD_ROOT}hotel-panel/hotel/panel/manager/adMaterial/readImage?path=${item.path}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
          item.active = false
          auditStatusList.forEach(itema => {
            if (item.auditStatus == itema.code) {
              res.data.content[i].auditStatusName = itema.name
            }
          })
          categoryList.forEach(itemc => {
            if (item.category == itemc.code) {
              res.data.content[i].categoryName = itemc.name
            }
          })
          if (item.ownerType == 1) {
            item.ownerTypeName = '平台'
          }
          if (item.ownerType == 2) {
            item.ownerTypeName = '集团'
          }
          if (item.ownerType == 3) {
            item.ownerTypeName = '酒店'
          }
          if (item.flag == 0) {
            item.flagName = '新增'
          }
          if (item.flag == 1) {
            item.flagName = '启用'
          }
          if (item.flag == 2) {
            item.flagName = '作废'
          }
        })
        if (res.data.content.length > 0 && res.data.content.length != this.chooseIndex) {
          res.data.content[this.chooseIndex].active = true
        }
        this.figureList = res.data.content
        this.total = { total: res.data.totalElements, pages: res.data.totalPages }
        this.choseTr = res.data.content[0]
        this.spinning = false
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
  data () {
    return {
      total: {},
      choseTr: {},
      modalVisible: false,
      modalTitle: '',
      name: '',
      figureList: [],
      spinning: true,
      chooseIndex: 0
    }
  },
  created () {
    this.getData()
    // if (this.table.buttonsOther) {
    //   this.table.hideButtonSearch = true
    // }
  }
}
</script>
<style lang="less" scoped>
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
  padding:20px;
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
      height: 140.6px;
      background-color:#ccc;
      img{width:100%;height:100%}
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
</style>
