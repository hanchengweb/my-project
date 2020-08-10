<template>
  <div>
    <dbTable :dbTable="dbTable"
             style="height: 99%;"></dbTable>
    <a-modal title="酒店标签"
             v-model="visible"
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
      <div class="hotelSigns">
        <span>标签名称:</span>
        <a-input type="text" :class="signErr?'signErrs hotelSigns-input':'hotelSigns-input'" v-model="hotelLimitTag"/>
        <button class="ant-btn ant-btn-primary" @click="updateSign">修改</button>
      </div>
      <searchSelf :search="modal.searchTable1.search"></searchSelf>
      <tabsTable class="bottomTable"
                 :tabsTableJson="modal.searchTable1"
                 :style="`height:300px`"></tabsTable>
      <div class="hotelButtons">
        <button class="ant-btn ant-btn-primary" @click="addOne">选中下移</button>
        <button class="ant-btn ant-btn-primary" @click="addAll">全部下移</button>
        <button class="ant-btn ant-btn-primary" @click="delOne">选中上移</button>
        <button class="ant-btn ant-btn-primary" @click="delAll">全部上移</button>
      </div>
      <searchSelf :search="modal.searchTable2.search"></searchSelf>
      <tabsTable class="bottomTable"
                 :tabsTableJson="modal.searchTable2"
                 :style="`height:300px`"></tabsTable>
    </a-modal>
  </div>
</template>
<script>

