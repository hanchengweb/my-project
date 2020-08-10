<template>
	<div class="readErrorPoint" id="readErrorPoint">
		<commonTop :name="'异常电量详情'"  backName="运维首页"></commonTop>
		<buttonSearch :search="search" :table="{}" style="height: 42px;margin-top:5px;margin-left: -156px;"
					  class="buttonSearchCls"></buttonSearch>
		<searchTable :searchTableJson="searchTable" class="tableCls" style="margin-bottom: 6px;"></searchTable>
		<tabsLine :tabsJson="tabs" :table="subSearchTable.table" style="margin:0"></tabsLine>
		<buttonSearch :search="subSearch" :table="{}" style="height: 42px;margin-top:5px;margin-left: -156px;"
					  class="buttonSearchCls"></buttonSearch>
		<searchTable :searchTableJson="subSearchTable" class="tableCls subTableCls"></searchTable>
	</div>
</template>
<script>
	import commonTop from '../commonTop'
	import searchTable from '@/components/searchTable/searchTable'
	import buttonSearch from '@/components/buttonSearch/buttonSearch'
	import tabsLine from '@/components/tabsLine/tabsLine'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		components: {
			commonTop,
			searchTable,
			buttonSearch,
			tabsLine
		},
		data () {
			return {
				tabs: {
					arr: [
						{name: '详情', key: 'config'},
					]
				},
				subSearch: {
					type: 'sub',
					isShowHigh: false,
					/*sortReturnSearchData: this.sortSubReturnSearchData,
					sortReturnSearchResetData: this.sortSubReturnSearchData,*/
					defaultVals: {
						// time: [moment(new Date()), moment(new Date())]
					},
					nameArray: [{
						name: '房间号', type: 'input', spans: '4', dataIndex: 'roomName'
					}]
				},
				search: {
					isShowHigh: false,
					showSearchStatus: true,
					defaultVals: {
						time: moment()
					},
					nameArray: [{
						name: '酒店名称', type: 'input', span: '4', dataIndex: 'hotelName'
					}, {
						name: '日期', type: 'date', spans: '6', dataIndex: 'time'
					}]
				},
				searchTable: {
					table: {
						type: 'main',
						url: 'a_operationController_readStatiscOfHotel_get',///hotel/analysis/operationController/readStatiscOfHotel
						baseData: [],
						keyName: 'ii',
						hideButtonSearch: true,
						data: {
							hotelName: '',
							time: moment().format('YYYY-MM-DD'),
							noHotelIdStatus: true
						},
						x: 2830,
						deleteColumnsIndex: 1,
						columns: [
							// {title: '告警类型编码', dataIndex: 'warntypeCode', width: 380},
							{title: '酒店名称', dataIndex: 'hotelName', width: 160, align: 'center'},
							{title: '酒店编码', dataIndex: 'hotelCode', width: 120, align: 'center'},
							{title: '酒店地址', dataIndex: 'address', width: 180, align: 'center'},
							{title: '异常房间数', dataIndex: 'roomCount', width: 140, align: 'center'},

						],
						hidePaginationPart: true,
						urls: {},
						buttons: {},
					},

					search: {}
				},
				subSearchTable: {
					table: {
						url: 'a_operationController_readErrorPoint_get',//
						type: 'sub',
						data: {
							hotelId: '',
							beginTime: moment().format('YYYY-MM-DD') + ' 00:00:00',
							endTime: moment().format('YYYY-MM-DD') + ' 23:59:59',
							roomName: '',
							noHotelIdStatus: true
						},
						banDblClick: true,
						// sortReturnData: this.sortReturnData,
						hideButtonSearch: true,
						x: 1400,

						keyName: 'ii',
						urls: {},
						deleteColumnsIndex: 1,
						columns: [
							{title: '酒店名称', dataIndex: 'hotelName', width: 120},
							{title: 'MAC地址', dataIndex: 'mac', width: 160, align: 'center'},
							{title: '时间', dataIndex: 'errorTime', width: 180, align: 'center'},
							{title: '电压', dataIndex: 'u', width: 120, align: 'center'},
							{title: '电流', dataIndex: 'i', width: 120, align: 'center'},
							{title: '功率', dataIndex: 'p', width: 120, align: 'center'},
							{title: '电量', dataIndex: 'q', width: 120, align: 'center'},
							{title: '房间号', dataIndex: 'roomName', width: 120, align: 'center'},
						],
						buttons: {},
						hidePaginationPart: true,
						pagination: {
							//info: '默认能耗统计执行时间:2019-12-12 12:15:11'
						}
					},
					search: {}
				}
			}
		},

		computed: {
			...mapState({
				getSearch: state => state.data.search,
				getSubSearch: state => state.data.subSearch,
				getChoseTr: state => state.data.choseTr,
			}),
		},
		watch: {
			getSearch (val) {
				val.time = val.time.format('YYYY-MM-DD')
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				this.subSearchTable.table.data.beginTime = moment(val.time).format('YYYY-MM-DD') + ' 00:00:00'
				this.subSearchTable.table.data.endTime = moment(val.time).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00'
				!val.reset && this.changeStatus()
			},
			getSubSearch (val) {
				this.subSearchTable.table.data = {...this.subSearchTable.table.data, ...val}
				!val.reset && this.changeStatus('sub')
			},
			getChoseTr (val) {
				if (!isEmptyObject(val)) {
					this.subSearchTable.table.data.hotelId = val.hotelId
					this.changeStatus('sub')
				}

			}

		},
		methods: {

			changeStatus (type) {
				type === 'sub' ? this.handleChangeSubTableStatus('sub') : this.handleChangeTableStatus(this.$route.name)
			},
			...mapActions([
				'handleChangeTableStatus',
				'handleChangeSubTableStatus',
			]),
			/*sortSubReturnSearchData (data) {
				this.subSearchTable.table.data.beginTime = data.time[0].format('YYYY-MM-DD') + ' 00:00:00'
				this.subSearchTable.table.data.endTime = data.time[1].format('YYYY-MM-DD') + ' 23:59:59'
				return data
			}*/
		},
		created () {
			//this.searchTable.table.data.hotelId = this.$store.state.common.choseHotel.id
			if (this.$route.query.date) {
				this.search.defaultVals.time = moment(this.$route.query.date)
				this.searchTable.table.data.time = moment(this.$route.query.date).format('YYYY-MM-DD')
				// this.subSearch.defaultVals.time = [moment(this.$route.query.date), moment(this.$route.query.date)]
				//
				this.subSearchTable.table.data.beginTime = moment(this.$route.query.date).format('YYYY-MM-DD') + ' 00:00:00'
				this.subSearchTable.table.data.endTime = moment(this.$route.query.date).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00'
			}

		},
		mounted () {
			this.changeStatus()

		}
	}
</script>
<style lang="less">
	#readErrorPoint {
		overflow: hidden;

		.buttonSearchCls {
		}

		.tableCls {
			height: calc(50% - 82px);

			&.subTableCls {
				height: calc(50% - 98px);
			}
		}
	}
</style>
