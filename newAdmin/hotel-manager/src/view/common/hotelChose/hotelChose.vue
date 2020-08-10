<template>
	<div class>
		<search-table style="height: 100%" :search-table-json="searchTable"></search-table>
	</div>

</template>
<script>
import searchTable from '../../../components/searchTable/searchTable'
import {getConst, getCompanys, getBrand} from '../../../api/hotelConst'
import {sortCompanyBrand} from '../../../libs/util'
import {mapActions, mapState} from 'vuex'
import {isEmptyObject} from '../../../libs/tool'
import {getUrlData} from '../../../api/common'

export default {
  name: 'hotelChose',
  components: {
    searchTable
  },
  data () {
    return {
      searchTable: {
        table: {
          type: 'hotel',
          url: 'h_common_hotelPage_get',
          data: {
            name: '',
            code: '',
            brandCode: '',
            proviceCode: '',
            cityCode: '',
            countyCode: '',
            flag: '',
            page: '0',
            size: '10'
          },
          beforeBanClickTr: this.beforeBanClickTr,
          tableSlot: ['title'],
          tableSlotSelf: ['title'],
          tableSlotSelfTitle: {title: `当前酒店:`},
          showTableTitle: true,
          banClick: true,
          banDblClick: true,
          urls: {},
          columns: [{
            title: '酒店名称',
            dataIndex: 'name'
          }],
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
          }
        },
        search: {
          isShowHigh: false,
          type: 'extra',
          sortReturnSearchData: this.sortReturnSearchData,
          sortReturnSearchResetData: this.sortReturnSearchData,
          nameArray: [{
            name: '名称', type: 'input', span: '4', dataIndex: 'name'
          }, {
            name: '编码', type: 'input', span: '4', dataIndex: 'code'
          }, {
            name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
          }]
          // highArray: [{
          // 	name: '集团/品牌', type: 'cascader', spans: '12', data: [], dataIndex: 'companyBrand'
          // }]
        }
      },
      selectedRows: {}
    }
  },
  computed: {
    ...mapState({
      getChoseHotel: state => state.common.choseHotel
    })
  },

  watch: {
    $route (to, from) {
      this.handleChangeHotelTableStatus(Math.random())
    }
  },
  methods: {
    ...mapActions([
      'handleChangeHotelTableStatus',
      'handleShowHotelChoseStatus',
      'handleChoseHotel'
    ]),
    sortReturnSearchData (data) {
      if (data.companyBrand && data.companyBrand.length) {
        data.companyCode = data.companyBrand[0]
        if (data.companyBrand[1]) data.brandCode = data.companyBrand[1]
      } else {
        data.companyCode = ''
        data.brandCode = ''
      }
      this.searchTable.table.data = {...this.searchTable.table.data, ...data}
      this.handleChangeHotelTableStatus(Math.random())
      return data
    },
    sortReturnPagination (data) {
      this.searchTable.table.data = {...this.searchTable.table.data, ...data}
      this.handleChangeHotelTableStatus(Math.random())
      return data
    },
    changeUserHotel (id, isAdd) {
      let data = {userId: this.$store.state.user.user.id, hotelId: id},
        url = isAdd ? `h_userHotel__post` : `h_userHotel_i_put`
      if (!isAdd) data.id = data.userId
      getUrlData(url, data).then(res => {

      })
    },
    sure () {
      if (isEmptyObject(this.selectedRows)) {
        this.$message.info('请选择酒店!')
        return false
      }
      this.changeUserHotel(this.selectedRows.id, isEmptyObject(this.$store.state.common.choseHotel))
      this.handleChoseHotel(this.selectedRows)
      this.handleShowHotelChoseStatus(false)
    },
    cancel () {
      if (this.$store.state.common.showHotelChoseStatus && isEmptyObject(this.$store.state.common.choseHotel)) {
        this.$message.info('请先选择酒店再进行操作!')
        return false
      }
      this.handleShowHotelChoseStatus(false)
    },
    getFlag () {
      getConst('flag').then(res => {
        this.searchTable.search.nameArray[2].data = res
      })
    },
    beforeBanClickTr (data, target) {
      console.log(222334455)
      const tagName = target.tagName,
        tr = tagName === 'TD' ? target.parentNode : target.tagName === 'SPAN' ? target.parentNode.parentNode : target
      tr && tr.getElementsByTagName('label') && tr.getElementsByTagName('label').length && tr.getElementsByTagName('label')[0] && tr.getElementsByTagName('label')[0].click && tr.getElementsByTagName('label')[0].click()
    },
    onRowChange (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows[0]
    }
    // getCompanys () {
    // 	getCompanys().then(res => {
    // 		const companys = res
    // 		getBrand().then(res1 => {
    // 			const brand = res1
    // 			this.searchTable.search.highArray[0].data = sortCompanyBrand(companys, brand)
    // 		})
    // 	})
    // },
  },
  created () {
    this.getFlag()
    this.searchTable.table.tableSlotSelfTitle.title = `<span style="margin-right: 5px;">当前酒店:</span>${this.getChoseHotel.name || '酒店'}`
    // this.getCompanys()
  },
  mounted () {
    this.handleChangeHotelTableStatus(Math.random())
  }
}
</script>
