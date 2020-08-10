<template>
  <searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import { mapActions, mapState } from 'vuex'
import { getFlag, getTradeList } from '@/api/const'
import { getCons, getConstGoods, getConst } from '../../api/hotelConst'
import { isArray, isJson, isEmptyObject } from '../../libs/tool'
import { getData } from '../../api/common'
import { getDate } from '../../libs/date'

export default {
  components: {
    searchTable
  },
  data () {
    return {
      searchTable: {
        table: {
          type: 'main',
          useUrlStatus: true,
          url: 'e_couponExchangeOrder_page_get', /// hotel/manager/dictionary/dic/{code}
          data: {
            page: '0',
            size: '10',
            hotelid: 0,
            couponType: 10
          },
          // deleteColumnsIndex: 2,
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
            {name: '兑换订单编号', type: 'input', span: '3', dataIndex: 'orderNum'},
            {name: '兑换时间', type: 'timeRange', span: '6', dataIndex: ['receiveTime']}
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
      'handleChangeExtraTableStatus'
    ]),
    changeStatus (val) {
      this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      this.handleChangeTableStatus(this.$route.name)
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
        data.beginTime = getDate(data.receiveTime[0]) + ' 00:00:00'
        data.endTime = getDate(data.receiveTime[1]) + ' 23:59:59'
      } else {
        data.beginTime = ''
        data.endTime = ''
      }
      return data
    }
  },
  computed: {
    ...mapState({
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getChoseTr: state => state.data.choseTr
    })
  },
  watch: {
    getChoseTr (val) { },
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
    getData({
      name: 'm_getCouponLoginInfo__get',
      data: {},
      type: ''
    }).then(res => {
      this.searchTable.table.data.hotelid = res.data.hotelid || ''
      this.handleChangeTableStatus(Math.random())
    })
  },
  mounted () {
    // this.handleChangeTableStatus(this.$route.name)
  }
}
</script>
