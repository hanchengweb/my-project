<template>
	<div id="home">
		<div class="topPart partHeight">
			<a-row :gutter="10">
				<a-col class="colPart readMonthCurve" :span="6">
					<a-card :loading="readMonthCurve.loading||readYesterMonthCurve.loading" title="月度用电曲线"
							:bordered=false>
						<!--<p slot="extra" class="card-plus">
							月度用电<img src="/static/img/home/angle.png" alt=""/>
						</p>-->
						<div class="charts" ref="readMonthCurve"></div>
					</a-card>
				</a-col>
				<a-col class="colPart middleWarn" :span="12">
					<a-card :loading="findWarnClass.loading ||readWarnInfo.loading||readWarnStatus.loading"
							title="风险监控" :bordered=false>
						<!--							日期<img src="/static/img/home/angle.png" alt=""/>-->
						<a-date-picker slot="extra" class="card-plus" :defaultValue="date"
									   @change="onChange" :allowClear="false">
							<a-icon slot="suffixIcon" type="caret-down"/>
						</a-date-picker>
						<div class="middleWarnMain">
							<div class="charts clearfix">
								<div class="warnClass" ref="warnClass" @click="toWarnInfo"></div>
								<div class="dealPart" ref="dealPart">
									<div ref="dealChart"
										 style="height: calc(100% - 60px);width: 100%;"></div>
									<p class="allNum"><span>{{readWarnStatus.data.total||0}}</span>今日总数</p>
									<p class="info">
										<span class="block" v-for="(item,i) in getDeal.data"
											  :key="`deal-${Math.random()}`"><i :class="{'undeal':i==1}"></i>{{item.name}}:{{item.value}}</span>
									</p>

								</div>
							</div>
							<div class="bottomWarn">
								<a-row class="warn-list-title">
									<a-col :span="8">告警时间</a-col>
									<a-col :span="8">告警类型</a-col>
									<a-col :span="8">告警对象</a-col>
								</a-row>
								<div class="noData"
									 v-if="!readWarnInfo.data || (readWarnInfo.data && !readWarnInfo.data.length)">
									<p>暂无数据</p>
								</div>
								<a-carousel autoplay vertical v-else :dots="false" class="warn-carousel">
									<div class="" v-for="item in readWarnInfo.data" :key="`carousel-${Math.random()}`">
										<a-row class="warn-list-main" v-for="sub in item"
											   :key="`carousel-sub-${Math.random()}`">
											<a-col :span="8">{{sub.begintime}}</a-col>
											<a-col :span="8">{{sub.warntypeName}}</a-col>
											<a-col :span="8">{{sub.target}}</a-col>
										</a-row>
									</div>
								</a-carousel>
							</div>
						</div>
					</a-card>
				</a-col>
				<a-col class="colPart" :span="6">
					<a-card :loading="readHotel.loading" title="基本信息" :bordered=false>
						<p slot="extra" class="card-plus" @click="chooseHotel">
							酒店切换<img src="/static/img/home/angle.png" alt=""/>
						</p>
						<div class="readHotel">
							<div class="clearfix hotelName hotelCont">
								<img src="/static/img/home/hotelName.png" class="block fl" alt="">
								<p :title="readHotel.data.name||'酒店名称'">{{readHotel.data.name||'酒店名称'}}
									<span class="block" :title="readHotel.data.address||'酒店地址'">{{readHotel.data.address||'酒店地址'}}</span>
								</p>
							</div>
							<div class="clearfix hotelNum hotelCont">
								<img src="/static/img/home/hotelNum.png" class="block fl" alt="">
								<p>客房数{{readHotel.data.guestRoomCount||0}}间房 <span
									style="margin-left: 16px">房间数{{readHotel.data.roomCount||0}}</span>
								</p>
							</div>
							<div class="clearfix hotelPower hotelCont">
								<img src="/static/img/home/hotelPower.png" class="block fl" alt="">
								<p>今日累计用电量 <span style="margin-left: 16px">{{readDayPower.data.power||0}} kw/h</span>
								</p>
								<p style="font-size: 12px;margin-top: 5px">昨日累计用电量 <span style="margin-left: 16px">{{readYesterDayPower.data.power||0}} kw/h </span>
								</p>
							</div>
						</div>
					</a-card>
				</a-col>
			</a-row>
		</div>
		<div class="bottomPart partHeight">
			<a-row :gutter="10">
				<a-col class="colPart" :span="6">
					<a-card :loading="readEnergyGradeLimit.loading" title="能耗分析" :bordered=false>
						<a-select
							:value="readEnergyGradeLimit.selectValue"
							style="width: 120px"
							@change="handleChange"
							slot="extra"
							class="card-plus"
							:options="readEnergyGradeLimit.options">
							<a-icon slot="suffixIcon" type="caret-down"/>
						</a-select>
						<div class="noData"
							 v-if="!readEnergyGradeLimit.data || (readEnergyGradeLimit.data && !readEnergyGradeLimit.data.length)">
							<img src="/static/img/home/readEnergyGradeLimit.png" alt="">
							<p>暂无数据</p>
						</div>
						<div class="readEnergyGradeLimit" v-else>
							<p class="analysisTime line-title clearfix">
								<img src="/static/img/home/time.png" alt="">
								管控时间：{{readPowerGradeTime.data && readPowerGradeTime.data.analysisTime}}
							</p>

							<div class="energy-list">
								<a-row>
									<a-col :span="3">序号</a-col>
									<a-col :span="8" class="roomName">房间</a-col>
									<a-col :span="7">等级</a-col>
									<a-col :span="6">均值</a-col>
								</a-row>

								<a-row v-for="(item,i) in readEnergyGradeLimit.data"
									   :key="`readEnergyGradeLimit-${item.id}-${Math.random()}`">
									<a-col :span="3" class="num backColor"

										   :class="{'low':!readEnergyGradeLimit.selectValue}">
										<i>{{++i}}</i>
									</a-col>
									<a-col :span="8" class="name roomName">{{item.roomName}}</a-col>
									<a-col :span="7" class="name">{{item.gradeName}}</a-col>
									<a-col :span="6" class="name">{{item.pavg}}</a-col>
								</a-row>
							</div>


						</div>
					</a-card>
				</a-col>
				<a-col class="colPart" :span="6" v-for="item in analysisArr" :key="`${item}-${Math.random()}`">
					<a-card :loading="$data[item].loading" :title="$data[item].title" class="analysisArr"
							:bordered=false>
						<!--						<p>{{$data[item].data}}</p>-->
						<div
							class="noData"
							v-if="!$data[item].data.rooms||($data[item].data.rooms &&!$data[item].data.rooms.length)">
							<img :src="`/static/img/home/${item}.png`" alt="" class="block"/>
							<p>风控中…<br/>暂无需要处理的系统性风险</p>
						</div>
						<div class="hasData" v-else>
							<p class="analysisTime line-title">
								<img src="/static/img/home/time.png" alt="">风控时间：{{$data[item].data.time}}
							</p>
							<p class="analysisTime line-title">
								<img src="/static/img/home/room.png" alt="">风险程度：<span class="roomStatus">轻微</span>
							</p>
							<p class="clearfix" style="margin-bottom: 10px">
								<span class="roomItem" v-for="room in $data[item].data.rooms">{{room}}</span>
							</p>
							<p class="analysisTime line-title">
								<img src="/static/img/home/detail.png" alt="">
								<span
									class="detail">{{detailInfo[item].data||'暂无'}}</span>
							</p>
						</div>
					</a-card>
				</a-col>
				<!--<a-col class="colPart" :span="6">
					<a-card :loading="largerPowerAnalysis.loading" title="最大功率过大分析" :bordered=false>
						<p>{{$data}}</p>
					</a-card>
				</a-col>
				<a-col class="colPart" :span="6">
					<a-card :loading="powerFactorAnalysis.loading" title="功率因子分析" :bordered=false>
						<p>card content</p>
					</a-card>
				</a-col>-->
			</a-row>
		</div>
	</div>
