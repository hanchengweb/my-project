<template>
  <treeTable :treeJson="tree"
             :searchTableJson="searchTable">
  </treeTable>
</template>
<script>

import treeTable from '@/view/components/treeTable/treeTable'
import { mapActions, mapState } from 'vuex'
import { sortTreeData } from '../../libs/util'
import { isEmptyObject } from '../../libs/tool'
import { getData } from '../../api/common'
import { sortProviceCityTree } from '@/libs/util'
import { debug } from 'util';

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
          hideMenuFold: true,
          useUrlStatus: true,
          url: 'l_memberCheck_customerPage_get',
          deleteColumnsIndex: 1,
          data: {
            hotelId: '',
            name: '',
            flag: '',
            page: '0',
            size: '10',
            checkinBeginTime: '',
            checkinEndTime: '',
            checkoutBeginTime: '',
            checkoutEndTime: ''
          },
          banDblClick: true,
          urls: {},
          hideButtons: true,
          buttons: {},
          pagination: {},
          modal: {},
        },
        search: {
          isShowHigh: true,
          sortReturnSearchData: this.sortReturnSearchData,
          nameArray: [{
            name: '用户编号', type: 'input', span: '4', dataIndex: 'userNum'
          }, {
            name: '房间号', type: 'input', span: '4', dataIndex: 'roomName'
          }, {
            name: '签驻编号', type: 'input', span: '4', dataIndex: 'checkNum'
          }],
          highArray: [{
            name: '签住时间', type: 'timeRange', span: '6', dataIndex: ['checkinBeginTime', 'checkinEndTime']
          }, {
            name: '签退时间', type: 'timeRange', span: '6', dataIndex: ['checkoutBeginTime', 'checkoutEndTime']
          }]
        }
      },
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
      getSubSearch: state => state.data.subSearch,
    }),
  },
  watch: {
    getTree (val) {
      if (!isEmptyObject(val)) {
        this.searchTable.table.data.hotelId = val.id || ''
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

  methods: {
    ...mapActions([
      'handleChangeTreeStatus',
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
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
    }
  },
  mounted () {
    this.handleChangeTreeStatus(true)
  }

}
</script>
