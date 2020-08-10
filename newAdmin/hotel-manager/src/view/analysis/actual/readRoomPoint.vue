<template>
	<div id="readRoomPoint">
		<buttonSearch :search="search" :table="{}"></buttonSearch>
		<tabsLine :tabsJson="tabs"></tabsLine>
		<div class="content">
			<a-spin :spinning="spinning">
				<p class="info" v-if="key==='room'"> 截止到{{topData.endtime}}&nbsp;&nbsp;应有点位数<span>{{topData.count||topData.roomCount||0}}</span>个&nbsp;&nbsp;疑似问题房间数：<span>{{topData.unnormal||0}}</span>个
				</p>
				<p class="info" v-else> 应有房间数
					<span>{{topData.count||topData.roomCount||0}}</span>个&nbsp;&nbsp;截止到{{topData.endtime}}&nbsp;&nbsp;疑似问题点位数：<span>{{topData.unnormal||0}}</span>个
				</p>
				<a-row :gutter="16">
					<a-col class="gutter-row" :span="3" v-for="item in list" :key="`pointerBlock-${Math.random()}`"
						   @click="onClickBox(item)">
						<img src="/static/img/analysis/readRoomPoint/warn.png" alt="" class="warnIcon"
							 v-if="item.normal===1"/>
						<p class="pointerBlock" v-if="key==='room'"><span class="block">{{item.roomName}}</span><span>点位数：{{item.actualCount}}个</span>
						</p>
						<p class="pointerBlock" v-else><span class="block">{{item.time}}</span><span>房间数：{{item.actualCount}}个</span>
						</p>
					</a-col>
				</a-row>
			</a-spin>
		</div>
	</div>
</template>
<script>

	import buttonSearch from '@/components/buttonSearch/buttonSearch'
	import tabsLine from '@/components/tabsLine/tabsLine'
	import {mapActions, mapState} from 'vuex'
	import {getUrlData} from '../../../api/common'
	import {isEmptyObject} from '../../../libs/tool'
	import moment from 'moment'

	export default {
		components: {
			buttonSearch,
			tabsLine
		},
		data () {
			return {
				key: 'date',
				spinning: false,
				data: {
					date: `${moment(new Date()).format('YYYY-MM-DD')} 00:00:00`,
					hotelid: ''
				},
				topData: {},
				list: [],

				tabs: {
					noHandleTabs: true,
					change: this.tabChange,
					arr: [
						{name: '时间', key: 'date',},
						{name: '房间', key: 'room',},
					]
				},
				search: {
					defaultVals: {
						date: moment(new Date())
					},
					nameArray: [{
						name: '时间', type: 'date', spans: '6', dataIndex: 'date',
						disabledDate: this.disabledDate
					},]
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
				val.date = val.date ? `${val.date.format('YYYY-MM-DD')} 00:00:00` : ''
				this.data = {...this.data, ...val}
				!val.reset && this.getData()
			},
			getChoseHotel (val) {
				val && !isEmptyObject(val) && this.getData()
			}
		},
		methods: {
			disabledDate (current) {
				return current && current > moment().endOf('day')
			},
			tabChange (k) {
				this.key = k
				this.getData()
			},
			onClickBox (item) {
				const url = `a_actual_${this.key === 'room' ? 'readRoomPoint' : 'readDatePoint'}_${this.key}_get`
				let data = {date: this.data.date, hotelId: '', roomid: item.rid},
					title = this.key === 'room' ? `房间号:${item.roomName}` : `时间:${item.time}`

				if (this.key === 'date') data.date = item.time + ':00'
				getUrlData(url, data).then(res => {
					this.$self_modal({
						title: title, type: 'table', hideFooter: true, data: {
							columns: [
								{title: '房间名称', dataIndex: 'roomName', align: 'center'},
								{title: '时间', dataIndex: 't', width: '16%', align: 'center'},
								{title: '电压', dataIndex: 'u', width: '16%', align: 'center'},
								{title: '电流', dataIndex: 'i', width: '16%', align: 'center'},
								{title: '功率', dataIndex: 'p', width: '16%', align: 'center'},
								{title: '累计电量', dataIndex: 'q', width: '16%', align: 'center'},
							],
							data: res.data || [],
							scroll: {y: 400}
						}
					})
				})
			},
			getData () {
				this.spinning = true
				const url = `a_actual_${this.key === 'room' ? 'readRoomPoint' : 'readDatePoint'}_get`///hotel/analysis/actual/readDatePoint

				getUrlData(url, this.data).then(res => {
					if (res && res.data) {
						this.topData = res.data || {}
						this.list = res.data.rooms || res.data.dates || []
					}
					this.spinning = false
				}, error => {
					this.spinning = false
				})
			}
		},
		created () {
			if (this.$route.query.date) {
				this.data.date = `${this.$route.query.date} 00:00:00`
				this.search.defaultVals.date = moment(this.$route.query.date)
			}

			!isEmptyObject(this.$store.state.common.choseHotel) && this.getData()
			//this.getData()
		}

	}
</script>
<style lang="less">
	#readRoomPoint {
		height: 100%;

		.content {
			height: calc(100% - 92px);
			padding: 0 6px;
			overflow-x: hidden;
			overflow-y: scroll;

			.gutter-row {
				position: relative;

				.warnIcon {
					position: absolute;
					right: 10px;
					top: 2px;
				}
			}

			.info {
				font-size: 12px;
				color: #333;
				text-align: left;
				line-height: 30px;

				span {
					font-size: 14px;
					color: #FF0000;
				}
			}
		}

		.pointerBlock {
			background-color: #fff;
			font-size: 14px;
			width: 100%;
			margin-bottom: 16px;
			cursor: pointer;

			span {
				display: block;
				line-height: 45px;

				&:first-child {
					font-size: 12px;
					line-height: 34px;
					border-bottom: 1px solid #F4F4F4;
				}
			}
		}
	}
</style>
