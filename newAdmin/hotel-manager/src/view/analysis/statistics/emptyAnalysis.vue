<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import {getUrlData} from '../../../api/common'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				searchTable: {
					table: {
						url: 'a_statistics_emptyAnalysis_get',///hotel/analysis/statistics/emptyAnalysis
						type: 'main',
						data: {
							hotelid: '',
							roomName: '',
							page: '0',
							size: '10'
						},
						sortReturnData: this.sortReturnData,
						banDblClick: true,
						x: 800,
						urls: {},
						keyName: 'ii',
						columns: [
							{title: '执行时间', dataIndex: 'time', width: 160, align: 'center'},
							{title: '房间名称', dataIndex: 'roomName', width: 120},
						],
						buttons: {},
						hidePaginationPart: true,
						pagination: {
							//info: '默认能耗统计执行时间:2019-12-12 12:15:11',
							isSelf: true,
							buttons: [{
								name: '空耗电分析',
								url: 'doEmptyAnalysis',//doEnergyInitialize
								onClick: this.doAnalysis,
								style:'margin-left:-44px'
							}]
						}
					},
					search: {
						isShowHigh: false,
						nameArray: [{
							name: '房间名称', type: 'input', span: '4', dataIndex: 'roomName'
						},]
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
			changeStatus () {
				!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
			},
			...mapActions([
				'handleChangeTableStatus',
			]),
			doAnalysis (item) {
				const url = `a_statistics_${item.url}_get`
				getUrlData(url, {hotelid: ''}).then(res => {
					if (res && res.data && res.code == '200') {
						this.changeStatus()
					}
				})
			},
			sortReturnData (data) {
				//this.searchTable.table.pagination.info = `分析执行时间:${data.time}`
				data.rooms && data.rooms.length && data.rooms.forEach((item, i) => {
					data.rooms[i] = {roomName: item, time: data.time || ''}
				})
				return data.rooms
			},
		},
		mounted () {
			this.changeStatus()
		}
	}
</script>
