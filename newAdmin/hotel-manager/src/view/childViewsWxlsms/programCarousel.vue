<template>
  <div>
    <dbTable :dbTable="dbTable"
             style="height: 100%;"></dbTable>
    <a-modal title="新闻列表"
             v-model="visible"
             :width="modalWidth"
             ref="readTerminalHis"
             :maskClosable="false"
             :destroyOnClose="true"
             :style="modalStyle"
             @ok="handleOk"
             class="selfModal modalSelfPure readTerminalHis"
             :footer="null">
      <a-icon :type="!isFullScreen?'fullscreen':'fullscreen-exit'"
              class="fullScreenIcon"
              @click="toFullScreen" />
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
import { isEmptyObject, isArray, isJson } from '@/libs/tool'
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
            useUrlStatus: true,
            url: 'l_homeBanner_page_get',
            data: {
              flag: '',
              page: '0',
              size: '10'
            },
            sortReturnData: this.sortReturnData,
            deleteColumnsIndex: 2,

            operationStatus: true,
            operationButtons: [{
              name: '上移',
              click: this.moveUp,
              type: 'primary',
              style: 'font-size:12px;line-height:24px;height:24px'
            }, {
              name: '下移',
              click: this.moveDown,
              type: 'primary',
              style: 'font-size:12px;line-height:24px;height:24px;margin-left:10px'
            }],
            useColumnsStatus: true,
            columns: [
              {
                title: '名称',
                dataIndex: 'title',
                width: 160,
                align: 'center',
                isNeed: true,
                editabled: true
              }, {
                title: '图片名称',
                dataIndex: 'imgName',
                width: 160,
                align: 'center',
                modalHidden: true
              }, {
                title: '图片类型',
                dataIndex: 'imgSuffix',
                width: 100,
                align: 'center',
                modalHidden: true
              }, {
                title: '创建时间',
                dataIndex: 'createTime',
                width: 160,
                align: 'center',
                modalHidden: true
              }, {
                title: '序号',
                dataIndex: 'seqno',
                width: 80,
                align: 'center',
                editabled: true,
                isNeed: true
              }, {
                title: '状态',
                dataIndex: 'flagName',
                width: 120,
                align: 'center',
                modalHidden: true
              },
              {
                title: '操作',
                dataIndex: 'operation',
                width: 180,
                align: 'center',
                scopedSlots: { customRender: 'operation' }
              }
            ],
            urls: {},
            hideSearch: true, // 隐藏查询按钮
            buttons: {
            },
            modal: {
              sortReturnModalData: this.sortReturnModalData2,
              data: {
                code: []
              },
              upload: {
                image: {
                  imgList: '',
                  sortReturnUploadFile: this.sortReturnUploadFile,
                  imageScale: 1.79// 裁剪宽比 参数存在表示图片需要裁剪
                }
              },
              onModalChange: this.onModalChange
            }

          },
          search: {
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '图片详情', key: 'homeBannerDetail' }
            ]
          },
          search: {},
          table: {
            name: 'homeBannerDetail',
            title: 'homeBannerDetail',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            // beforeBanDblClickTr: this.beforeBanDblClickTr,
            // banDblClick: true,
            deleteColumnsIndex: {
              homeBannerDetail: 2
            },
            // useUrlStatus: true,
            // url: 'l_homeBannerDetail_page_get',
            data: {
              page: '0',
              size: '10'
            },
            sortReturnData: this.sortReturnDataCredit,
            tabData: {},
            urls: {},
            buttons: {
              // hideFlag: true,
              // hideAdd: true,
              // hideDel: true,
            },
            modal: {
              sortReturnModalData: this.sortReturnModalData,
              leadClikc: this.leadClikc,
              data: {
                companyCode: []
              },
              upload: {
                image: {
                  imgList: '',
                  sortReturnUploadFile: this.sortReturnUploadFile
                }
              },
              onModalChange: this.onModalChange,
              baseData: {
                add: {
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
              { name: '首页新闻列表', key: 'programNewsList' }
            ]
          },
          search: {
            type: 'extra',
            isShowHigh: false,
            sortReturnSearchData: this.sortReturnSearchData,
            sortReturnSearchResetData: this.sortReturnSearchData,
            defaultVals: {},
            nameArray: []
          },
          table: {
            name: 'programNewsList',
            title: 'programNewsList',
            type: 'sub',
            keyName: 'ii',
            multiple: true,
            // beforeBanDblClickTr: this.beforeBanDblClickTr,
            banDblClick: true,
            deleteColumnsIndex: {
              programNewsList: 2
            },
            rowSelection: {
              type: 'radio',
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
              size: '10'
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
      companyCodeWx: {},
      file: {
        fileName: ''
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
      'handleModalData'
    ]),
    disabledDate (current) {
      console.log(current)
      return current && current && current > moment().endOf('day') || current < moment().subtract(6, 'months')
    },
    btnClick (item) {
      this.visible = true
      this.modal.searchTable.table.data.bannerId = this.dbTable.tabsTable.table.data.bannerId
    },
    handleOk () {

    },
    sortReturnModalData2 (values) {
      let status = false
      console.log(values)
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
      if (this.file.fileName) values.imageName = this.file.fileName
      let data = new FormData()
      for (let i in values) {
        console.log(i)
        if (i == 'apkVersion' || i == 'jsVersion') values[i] = parseFloat(values[i])
        data.append(i, values[i])
      }
      return {type: 'formData', data: data, noSubmitByPage: status}
    },
    sortReturnModalData (values) {
      let status = false
      values.image = ''
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
      if (this.file.fileName) values.imageName = this.file.fileName
      let data = new FormData()
      for (let i in values) {
        if (i == 'apkVersion' || i == 'jsVersion') values[i] = parseFloat(values[i])
        data.append(i, values[i])
      }
      return {type: 'formData', data: data, noSubmitByPage: status}
    },
    sortReturnUploadFile (file) {
      if (file && file.name) {
        this.file = {
          fileName: file.name.substring(0, file.name.lastIndexOf('.')),
          fileSuffix: file.name.substring(file.name.lastIndexOf('.') + 1)
        }
      }
    },
    onModalChange (val, key, form) {
      if (key === 'logo' && val.value && isArray(val.value) && val.value[0] && this.file.fileName && this.file.fileSuffix) {
        form.setFieldsValue({fileName: this.file.fileName})
        form.setFieldsValue({fileSuffix: this.file.fileSuffix})
      }
    },
    sortReturnSearchData (data) {
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
      data && data.length && data.forEach((item, i) => {
        if (data[i].flag == 0) {
          data[i].flagName = '新增'
        }
        if (data[i].flag == 1) {
          data[i].flagName = '启用'
        }
        if (data[i].flag == 2) {
          data[i].flagName = '作废'
        }
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
    },
    moveUp (item, record) {
      let HomeBannerDTO = record
      HomeBannerDTO.direction = 1
      getData({
        name: 'l_homeBanner_updateSeqno_PUT',
        data: HomeBannerDTO,
        type: ''
      }).then(res => {
        this.changeStatus()
      })
    },
    moveDown (item, record) {
      let HomeBannerDTO = record
      HomeBannerDTO.direction = 0
      getData({
        name: 'l_homeBanner_updateSeqno_PUT',
        data: HomeBannerDTO,
        type: ''
      }).then(res => {
        this.changeStatus()
      })
    },
    // 点击导入
    leadClikc () {
      this.visible = true
    },
    onRowChange (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
    },
    // 确定导入
    sure () {
      if (this.selectedRows.length <= 0) {
        this.$message.info('请选择新闻!')
        return false
      }
      getData({
        name: 'l_homeBannerDetail__post',
        data: {
          newsId: this.selectedRows[0].id,
          bannerId: this.dbTable.tabsTable.table.data.bannerId,
          flag: 0
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
        // this.handleChangeProgramCredit(Math.random())// 初始化，提交更新
        // this.handleChangeProgramCredit(1)
        this.changeStatus()
        // this.handleTabs('programNewsList')
        // this.handleChangeSubTableStatus(Math.random())
      })
      if (!val) {
        // this.choseTreeData = {}
        // this.handleChangeSubTableStatus(Math.random())
        this.handleTabs('homeBannerDetail')
      }
    },
    getChoseTr (val) {
      // console.log(val)
      if (!isEmptyObject(val)) {
        console.log(val)
        // this.dbTable.tabsTable.table.data.pid = val.id
        this.dbTable.tabsTable.table.data.bannerId = val.id
        this.dbTable.tabsTable.table.modal.baseData.add.bannerId = val.id

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
