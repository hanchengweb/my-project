<template>
	<div id="operationHome">
		<div class="buttonSearch">
			<!--			<buttonSearch :search="search" :table="{}" class="buttonSearchHome"></buttonSearch>-->
			<span class="name">日期:</span>
			<a-date-picker @change="dateChange" :value="date" :allowClear="false"/>
		</div>

		<div class="topPart clearfix">
			<!--<div class="item clearfix">
				<div class="img fl">
					<img src="/static/img/operationHome/11.png" alt="">
				</div>
				<div class="fl cont readHotel">
					<a-skeleton :loading="readHotel.loading" :paragraph="{rows:2}">
						<div>
							<p class="name f-16" :title="readHotel.data.name">{{readHotel.data.name||'酒店名称'}}</p>
							<p class="address f-12" :title="readHotel.data.address">
								{{readHotel.data.address||'酒店地址'}}</p>
							<p class="number f-18">客房数{{readHotel.data.guestRoomCount||0}}间房
								<span class="f-14 block clearfix">房间数{{readHotel.data.roomCount||0}}
									<a-button class="fr" :size="'small'" @click="toRoomInfo">房间分布</a-button>
								</span>
							</p>
						</div>
					</a-skeleton>
				</div>
			</div>-->
			<div class="item" v-for="(item,key) in topArrData" :key="`${item.name}-${Math.random()}`"
				 @click="toDetail(item)">
				<div class="img fl">
					<img :src="`/static/img/operationHome/${key}.png`" alt="">
				</div>

				<div class="fl cont other">
					<a-skeleton :loading="topArrData[key].loading" :paragraph="{rows:2}">
						<div class="tableCell">
							<p>{{item.name}}：<span>{{item.data.count||0}}</span>个</p>
							<p>涉及酒店：<span>{{item.data.hotelCount||0}}</span>家</p>
						</div>
					</a-skeleton>
				</div>
			</div>
		</div>
		<div class="bottomPart">
			<div class="selection clearfix">
				<p class="fl leftCont">定时任务监控详情
					<a-select @change="selectChange" :value="bottomData.toData.sign"
							  :options="bottomData.options"></a-select>
				</p>
				<p class="fr rightCont">
					<span><img src="/static/img/operationHome/01.png"
							   alt="">调度任务数：{{bottomData.data.jobNumber||0}}</span>
					<span><img src="/static/img/operationHome/01.png"
							   alt="">总执行数：{{bottomData.data.executeTotal||0}}</span>
					<span><img src="/static/img/operationHome/01.png"
							   alt="">总失败数：{{bottomData.data.failTotal||0}}</span>
				</p>
			</div>
			<a-skeleton :loading="bottomData.loading">
				<div class="list" v-if="bottomData.data && bottomData.data.data && bottomData.data.data.length">
					<a-row v-for="item in bottomData.data.data" :key="`bottom-row-${Math.random()}`">
						<a-col :span="6" class="name col">{{item.desc||'任务名称'}}</a-col>
						<a-col :span="4" class="col">
							<img src="/static/img/operationHome/21.png" alt="">
							调用周期：<span class="number">{{item.cron}}</span>
						</a-col>
						<a-col :span="4" class="col">预期执行数：<span class="number">{{item.exceptTimes}}</span></a-col>
						<a-col :span="4" class="col">
							<img src="/static/img/operationHome/22.png" alt="">
							执行数：<span class="number">{{item.executeTimes}}</span>
						</a-col>
						<a-col :span="3" class="col">失败数：<span class="number">{{item.failTimes}}</span></a-col>
						<a-col :span="3" class="col">成功率：<span class="number">{{item.rate}}</span></a-col>
					</a-row>
				</div>
			</a-skeleton>
		</div>
		<!--<div class="rightFixed">
			<p class="date" :class="{'showDatePicker':showDateStatus}">
				<img src="/static/img/operationHome/31.png" alt="">日期查询
				<a-date-picker class="datePicker" @openChange="openChange" @change="dateChange" :value="date"

							   ref="datePicker"/>
			</p>
			<p @click="toRoomInfo"><img src="/static/img/operationHome/32.png" alt="">房间分布</p>
		</div>-->
	</div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
