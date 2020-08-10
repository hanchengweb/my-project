<template>
<div>
    <a-modal :title="modalData.title"
             v-model="modalData.visible"
             :width="modalWidthMater"
             ref="readTerminalHis"
             :maskClosable="false"
             :destroyOnClose="true"
             :style="modalStyleMater"
             @ok="handleOk"
             class="selfModal modalSelfPure readTerminalHis modalSelfPureupdate"
             :footer="null">
      <!-- <a-icon :type="!isFullScreenMater?'fullscreen':'fullscreen-exit'"
              class="fullScreenIcon"
              @click="toFullScreenMater" /> -->
      <div class="fullScreenIcon fullScreenIconNew" @click="toFullScreenMater">
        <img src="/static/img/analysis/menu/maximize.png" v-if="!isFullScreenMater" alt="">
        <img src="/static/img/analysis/menu/minimize.png" v-else alt="">
      </div>
        <searchSelf :search="modal.searchTable1.search" v-show="companyShow"></searchSelf>
        <tabsTable2 class="bottomTable"
                  :tabsTableJson="modal.searchTable1"
                  :style="'height:'+companyShowWidth" v-show="companyShow"></tabsTable2>
        <searchSelf :search="modal.searchTable2.search" v-show="hotelShow"></searchSelf>
        <tabsTable class="bottomTable"
                  :tabsTableJson="modal.searchTable2"
                  :style="'height:'+hotelShowWidth" v-show="hotelShow"></tabsTable>
    </a-modal>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { fullScreen } from '../../../assets/mixins/fullScreen'
