<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import {getConst} from '../../../api/hotelConst'
	import {isEmptyObject} from '../../../libs/tool'

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
						x: 1400,
						urls: {},
						deleteColumnsIndex: 1,
						columns: [
							{title: '房间名称', dataIndex: 'roomName', width: 120},
							{title: '执行时间', dataIndex: 'time', width: 160, align: 'center'},
							{title: '等级编码', dataIndex: 'grade', width: 120, align: 'center'},
							{title: '等级名称', dataIndex: 'gradeName', width: 120, align: 'center'},
							{title: '均值', dataIndex: 'pavg', width: 120, align: 'center'},
						],
						buttons: {},
						hidePaginationPart: true,
						pagination: {
							//info: '默认能耗统计执行时间:2019-12-12 12:15:11'
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
			sortReturnData (data) {
				const analysisTime = Object.keys(data)[0]
				//	this.searchTable.table.pagination.info = `默认能耗统计执行时间:${analysisTime || '暂无'}`
				let arr = data[analysisTime]
				arr && arr.length && arr.forEach((item, i) => {
					arr[i].time = analysisTime
				})

				return analysisTime ? arr : []
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
