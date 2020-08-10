<template>
  <!--<searchTable :searchTableJson="searchTable"></searchTable>-->
  <treeTable :treeJson="tree"
             :searchTableJson="searchTable"></treeTable>
</template>
<script>
import treeTable from '@/view/components/treeTable/treeTable'
import { mapActions, mapState } from 'vuex'
import { getConst } from '../../api/hotelConst'
import { treeProviceSearch } from '../mixins/treeProviceSearch'
import { sortProviceCityTree } from '@/libs/util'
import { isArray, isEmptyObject, isJson } from '../../libs/tool'
import Cookies from 'js-cookie'
import {
  TOKEN_KEY
} from '@/libs/util'

export default {
  mixins: [treeProviceSearch],
  components: {
    // searchTable,
    treeTable
  },
  data () {
    return {
      tree: {
        title: '省市列表',
        url: 'h_common_proviceCity__get',
        expandAction: 'click',
        noTopSelectable: true,
        sortReturnTreeData: this.sortReturnTreeData,
        beforeHandleTree: this.beforeHandleTree,
        defaultLoadTreeStatus: true,
        tempTree: {},
        data: { protype: 1 },
        loadData: {
          type: 'provice',
          down: 'hotel',
          plus: ['hotel'],
          url: 'h_hotel__get',
          data: {
            cityCode: ''
          }
        },
        load: {
          url: 'h_common_proviceCity__get',
          data: { protype: 1 }
        },
        addType: 'system'
      },
      searchTable: {
        table: {
          type: 'main',
          deleteColumnsIndex: 1,
          hideMenuFold: true,
          data: {
            hotelId: '',
            page: '0',
            size: '10'
          },
          // hideButtonSearch: true,
          sortReturnData: this.sortReturnData,

          hideSearch: true,
          urls: {},
          buttons: {
            hideDel: true,
            showNoFlagDel: true
          },
          modal: {
            data: {},
            sortReturnModalData: this.sortReturnModalData,
            upload: {
              logo: {
                imgList: '',
                sortReturnUploadFile: this.sortReturnUploadFile
              }
            },
            onModalChange: this.onModalChange,
            baseData: {
              add: { hotelId: '' }
            }
          }
        },
        search: {}
      },
      file: {
        fileName: '',
        fileSuffix: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus'
    ]),
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
    sortReturnTreeData (data) {
      let arr = sortProviceCityTree(data)
      arr.length && arr.forEach((item, index) => {
        // if (item.proviceCode) arr[index].isLeaf = true
        if (item.proviceCode) {
          arr[index].isLeaf = true
        } else {
          arr[index].selectable = false
        }
      })
      return arr
    },
    beforeHandleTree (val) {
      this.tree.tempTree = val
      return (val.isTreeTop || val.protype) ? {
        status: false,
        message: '省市级别无法查看该数据,只有酒店可以查看'
      } : ''
    },
    getImgList () {
      return `${process.env.UPLOAD_ROOT}hotel-terminal/hotel/terminal/hotelLogo/?hotelid=${this.getTree.id}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    },
    sortReturnData (data) {
      this.searchTable.table.buttons.hideAdd = !!data.length
      this.searchTable.table.modal.upload.logo.imgList = data.length ? this.getImgList() : ''
      return data
    },
    sortReturnModalData (values) {
      // console.log(values)
      let status = false
      if (isJson(values.logo.value)) {
        status = !values.logo.value.status
        if (!values.logo.value.status) {
          this.$message.error(values.logo.value.msg)
        } else {
          values.logo = ''
        }
      } else if (isArray(values.logo.value)) {
        values.logo = values.logo.value[0]
      }
      let data = new FormData()
      for (let i in values) {
        data.append(i, values[i])
      }
      return { type: 'formData', data: data, noSubmitByPage: status }
    },
    changeStatus (val) {
      this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      this.handleChangeTableStatus(Math.random())
    }
  },
  computed: {
    ...mapState({
      getChoseTr: state => state.data.choseTr,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search
    })
  },
  watch: {
    getTree (val) {
      if (!isEmptyObject(val)) {
        this.searchTable.table.data.hotelId = val.id
        this.searchTable.table.modal.baseData.add.hotelId = val.id
        this.searchTable.table.modal.upload.logo.imgList = this.getImgList()
        this.handleChangeTableStatus(Math.random())
      }
    },
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        /* this.dbTable.tabsTable.table.tabData.config.ownerId = val.id
					this.dbTable.tabsTable.table.tabData.alarmConfig.ownerId = val.id
					this.dbTable.tabsTable.table.modal.baseData.add.ownerId = val.id
					this.changeStatus('sub') */
      }
    },
    getPegination (val) {
      if (!val.reset) {
        this.changeStatus(val)
      } else {
        this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      }
    },
    getSearch (val) {
      if (!val.reset) {
        this.changeStatus(val)
      } else {
        this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      }
    }
  },
  created () {
  },
  mounted () {
    // this.handleChangeTableStatus(Math.random())
  }
}
</script>
