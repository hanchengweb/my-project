<template>
  <div>
    <dbTable :dbTable="dbTable"
             style="height: 100%;"></dbTable>
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
import dbTable from '@/view/components/dbTable/dbTable'
import { mapActions, mapState } from 'vuex'
import { getConst, getConstOther } from '../../api/hotelConst'
import tabsTable from '@/components/tabsTable/tabsTable'
import searchSelf from '@/components/search/search'
import { getData } from '@/api/common'
import { fullScreen } from '../../assets/mixins/fullScreen'
import { isArray, isJson, isEmptyObject } from '../../libs/tool'
import Cookies from 'js-cookie'
import {
  TOKEN_KEY
} from '@/libs/util'

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
            deleteColumnsIndex: 1, // 自定义Columns宽度
            hideSearch: true,
            // banDblClick: true,
            useUrlStatus: true, // 是否使用本页面url
            url: 'u_consumerGoodsCategory_page_get',
            data: {
              name: '',
              flag: '',
              companyCode: '',
              page: '0',
              size: '12'
            },
            sortReturnData: this.sortReturnData,
            urls: {},
            buttons: {
              hideDel: false
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
        }
      },
      file: {
        fileName: ''
      },
      visible: false,
      selectedRows: [],
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
            // operationStatus: true,
            // operationButtons: [{
            //   name: '添加',
            //   click: this.operationButtonsClick,
            //   type: 'primary',
            //   style: 'font-size:12px;line-height:24px;height:24px'
            // }],
            // columns: [
            //   { title: '名称', dataIndex: 'name', width: 120, align: 'center' },
            //   {
            //     title: '操作',
            //     dataIndex: 'operation',
            //     width: 120,
            //     align: 'center',
            //     scopedSlots: { customRender: 'operation' }
            //   }
            // ],
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
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeProgramCredit'
    ]),
    sortReturnData (data) {
      let _this = this
      console.log(data)
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
          companyCode: this.dbTable.searchTable.table.modal.companyCode,
          goodsCategory: goodsCategory
        },
        type: ''
      }).then(res => {
        this.visible = false
      })
    },

    // 取消导入
    cancel () {
      this.visible = false
    },
    onRowChange (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
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
    changeStatus (val) {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      this.handleChangeTableStatus(Math.random())
    },
    onModalChange (val, key, form) {
      if (key === 'image' && val.value && isArray(val.value) && val.value[0] && this.file.fileName && this.file.fileSuffix) {
        form.setFieldsValue({ fileName: this.file.fileName })
        form.setFieldsValue({ fileSuffix: this.file.fileSuffix })
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
    handleOk () {
      console.log('ok')
    }
  },
  computed: {
    ...mapState({
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search
    })
  },
  watch: {
    visible (val) {
      this.$nextTick(() => {
        this.handleChangeProgramCredit(Math.random())// 初始化，提交更新
        // this.handleChangeProgramCredit(1)
      })
    },
    getPegination (val) {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      if (!val.reset) this.changeStatus()
    },
    getSearch (val) {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      if (!val.reset) this.changeStatus()
    }
  },
  created () {
    getData({
      name: 'm_getCouponLoginInfo__get',
      data: {},
      type: ''
    }).then(res => {
      this.dbTable.searchTable.table.modal.companyCode = res.data.companyCode || ''
      this.dbTable.searchTable.table.data.companyCode = res.data.companyCode || ''
      this.modal.searchTable.table.data.companyCode = res.data.companyCode || ''
      this.handleChangeTableStatus(Math.random())
    })
  },
  mounted () {
    // this.handleChangeTableStatus(Math.random())
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
