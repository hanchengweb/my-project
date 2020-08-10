<template>
	<div id="readMissPoint">
		<commonTop :name="'遗漏点详情'"  backName="运维首页"></commonTop>
		<buttonSearch :search="search" :table="{}"
					  style="height: 42px;margin-top:5px;margin-left:-166px"></buttonSearch>
		<tabsLine :tabsJson="tabs"></tabsLine>
		<div class="content">
			<a-spin :spinning="spinning">
				<a-row :gutter="16">
					<a-col class="gutter-row" :span="3" v-for="(item,index) in list"
						   :key="`pointerBlock-${Math.random()}`"
						   @click="onClickBox(item)">
						<!--<img src="/static/img/analysis/readRoomPoint/warn.png" alt="" class="warnIcon"
							 v-if="item.normal===1"/>-->
						<p class="pointerBlock" v-if="key==='hotel'">
							<span class="block" :title="item.hotelName||'酒店名称'">{{item.hotelName||'酒店名称'}}</span><span>遗漏点个数：{{item.count}}个</span>
						</p>
						<p class="pointerBlock" v-else><span class="block">{{item.time||'时间'}}</span><span>酒店个数：{{item.hotelCount}}个</span>
						</p>
						<i class="sortNum">Q{{++index}}</i>
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
	import commonTop from '../commonTop'

	export default {
		components: {
			buttonSearch,
			tabsLine,
			commonTop
		},
		data () {
			return {
				key: 'date',
				spinning: false,
				data: {
					time: `${moment().format('YYYY-MM-DD')}`,
					noHotelIdStatus: true
				},
				topData: {},
				list: [],

				tabs: {
					noHandleTabs: true,
					change: this.tabChange,
					arr: [
						{name: '时间', key: 'date',},
						{name: '酒店', key: 'hotel',},
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
			}),

		},
		watch: {
			getSearch (val) {
				//val.date = `${val.date.format('YYYY-MM-DD')}`
				this.data.time = `${val.date.format('YYYY-MM-DD')}`
				// this.data = {...this.data, ...val}
				!val.reset && this.getData()
			},
		},
		methods: {
			disabledDate (current) {
				return current && current > moment().endOf('day')
			},
			tabChange (k) {
				this.key = k
				this.getData()
			},
			onClickBox (item) {///hotel/analysis/operationController/readByHotel
				let data = {
					hotelId: '',
					time: ''
				}
				data.hotelId = this.key === 'date' ? item.hotelIds.toString() : item.hotelId
				data.time = this.key === 'date' ? item.time : this.data.time
				data.theme = this.key
				this.$router.push({path: '/extra/readMissPointDetailHome', query: data})
			},
			getData () {
				this.spinning = true
				const url = `a_operationController_${this.key === 'hotel' ? 'readByHotel' : 'readByDate'}_get`///hotel/analysis/actual/readDatePoint

				getUrlData(url, this.data).then(res => {
					if (res && res.data) {
						/*	this.topData = res.data || {}
							this.list = res.data.rooms || res.data.dates || []*/
						this.list = res.data
					}
					this.spinning = false
				}, error => {
					this.spinning = false
				})
			}
		},
		created () {
			if (this.$route.query.date) {
				this.data.time = moment(this.$route.query.date).format('YYYY-MM-DD')
				this.search.defaultVals.date = moment(this.$route.query.date)
			}

			//this.getData()
		},
		mounted () {
			this.getData()
		}

	}
</script>
<style lang="less">
	#readMissPoint {
		height: 100%;

		.content {
			height: calc(100% - 142px);
			padding: 0 6px;
			margin-top: 9px;
			overflow-x: hidden;
			overflow-y: auto;

			.gutter-row {
				position: relative;

				.sortNum {
					position: absolute;
					bottom: 18px;
					right: 10px;
					font-size: 12px;
					font-style: normal;
					color: #b90e6c;

				}

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

					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
