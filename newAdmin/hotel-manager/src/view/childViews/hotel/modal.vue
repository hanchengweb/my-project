<template>
	<div class="content">
		<a-spin :spinning="spinning">
			<div class="box" v-for="(item,index) in data" :key="`readCollectData-topRow-${Math.random()}`">
				<a-row class="topRow" :gutter="8" type="flex" align="middle">
					<a-col :span="1">{{index}}楼</a-col>
					<a-col :span="18">
						<a-row v-for="terItem in item.terminalInfo"
							   v-if="item.terminalInfo && item.terminalInfo.length"
							   :key="`readCollectData-topRow-terminalData-${Math.random()}`">
							<a-col :span="12">终端序号:{{terItem.ammeter||'暂无'}}</a-col>
							<a-col :span="12">终端名称:{{terItem.name||'暂无'}}</a-col>
							<!--<a-col :span="4">终端地址:{{terItem.address||'暂无'}}</a-col>-->
							<!--<a-col :span="3">温度(°c)：{{terItem.temperature||'暂无'}}</a-col>-->
							<!--<a-col :span="4">烟雾告警：-->
							<!--<span v-if="terItem.smoke !==0 &&terItem.smoke!==1">无</span>-->
							<!--<i v-else class="smokeI" :class="{warnSmoke:terItem.smoke===1}"></i></a-col>-->
						</a-row>
						<a-row v-if="!item.terminalInfo"
							   :key="`readCollectData-topRow-terminalData-${Math.random()}`">
							<!--<a-col :span="4">终端序号:暂无</a-col>-->
							<!--<a-col :span="8">终端名称:暂无</a-col>-->
							<!--<a-col :span="4">终端地址:暂无</a-col>-->
							<!--<a-col :span="3">温度(°c)：暂无</a-col>-->
							<!--<a-col :span="4">烟雾告警：无</a-col>-->
						</a-row>
					</a-col>
					<a-col :span="2">房间数:{{item.roomCount}}</a-col>
					<a-col :span="2">客房数:{{item.guestRoomCount}}</a-col>
					<a-col :span="1">
						<a-icon :type="!item.hide?'up':'down'" style="cursor: pointer"
								@click="showRoomFun(index,item)"/>
					</a-col>
				</a-row>
				<a-row class="bottomRow" :gutter="16" :ref="`bottomRow${index}`" v-show="!item.hide">
					<a-col :span="3" v-for="(roomItem,i) in item.roomInfo"
						   :key="`readCollectData-topRow-rooms-${Math.random()}`"
						   class="col">
						<div class="gutterBox">
							<p class="block center">
								{{roomItem.name}} <span>({{roomItem.ammeter}})</span>
							</p>
							<!--<a-row>-->
							<!--<a-col :span="8">U:{{roomItem.u}}</a-col>-->
							<!--<a-col :span="8">I:{{roomItem.i}}</a-col>-->
							<!--<a-col :span="8">P:{{roomItem.p}}</a-col>-->
							<!--</a-row>-->

						</div>
					</a-col>
				</a-row>
			</div>
		</a-spin>
	</div>
</template>

<script>
	import {getUrlData} from '@/api/common'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		props: {
			id: '',
			name: ''
		},
		data () {
			return {
				spinning: false,
				toData: {},
				data: {},
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
		methods: {
			showRoomFun (index, item) {
				item.hide = !item.hide
				//this.chosedIndex = this.chosedIndex === index ? '' : index
				//this.subChosedIndex = ''
			},
			getData () {
				this.toData.id = this.id
				this.spinning = true
				const owner = this.name || this.$route.name.toLowerCase()
				let urldata=`h_${owner}_readRoomDisDTOs_i_get`
				if(owner==='hoteluser'){
					urldata='h_hotel_readRoomDisDTOs_i_get'
				}
				getUrlData(urldata, this.toData).then(res => {///hotel/manager/hotel/readRoomDisDTOs/{id}
					this.spinning = false
					if (res.data) {
						let data = res.data
						for (let i in data) {
							data[i].hide = false
						}
						this.data = data
					}
				}, err => {
					this.spinning = false
				})
			}
		},
		created () {
			this.id && this.getData()
		}
	}
</script>
<style lang="less">
	.content {
		color: #333;
		font-size: 12px;
		line-height: 22px;
		margin-top: 6px;
		//height: 600px;
		padding-right: 6px;
		//overflow: scroll;
		overflow-x: hidden;
		//background-color: #FAFAFA;
		.box {
			margin-bottom: 10px;
			border: 1px solid #ddd;
			overflow: hidden;

			.topRow {
				text-align: left;
				//background-color: #fff;
				padding: 10px;

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
				//margin-top: 10px;
				border-top: 1px solid #ddd;
				padding-top: 10px;

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
							//border-bottom: 1px solid #D8D8D8;
							span {
								color: #666;
							}
						}
					}

				}
			}
		}
	}

</style>
