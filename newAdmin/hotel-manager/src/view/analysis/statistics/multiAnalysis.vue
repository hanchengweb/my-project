<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				searchTable: {
					table: {
						url: 'a_statistics_multiAnalysis_get',//hotel/analysis/statistics/multiAnalysis
						type: 'main',
						data: {
							hotelid: '',
							roomName: '',
							page: '0',
							size: '10'
						},
						banDblClick: true,
						x: 1000,
						urls: {},
						columns: [
							{title: '房间名称', dataIndex: 'roomName', width: 380},
						],
						buttons: {},
						pagination: {
							info: '默认能耗统计执行时间:2019-12-12 12:15:11'
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
			sortReturnData (data) {
				this.searchTable.table.pagination.info = `分析执行时间:${data.analysisTime}`
				return data.data
			},
		},
		mounted () {
			this.changeStatus()

		}
	}
</script>
