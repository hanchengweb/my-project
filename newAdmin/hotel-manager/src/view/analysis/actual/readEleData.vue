<template>
	<div class="searchTableSelf" id="readEleData">
		<buttonSearch :search="searchTable.search" :table="{}"></buttonSearch>
		<div style="height: calc(100% - 42px);">
			<tree :treeJson="treeJson" @chose-tree="choseTree" class="fl"
				  style="width: 220px;margin-right: 6px;height: 100%;border-top: 1px solid #eee"></tree>
			<singleTable style="height: 100%;background-color: #fff;width: calc(100% - 226px)" class="tablePart fl"
						 :table="searchTable.table" :search="searchTable.search"
						 ref="tableSub"></singleTable>
		</div>

		<modalChart :chartData="chartModalData" @hide-modal="hideModal" v-if="chartModalData.visible"></modalChart>
	</div>

</template>
<script>
	import singleTable from '@/components/singleTable/singleTable'
	import buttonSearch from '@/components/buttonSearch/buttonSearch'
	import tree from '@/components/tree/tree'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import modalChart from './modalChart'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		components: {
			singleTable,
			modalChart,
			buttonSearch,
			tree
		},
		data () {
			return {
				treeJson: {
					url: 'a_actual_readRoomData_get',
					sortReturnTreeData: this.sortReturnTreeData,
					noHandle: true,
					data: {hotelid: '',}
				},
				chartModalData: {
					visible: false,
					data: {}
				},
				choseTreeData: {},
				searchTable: {
					table: {
						type: 'main',
						url: 'a_actual_readEleData_get',
						hideButtonSearch: true,
						deleteColumnsIndex: 2,
						data: {
							beginDate: `${moment(new Date()).format('YYYY-MM-DD')} 00:00:00`,
							endDate: `${moment(new Date()).format('YYYY-MM-DD')} 23:59:59`,
							hotelid: '',
							roomid: '',
							page: '0',
							size: '30'
						},
						banDblClick: true,
						x: 1730,
						keyName: 't',
						sortReturnData: this.sortReturnData,
						urls: {},
						columns: [
							{title: '房间序号', dataIndex: 'ammeter', width: 120, align: 'center'},
							{title: '房间名称', dataIndex: 'name', width: 120, align: 'center'},
							{title: '楼层', dataIndex: 'floor', width: 120, align: 'center'},
							{title: '时间', dataIndex: 't', width: 140, align: 'center'},
							{title: '电压(V)', dataIndex: 'u', width: 120, align: 'center'},
							{title: '电流(A)', dataIndex: 'i', width: 120, align: 'center'},
							{title: '功率(KW)', dataIndex: 'p', width: 120, align: 'center'},
							{title: '电量(kW/h)', dataIndex: 'q', width: 120, align: 'center'},
							{title: '缓存时标', dataIndex: 'dt', width: 140, align: 'center'},
						],
						buttons: {},
						pagination: {
							isSelf: true,
							pageSize: 30,
							buttons: [{
								name: '负荷曲线',
								url: 'readPowerCurve',
								onClick: this.showChartModal,
								icon: 'line-chart',
								style: 'margin-left:-44px'
							}]
							// buttons: [{
							// 	name: '用电量曲线',
							// 	url: 'readEleCurve',
							// 	onClick: this.showChartModal,
							// 	icon: 'line-chart'
							// }, {
							// 	name: '负荷曲线',
							// 	url: 'readPowerCurve',
							// 	onClick: this.showChartModal,
							// 	icon: 'line-chart'
							// }]
						}
					},
					search: {
						isShowHigh: false,
						sortReturnSearchData: this.sortReturnSearchData,
						sortReturnSearchResetData: this.sortReturnSearchData,
						defaultVals: {
							time: [moment(new Date()), moment(new Date())]
						},
						nameArray: [{
							name: '起止时间', type: 'timeRange', spans: '8', dataIndex: 'time'
						},]
					}
				},
			}
		},
		computed: {
			...mapState({
				getPegination: state => state.data.pegination,
				getChoseTr: state => state.data.choseTr,
				getSearch: state => state.data.search,
				getChoseHotel: state => state.common.choseHotel
			}),
		},
		watch: {
			getSearch (val) {
				if (!val.beginDate) return false
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				if (!val.reset) {
					if (isEmptyObject(this.choseTreeData)) {
						this.$message.info('请先选择左侧房间!')
						return false
					}
					this.changeStatus()
				}
			},
			getChoseHotel (val) {
				if (val && !isEmptyObject(val)) {
					this.handleChangeTreeStatus(Math.random())
					this.handleTree({})
				}
			},
			getChoseTr (val) {
				this.chartModalData.data = val
			},
			getPegination (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}

				// this.searchTable.table.data.beginDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
				// this.searchTable.table.data.endDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

				if (!val.reset) {
					if (isEmptyObject(this.choseTreeData)) {
						this.$message.info('请先选择左侧房间!')
						return false
					}
					this.changeStatus()
				}
			},

		},
		methods: {
			sortReturnData (data) {
				data.data && data.data.length && data.data.forEach((item, i) => {
					item.t = item.t ? item.t.substring(0, 16) : item.t
					data.data[i] = {...item, ...this.choseTreeData}
				})
				return data
			},
			sortReturnTreeData (data) {
				let arr = []
				data = data[0]
				if (!isEmptyObject(data)) {
					for (let i in data) {
						const item = data[i]
						let subArr = {title: `楼层${i}`, key: i, children: []}
						item && item.length && item.forEach((m, n) => {
							subArr.children.push({title: m.name, key: m.id, isLeaf: true, ...m})
						})
						arr.push(subArr)
					}
				}
				return arr
			},
			choseTree (data) {
				if (!data.id) {
					this.$message.info('楼层无法查看数据,只有房间可以!')
					return false
				}
				this.searchTable.table.data.roomid = data.id
				this.handlePegination({page: 0, size: this.searchTable.table.data.size, reset: true})
				this.choseTreeData = data
				this.changeStatus()
			},
			changeStatus () {
				this.handleChangeTableStatus(Math.random())
			},
			hideModal (val) {
				this.chartModalData.visible = false
			},
			showChartModal (item) {
				if (isEmptyObject(this.choseTreeData)) {
					this.$message.info('请先选择左侧房间!')
					return false
				}
				this.chartModalData.visible = true
				this.chartModalData.url = item.url
				this.chartModalData.data = this.choseTreeData
				this.chartModalData.base = item
				this.chartModalData.date = this.$store.state.data.search.time || [moment(new Date()), moment(new Date())]
			},
			...mapActions([
				'handleChangeTableStatus',
				'handleChangeTreeStatus',
				'handleTree',
				'handlePegination'
			]),
			sortReturnSearchData (data) {
				if (data.time && data.time.length) {
					data.beginDate = data.time[0].format('YYYY-MM-DD') + ' 00:00:00'
					data.endDate = data.time[1].format('YYYY-MM-DD') + ' 23:59:59'
				} else {
					data.beginDate = moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00'
					data.endDate = moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
				}
				return data
			}
		},
		created () {
			this.handlePegination({page: 0, size: 30, reset: true})
		},
		mounted () {
			!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTreeStatus(Math.random())

		}
	}
</script>
<style lang="less">

	#readEleData {
		.singleTableSelf .table {
			height: calc(100% - 38px);
		}
	}
</style>