</template>
<script>
	import {getData} from '../../api/common'
	import {mapActions, mapState} from 'vuex'
	import {isEmptyObject} from '../../libs/tool'
	import moment from 'moment'

	let echarts = require('echarts/lib/echarts'), chartMonth = '', chartWarnClass = '', chartDeal = ''
	require('echarts/lib/chart/line')
	require('echarts/lib/chart/bar')
	require('echarts/lib/chart/pie')
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	require('echarts/lib/component/legend')
	require('echarts/lib/component/dataZoom')

	export default {
		data () {
			return {
				getDeal: {
					data: [{value: 0, name: '未处理'}, {value: 0, name: '已处理'}]
				},
				date: moment(),
				isDealDone: false,
				readHotel: {
					url: 'h_hotel_readHotel_get',
					loading: true,
					toData: {
						id: '',
					},
					defaultValueData: {},
					data: {}
				},
				readDayPower: {
					url: 'a_power_readDayPower_get',
					loading: true,
					toData: {
						hotelId: '',
						date: moment().format('YYYY-MM-DD') + ' 00:00:00'
					},
					defaultValueData: {},
					data: {}
				},
				readYesterDayPower: {
					url: 'a_power_readDayPower_get',
					loading: true,
					toData: {
						hotelId: '',
						date: moment(moment().subtract(1, 'days')).format('YYYY-MM-DD') + ' 00:00:00'
					},
					defaultValueData: {},
					data: {}
				},
				findWarnClass: {
					url: 'a_warn_findWarnClass_get',
					loading: true,
					toData: {
						hotelId: '',
						beginDate: moment().format('YYYY-MM-DD') + ' 00:00:00',
						endDate: moment(moment().add(1, 'days')).format('YYYY-MM-DD') + ' 23:59:59',
						ownerId: '',
						warnOwner: '',
						warntypeCode: '',
						ownerName: ''
					},
					defaultValueData: [],
					data: []
				},
				readMonthCurve: {
					url: 'a_power_readMonthCurve_get',
					loading: true,
					toData: {
						hotelId: '',
						date: moment().format('YYYY-MM-DD')
					},
					defaultValueData: [],
					data: []
				},
				readYesterMonthCurve: {
					url: 'a_power_readMonthCurve_get',
					loading: true,
					toData: {
						hotelId: '',
						date: moment(moment().subtract(1, 'year')).format('YYYY-MM-DD')
					},
					defaultValueData: [],
					data: []
				},
				readEnergyGradeLimit: {
					url: 'a_statistics_readEnergyGradeLimit_get',
					loading: true,
					options: [{label: '低耗TOP5', value: 0}, {label: '高耗TOP5', value: 1}],
					selectValue: 0,
					sort: ['pavg,asc', 'pavg,desc'],
					toData: {
						hotelid: '',
						sort: 'pavg,asc',
						limit: 5
					},
					data: []
				},
				readWarnInfo: {
					url: 'a_warn_readWarnInfo_get',
					loading: true,
					toData: {
						hotelid: '',
						beginDate: moment().format('YYYY-MM-DD') + ' 00:00:00',
						endDate: moment().format('YYYY-MM-DD') + ' 23:59:59',
						// beginDate: '2019-05-13 00:00:00',
						// endDate: '2019-05-16 00:00:00',
						warntypeOwner: '',
						warntypeCode: '',
					},
					defaultValueData: [],
					data: []
				},
				emptyAnalysis: {
					url: 'a_statistics_emptyAnalysis_get',
					title: '空耗电分析',
					loading: true,
					toData: {
						hotelid: '',
						roomName: ''
					},
					defaultValueData: {},
					data: {}
				},
				largerPowerAnalysis: {///hotel/analysis/statistics/largerPowerAnalysis
					url: 'a_statistics_largerPowerAnalysis_get',
					title: '最大功率过大分析',
					loading: true,
					toData: {
						hotelid: '',
						roomName: ''
					},
					defaultValueData: {},
					data: {}
				},
				powerFactorAnalysis: {
					url: 'a_statistics_powerFactorAnalysis_get',///hotel/analysis/statistics/powerFactorAnalysis
					title: '功率因子分析',
					loading: true,
					toData: {
						hotelid: '',
						roomName: ''
					},
					defaultValueData: {},
					data: {}
				},
				readWarnStatus: {
					url: 'o_warn_readWarnStatus_get',////hotel/official/warn/readWarnStatus
					loading: true,
					toData: {
						hotelid: '',
						beginDate: moment().format('YYYY-MM-DD') + ' 00:00:00',
						endDate: moment().format('YYYY-MM-DD') + ' 23:59:59',
					},
					defaultValueData: {},
					data: {}
				},
				readPowerGradeTime: {
					url: 'a_statistics_readPowerGradeTime_get',////hotel/analysis/statistics/readPowerGradeTime
					loading: true,
					toData: {
						hotelid: '',
					},
					defaultValueData: {},
					data: {}
				},

				analysisArr: ['emptyAnalysis', 'largerPowerAnalysis', 'powerFactorAnalysis'],
				detailInfo: {
					emptyAnalysis: {code: 'EMPTY_ELECTRIC_DESC', data: ''},
					largerPowerAnalysis: {code: 'LARGER_MAXPOWER_DESC', data: ''},
					powerFactorAnalysis: {code: 'POWER_FACTOR_DESC', data: ''},
				}

			}
		},
		computed: {
			...mapState({
				getChoseHotel: state => state.common.choseHotel,
				getOnresize: state => state.app.onresize
			}),
		},
		watch: {
			getChoseHotel (val) {
				if (val && !isEmptyObject(val)) {
					this.createdFun()
					this.isDealDone = false
				}
			},
			getOnresize (val) {
				chartMonth && chartMonth.resize && chartMonth.resize()
				chartWarnClass && chartWarnClass.resize && chartWarnClass.resize()
				chartDeal && chartDeal.resize && chartDeal.resize()
			}
		},
		methods: {
			moment,
			...mapActions([
				'handleShowHotelChoseStatus'
			]),
			chooseHotel () {
				this.handleShowHotelChoseStatus(true)
			},
			handleChange (value) {
				this.readEnergyGradeLimit.selectValue = value
				this.readEnergyGradeLimit.toData.sort = this.readEnergyGradeLimit.sort[value]
				this.getData(this.readEnergyGradeLimit, 'readEnergyGradeLimit')
			},
			splitWarnInfoData (arr) {
				this.readWarnInfo.data = []
				if (!arr.length) return false
				let length = Math.ceil(arr.length / 3)
				for (let i = 0; i < length; i++) {
					this.readWarnInfo.data.push(arr.splice(0, 3))
				}
			},
			getData (params, key) {
				this[key].loading = true
				getData({name: params.url, data: params.toData}).then(res => {
					this[key].loading = false
					if (res.code === 200) {
						if (key === 'readWarnInfo') {
							this.splitWarnInfoData(res.data.content || this[key].defaultValueData)
						} else if (key === 'findWarnClass') {
							let arr = []
							if (!isEmptyObject(res.data)) {
								for (let k in res.data) {
									arr.push(res.data[k])
								}
							}
							this[key].data = arr

							this.$nextTick(() => {
								this.createChartWarnClass()
							})
						} else if (key === 'readWarnStatus') {
							this[key].data = res.data || this[key].defaultValueData
							this.getDeal.data[0].value = res.data.unhandle || 0
							this.getDeal.data[1].value = res.data.handle || 0

							this.$nextTick(() => {
								this.createChartDealPie()
							})
						} else {
							this[key].data = res.data || this[key].defaultValueData
						}

						if (key === 'readYesterMonthCurve' || key === 'readMonthCurve') {
							!this.readYesterMonthCurve.loading && !this.readMonthCurve.loading && this.createChartMonth()
						}
					} else {
						this[key].data = this[key].defaultValueData
					}
				}, err => {
					this[key].loading = false
					this[key].data = this[key].defaultValueData

				})
			},
			createChartDealPie () {
				if (!this.$refs.dealChart) {
					setTimeout(() => {
						this.createChartDealPie()
					}, 0)
					return false
				}
				chartDeal = echarts.init(this.$refs.dealChart)
				chartDeal.setOption({
					color: ['#52CE4F', '#55A8FF'],
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					grid: {
						left: 0,
						top: 10,
						right: 0,
						bottom: 10,
						containLabel: true
					},
					series: [
						{
							name: '处理情况',
							type: 'pie',
							hoverOffset: 5,
							radius: ['70%', '90%'],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
								},
								emphasis: {
									show: false,
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: this.getDeal.data
						}
					]
				}, true)
				this.isDealDone = true
			},
			createChartMonth () {
				if (!this.$refs.readMonthCurve) {
					setTimeout(() => {
						this.createChartMonth()
					}, 0)
					return false
				}
				let yData1 = [], yData2 = [],
					legendData = [], seriesData = [],
					years = [this.readMonthCurve.toData.date.substring(0, 4), this.readYesterMonthCurve.toData.date.substring(0, 4)]
				chartMonth = echarts.init(this.$refs.readMonthCurve)
				this.readMonthCurve.data.forEach(item => {
					yData1.push(item.power)
				})
				this.readYesterMonthCurve.data.forEach(item => {
					yData2.push(item.power)
				})
				years.forEach((item, i) => {
					legendData.push({
						name: item,
						icon: 'bar',
						textStyle: {
							fontSize: 12,
							color: '#333'
						}
					})
					seriesData.push({
						name: item,
						type: 'line',
						data: i === 0 ? yData1 : yData2,
						smooth: true,
						symbol: 'none',
					})
				})
				chartMonth.setOption({
					color: ['#059AE8', '#FFAD00'],
					xAxis: {
						data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
					},
					yAxis: {
						type: 'value',
						name: '用电量（kw/h)',
						position: 'right'
					},
					tooltip: {
						show: false
					},
					grid: {
						left: 10,
						top: 60,
						right: 15,
						bottom: 20,
						containLabel: true
					},
					legend: {
						left: '10%',
						data: legendData,
					},
					series: seriesData
				}, true)

			},
			createChartWarnClass () {

				if (!this.$refs.warnClass) {
					setTimeout(() => {
						this.createChartWarnClass()
					}, 0)
					return false
				}
				chartWarnClass = echarts.init(this.$refs.warnClass)
				let xData = [], yData = [], status = false
				this.findWarnClass.data.forEach((item, i) => {
					xData.push(item.warntypeName)
					yData.push(item.infoCount)
					status = item.count || status
				})
				chartWarnClass.setOption({
					color: ['#E66763'],
					tooltip: {
						show: false
					},
					dataZoom: [
						{
							orient: 'vertical', //水平显示
							type: 'inside',
							showDetail: false,
							show: true, //显示滚动条
							start: 0, //起始值为0%
							end: 100  //结束值为40%
						}
					],
					grid: {
						left: 10,
						top: 10,
						right: 40,
						bottom: 10,
						containLabel: true,
					},
					xAxis: {
						type: 'value',
						nameTextStyle: {
							color: '#333'
						}
					},
					yAxis: {
						type: 'category',
						axisLabel: {
							interval: 0
						},
						data: xData,
						nameTextStyle: {
							color: '#333'
						}
					},
					series: [{
						name: '直接访问',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: status ? 'inside' : 'right'
							}
						},
						data: yData
					}]
				}, true)

				/*chartWarnClass.on('click', (params) => {
					console.log(params)
					this.$router.push('/extra/warnInfoHome')
				})*/

			},
			toWarnInfo () {
				this.$router.push({path: '/extra/warnInfoHome', query: {date: this.findWarnClass.toData.beginDate}})
			},
			onChange (m, string) {
				/*this.findWarnClass.toData.endDate = string + ' 23:59:59'
				this.findWarnClass.toData.beginDate = string + ' 00:00:00'
				this.readWarnStatus.toData.endDate = string + ' 23:59:59'
				this.readWarnStatus.toData.beginDate = string + ' 00:00:00'
				this.readWarnInfo.toData.beginDate = string + ' 00:00:00'
				this.readWarnInfo.toData.endDate = string + ' 23:59:59'
				this.getData(this.findWarnClass, 'findWarnClass')
				this.getData(this.readWarnStatus, 'readWarnStatus')
				this.getData(this.readWarnInfo, 'readWarnInfo')*/
				let arr = ['findWarnClass', 'readWarnStatus', 'readWarnInfo']
				arr.forEach((key) => {
					this[key].toData.endDate = string + ' 23:59:59'
					this[key].toData.beginDate = string + ' 00:00:00'
					this.getData(this[key], key)
				})
			},
			createdFun () {
				Object.keys(this.$data).forEach(item => {
					if (this[item].url) {
						let toData = this[item].toData
						this[item].toData[toData.hasOwnProperty('hotelId') ? 'hotelId' : toData.hasOwnProperty('hotelid') ? 'hotelid' : 'id'] = this.$store.state.common.choseHotel.id
						this.getData(this[item], item)
					}
				})
			},
			getDetailInfo () {
				this.analysisArr.forEach(item => {
					getData({name: 'h_configParameter__get', data: {code: this.detailInfo[item].code}}).then(res => {
						this.detailInfo[item].data = res.data && res.data[0] && res.data[0].value || ''
					})
				})

			}

		},
		created () {
			this.getDetailInfo()
			if (this.$route.query.date) {

				let tommorrow = moment(moment(this.$route.query.date).add(1, 'days')).format('YYYY-MM-DD'),
					today = moment(this.$route.query.date).format('YYYY-MM-DD')

				this.findWarnClass.toData.endDate = `${today} 23:59:59`
				this.findWarnClass.toData.beginDate = `${today} 00:00:00`
				this.readWarnStatus.toData.endDate = `${today} 23:59:59`
				this.readWarnStatus.toData.beginDate = `${today} 00:00:00`
				this.date = moment(this.$route.query.date)
			}
			/*	this.readWarnStatus.toData.beginDate = '2019-05-14 00:00:00'
				this.readWarnStatus.toData.endDate = '2019-05-15 00:00:00'*/

		},
		updated () {
			//	!this.isDealDone && this.$refs.dealChart && this.createChartDealPie()
		},
		mounted () {
			this.createdFun()

			// setTimeout(() => {
			// 	this.createChartDealPie()
			//
			// }, 0);return false

		},
	}
