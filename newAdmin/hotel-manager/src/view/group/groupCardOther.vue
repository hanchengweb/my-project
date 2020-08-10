<template>
<div>
  <treeTable :treeJson="tree"
             :searchTableJson="searchTable" style="height:100%;">
  </treeTable>
  <a-modal title="选择商品"
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

import treeTable from '@/view/components/treeTable/treeTable'
import tabsTable from '@/components/tabsTable/tabsTable'
import searchSelf from '@/components/search/search'
import { mapActions, mapState } from 'vuex'
import { sortTreeData } from '../../libs/util'
import { getData } from '../../api/common'
import { fullScreen } from '../../assets/mixins/fullScreen'
import { sortProviceCityTree } from '@/libs/util'
import { debug } from 'util'
import { isArray, isJson, isEmptyObject } from '../../libs/tool'
import {
  getConst
} from '../../api/hotelConst'

export default {
  components: {
    treeTable,
    tabsTable,
    searchSelf
  },
  mixins: [fullScreen],
  data () {
    return {
      tree: {
        title: '集团列表',
        url: 'h_company__get',
        expandAction: 'click',
        sortReturnTreeData: this.sortReturnTreeData,
        beforeHandleTree: this.beforeHandleTree,
        defaultLoadTreeStatus: true,
        tempTree: {},
        data: { flag: 1 },
        // loadData: {
        //   type: 'provice',
        //   down: 'hotel',
        //   plus: ['hotel'],
        //   url: 'h_hotel__get',
        //   data: {
        //     city_code: ''
        //   }
        // },
        // load: {
        //   url: 'h_company__get',
        //   data: { flag: 1 }
        // },
        addType: 'system',
        noTopSelectable: false
      }, // 树状结构数据导入类型
      searchTable: {
        table: {
          type: 'main',
          deleteColumnsIndex: 1, // 自定义Columns宽度
          hideSearch: true,
          hideMenuFold: true,
          // banDblClick: true,
          useUrlStatus: true, // 是否使用本页面url
          url: 'u_consumerGoodsCategory_page_get',
          data: {
            name: '',
            flag: '',
            companyCode: '',
            page: '0',
            size: '10'
          },
          sortReturnData: this.sortReturnData,
          urls: {},
          buttons: {
            sortBtnClick: this.sortBtnClick
          },
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            leadClikc: this.leadClikc,
            data: {
            },
            upload: {
              image: {
                imgList: '',
                sortReturnUploadFile: this.sortReturnUploadFile
              }
            },
            onModalChange: this.onModalChange,
            companyCode: ''
          }
        },
        search: {
        }
      },
      modal: {
        modalWidth: '1200px',
        searchTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '券商品列表', key: 'platFormCard' }
            ]
          },
          search: {
            type: 'extra',
            isShowHigh: false,
            // sortReturnSearchData: this.sortReturnSearchData,
            // sortReturnSearchResetData: this.sortReturnSearchData,
            defaultVals: {},
            nameArray: []
          },
          table: {
            name: 'platFormCard',
            title: 'platFormCard',
            // url: 'u_goodsCategory_page_get',
            type: 'extra',
            keyName: 'ii',
            multiple: true,
            // beforeBanDblClickTr: this.beforeBanDblClickTr,
            banDblClick: true,
            deleteColumnsIndex: {
              platFormCard: 4
            },
            rowSelection: {
              type: 'checkbox',
              onChange: this.onRowChange
            },
            pagination: {
              type: 'extra',
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
            hideButtonSearch: true,
            sortReturnData: this.sortReturnData2,
            data: {
              page: '0',
              size: '10',
              flag: '',
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
      file: {
        fileName: ''
      },
      visible: false,
      selectedRows: []
    }
  },
  computed: {
    ...mapState({
      getChoseTr: state => state.data.choseTr,
      getSubChoseTr: state => state.data.subChoseTr,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getSubPegination: state => state.data.subPegination,
      getSubSearch: state => state.data.subSearch
    })
  },
  watch: {
    visible (val) {
      this.$nextTick(() => {
        this.handleChangeProgramCredit(Math.random())// 初始化，提交更新
        // this.handleChangeProgramCredit(1)
      })
    },
    getTree (val) {
      if (!isEmptyObject(val)) {
        this.searchTable.table.data.companyCode = val.code || ''
        this.modal.searchTable.table.data.companyCode = val.code || ''
        this.searchTable.table.modal.companyCode = val.code || ''
        this.handleChangeTableStatus(Math.random())
      }
    },
    getPegination (val) {
      let page = { page: val.page, size: val.size }
      this.searchTable.table.data = { ...this.searchTable.table.data, ...page }
      if (!val.reset) this.changeStatus()
    },
    getSearch (val) {
      this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      if (!val.reset) this.changeStatus()
    }
  },
  created () {

  },
  methods: {
    ...mapActions([
      'handleChangeTreeStatus',
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
      'handleChangeProgramCredit',
      'handleModalData'
    ]),
    sortReturnTreeData (data) {
      let arr = sortProviceCityTree(data)
      arr.length && arr.forEach((item, index) => {
        // if (item.proviceCode) {
        //   arr[index].isLeaf = true
        // } else {
        //   arr[index].selectable = true// 知否作为子分支
        // }
        arr[index].isLeaf = true
        arr[index].selectable = true
        arr[index].title = arr[index].name
      })
      return arr
    }, // 处理城市树
    beforeHandleTree (val) {
      this.tree.tempTree = val
      return (val.isTreeTop || val.protype) ? {
        status: false,
        message: '省市级别无法查看该数据,只有酒店可以查看'
      } : ''
    },
    sortReturnModalData (values) {
      let status = false
      if (isJson(values.image.value)) {
        status = !values.image.value.status
        if (!values.image.value.status) {
          this.$message.error(values.image.value.msg)
        } else {
          values.image = ''
        }
      } else if (isArray(values.image.value)) {
        values.image = values.image.value[0]
      }
      // console.log(this.file.fileName)
      if (this.file.fileName) values.imageName = this.file.fileName
      let data = new FormData()
      for (let i in values) {
        if (i == 'apkVersion' || i == 'jsVersion') values[i] = parseFloat(values[i])
        data.append(i, values[i])
      }
      return { type: 'formData', data: data, noSubmitByPage: status }
    },
    changeStatus (type) {
      type ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    },
    sortReturnData (data) {
      let _this = this
      data && data.length && data.forEach((item, i) => {
        item.systemDefaultName = item.systemDefault == 1 ? '是' : '否'
      })
      return data
    },
    // 点击导入
    leadClikc () {
      this.visible = true
    },
    operationButtonsClick (item, record) {
      console.log(record)
    },
    // 确定导入
    sure () {
      if (this.selectedRows.length <= 0) {
        this.$message.info('请选择商品!')
        return false
      }
      let goodsCategory = ''
      this.selectedRows.forEach(item => {
        goodsCategory += item.code + ','
      })
      goodsCategory = goodsCategory.substring(0, goodsCategory.lastIndexOf(','))
      getData({
        name: 'u_consumerGoodsCategory_add_post',
        data: {
          companyCode: this.searchTable.table.modal.companyCode,
          goodsCategory: goodsCategory
        },
        type: ''
      }).then(res => {
        this.visible = false
        this.$emit('hide-modal')
        this.handleModalData({ type: 'main', action: 'add', data: res.data })
      })
    },

    // 取消导入
    cancel () {
      this.visible = false
    },
    onRowChange (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
    },
    handleOk () {
      console.log('ok')
    },
    sortBtnClick (item) {
      let companyCodes = this.searchTable.table.modal.companyCode
      return companyCodes == '' ? {
        status: false,
        message: '请先选择集团'
      } : ''
    }
  },
  mounted () {
    this.handleChangeTreeStatus(true)
  }

}
</script>
<style lang="less">
@import "../../assets/css/modal/modal";

// .readTerminalHis {
//   top:50px;
//   .ant-modal-body {
//     padding: 0 !important;
//   }
// }
</style>
