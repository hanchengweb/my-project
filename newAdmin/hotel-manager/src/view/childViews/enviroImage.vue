<template>
  <treeTable :treeJson="tree"
             :searchTableJson="searchTable">
  </treeTable>
</template>
<script>

import treeTable from '@/view/components/treeTable/treeTable'
import { mapActions, mapState } from 'vuex'
import { getData } from '../../api/common'
import { sortProviceCityTree, getCompany, sortTreeData } from '@/libs/util'
import { debug } from 'util'
import { isArray, isJson, isEmptyObject } from '../../libs/tool'
import {
  getConst
} from '../../api/hotelConst'

export default {
  components: {
    treeTable
  },
  data () {
    return {
      tree: {
        title: '省市列表',
        url: 'h_common_proviceCity__get',
        expandAction: 'click',
        sortReturnTreeData: this.sortReturnTreeData,
        beforeHandleTree: this.beforeHandleTree,
        defaultLoadTreeStatus: true,
        tempTree: {},
        data: { protype: 1, procode: '990001' },
        loadData: {
          type: 'provice',
          down: 'hotel',
          plus: ['hotel'],
          url: 'h_hotel__get',
          data: {
            city_code: ''
          }
        },
        load: {
          url: 'h_common_proviceCity__get',
          data: { protype: 1, procode: '990001' }
        },
        addType: 'system',
        noTopSelectable: true
      }, // 树状结构数据导入类型
      searchTable: {
        table: {
          type: 'main',
          //   hideMenuFold: true,
          useUrlStatus: true,
          url: 'h_hotelEnviroImage_page_get',
          deleteColumnsIndex: 1,
          data: {
            hotelId: '',
            name: '',
            flag: '',
            showType: '',
            page: '0',
            size: '10'
          },

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
              title: '图片名称',
              dataIndex: 'imageName',
              width: 120,
              align: 'center',
              modalHidden: true
            }, {
              title: '图片宽度(px)',
              dataIndex: 'imageWidth',
              width: 120,
              align: 'center',
              editabled: true,
              isNeed: true
            }, {
              title: '图片高度(px)',
              dataIndex: 'imageHeight',
              width: 120,
              align: 'center',
              editabled: true,
              isNeed: true
            }, {
              title: '展示方式',
              dataIndex: 'imgtypeName',
              width: 100,
              align: 'center',
              modalHidden: true,
              isNeed: true
            }, {
              title: '序号',
              dataIndex: 'seqno',
              width: 80,
              align: 'center',
              editabled: true,
              isNeed: true
            }, {
              title: '是否为主图',
              dataIndex: 'masterName',
              width: 120,
              align: 'center',
              modalHidden: true,
              isNeed: true
            }, {
              title: '操作',
              dataIndex: 'operation',
              width: 180,
              align: 'center',
              scopedSlots: { customRender: 'operation' }
            }
          ],
          // hideSearch: true,
          urls: {},
          buttons: {
            sortBtnClick: this.sortBtnClick,
            masterShow: true// 标位主图按钮
          },
          pagination: {

          },
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            data: {
              showType: []
            },
            upload: {
              image: {
                imgList: '',
                sortReturnUploadFile: this.sortReturnUploadFile
              }
            },
            onModalChange: this.onModalChange
          },
          sortReturnData: this.sortReturnData
        },
        search: {
          nameArray: [
            { name: '展示方式', type: 'select', data: [], span: '6', dataIndex: 'showType' }
          ]
        }
      }
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
    getTree (val) {
      if (!isEmptyObject(val)) {
        this.searchTable.table.data.hotelId = val.id || ''
        this.searchTable.table.modal.hotelId = val.id || ''
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
    const companyCodes = JSON.parse(getCompany()).companyCode
    if (companyCodes) {
      this.tree.url = 'h_common_readPCByCompany__get'
      this.tree.data.companyCode = companyCodes
      this.tree.load.url = 'h_common_readPCByCompany__get'
      this.tree.load.data.companyCode = companyCodes
    }
    this.getFlag()
  },
  methods: {
    ...mapActions([
      'handleChangeTreeStatus',
      'handleChangeTableStatus',
      'handleChangeSubTableStatus'
    ]),
    sortReturnTreeData (data) {
      let arr = sortProviceCityTree(data)
      arr.length && arr.forEach((item, index) => {
        if (item.proviceCode) {
          arr[index].isLeaf = true
        } else {
          arr[index].selectable = false
        }
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
    changeStatus (type) {
      type ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    },
    sortReturnData (data) {
      let _this = this
      let imageTypelist = this.searchTable.table.modal.data.showType
      data && data.length && data.forEach((item, i) => {
        if (data[i].master == 1) {
          data[i].masterName = '否'
        } else if (data[i].master == 0) {
          data[i].masterName = '是'
        }
        imageTypelist && imageTypelist.length && imageTypelist.forEach((itemc, ic) => {
          if (data[i].showType == itemc.code) {
            data[i].imgtypeName = itemc.name
          }
        })
      })
      return data
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
      // if (this.file.fileName) values.imageName = this.file.fileName
      let data = new FormData()
      for (let i in values) {
        if (i == 'apkVersion' || i == 'jsVersion') values[i] = parseFloat(values[i])
        data.append(i, values[i])
      }
      return { type: 'formData', data: data, noSubmitByPage: status }
    },
    onModalChange (val, key, form) {
      if (key === 'logo' && val.value && isArray(val.value) && val.value[0] && this.file.fileName && this.file.fileSuffix) {
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
    getFlag () {
      getConst('imageType').then(res => {
        this.searchTable.table.modal.data.showType = res
        this.searchTable.search.nameArray[0].data = res
      })
    },
    sortBtnClick (item) {
      let hotelIds = this.searchTable.table.data.hotelId
      return hotelIds == '' ? {
        status: false,
        message: '请先选择酒店'
      } : ''
    },
    moveUp (item, record) {
      let HomeBannerDTO = record
      getData({
        name: 'h_hotelEnviroImage_upSeqno__PUT',
        data: HomeBannerDTO,
        type: ''
      }).then(res => {
        this.changeStatus()
      })
    },
    moveDown (item, record) {
      let HomeBannerDTO = record
      getData({
        name: 'h_hotelEnviroImage_downSeqno__PUT',
        data: HomeBannerDTO,
        type: ''
      }).then(res => {
        this.changeStatus()
      })
    },
  },
  mounted () {
    this.handleChangeTreeStatus(true)
  }

}
</script>
