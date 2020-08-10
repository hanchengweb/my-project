<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import {getConst} from '../../../api/hotelConst'
	import {isEmptyObject} from '../../../libs/tool'
	import {getUrlData} from '../../../api/common'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				searchTable: {
					table: {
						url: 'a_statistics_readEnergyGrade_get',
						type: 'main',
						data: {
							hotelid: '',
							roomName: '',
							grade: '',
							page: '0',
							size: '10'
						},
						banDblClick: true,
						sortReturnData: this.sortReturnData,
						x: 1920,
						urls: {},
						deleteColumnsIndex: 1,
						columns: [
							{title: '房间名称', dataIndex: 'roomName', width: 120},
							{title: '执行时间', dataIndex: 'time', width: 160, align: 'center'},
							{title: '能耗等级', dataIndex: 'grade', width: 120, align: 'center'},
							{title: '等级名称', dataIndex: 'gradeName', width: 120, align: 'center'},
							{title: '入住次数', dataIndex: 'pcount', width: 120, align: 'center'},
							{title: '均值', dataIndex: 'pavg', width: 120, align: 'center'},
							{title: '上次次数', dataIndex: 'preCount', width: 120, align: 'center'},
							{title: '上次均值', dataIndex: 'preAvg', width: 120, align: 'center'},
						],
						buttons: {},
						hidePaginationPart: true,
						pagination: {
							isSelf: true,
							//info: '默认能耗统计执行时间:2019-12-12 12:15:11',
							infoAfter: '（归零统计为酒店创建时间，按月重新统计）',
							buttons: [{
								name: '月初统计',
								url: 'doEnergyMonth',///hotel/analysis/statistics/doEnergyMonth
								onClick: this.reload,
								icon: 'line-chart',
								style: 'margin-left:-44px'
							}, {
								name: '归零统计',
								url: 'doEnergyInitialize',///hotel/analysis/statistics/doEnergyInitialize
								onClick: this.reload,
								icon: 'line-chart'
							}]
						}
					},
					search: {
						isShowHigh: false,
						nameArray: [{
							name: '房间名称', type: 'input', span: '4', dataIndex: 'roomName'
						}, {
							name: '等级',
							type: 'select',
							span: '4',
							dataIndex: 'grade',
							data: []
						}]
					}
				},
			}
		},
		computed: {
			...mapState({
				getPegination: state => state.data.pegination,
				getSearch: state => state.data.search,
				getChoseHotel: state => state.common.choseHotel
			}),
		},
		watch: {
			getSearch (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			},
			getPegination (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			},
			getChoseHotel (val) {
				val && !isEmptyObject(val) && this.changeStatus()
			}
		},
		methods: {
			getPowerGrade () {
				getConst('powerGrade').then(res => {
					this.searchTable.search.nameArray[1].data = res
				})
			},
			changeStatus () {
				!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
			},
			...mapActions([
				'handleChangeTableStatus',
			]),
			reload (item) {
				const url = `a_statistics_${item.url}_get`
				getUrlData(url, {hotelid: ''}).then(res => {
					if (res && res.data && res.code == '200') {
						this.changeStatus()
					}
				})
			},
			sortReturnData (data) {
				const analysisTime = Object.keys(data)[0]
				//this.searchTable.table.pagination.info = `默认能耗统计执行时间:${analysisTime}`
				let arr = data[analysisTime]
				arr && arr.length && arr.forEach((item, i) => {
					arr[i].time = analysisTime
				})
				return arr
			},
		},
		created () {
			this.getPowerGrade()
		},
		mounted () {
			this.changeStatus()

		}
	}
</script>
