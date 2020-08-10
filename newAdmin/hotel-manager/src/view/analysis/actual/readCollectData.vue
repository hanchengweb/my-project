<template>
	<div class="" id="readCollectData">
		<buttonSearch :search="search" :table="{}"></buttonSearch>
		<div class="content">
			<a-spin :spinning="spinning">
				<div class="box" v-for="(item,index) in data" :key="`readCollectData-topRow-${Math.random()}`">
					<a-row class="topRow" :gutter="8" type="flex" align="middle">
						<a-col :span="1">{{index}}楼</a-col>
						<a-col :span="18">
							<a-row v-for="terItem in item.terminalData"
								   v-if="item.terminalData && item.terminalData.length"
								   :key="`readCollectData-topRow-terminalData-${Math.random()}`">
								<a-col :span="4">终端序号:{{terItem.ammeter||'暂无'}}</a-col>
								<a-col :span="8">终端名称:{{terItem.name||'暂无'}}</a-col>
								<a-col :span="4">终端地址:{{terItem.address||'暂无'}}</a-col>
								<a-col :span="3">温度(°c)：{{terItem.temperature||'暂无'}}</a-col>
								<a-col :span="4">烟雾告警：
									<span v-if="terItem.smoke !==0 &&terItem.smoke!==1">无</span>
									<i v-else class="smokeI" :class="{warnSmoke:terItem.smoke===1}"></i></a-col>
							</a-row>
							<a-row v-if="!item.terminalData"
								   :key="`readCollectData-topRow-terminalData-${Math.random()}`">
								<!--<a-col :span="4">终端序号:暂无</a-col>-->
								<!--<a-col :span="8">终端名称:暂无</a-col>-->
								<!--<a-col :span="4">终端地址:暂无</a-col>-->
								<!--<a-col :span="3">温度(°c)：暂无</a-col>-->
								<!--<a-col :span="4">烟雾告警：无</a-col>-->
							</a-row>
						</a-col>
						<a-col :span="2">房间数:{{item.roomCount}}</a-col>
						<a-col :span="2">客房数:{{item.guestRoom}}</a-col>
						<a-col :span="1">
							<a-icon :type="chosedIndex===index?'up':'down'" style="cursor: pointer"
									@click="showRoomFun(index,item)"/>
						</a-col>
					</a-row>
					<a-row class="bottomRow" :gutter="16" :ref="`bottomRow${index}`" v-show="!item.hide">
						<a-col :span="3" v-for="(roomItem,i) in item.rooms"
							   :key="`readCollectData-topRow-rooms-${Math.random()}`"
							   class="col"
							   :class="{active:(subChosedIndex)===(i)}"
							   @click="showModal(i,roomItem,item)">
							<div class="gutterBox">
								<p class="block center">
									{{roomItem.roomName.substring(0,5)}} <span>({{roomItem.ammeter}})</span>
								</p>
								<a-row>
									<a-col :span="8">U:{{roomItem.u}}</a-col>
									<a-col :span="8">I:{{roomItem.i}}</a-col>
									<a-col :span="8">P:{{roomItem.p}}</a-col>
								</a-row>

							</div>
						</a-col>
					</a-row>
				</div>
			</a-spin>
		</div>
	</div>
</template>
<script>
	import {getUrlData} from '@/api/common'
	import buttonSearch from '@/components/buttonSearch/buttonSearch'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		components: {
			buttonSearch
		},
		data () {
			return {
				spinning: false,
				search: {
					defaultVals: {
						date: moment(new Date())
					},
					nameArray: [{
						name: '时间', type: 'date', spans: '6', dataIndex: 'date'
					},]
				},
				toData: {
					date: `${moment(new Date()).format('YYYY-MM-DD')} 00:00:00`,
					hotelid: ''
				},
				data: [],
				chosedIndex: '',
				subChosedIndex: '',
				colums: {
					name: {
						name: '终端名称',
					},
					address: {
						name: '终端地址',
					},
					ammeter: {
						name: '终端序号'
					},
					temperature: {
						name: '温度(°c)：'
					},
					smoke: {
						name: '烟雾告警:'
					}
				},
				labels: {
					roomName: '房间号',
					t: '数据时间',
					i: '电流（AM)',
					u: '电压(V)',
					p: '功率(w)',
					q: '累计电量'
				}
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
				val.date = val.date ?`${val.date.format('YYYY-MM-DD')} 00:00:00` : ''
				this.toData = {...this.toData, ...val}
				this.getData()
			},
			getChoseHotel (val) {
				val && !isEmptyObject(val) && this.getData()
			}
		},
		methods: {
			showRoomFun (index, item) {
				item.hide = !item.hide
				//this.chosedIndex = this.chosedIndex === index ? '' : index
				//this.subChosedIndex = ''
			},
			showModal (i, room, item) {
				this.subChosedIndex = i
				this.$self_modal({title: '详情', data: {labels: this.labels, data: room}})
			},
			getData () {
				this.spinning = true
				getUrlData('a_actual_readCollectData_get', this.toData).then(res => {
					this.spinning = false
					if (res.data) {
						this.data = res.data
					}
				}, err => {
					this.spinning = false
				})
			}
		},
		created () {

			!isEmptyObject(this.$store.state.common.choseHotel) && this.getData()

		}
	}
</script>
<style lang="less">
	#readCollectData {
		color: #333;
		font-size: 12px;
		line-height: 22px;

		.content {
			margin-top: 6px;
			height: calc(100% - 42px);
			padding-right: 6px;
			overflow: scroll;
			overflow-x: hidden;
			.box {
				margin-bottom: 10px;
				.topRow {
					text-align: left;
					background-color: #fff;
					padding: 10px 5px;
					.smokeI {
						display: inline-block;
						width: 12px;
						height: 12px;
						border-radius: 50%;
						background-color: #64CA00;
						margin: -2px 0;
						&.warnSmoke {
							background-color: #ED4D4D;
						}

					}
				}
				.bottomRow {
					margin-top: 10px;
					.col {
						cursor: pointer;
						&.active {
							.gutterBox {
								background-color: #0ACAC7;
								color: #fff;
								p {
									border-bottom-color: #fff;
									span {
										color: #fff;
									}
								}
							}
						}
						.gutterBox {
							background-color: #fff;
							line-height: 24px;
							margin-bottom: 10px;
							p {
								border-bottom: 1px solid #D8D8D8;
								span {
									color: #666;
								}
							}
						}

					}
				}
			}
		}
	}
</style>