import tabsTable from '@/components/tabsTable/tabsTable'
import tabsTable2 from '@/components/tabsTable/tabsTable2'
import searchSelf from '@/components/search/search'
import { getData } from '@/api/common'
import { isEmptyObject, isArray, isJson } from '@/libs/tool'
import { setCompanyCode, getCompany } from '@/libs/util'
export default {
  data () {
    return {
      modal: {
        modalWidth: '1200px',
        searchTable1: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '集团', key: 'companylist' }
            ]
          },
          search: {
            type: 'extra',
            namePagin: 'companylist',
            isShowHigh: false,
            sortReturnSearchData: this.sortReturnSearchData,
            sortReturnSearchResetData: this.sortReturnSearchData,
            defaultVals: {},
            nameArray: [
              {name: '集团编码', type: 'input', span: '4', dataIndex: 'code'},
              {name: '集团名称', type: 'input', span: '4', dataIndex: 'name'}
            ]
          },
          table: {
            name: 'companylist',
            title: 'companylist',
            // useUrlStatus: true, // 是否使用本页面url
            // url: 'h_company__get',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            banDblClick: true,
            // deleteColumnsIndex: 1,
            rowSelection: {
              type: 'radio',
              // selectedRowKeys: [],
              onChange: this.onRowChangeradio
            },
            pagination: {
              namePagin: 'companylist'
            },
            hideButtonSearch: true,
            sortReturnData: this.sortReturnData1,
            data: {
              page: '0',
              size: '10',
              flag: ''
            },
            beforeBanClickTr: this.beforeBanClickTr,
            useColumnsStatus: true,
            columns: [
              {
                title: '集团编码',
                dataIndex: 'code',
                width: 300,
                align: 'center',
                isNeed: true,
                modalHidden: true
              }, {
                title: '集团名称',
                dataIndex: 'name',
                width: 400,
                align: 'center',
                modalHidden: true
              }
            ],

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
              { name: '酒店', key: 'hotelslist' }
            ]
          },
          search: {
            type: 'extra',
            namePagin: 'hotelslist',
            isShowHigh: false,
            sortReturnSearchData: this.sortReturnSearchData2,
            sortReturnSearchResetData: this.sortReturnSearchData2,
            defaultVals: {},
            changeStatus: true, // 开启选择省份时更新市区选择框
            nameArray: [
              {name: '省份', type: 'select', data: [], span: '4', dataIndex: 'proviceCode', width: '100'},
              {name: '市区', type: 'select', data: [], span: '4', dataIndex: 'cityCode', width: '100'},
              {name: '品牌', type: 'select', data: [], span: '4', dataIndex: 'brandCode', width: '200'},
              {name: '酒店', type: 'input', span: '4', dataIndex: 'name', width: '200'}
            ]
          },
          table: {
            name: 'hotelslist',
            title: 'hotelslist',
            // useUrlStatus: true, // 是否使用本页面url
            // url: 'h_hotel_page_get',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            banDblClick: true,
            // deleteColumnsIndex: 3,
            rowSelection: {
              type: 'checkbox',
              // selectedRowKeys: [],
              onChange: this.onRowChangecheckbox
            },

            pagination: {
              // type: 'extra',
              namePagin: 'hotelslist',
              sortReturnPagination: this.sortReturnPagination,
              buttons: [{
                name: '确定',
                onClick: this.sure,
                type: 'primary',
                style: 'height:28px;font-size:12px;line-height:28px;border-radius:28px;margin-top:-3px;margin-left:-45px;width:90px;text-align:center;margin-right:10px'
              }, {
                name: '取消',
                onClick: this.cancel,
                type: 'default',
                style: 'height:28px;font-size:12px;border-radius:28px;line-height:28px;margin-top:-3px;width:90px;text-align:center;'
              }]
            },
            beforeBanClickTr: this.beforeBanClickTr,
            useColumnsStatus: true,
            columns: [
              {
                title: '集团名称',
                dataIndex: 'companyName',
                width: 300,
                align: 'center',
                isNeed: true,
                modalHidden: true
              }, {
                title: '酒店名称',
                dataIndex: 'name',
                width: 400,
                align: 'center',
                modalHidden: true
              }
            ],
            hideButtonSearch: true,
            sortReturnData: this.sortReturnData2,
            data: {
              page: '0',
              size: '10',
              flag: ''
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
      selectCompany: '',
      selectCompanyObject: '',
      selectHotel: '',
      selectHotelObject: '',
      companyCode: '',
      hotelShow: true,
      companyShow: true,
      chooseTab: '',
      companyShowWidth: '300px',
      hotelShowWidth: '300px'
    }
  },

  mixins: [fullScreen],
  props: {
    modalData: {}
  },
  components: {
    tabsTable,
    tabsTable2,
    searchSelf
  },
  computed: {
    ...mapState({
      getChoseTr: state => state.data.choseTr,
      getSubChoseTr: state => state.data.subChoseTr,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getSubSearch: state => state.data.subSearch,
      getSubPegination: state => state.data.subPegination
    })
  },
  watch: {
    modalData: {
      deep: true,
      handler: function (newV, oldV) {
        newV.visible && this.$nextTick(() => {
          this.modal.searchTable1.table.data = {page: '0', size: '10'}
          this.modal.searchTable2.table.data = {page: '0', size: '10'}
          this.modal.searchTable2.table.data.companyCode = '123'
          setCompanyCode('123')
          if (this.$route.name == 'platformSearch') {
            this.handleChangeRouterName('companylist' + Math.random())
          }
          // this.handleChangeProgramCredit(Math.random())
          if (this.modalData.selectValue && this.modalData.selectValue == 2) {
            this.hotelShow = false
            this.companyShowWidth = 'calc(100% - 53px)'
            this.modal.searchTable1.table.pagination.buttons = [{
              name: '确定',
              onClick: this.sure,
              type: 'primary',
              style: 'height:28px;font-size:12px;line-height:28px;border-radius:28px;margin-top:-3px;margin-left:-45px;width:90px;text-align:center;margin-right:10px'
            }, {
              name: '取消',
              onClick: this.cancel,
              type: 'default',
              style: 'height:28px;font-size:12px;border-radius:28px;line-height:28px;margin-top:-3px;width:90px;text-align:center;'
            }]
          } else {
            // this.companyShowWidth = '300px'
            this.companyShowWidth = !this.isFullScreenMater ? '300px' : 'calc(50% - 52px)'
            this.hotelShow = true
            this.modal.searchTable1.table.pagination.buttons = []
          }
          this.selectCompany = ''
          this.selectCompanyObject = ''
          this.selectHotel = ''
          this.selectHotelObject = ''

          if (this.$route.name == 'groupSearch') {
            let selectedRows = [{
              code: JSON.parse(getCompany()).companyCode,
              name: JSON.parse(getCompany()).companyName
            }]
            this.companyShow = false
            this.hotelShowWidth = 'calc(100% - 80px)'
            this.selectCompany = JSON.parse(getCompany()).companyCode
            this.selectCompanyObject = selectedRows
            this.modal.searchTable2.table.data.companyCode = selectedRows[0].code
            this.companyCode = selectedRows[0].code
            setCompanyCode(selectedRows[0].code)
            let _this = this
            setTimeout(function () {
              _this.handleChangeRouterName(Math.random() + 'hotelslist')
            }, 100)
            // this.changeStatus('sub')
            // this.handleChangeProgramCredit(Math.random())
            this.getBrand()
          } else {
            // this.hotelShowWidth = '300px'
            this.hotelShowWidth = !this.isFullScreenMater ? '300px' : 'calc(50% - 52px)'
          }
        })
        if (!this.modalData.first && !newV.visible) {
          this.$nextTick(() => {
            if (this.$route.name == 'platformPlan' || this.$route.name == 'groupPlan' ||
            this.$route.name == 'hotelPlan') {
              this.handleTabs('adPlanChannel')
            }
            if (this.$route.name == 'managerPlan') {
              if (this.modalData.getTabName == '') {
                this.handleTabs('adMaterial')
              } else {
                this.handleTabs(this.modalData.getTabName)
              }
            }
          })
        }
      }
    },
    getPegination (val) {
      if (this.modalData.visible) {
        if (val.namePagin == 'companylist') {
          this.modal.searchTable1.table.data = { ...this.modal.searchTable1.table.data, ...val }
          this.handleChangeRouterName('companylist2' + Math.random())
        }
        if (val.namePagin == 'hotelslist') {
          this.modal.searchTable2.table.data = { ...this.modal.searchTable2.table.data, ...val }
          this.handleChangeRouterName('hotelslist' + Math.random())
        }
      }
    },
    getSearch (val) {
      if (this.modalData.visible) {
        if (val.namePagin == 'companylist') {
          this.modal.searchTable1.table.data = { ...this.modal.searchTable1.table.data, ...val }
          this.handleChangeRouterName('companylist2' + Math.random())
        }
        if (val.namePagin == 'hotelslist') {
          this.modal.searchTable2.table.data = { ...this.modal.searchTable2.table.data, ...val }
          this.handleChangeRouterName('hotelslist' + Math.random())
        }
      }
    },
    getSubPegination (val) {
      if (this.modalData.visible) {
        if (val.namePagin == 'companylist') {
          this.modal.searchTable1.table.data = { ...this.modal.searchTable1.table.data, ...val }
          this.handleChangeRouterName('companylist2' + Math.random())
        }
        if (val.namePagin == 'hotelslist') {
          this.modal.searchTable2.table.data = { ...this.modal.searchTable2.table.data, ...val }
          this.handleChangeRouterName('hotelslist' + Math.random())
        }
      }
    },
    getSubSearch (val) {
      if (this.modalData.visible) {
        if (val.namePagin == 'companylist') {
          this.modal.searchTable1.table.data = { ...this.modal.searchTable1.table.data, ...val }
          this.handleChangeRouterName('companylist2' + Math.random())
        }
        if (val.namePagin == 'hotelslist') {
          this.modal.searchTable2.table.data = { ...this.modal.searchTable2.table.data, ...val }
          this.handleChangeRouterName('hotelslist' + Math.random())
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
      // 'handleChangeTreeStatus',
      'handleChangeExtraTableStatus',
      'handleChangeProgramCredit',
      'handleTabs',
      'handleChangeRouterName'
    ]),
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    },
    handleOk () {

    },
    onRowChangeradio (selectedRowKeys, selectedRows) { // 选择集团
      this.selectCompany = selectedRows[0].code
      this.selectCompanyObject = selectedRows
      this.modal.searchTable2.table.data.companyCode = selectedRows[0].code
      this.companyCode = selectedRows[0].code
      // this.modal.searchTable1.table.rowSelection.selectedRowKeys = selectedRowKeys
      // this.changeStatus('sub')
      let _this = this

      setCompanyCode(selectedRows[0].code)
      setTimeout(function () {
        _this.handleChangeRouterName(Math.random() + 'hotelslist')
      }, 100)
      // this.handleChangeProgramCredit(Math.random())
      this.getBrand()
    },
    onRowChangecheckbox (selectedRowKeys, selectedRows) { // 选择酒店
      // this.modal.searchTable2.table.rowSelection.selectedRowKeys = selectedRowKeys
      this.selectHotel = selectedRows
      this.selectHotelObject = selectedRows
    },
    // 确定选择
    sure () {
      if (this.$route.name == 'platformSearch' || this.$route.name == 'groupSearch') {
        if (this.selectHotel.length <= 0) {
          this.$message.info('请选择酒店!')
          return false
        }
      } else if (this.$route.name == 'managerPlan' || this.$route.name == 'managerAdMaterial') {
        if (this.hotelShow && this.companyShow) {
          if (this.selectHotel.length <= 0) {
            this.$message.info('请选择酒店!')
            return false
          }
        }
        if (!this.hotelShow && this.companyShow) {
          this.selectHotelObject = ''
        }
      } else {
        if (this.selectCompany.length <= 0 && this.selectHotel.length <= 0) {
          this.$message.info('请选择集团或酒店!')
          return false
        }
      }
      let hotelIds = '', companyCode = this.selectCompany
      if (this.selectHotel.length > 0) {
        this.selectHotel.forEach(item => {
          hotelIds += item.id + ','
        })
        hotelIds = hotelIds.substring(0, hotelIds.lastIndexOf(','))
      }
      if (this.modalData.complete) {
        this.modalData.complete(this.selectCompanyObject, this.selectHotelObject)
        this.modalData.visible = false
        return false
      }
      getData({
        name: 'p_manager_adPlanChannel_add_post',
        data: {
          planId: this.modalData.planId,
          companyCode: companyCode,
          hotelIds: hotelIds
        },
        type: ''
      }).then(res => {
        this.modalData.visible = false
      })
    },
    // 取消选择
    cancel () {
      this.modalData.visible = false
    },
    // 获取省份
    getProvince () {
      getData({
        name: 'h_common_proviceCity__get',
        data: {protype: 1, flag: 1, procode: '990001'},
        type: ''
      }).then(res => {
        res.data.forEach(item => {
          item.value = item.code
          item.title = item.name
        })
        this.modal.searchTable2.search.nameArray[0].data = res.data
      })
    },
    getBrand () { // 获取品牌
      getData({
        name: 'h_brand__get',
        data: {companyCode: this.companyCode},
        type: ''
      }).then(res => {
        res.data.forEach(item => {
          item.value = item.code
          item.title = item.name
        })
        this.modal.searchTable2.search.nameArray[2].data = res.data
      })
    },

    beforeBanClickTr (data, target) {
      if (data.companyCode) {
        this.onRowChangecheckbox('', [data])
      } else {
        this.onRowChangeradio('', [data])
        this.handleChangeRouterName(Math.random() + 'npCompanylist')// 点击集团时不更新集团数据
      }
      const tagName = target.tagName,
        tr = tagName === 'TD' ? target.parentNode : target.tagName === 'SPAN' ? target.parentNode.parentNode : target
      tr && tr.getElementsByTagName('label') && tr.getElementsByTagName('label').length && tr.getElementsByTagName('label')[0] && tr.getElementsByTagName('label')[0].click && tr.getElementsByTagName('label')[0].click()
    }
  },
  created () {
    this.getProvince()
    if (this.$route.name == 'platformSearch' || this.$route.name == 'groupSearch' || this.$route.name == 'hotelSearch' || this.$route.name == 'managerPlan' || this.$route.name == 'managerAdMaterial') {
      this.modal.searchTable2.table.rowSelection.type = 'radio'
    }
  }
}
</script>
<style lang="less">
@import "../../../assets/css/modal/modal";
    .readTerminalHis {
        .ant-modal-body {
          padding: 0;
          height: calc(100% - 38px)
        }
      }
      .ant-modal{
        padding-bottom: 0;
      }
    // .modalSelfPureupdate .fullScreenIcon{
    //     top:-37px !important
    // }
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
</style>
