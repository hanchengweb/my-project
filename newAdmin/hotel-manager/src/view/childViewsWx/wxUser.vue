<template>
  <div>
    <dbTable :dbTable="dbTable"
             style="height: 100%;"></dbTable>
    <a-modal title="终端环境历史数据"
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
      <treeTableSearch :treeJson="modal.treeJson"
                       :searchTableJson="modal.searchTable"
                       :style="`height:${modalHeight}px`"></treeTableSearch>
    </a-modal>
  </div>
</template>
<script>

import dbTable from '@/view/components/dbTable/dbTable'
import { getFlag } from '@/api/const'
import { getConst, getUserTypeWx, getCompanys } from '../../api/hotelConst'
import { getUrlData } from '../../api/common'
import { isEmptyObject } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl } from '@/libs/util'
import treeTableSearch from '@/componentsForPackage/treeTable/treeTableSearch'
import { fullScreen } from '../../assets/mixins/fullScreen'

export default {
  components: {
    dbTable,
    treeTableSearch
  },
  mixins: [fullScreen],
  data () {
    return {
      dbTable: {
        searchTable: {
          table: {
            type: 'main',
            data: {
              uname: '',
              utype: '',
              flag: '',
              page: '0',
              size: '10'
            },
            sortReturnData: this.sortReturnData,

            deleteColumnsIndex: 1,
            urls: {},
            buttons: {},
            modal: {
              urls: {},
              baseData: {
                add: {}
              },
              data: {}
            }
          },
          search: {
            nameArray: [{
              name: '名称', type: 'input', span: '4', dataIndex: 'uname'
            }, {
              name: '用户类型', type: 'select', data: [], span: '6', dataIndex: 'utype'
            }, {
              name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
            }]
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [{ name: '用户关联信息', key: 'wxUserhotel' }, { name: '用户绑定信息', key: 'wxBinduser' }]
          },
          search: {},
          table: {
            name: 'wxUserhotel',
            title: 'wxUserhotel',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            // beforeBanDblClickTr: this.beforeBanDblClickTr,
            banDblClick: true,
            deleteColumnsIndex: {
              wxUserhotel: 2,
              wxBinduser: 3
            },
            data: {
              userId: '',
              page: '0',
              size: '10'
            },
            tabData: {},
            urls: {},
            buttons: {
              hideFlag: true,
              hideAdd: true,
              actions: [{
                name: '新增',
                type: 'add',
                icon: 'plus',
                btnClick: this.btnClick
              }],
              subData: {
                wxBinduser: {
                  hideDel: false,
                  hideAdd: true,
                  actions: []
                },
                wxUserhotel: {
                  hideDel: false,
                  hideAdd: true,
                  actions: [{
                    name: '新增',
                    type: 'add',
                    icon: 'plus',
                    btnClick: this.btnClick
                  }]
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
                  userId: '',
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
        treeJson: {
          url: 'h_company__get', /// /hotel/manager/company/
          sortReturnTreeData: this.sortReturnTreeData,
          choseTree: this.choseTree,
          noHandle: true,
          data: {}
        },
        searchTable: {
          table: {
            url: 'h_hotel_page_get', // "/hotel/manager/company/	/hotel/manager/hotel/?companyCode=
            type: 'extra',
            useUrlStatus: true,
            hideButtonSearch: true,
            useColumnsStatus: true,
            data: {
              companyCode: '',
              page: '0',
              size: '30'
            },
            banDblClick: true,
            deleteColumnsIndex: 1,
            keyName: 'ii',
            x: 1490,
            urls: {},
            // sortReturnData: this.sortReturnModalData1,
            operationStatus: true,
            operationButtons: [{
              name: '添加',
              click: this.operationButtonsClick,
              type: 'primary',
              style: 'font-size:12px;line-height:24px;height:24px'
            }],
            columns: [
              { title: '酒店名称', dataIndex: 'name', width: 120, align: 'center' },
              {
                title: '操作',
                dataIndex: 'operation',
                width: 120,
                align: 'center',
                scopedSlots: { customRender: 'operation' }
              }
            ],
            buttons: {},
            pagination: {
              pageSize: 30,
              type: 'extra',
              sortReturnPagination: this.sortReturnPagination
            }
            // hidePaginationPart: true,
          },
          // hideSearch: true,
          search: {
            type: 'extra',
            isShowHigh: false,
            sortReturnSearchData: this.sortReturnSearchData,
            sortReturnSearchResetData: this.sortReturnSearchData,
            defaultVals: {},
            nameArray: [{
              name: '酒店编码', type: 'input', span: '4', dataIndex: 'code'
            }, {
              name: '酒店名称', type: 'input', span: '4', dataIndex: 'name'
            } ]
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
      'handleChangeSubTableStatus',
      'handleChangeTreeStatus',
      'handleChangeExtraTableStatus'
    ]),

    btnClick (item) {
      this.visible = true
    },
    addBtn (record, resolve) {
      let _this = this
      getUrlData('o_manager_wxUserhotel_add_post', {
        userId: this.dbTable.tabsTable.table.data.userId,
        companyCode: record.companyCode,
        companyName: record.companyName,
        hotelName: record.name,
        hotelId: record.id
      }).then(res => {
        if (res.code == '200') {
          if (!res.data.success) {
            _this.$message.error(res.data.message || '操作失误')
          } else {
            _this.$message.success('添加成功!')
          }
        }
        // res.code == '200' && _this.$message.success('添加成功!')
      })
    },
    operationButtonsClick (item, record) {
      let data = {
          userId: this.dbTable.tabsTable.table.data.userId,
          companyCode: record.companyCode,
          companyName: record.companyName,
          hotelName: record.name,
          hotelId: record.id
        }, _this = this
      this.$confirm({
        title: '你确定要添加酒店吗?',
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk () {
          return getUrlData('o_manager_wxUserhotel_add_post', data).then(res => {
            if (res.code == '200') {
              if (!res.data.success) {
                _this.$message.error(res.data.message || '操作失误')
              } else {
                _this.$message.success('添加成功!')
              }
            }
            // res.code == '200' && _this.$message.success('添加成功!')
            // _this.$message.success('添加成功!')
          }).catch(err => {
            console.log(err)
          })
        },
        onCancel () {
        }
      })
    },
    handleOk () {

    },

    sortReturnPagination (data) {
      if (isEmptyObject(this.choseTreeData)) {
        this.$message.info('请先选择左侧集团!')
        return false
      }
      this.modal.searchTable.table.data = { ...this.modal.searchTable.table.data, ...data }
      this.handleChangeExtraTableStatus(Math.random())
      return data
    },
    sortReturnSearchData (data) {
      if (isEmptyObject(this.choseTreeData)) {
        this.$message.info('请先选择左侧集团!')
        return false
      }
      this.modal.searchTable.table.data = { ...this.modal.searchTable.table.data, ...data }
      this.handleChangeExtraTableStatus(Math.random())
      return data
    },
    sortReturnModalData (data) {
      data.companyName = this.companyCodeWx[data.companyCode]
      return data
    },
    sortReturnTreeData (data) {
      let arr = [{ title: `集团名称`, key: 'name', children: [] }]
      data.length && data.forEach((item, i) => {
        data[i].title = item.name
        data[i].key = item.code
        data[i].isLeaf = true
        arr[0].children.push(data[i])
      })
      return arr
    },
    choseTree (data) {
      this.choseTreeData = data
      this.modal.searchTable.table.data.companyCode = data.code
      this.handleChangeExtraTableStatus(Math.random())
    },
    sortReturnData (data) {
      data && data.length && data.forEach((item, i) => {
        data[i].utype = item.utype.toString()
        data[i].utypeName = this.userTypeWx[item.utype]
      })
      return data
    },
    getFlag () {
      getConst('flag').then(res => {
        this.dbTable.searchTable.search.nameArray[2].data = res
        // this.dbTable.tabsTable.search.brand.nameArray[3].data = res
      })
    },
    getUserTypeWx () {
      getUserTypeWx().then(res => {
        res && res.length && res.forEach(item => {
          this.userTypeWx[item.value] = item.name
        })
        this.dbTable.searchTable.table.modal.data.utype = res
        this.dbTable.searchTable.search.nameArray[1].data = res
      })
    },
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    },
    getCompanyCode () {
      getCompanys().then(res => {
        this.dbTable.tabsTable.table.modal.data.companyCode = res
        res && res.length && res.forEach(item => {
          this.companyCodeWx[item.value] = item.name
        })
      })
    }
  },
  created () {
    this.getFlag()
    this.getUserTypeWx()
    this.getCompanyCode()
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
        this.handleChangeTreeStatus(Math.random())
      })
      if (!val) {
        this.choseTreeData = {}
        this.handleChangeSubTableStatus(Math.random())
      }
    },
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        // this.dbTable.tabsTable.table.data.pid = val.id
        this.dbTable.tabsTable.table.data.userId = val.id
        this.dbTable.tabsTable.table.modal.baseData.add.userId = val.id

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
  .ant-modal-body {
    padding: 0 !important;
  }
}
</style>
