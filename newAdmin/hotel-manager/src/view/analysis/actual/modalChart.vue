<template>
	<a-modal
		class="modalChart"
		v-model="visible"
		:title="title"
		:width="modalWidth"
		:centered="true"
		:footer="null"
		@cancel="onCancel"
		:destroyOnClose="true">
		<searchSelf :search="search" class="searchSelf"></searchSelf>
		<div class="clearfix rooms">
			<p class="fl" v-for="(color,index) in colors" :key="`rooms-color-${color}`">
				<i :style="`background-color:${color}`"></i>房间:
				<span v-if="index==0">{{chartData.data && chartData.data.name||'房间名称'}}</span>
				<a-input v-else></a-input>
			</p>
		</div>
		<div class="chart" ref="chart" style="height: 500px;"></div>
	</a-modal>
</template>
<script>
	import searchSelf from '@/components/search/search'
	import {isEmptyObject} from '@/libs/tool'
	import moment from 'moment'
	import {date} from './test'
	import {getUrlData} from '@/api/common'

	let echarts = require('echarts/lib/echarts')
	require('echarts/lib/chart/line')
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')

	export default {
		components: {
			searchSelf
		},
		data () {
			return {
				title: '默认',
				modalWidth: '',
				visible: false,
				data: {
					beginDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), //HH:mm:ss
					endDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
					roomid: '',
					hotelid: ''
				},
				seriesData: {
					name: '功率',
					type: 'line',
					stack: '总量',
					data: [],
					symbol: 'none',
					lineStyle: {
						color: '#ED4D4D'
					}
				},
				date: [],
				search: {
					isShowHigh: false,
					type: 'extra',
					sortReturnSearchData: this.sortReturnSearchData,
					sortReturnSearchResetData: this.sortReturnSearchData,
					defaultVals: {
						time: [moment(new Date()), moment(new Date())]
					},
					nameArray: [{
						name: '起止时间',
						type: 'timeRange',
						spans: '18',
						dataIndex: 'time',
						start: moment(new Date()),
						end: moment(new Date())
					}]
				},
				colors: ['#ED4D4D']

			}
		},
		props: {
			chartData: {},
		},
		watch: {
			chartData (val) {
				if (val && !isEmptyObject(val)) {
					this.data.roomid = val.r
					this.search.defaultVals.time = val.date
				}
			},
		},
		methods: {
			onCancel () {
				this.$emit('hide-modal', false)
			},
			sortYData (data) {
				let arr = [], dates = []
				for (let i in data) {
					dates.push(i)
					arr.push(data[i])
				}
				this.date = dates
				return arr
			},
			sortReturnSearchData (data) {
				if (data.time && data.time.length) {
					this.data.beginDate = data.time[0].format('YYYY-MM-DD HH:mm:ss')
					this.data.endDate = data.time[1].format('YYYY-MM-DD HH:mm:ss')
				} else {
					this.data.beginDate = moment(this.chartData.date[0]).format('YYYY-MM-DD HH:mm:ss')
					this.data.endDate = moment(this.chartData.date[1]).format('YYYY-MM-DD HH:mm:ss')
				}
				this.getData()
				return data
			},
			getData () {
				if (!this.chartData.url) return false
				const url = `a_actual_${this.chartData.url}_get`
				getUrlData(url, this.data).then(res => {
					this.date = res.data.date
					if (res && res.data && res.data.data) {
						this.seriesData.data = this.sortYData(res.data.data)
					}
					window.setTimeout(() => {
						this.createChart()
					}, 0)

				})
			},
			createChart () {
				let chart = echarts.init(this.$refs.chart)
				const date1 = this.date
				chart.setOption({
					xAxis: {
						data: this.date
					},
					yAxis: {
						type: 'value'
					},
					tooltip: {
						trigger: 'axis'
					},
					series: [this.seriesData]
				}, true)
			}
		},
		created () {
			this.visible = true
			this.modalWidth = document.body.clientWidth * .8 + 'px'
			this.title = this.chartData.base.name
			this.search.defaultVals.time = this.chartData.date
			this.search.nameArray[0].start = this.chartData.date[0]
			this.search.nameArray[0].end = this.chartData.date[1]
			this.data.beginDate = this.chartData.date[0].format('YYYY-MM-DD HH:mm:ss')
			this.data.endDate = this.chartData.date[1].format('YYYY-MM-DD HH:mm:ss')
			this.data.roomid = this.chartData.data.id

			this.getData()
		},
		mounted () {
		}
	}
</script>
<style lang="less">
	.modalChart {
		.ant-modal-body {
			padding: 0;
		}
		.searchSelf {
			padding-bottom: 30px;
			padding-left: 20px;
			border-bottom: 1px solid #F3F3F3;
		}
		.chart {

		}
		.rooms {
			padding: 10px 44px;
			p {
				display: block;
				font-size: 12px;
				color: #333;
				margin-right: 30px;
				.ant-input {
					height: 22px;
					line-height: 20px;
					width: 80px;
					margin-left: 4px;
					font-size: 12px;
				}
				span {
					margin-left: 4px;

				}
				i {
					display: inline-block;
					width: 16px;
					height: 8px;
					border-radius: 2px;
					background-color: #ddd;
					margin-right: 5px;
				}
			}
		}
		.ant-modal-close-x {
			color: #fff;
			height: 38px;
			line-height: 38px;
		}
		.ant-modal-close {
			height: 38px;
			line-height: 38px;
		}
		.ant-modal-header {
			background: #0ACAC7;
			border-bottom-width: 0;
			padding: 8px 24px;
			.ant-modal-title {
				color: #fff;

			}
		}
	}
</style>
