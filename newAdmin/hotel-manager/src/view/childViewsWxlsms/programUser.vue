<template>
  <div>
    <dbTable :dbTable="dbTable"
             style="height: 100%;"></dbTable>
    <a-modal title="积分明细"
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
      <searchSelf :search="modal.searchTable.search"></searchSelf>
      <tabsTable class="bottomTable"
                 :tabsTableJson="modal.searchTable"
                 :style="`height:${modalHeight}px`"></tabsTable>
    </a-modal>
  </div>
</template>
<script>

import dbTable from '@/view/components/dbTable/dbTable'
import { getFlag } from '@/api/const'
import { getConst, getUserTypeWx, getCompanys } from '../../api/hotelConst'
import { getUrlData, getData } from '../../api/common'
import { isEmptyObject } from '@/libs/tool'
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
            banDblClick: true, // 双击编辑禁止
            data: {
              flag: '',
              page: '0',
              size: '10'
            },
            sortReturnData: this.sortReturnData,

            deleteColumnsIndex: 1,
            urls: {},
            buttons: {
              hideAdd: true,
              // hideFlag: true,
              hideDel: true
            },
            modal: {
              urls: {},
              baseData: {

              },
              data: {}
            }

          },
          search: {
            nameArray: [{
              name: '用户编号', type: 'input', span: '4', dataIndex: 'userNum'
            }, {
              name: '手机号后四位', type: 'input', data: [], span: '6', dataIndex: 'telphone'
            }]
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '微信用户', key: 'memberWechat' },
              { name: '总积分查询', key: 'memberCredit' }
            ]
          },
          search: {},
          table: {
            name: 'memberWechat',
            title: 'memberWechat',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            // beforeBanDblClickTr: this.beforeBanDblClickTr,
            banDblClick: true,
            deleteColumnsIndex: {
              memberWechat: 2,
              memberCredit: 3
            },
            data: {
              page: '0',
              size: '10'
            },
            sortReturnData: this.sortReturnDataCredit,
            tabData: {},
            urls: {},
            buttons: {
              hideFlag: true,
              hideAdd: true,
              hideDel: true,
              subData: {
                memberCredit: {
                  actions: [{
                    name: '积分明细',
                    type: 'add',
                    // icon: 'plus',
                    btnClick: this.btnClick
                  }]
                },
                memberWechat: {
                  actions: []
                }

              }
            },
            modal: {
              // name: 'dictionaryDetail',
              // title: 'dictionaryDetail',
              sortReturnModalData: this.sortReturnModalData,
              data: {
                companyCode: []
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
        searchTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '支出明细', key: 'memberCreditExpend' },
              { name: '收入明细', key: 'memberCreditIncome' },
              { name: '冻结明细', key: 'memberCreditFreeze' }
            ]
          },
          search: {
            type: 'extra',
            isShowHigh: false,
            sortReturnSearchData: this.sortReturnSearchData,
            sortReturnSearchResetData: this.sortReturnSearchData,
            defaultVals: {},
            nameArray: [
              // {
              //   name: '时间筛选', type: 'timeRange', span: '4', dataIndex: 'timeRanges', start: '', end: '',
              //   disabledDate: this.disabledDate
              // },
              {
                name: '开始时间', type: 'dateStart', span: '4', dataIndex: 'beginTime'
              },
              {
                name: '结束时间', type: 'dateEnd', span: '4', dataIndex: 'endTime'
              }
            ]
          },
          table: {
            name: 'memberCreditExpend',
            title: 'memberCreditExpend',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            // beforeBanDblClickTr: this.beforeBanDblClickTr,
            banDblClick: true,
            deleteColumnsIndex: {
              memberCreditExpend: 4,
              memberCreditIncome: 5,
              memberCreditFreeze: 6
            },
            hideButtonSearch: true,
            sortReturnData: this.sortReturnData2,
            data: {
              page: '0',
              size: '10',
              flag: '',
              userNum: '',
              credit: '',
              // timeRanges: ''
              beginTime: '',
              endTime: ''
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

      visible: false,
      choseTreeData: {},
      userTypeWx: {},
      companyCodeWx: {}
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
      // 'handleChangeTreeStatus',
      'handleChangeExtraTableStatus',
      'handleChangeProgramCredit',
      'handleTabs'
    ]),
    disabledDate (current) {
      console.log(current)
      return current && current && current > moment().endOf('day') || current < moment().subtract(6, 'months')
    },
    btnClick (item) {
      // this.$refs.readTerminalHis.style.top = '50px'
      // console.log(this.$refs.readTerminalHis.style.top)
      this.visible = true
      this.modal.searchTable.table.data.userNum = this.dbTable.tabsTable.table.data.userNum
      // this.modal.searchTable.search.nameArray[0].end = moment(getDate(new Date()))
      // this.modal.searchTable.search.nameArray[0].start = moment(getDate(new Date().getTime() - 365 / 2 * 24 * 3600 * 1000))
      // this.modal.searchTable.search.nameArray[1].date = moment(getDate(new Date().getTime() - 365 / 2 * 24 * 3600 * 1000))
    },
    handleOk () {

    },
    sortReturnModalData (data) {
      // console.log(data)
      data.companyName = this.companyCodeWx[data.companyCode]
      return data
    },
    sortReturnSearchData (data) {
      // if (data.timeRanges) {
      //   data.beginTime = getDate(data.timeRanges[0])
      //   data.endTime = getDate(data.timeRanges[1])
      // }
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
      // console.log(data)
      data && data.length && data.forEach((item, i) => {
        let provinceName = item.provinceName ? item.provinceName : ''
        let cityName = item.cityName ? item.cityName : ''
        let countyName = item.countyName ? item.countyName : ''
        data[i].cityss = provinceName + '-' + cityName + '-' + countyName
      })
      return data
    },
    sortReturnData2 (data) {
      // console.log(data)
      return data
    },
    sortReturnDataCredit (data) {
      // console.log(data)
      return data
    },
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    }
  },
  created () {
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
        this.handleChangeProgramCredit(Math.random())// 初始化，提交更新
        // this.handleChangeProgramCredit(1)
      })
      if (!val) {
        this.choseTreeData = {}
        // this.handleChangeSubTableStatus(Math.random())
        this.handleTabs('memberCredit')
      }
    },
    getChoseTr (val) {
      // console.log(val)
      if (!isEmptyObject(val)) {
        // this.dbTable.tabsTable.table.data.pid = val.id
        this.dbTable.tabsTable.table.data.userNum = val.userNum
        this.dbTable.tabsTable.table.modal.baseData.add.userNum = val.userNum

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
                btnClick: this.btnClick
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
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      if (!val.reset) this.changeStatus()
    },
    getSearch (val) {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      if (!val.reset) this.changeStatus()
    },
    getSubPegination (val) {
      this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
      if (!val.reset) this.changeStatus('sub')
    },
    getSubSearch (val) {
      this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
      if (!val.reset) this.changeStatus('sub')
    }
  },
  mounted () {
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
<style lang="less">
@import "../../assets/css/modal/modal";

.readTerminalHis {
  top:50px;
  .ant-modal-body {
    padding: 0 !important;
  }
}
</style>