import dbTable from '@/view/components/dbTable/dbTable'
import { getFlag } from '@/api/const'
import { getConst, getUserTypeWx, getCompanys, getConstGoods } from '../../api/hotelConst'
import { getUrlData, getData } from '../../api/common'
import { isArray, isJson, isEmptyObject } from '../../libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl } from '@/libs/util'
import { fullScreen } from '../../assets/mixins/fullScreen'
import tabsTable from '@/components/tabsTable/tabsTable'
import searchSelf from '@/components/search/search'
import { getDate } from '../../libs/date'
import moment from 'moment'
export default {
  components: {
    dbTable,
    tabsTable,
    searchSelf
  },
  mixins: [fullScreen],
  data () {
    return {
      dbTable: {
        searchTable: {
          table: {
            type: 'main',
            // banDblClick: true, // 双击编辑禁止
            useUrlStatus: true, // 是否使用本页面url
            url: 'u_consumerCouponTemplate_page_get',
            nameLog: 'consumerCouponTemplate',
            data: {
              flag: '',
              companyCode: 'S00001',
              page: '0',
              size: '10',
              couponType: 10
            },
            sortReturnData: this.sortReturnData,
            deleteColumnsIndex: 1,
            urls: {},
            buttons: {
            },
            modal: {
              data: {
              },
              companyCode: 'S00001'
            }
          },
          search: {
            nameArray: [
              // {name: '券类型', type: 'select', data: [], span: '4', dataIndex: 'couponType'},
              // {name: '劵隶属类型', type: 'select', data: [], span: '4', dataIndex: 'couponOwnerType'},
              {name: '商品类别', type: 'select', data: [], span: '4', dataIndex: 'goodsCategory'},
              {name: '券状态', type: 'select', data: [], span: '4', dataIndex: 'flag'}
            ]
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '酒店标签', key: 'groupHotelSign' }
            ]
          },
          search: {},
          table: {
            name: 'groupHotelSign',
            title: 'groupHotelSign',
            useUrlStatus: true, // 是否使用本页面url
            url: 'u_couponTempHotelRelation_page_get',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            banDblClick: true,
            data: {
              page: '0',
              size: '10',
              // tpmNum: '1',
              companyCode: 'S00001'
            },
            sortReturnData: this.sortReturnDataCredit,
            tabData: {},
            urls: {},
            buttons: {
              hideFlag: true,
              hideAdd: true,
              hideDel: true,
              actions: [{
                name: '修改',
                type: 'add',
                icon: 'edit',
                btnClick: this.btnClicke
              }]
            },
            modal: {
              sortReturnModalData: this.sortReturnModalData,
              data: {
                companyCode: 'S00001'
              },
              baseData: {
                add: {
                  userNum: '',
                  hotelId: '',
                  companyName: ''
                }
              }
            }
          }
        }
      },
      modal: {
        modalWidth: '1200px',
        searchTable1: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '待选酒店', key: 'availableHotel' }
            ]
          },
          search: {
            type: 'extra',
            isShowHigh: false,
            sortReturnSearchData: this.sortReturnSearchData,
            sortReturnSearchResetData: this.sortReturnSearchData,
            defaultVals: {},
            nameArray: [
              {name: '品牌', type: 'select', data: [], span: '6', dataIndex: 'brandCode', width: '200'},
              {name: '酒店', type: 'input', span: '3', dataIndex: 'hotelName', width: '200'}
            ]
          },
          table: {
            name: 'availableHotel',
            title: 'availableHotel',
            // useUrlStatus: true, // 是否使用本页面url
            // url: 'u_couponTempHotelRelation_availableHotel_get',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            banDblClick: true,
            deleteColumnsIndex: 3,
            rowSelection: {
              type: 'checkbox',
              selectedRowKeys: [],
              onChange: this.onRowChange1
            },
            pagination: {
              namePagin: 'availableHotel'
            },
            hidePegination: true,
            hideButtonSearch: true,
            sortReturnData: this.sortReturnData1,
            data: {
              page: '0',
              size: '10',
              flag: '',
              companyCode: 'S00001'
            },

            beforeBanClickTr: this.beforeBanClickTr,
            tabData: {},
            urls: {},
            buttons: {
              hideFlag: true,
              hideAdd: true,
              hideDel: true
            }
          }
        },
        searchTable2: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '选中酒店', key: 'selectedHotel' }
            ]
          },
          search: {
            type: 'extra',
            isShowHigh: false,
            sortReturnSearchData: this.sortReturnSearchData2,
            sortReturnSearchResetData: this.sortReturnSearchData2,
            defaultVals: {},
            nameArray: [
              {name: '品牌', type: 'select', data: [], span: '6', dataIndex: 'brandCode', width: '200'},
              {name: '酒店', type: 'input', span: '3', dataIndex: 'hotelName', width: '200'}
            ]
          },
          table: {
            name: 'selectedHotel',
            title: 'selectedHotel',
            // useUrlStatus: true, // 是否使用本页面url
            // url: 'u_couponTempHotelRelation_selectedHotel_get',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            banDblClick: true,
            deleteColumnsIndex: 3,
            rowSelection: {
              type: 'checkbox',
              selectedRowKeys: [],
              onChange: this.onRowChange2
            },
            pagination: {
              namePagin: 'selectedHotel'
            },
            hideButtonSearch: true,
            sortReturnData: this.sortReturnData2,
            data: {
              page: '0',
              size: '10',
              flag: '',
              companyCode: 'S00001'
            },

            beforeBanClickTr: this.beforeBanClickTr,
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
      visible: false,
      choseTreeData: {},
      file: {
        fileName: ''
      },
      userTypeWx: {},
      companyCodeWx: {},
      selectedRows1: [],
      selectedRows2: [],
      hotelLimitTag: '',
      couponType: 10,
      signErr: false
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
      'handleChangeExtraTableStatus',
      'handleChangeProgramCredit',
      'handleTabs'
    ]),
    disabledDate (current) {
      console.log(current)
      return current && current && current > moment().endOf('day') || current < moment().subtract(6, 'months')
    },
    btnClicke (item) {
      this.visible = true
      this.modal.searchTable1.table.data.tpmNum = this.dbTable.tabsTable.table.data.tpmNum
      this.modal.searchTable2.table.data.tpmNum = this.dbTable.tabsTable.table.data.tpmNum
      this.modal.searchTable1.table.data.brandCode = ''
      this.modal.searchTable1.table.data.hotelName = ''
      this.modal.searchTable2.table.data.brandCode = ''
      this.modal.searchTable2.table.data.hotelName = ''
    },
    handleOk () {

    },
    sortReturnModalData (data) {
      data.companyName = this.companyCodeWx[data.companyCode]
      return data
    },
    sortReturnSearchData (data) {
      this.modal.searchTable1.table.data = { ...this.modal.searchTable1.table.data, ...data }
      // this.handleChangeExtraTableStatus(Math.random())
      this.changeStatus()
      return data
    },
    sortReturnSearchData2 (data) {
      this.modal.searchTable2.table.data = { ...this.modal.searchTable2.table.data, ...data }
      this.changeStatus()
      // this.handleChangeExtraTableStatus(Math.random())
      return data
    },
    choseTree (data) {
      this.choseTreeData = data
      this.modal.searchTable.table.data.companyCode = data.code
      this.handleChangeExtraTableStatus(Math.random())
    },
    sortReturnData (data) {
      data && data.length && data.forEach((item, i) => {
        let provinceName = item.provinceName ? item.provinceName : ''
        let cityName = item.cityName ? item.cityName : ''
        let countyName = item.countyName ? item.countyName : ''
        data[i].cityss = provinceName + '-' + cityName + '-' + countyName
      })
      return data
    },
    sortReturnData1 (data) {
      return data
    },
    sortReturnData2 (data) {
      return data
    },
    sortReturnDataCredit (data) {
      return data
    },
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    },
    getCouponType () { // 劵类型
      // getConst('couponType').then(res => {
      //   this.dbTable.searchTable.search.nameArray[0].data = res
      //   this.dbTable.searchTable.table.modal.data.couponType = res
      // })
    },
    getCouponOwnerType () { // 劵隶属类型
      // getConst('couponOwnerType').then(res => {
      //   this.dbTable.searchTable.search.nameArray[1].data = res
      //   this.dbTable.searchTable.table.modal.data.couponOwnerType = res
      // })
    },
    getGiveChannel () { // 投放渠道
      getConst('giveChannel').then(res => {
        this.dbTable.searchTable.table.modal.data.giveChannel = res
      })
    },
    getGeneralizeModel () { // 推广方式
      getConst('generalizeModel').then(res => {
        this.dbTable.searchTable.table.modal.data.generalizeModel = res
      })
    },
    getEqualModel () { // 等价类别
      getConst('equalModel').then(res => {
        this.dbTable.searchTable.table.modal.data.equalModel = res
      })
    },
    getConstGoods () { // 商品品类
      getConstGoods(this.dbTable.searchTable.table.data.companyCode).then(res => {
        res.forEach(item => {
          item.value = item.code
        })
        this.dbTable.searchTable.search.nameArray[0].data = res
        this.dbTable.searchTable.table.modal.data.goodsCategory = res
      })
    },
    getFlag () {
      getConst('flag').then(res => {
        this.dbTable.searchTable.search.nameArray[1].data = res
      })
    },
    getActiveModel () {
      this.dbTable.searchTable.table.modal.data.activeModel = [
        {code: '1', name: '指定日期区间', key: '1', id: 1, value: '1', title: '指定日期区间'},
        {code: '2', name: '领取后X天有效', key: '2', id: 2, value: '2', title: '领取后X天有效'}
      ]
    },
    onRowChange1 (selectedRowKeys, selectedRows) {
      this.selectedRows1 = selectedRows
      this.modal.searchTable1.table.rowSelection.selectedRowKeys = selectedRowKeys
    },
    onRowChange2 (selectedRowKeys, selectedRows) {
      this.selectedRows2 = selectedRows
      this.modal.searchTable2.table.rowSelection.selectedRowKeys = selectedRowKeys
    },
    getBrand () { // 获取品牌
      getData({
        name: 'h_brand__get',
        data: {companyCode: this.dbTable.searchTable.table.data.companyCode},
        type: ''
      }).then(res => {
        res.data.forEach(item => {
          item.value = item.code
          item.title = item.name
        })
        this.modal.searchTable1.search.nameArray[0].data = res.data
        this.modal.searchTable2.search.nameArray[0].data = res.data
      })
    },
    addOne () { // 选中下移
      if (this.selectedRows1.length == 0) {
        this.$message.info('请选择酒店')
      } else {
        let hotelids = ''
        this.selectedRows1.forEach(item => {
          hotelids += item.id + ','
        })
        hotelids = hotelids.substring(0, hotelids.lastIndexOf(','))
        getData({
          name: 'u_couponTempHotelRelation__POST',
          data: {
            couponType: this.couponType,
            tpmNum: this.modal.searchTable1.table.data.tpmNum,
            companyCode: this.dbTable.searchTable.table.data.companyCode,
            hotelids: hotelids
          },
          type: ''
        }).then(res => {
          this.modal.searchTable1.table.rowSelection.selectedRowKeys = []
          this.modal.searchTable2.table.rowSelection.selectedRowKeys = []
          this.selectedRows1 = []
          this.changeStatus()
        })
      }
    },
    addAll () { // 全部下移
      getData({
        name: 'u_couponTempHotelRelation_addAll_POST',
        data: {
          couponType: this.couponType,
          tpmNum: this.modal.searchTable1.table.data.tpmNum,
          companyCode: this.dbTable.searchTable.table.data.companyCode
        },
        type: ''
      }).then(res => {
        this.changeStatus()
      })
    },
    delOne () { // 选中上移
      if (this.selectedRows2.length == 0) {
        this.$message.info('请选择酒店')
      } else {
        let hotelids = ''
        this.selectedRows2.forEach(item => {
          hotelids += item.id + ','
        })
        hotelids = hotelids.substring(0, hotelids.lastIndexOf(','))
        getData({
          name: 'u_couponTempHotelRelation_deleteByHotel_delete',
          data: {
            couponType: this.couponType,
            tpmNum: this.modal.searchTable1.table.data.tpmNum,
            companyCode: this.dbTable.searchTable.table.data.companyCode,
            hotelids: hotelids
          },
          type: ''
        }).then(res => {
          this.selectedRows2 = []
          this.modal.searchTable1.table.rowSelection.selectedRowKeys = []
          this.modal.searchTable2.table.rowSelection.selectedRowKeys = []
          this.changeStatus()
        })
      }
    },
    delAll () { // 全部上移
      getData({
        name: 'u_couponTempHotelRelation_deleteAll_delete',
        data: {
          couponType: this.couponType,
          tpmNum: this.modal.searchTable1.table.data.tpmNum,
          companyCode: this.dbTable.searchTable.table.data.companyCode
        },
        type: ''
      }).then(res => {
        this.changeStatus()
      })
    },
    updateSign () { // 修改便签
      if (this.hotelLimitTag.trim().length > 0) {
        this.signErr = false
        getData({
          name: 'u_consumerCouponTemplate_updateHotelLimitTag_put',
          data: {
            tpmNum: this.modal.searchTable1.table.data.tpmNum,
            tag: this.hotelLimitTag
          },
          type: ''
        }).then(res => {
          // this.changeStatus()
          this.$message.info('标签修改成功')
        })
      } else {
        this.signErr = true
      }
    },
    beforeBanClickTr (data, target) {
      const tagName = target.tagName,
        tr = tagName === 'TD' ? target.parentNode : target.tagName === 'SPAN' ? target.parentNode.parentNode : target
      tr && tr.getElementsByTagName('label') && tr.getElementsByTagName('label').length && tr.getElementsByTagName('label')[0] && tr.getElementsByTagName('label')[0].click && tr.getElementsByTagName('label')[0].click()
    }
  },
  created () {
    getData({
      name: 'm_getCouponLoginInfo__get',
      data: {},
      type: ''
    }).then(res => {
      this.dbTable.searchTable.table.data.companyCode = res.data.companyCode || ''
      this.dbTable.searchTable.table.modal.companyCode = res.data.companyCode || ''
      this.dbTable.tabsTable.table.data.companyCode = res.data.companyCode || ''
      this.dbTable.tabsTable.table.modal.data.companyCode = res.data.companyCode || ''

      this.modal.searchTable1.table.data.companyCode = res.data.companyCode || ''
      this.modal.searchTable2.table.data.companyCode = res.data.companyCode || ''
      this.getConstGoods()
      this.getBrand()
      this.handleChangeTableStatus(Math.random())
    })
    this.getCouponType()
    this.getCouponOwnerType()
    this.getGiveChannel()
    this.getGeneralizeModel()
    this.getEqualModel()
    this.getActiveModel()
    this.getFlag()
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

    visible (val) {
      val && this.$nextTick(() => {
        // this.handleChangeProgramCredit(Math.random())// 初始化，提交更新
      })
      if (!val) {
        this.choseTreeData = {}
        // this.handleChangeSubTableStatus(Math.random())
        this.handleChangeTableStatus(Math.random())
        this.handleTabs('groupHotelSign')
        // this.handleTabs('groupCoupTempghg')
      } else {
        this.handleTabs('selectedHotel')
      }
    },
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.signErr = false
        this.hotelLimitTag = val.hotelLimitTag ? val.hotelLimitTag : ''
        this.couponType = val.couponType
        this.dbTable.tabsTable.table.data.tpmNum = val.tpmNum
        this.dbTable.tabsTable.table.modal.baseData.add.tpmNum = val.tpmNum

        let json = {}
        if (this.$store.state.data.tabs == 'wxUserhotel') {
          if (val.utype == '99') {
            json = { hideDel: true, actions: [], hideAdd: true }
          } else if (val.utype == '1') {
            json = {
              hideAdd: true,
              hideDel: false,
              actions: [{
                name: '新增',
                type: 'add',
                icon: 'plus',
                btnClick: this.btnClicke
              }]
            }
          } else if (val.utype == '5') {
            json = {
              hideDel: false,
              hideAdd: false,
              actions: []
            }
          }
          this.dbTable.tabsTable.table.buttons = { ...this.dbTable.tabsTable.table.buttons, ...json }
        }
        this.changeStatus('sub')
      }
    },
    getPegination (val) {
      if (val.namePagin) {
        if (val.namePagin == 'selectedHotel') {
          this.modal.searchTable2.table.data = {...this.modal.searchTable2.table.data, ...val}
        } else if (val.namePagin == 'availableHotel') {
          this.modal.searchTable1.table.data = {...this.modal.searchTable1.table.data, ...val}
        }
      } else {
        this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      }
      if (!val.reset) this.changeStatus()
    },
    getSearch (val) {
      if (val.namePagin) {
        if (val.namePagin == 'selectedHotel') {
          this.modal.searchTable2.table.data = {...this.modal.searchTable2.table.data, ...val}
        } else if (val.namePagin == 'availableHotel') {
          this.modal.searchTable1.table.data = {...this.modal.searchTable1.table.data, ...val}
        }
      } else {
        this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      }
      if (!val.reset) this.changeStatus()
    },
    getSubPegination (val) {
      if (val.namePagin) {
        if (val.namePagin == 'selectedHotel') {
          this.modal.searchTable2.table.data = {...this.modal.searchTable2.table.data, ...val}
        } else if (val.namePagin == 'availableHotel') {
          this.modal.searchTable1.table.data = {...this.modal.searchTable1.table.data, ...val}
        }
      } else {
        this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      }
      if (!val.reset) this.changeStatus('sub')
    },
    getSubSearch (val) {
      if (val.namePagin) {
        if (val.namePagin == 'selectedHotel') {
          this.modal.searchTable2.table.data = {...this.modal.searchTable2.table.data, ...val}
        } else if (val.namePagin == 'availableHotel') {
          this.modal.searchTable1.table.data = {...this.modal.searchTable1.table.data, ...val}
        }
      } else {
        this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      }
      if (!val.reset) this.changeStatus('sub')
    }
  },
  mounted () {
    // this.handleChangeTableStatus(Math.random())
  }
}
</script>
<style lang="less">
@import "../../assets/css/modal/modal";

.readTerminalHis {
  //top:50px;
  .ant-modal-body {
    padding: 0;
  }
}
.hotelSigns{
  padding:20px;
  overflow: hidden;
  border-bottom:1px solid #0ACAC7;
  span{float: left;padding-top:6px;}
  .hotelSigns-input{width:200px;float: left;margin-left:10px;width:87%;margin-right:10px;}
}
.hotelButtons{
  padding: 18px;
    border-top: 4px solid #0ACAC7;
    border-bottom: 1px solid #0ACAC7;
  button{

  }
}
.signErrs{
  border:1px solid red !important
}
// .modalSelfPure .fullScreenIcon{
//     top:-47px !important
// }
</style>