</script>
<style lang="less">
	#home {
		padding: 0 10px 10px 10px;
		background: #F2F4F8;
		/*min-height: 634px;
		overflow-y: auto;*/

		.partHeight {
			height: calc(50% - 5px);

			& > .ant-row {
				height: 100%;

				.colPart {
					height: 100%;

					.ant-card {
						height: 100%;
					}
				}
			}

			&.topPart {
				margin-bottom: 10px;

			}

			&.bottomPart {
				.ant-card {
					.ant-card-body {
						padding: 16px;
						text-align: left;
					}
				}

				.line-title {
					font-size: 14px;
					color: #666;
					line-height: 24px;

					img {
						display: block;
						margin-right: 14px;
						float: left;
					}
				}
			}
		}

		.noData {
			img {
				display: block;
				margin: 20px auto 0;
			}

			p {
				line-height: 30px;
				text-align: center;
				font-size: 14px;
				margin-top: 20px;
				font-weight: 400;
				color: #333;
			}
		}

		.bottomPart {
			.readEnergyGradeLimit {
				.energy-list {
					padding-left: 8px;
					margin-top: 20px;

					.ant-row {
						line-height: 28px;
						margin-top: 10px;

						.num {
							&.low {
								&.backColor {
									i {
										background-color: #6AC155;
										border-color: #6AC155;
									}
								}
							}

							&.backColor {
								i {
									color: #fff;
									background-color: #FFAD00;
									border-color: #FFAD00;
								}
							}

							i {
								width: 20px;
								height: 20px;
								line-height: 18px;
								text-align: center;
								border: 1px solid #D8D8D8;
								display: block;
								font-style: normal;
								font-size: 12px;
								margin-top: 4px;
							}
						}

						.roomName {
							text-align: center;
						}

						.name {
							background-color: #EFF7FF;
							color: #333333;
						}
					}
				}
			}

			.analysisArr {


				.roomItem {
					width: 75px;
					height: 24px;
					line-height: 24px;
					display: block;
					margin-right: 10px;
					margin-bottom: 10px;
					padding: 0 6px;
					float: left;
					background: rgba(239, 247, 255, 1);
					color: #0084C9;
					font-size: 14px;
					text-align: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;

				}

				.line-title {
					margin-bottom: 20px;

					.detail {
						color: #333;
						font-size: 14px;
						font-weight: 500;
					}


					.roomStatus {
						width: 100px;
						height: 20px;
						line-height: 20px;
						background: rgba(253, 173, 2, 1);
						font-size: 12px;
						color: #fff;
						display: inline-block;
						text-align: center;
					}
				}
			}

		}

		.topPart {
			.middleWarn {
				.ant-card-body {
					padding: 10px 10px 0;
					height: calc(100% - 32px);

					.middleWarnMain {
						height: 100%;

						.bottomWarn {
							font-size: 12px;
							line-height: 28px;
							text-align: left;
							height: 40%;

							.warn-carousel {
								height: calc(100% - 28px);

								&.ant-carousel {
									line-height: 1;
								}

								.slick-initialized {
									height: 100%;
								}
							}

							.ant-col-6, .ant-col-9, .ant-col-8 {
								padding-left: 10px;
								line-height: 24px;

							}

							.warn-list-title {
								color: #666;
								background-color: #F3F3F3;

							}

							.warn-list-main {
								color: #333;
								border-bottom: 1px solid #eee;
								line-height: 24px;
								height: 24px;
							}
						}

						.charts {
							height: 60%;

							.warnClass {
								width: 60%;
								height: 100%;
								float: left;
								cursor: pointer;

								canvas {
									cursor: pointer;
								}
							}

							.dealPart {
								width: 40%;
								height: 100%;
								float: left;
								position: relative;

								.allNum {
									color: #333;
									font-size: 14px;
									position: absolute;
									top: calc(37% - 30px);
									width: 100%;

									span {
										color: #34475F;
										font-size: 34px;
										display: block;
										line-height: 28px;
										height: 28px;
									}

								}

								.info {
									font-size: 14px;
									color: #34475F;
									margin-top: 8px;

									i {
										display: inline-block;
										width: 14px;
										height: 14px;
										border-radius: 50%;
										background-color: #52CE4F;
										margin: -2px 6px;

										&.undeal {
											background-color: #55A8FF;

										}
									}
								}

							}
						}
					}
				}
			}

			.readMonthCurve {

				.ant-card-body {
					padding: 10px 10px 0;
					height: calc(100% - 32px);

					.charts {
						height: 100%;
					}
				}
			}

			.readHotel {
				font-size: 14px;
				color: #333;
				font-weight: 600;
				text-align: left;

				.hotelCont {
					margin-top: 30px;
					position: relative;
					padding-left: 58px;


					img {
						position: absolute;
						display: block;
						left: 0;
					}
				}


				.hotelNum {
					line-height: 42px;
				}

				.hotelName {
					font-size: 16px;
					margin-top: 0;

					p {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					span {
						font-size: 12px;
						color: #666666;
						font-weight: normal;
						margin-top: 5px;

						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

			}
		}

		.ant-card {
			.ant-card-head {
				padding: 0 13px;
				min-height: 32px;
				height: 32px;
				background: #F6F8F8;
				border-bottom-width: 0;

				.ant-card-extra {
					padding: 0;

					.card-plus {
						height: 24px;
						border: 1px solid #D8D8D8;
						font-size: 12px;
						color: #666666;
						min-width: 110px;
						line-height: 22px;
						padding-right: 30px;
						position: relative;
						cursor: pointer;

						&.ant-calendar-picker, &.ant-select {
							height: 24px !important;
							line-height: 24px;
							padding-right: 0;
							border-width: 0;
							width: 100%;

							.ant-input {
								height: 24px;
								margin-top: -6px;
								font-size: 12px;
								border-radius: 0;
								background-color: #F6F8F8;
							}
						}

						&.ant-select {
							.ant-select-selection--single {
								background-color: #F6F8F8;
								height: 24px;
								border-radius: 0;
								border-top-width: 1px;

								.ant-select-selection__rendered {
									line-height: 22px;
								}
							}
						}

						img {
							position: absolute;
							display: block;
							top: 4px;
							right: 0;
							padding: 0 8px;
							border-left: 1px solid #B6B6B6;
						}
					}
				}

				.ant-card-head-title {
					padding: 0;
					line-height: 32px;
					text-align: left;
					color: #333333;
					font-size: 14px;
				}
			}
		}
	}
</style>