// import buttonSearch from '@/components/buttonSearch/buttonSearch'
import {getData} from '../../api/common'
import {isEmptyObject} from '../../libs/tool'
import moment from 'moment'

export default {
  components: {
    // buttonSearch,
  },
  data () {
    return {
      showDateStatus: false,
      date: moment(),
      bottomData: {
        loading: true,
        options: [{// 任务类型(day;日作业任务,month:月作业任务)
          value: 'day', label: '日作业任务'
        }, {
          value: 'month', label: '月作业任务'
        }],
        toData: {
          time: '',
          sign: 'day',
          noHotelIdStatus: true
        },
        data: {},
        url: 'a_operationController_readSchedulerDetail_get' /// hotel/analysis/OperationController/readSchedulerDetail
      },
      topArrData: {
        statisticsMissPoint: {
          data: {},
          name: '采集点遗漏数',
          loading: true,
          route: {
            path: '/extra/readMissPointHome'
          }
        },
        statisticsIllegal: {
          data: {},
          name: '异常电量的房间数',
          loading: true,
          route: {
            path: '/extra/readErrorPointHome'
          }
        },
        statisticsDisconnectNet: {
          data: {},
          name: '链路异常数',
          loading: true,
          route: {
            path: '/extra/readDisconnectNetHome'
          }
        },
        statisticsWarn: {
          data: {},
          name: '告警数',
          loading: true,
          route: {
            path: '/extra/readWarnInfoHome'
          }
        }
      },
      topData: {
        url: 'a_OperationController_',
        toData: {
          time: moment().format('YYYY-MM-DD'),
          noHotelIdStatus: true
        },
        data: {}
      }
      /* readHotel: {
					url: 'h_hotel_readHotel_get',
					loading: true,
					toData: {
						id: '',
					},
					defaultValueData: {},
					data: {}
				}, */

    }
  },
  created () {
    this.getTopArrData()
    this.getBottomData()
    // this.readHotelData()
  },
  methods: {
    selectChange (value) {
      this.bottomData.toData.sign = value
      this.getBottomData()
    },
    dateChange (date, str) {
      this.date = date
      this.getTopArrData()
      this.getBottomData()
    },
    getBottomData () {
      this.bottomData.loading = true
      this.bottomData.toData.time = this.date.format('YYYY-MM-DD')
      getData({name: this.bottomData.url, data: this.bottomData.toData}).then(res => {
        this.bottomData.loading = false
        if (res.code === 200) {
          this.bottomData.data = res.data
        }
      }, err => {
        this.bottomData.loading = false
      })
    },
    getTopArrData () {
      this.topData.toData = {
        time: this.date.format('YYYY-MM-DD'),
        noHotelIdStatus: true
      }

      Object.keys(this.topArrData).forEach(item => {
        this.topArrData[item].loading = true
        getData({name: `a_operationController_${item}_get`, data: this.topData.toData}).then(res => {
          this.topArrData[item].loading = false
          if (res.code === 200) {
            this.topArrData[item].data = res.data
          }
        }, err => {
          this.topArrData[item].loading = false
        })/// hotel/analysis/OperationController/
      })
    },
    toRoomInfo () {
      this.$router.push({path: '/extra/roomInfoHome', query: {id: this.$store.state.common.choseHotel.id}})
    },
    openChange (status) {
      this.showDateStatus = status
    },
    toDetail (item) {
      if (item.route) {
        this.$router.push({...item.route, query: {date: this.date.format('YYYY-MM-DD')}})
      }
    }
  }
}
</script>
<style lang="less">
	#operationHome {
		padding: 0 6px;
		position: relative;

		.buttonSearch {
			overflow: hidden;
			margin-bottom: 4px;
			background-color: #fff;
			padding: 4px 10px;
			text-align: left;

			.name {
				color: #666;
				font-size: 14px;
				margin-right: 10px;
			}

			.ant-calendar-picker {
				input {
					height: 28px;
				}
			}

		}

		p {
			margin-bottom: 0;
		}

		.rightFixed {
			position: absolute;
			top: 0;
			right: 0;

			p {
				width: 100px;
				font-size: 12px;
				text-align: center;
				color: #fff;
				background-color: #FDAD02;
				margin-bottom: 4px;
				cursor: pointer;
				padding: 10px 0;
				position: relative;
				-webkit-transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
				transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
				transition-property: width, background, padding;
				transition-duration: 0.3s, 0.3s, 0.15s;
				transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1);
				transition-delay: 0s, 0s, 0s;

				&.showDatePicker {
					width: 280px;

					.datePicker {
						top: 100%;
					}

				}

				.datePicker {
					opacity: 0;
					position: absolute;
					top: 0;
					width: 100%;
					height: 100%;
					left: 0;
					z-index: 10;

					div {
						width: 100%;
						height: 100%;

						input {

							width: 100%;
							height: 100%;
						}

					}

				}

				img {
					display: block;
					margin: 0 auto 6px;

				}
			}
		}

		.bottomPart {
			padding: 0 20px;
			background-color: #fff;
			height: calc(100% - 144px);

			.list {
				text-align: left;
				font-size: 12px;
				color: #333;

				.ant-row {
					border-bottom: 1px solid #D8D8D8;

					.col {
						line-height: 40px;

						&.name {
							padding-left: 10px;
							color: #0084C9;
							font-size: 14px;
						}

						.number {
							color: #0ACAC7;
						}

						img {
							margin: -9px 8px;
						}
					}
				}

			}

			.selection {
				font-size: 14px;
				color: #696969;
				padding: 10px 0;
				border-bottom: 1px solid #D8D8D8;
				margin-bottom: 5px;

				.ant-select {
					margin-left: 10px;

					.ant-select-selection--single {
						border-radius: 32px;
						padding-right: 30px;

					}
				}

				.rightCont {
					color: #0084C9;

					span {
						display: inline-block;
						line-height: 32px;
						margin-right: 40px;

						&:last-child {
							margin-right: 20px;
						}

						img {
							margin: -9px 6px;
						}
					}
				}
			}
		}

		.topPart {
			width: 100%;
			padding: 10px;
			background-color: #fff;
			height: 140px;
			color: #0084C9;
			margin-bottom: 4px;

			.item {
				width: calc(25% - 8px);
				height: 100%;
				display: block;
				float: left;
				border: 1px solid #F4F4F4;
				margin-right: 10px;
				cursor: pointer;

				&:last-child {
					margin-right: 0;
				}

				.cont {
					width: 65%;
					overflow: hidden;
					padding: 8px 10px;

					&.other {
						height: 100%;
						display: table;

						.tableCell {
							display: table-cell;
							vertical-align: middle;
						}

						p {

							font-size: 15px;
							line-height: 30px;
							text-align: left;

							&:first-child {
								padding-bottom: 4px;
								margin-bottom: 4px;
								border-bottom: 1px solid #eee;

							}

							span {
								font-size: 20px;
								color: #0ACAC7;
								margin-right: 6px;
							}
						}
					}

					&.readHotel {
						text-align: left;
						cursor: pointer;

						p {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							margin-bottom: 0;
						}

						.name {
							font-size: 16px;
							line-height: 28px;
						}

						.address {
							font-size: 12px;
							color: #666;
							padding: 2px 0;
							line-height: 20px;
							margin-top: 3px;
							//border-bottom: 1px solid #F4F4F4;
						}

						.number {
							font-size: 14px;
							line-height: 24px;
							margin-top: 2px;

							span {
								font-size: 12px;

								.ant-btn {
									color: #2dd6ce;
									border-color: #2dd6ce;
									border-radius: 24px;
									font-size: 12px;
								}
							}
						}
					}
				}

				.img {
					height: 100%;
					background-color: #F4F4F4;
					width: 35%;
					float: left;

					img {
						display: block;
						margin: 0 auto;
						padding-top: 32px;

					}
				}
			}
		}
	}
</style>
