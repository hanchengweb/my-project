<template>
	<div class="readDisconnectNet" id="readDisconnectNet">
		<commonTop :name="'链路异常详情'" backName="运维首页"></commonTop>
		<buttonSearch :search="search" :table="{}" style="height: 42px;margin-top:5px;margin-left:-166px"
					  class="buttonSearchCls"></buttonSearch>
		<searchTable :searchTableJson="searchTable" class="tableCls"></searchTable>
	</div>
</template>
<script>
	import commonTop from '../commonTop'
	import searchTable from '@/components/searchTable/searchTable'
	import buttonSearch from '@/components/buttonSearch/buttonSearch'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		components: {
			commonTop,
			searchTable,
			buttonSearch
		},
		data () {
			return {
				search: {
					isShowHigh: false,
					// showHotel: true,
					/*sortReturnSearchData: this.sortReturnSearchData,
					sortReturnSearchResetData: this.sortReturnSearchData,*/
					defaultVals: {},
					nameArray: [{
						name: '酒店名称', type: 'input', spans: '4', dataIndex: 'hotelName'
					}, {
						name: 'MAC地址', type: 'input', spans: '4', dataIndex: 'mac'
					}]
				},
				searchTable: {
					table: {
						url: 'a_operationController_readDisconnectNet_get',///hotel/analysis/operationController/readDisconnectNet
						type: 'main',
						data: {
							hotelName: '',
							mac: '',
							noHotelIdStatus: true
						},
						banDblClick: true,
						// sortReturnData: this.sortReturnData,
						hideButtonSearch: true,
						x: 1400,
						urls: {},
						deleteColumnsIndex: 1,
						keyName: 'ii',
						columns: [
							{title: '酒店名称', dataIndex: 'hotelName', width: 120},
							{title: 'MAC地址', dataIndex: 'mac', width: 160, align: 'center'},
							{title: '断开时间', dataIndex: 'lasttime', width: 180, align: 'center'},
							{title: '链路状态', dataIndex: 'status', width: 120, align: 'center'},
						],
						buttons: {},
						hidePaginationPart: true,
						pagination: {
							//info: '默认能耗统计执行时间:2019-12-12 12:15:11'
						}
					},
					search: {}
				},
			}
		},

		computed: {
			...mapState({
				getSearch: state => state.data.search,
				getChoseHotel: state => state.common.choseHotel
			}),
		},
		watch: {
			getSearch (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			},
			getChoseHotel (val) {
				val && !isEmptyObject(val) && this.changeStatus()
			}
		},
		methods: {
			changeStatus () {
				!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
			},
			...mapActions([
				'handleChangeTableStatus',
			]),
		},
		created () {

		},
		mounted () {
			this.changeStatus()

		}
	}
</script>
<style lang="less">
	#readDisconnectNet {
		overflow: hidden;

		.buttonSearchCls {
		}

		.tableCls {
			height: calc(100% - 82px);
		}
	}
</style>
