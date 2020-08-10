<template>
  <treeTable :treeJson="tree"
             :searchTableJson="searchTable">
  </treeTable>
</template>
<script>
import treeTable from '@/view/components/treeTable/treeTable'
import { mapActions, mapState } from 'vuex'
import { getFlag, getTradeList } from '@/api/const'
import { getCons, getConstGoods, getConst } from '../../api/hotelConst'
import { isArray, isJson, isEmptyObject } from '../../libs/tool'
import { getData } from '../../api/common'
import { getDate } from '../../libs/date'
import { sortProviceCityTree, getCompany } from '@/libs/util'

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
          useUrlStatus: true,
          url: 'e_couponUseRecord_page_get', /// hotel/manager/dictionary/dic/{code}
          data: {
            page: '0',
            size: '10',
            hotelId: 1,
            couponType: 10
          },
          deleteColumnsIndex: 1,
          banDblClick: true,
          urls: {},
          buttons: {
            hideDel: true,
            hideAdd: true
          },
          pagination: {
            pageSize: 10
          },
          modal: {

          },
          hideSearch: true,
          noHideSearch: true// 直接显示查询条件隐藏点击查询功能
        },
        search: {
          isShowHigh: true,
          timeSearch: true, // 存在时间重置问题
          sortReturnSearchData: this.sortReturnSearchData,
          sortReturnSearchResetData: this.sortReturnSearchData,
          nameArray: [
            {name: '核销编号', type: 'input', span: '3', dataIndex: 'useNum'},
            {name: '核销时间', type: 'timeRange', span: '6', dataIndex: ['receiveTime']}
          ],
          highArray: [
            {name: '用户编号', type: 'input', span: '3', dataIndex: 'userNum'},
            {name: '券编号', type: 'input', span: '6', dataIndex: 'couponNum'}
          ]
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
      'handleChangeExtraTableStatus'
    ]),
    // changeStatus (val) {
    //   this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
    //   this.handleChangeTableStatus(this.$route.name)
    // },
    changeStatus (type) {
      type === 'sub' ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    },
    btnClickCache (item) {
      let icon = item.icon
      item.icon = 'loading'
      getData({ name: 'h_cachemgr_cacheByCode_post', data: item.data }).then(res => {
        item.icon = icon
        if (res.code == '200') {
          if (res.data.success) {
            this.$message.success('操作成功!')
          } else {
            this.$message.error(res.data.message || '操作失败!')
          }
        }
      }, err => {
        item.icon = icon
      })
    },
    sortReturnSearchData (data) {
      if (data.receiveTime != '') {
        data.startTime = getDate(data.receiveTime[0]) + ' 00:00:00'
        data.endTime = getDate(data.receiveTime[1]) + ' 23:59:59'
      } else {
        data.startTime = ''
        data.endTime = ''
      }
      return data
    },
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
    }
  },
  computed: {
    ...mapState({
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getChoseTr: state => state.data.choseTr
    })
  },
  watch: {
    getTree (val) {
      if (!isEmptyObject(val)) {
        this.searchTable.table.data.hotelId = val.id || ''
        this.handleChangeTableStatus(Math.random())
      }
    },
    getChoseTr (val) { },
    getPegination (val) {
      this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
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
  },
  mounted () {
    this.handleChangeTableStatus(this.$route.name)
  }
}
</script>
