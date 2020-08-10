<template>
	<div class="warnInfo-common">
		<a-spin :spinning="loading">
			<p class="topName " ref="topName">
				<span
					v-for="warn in findWarnClass.data"
					@click="topWarnClick(warn)"
					:class="{chosed:warn.warntypeCode===chosedWarn.warntypeCode}"
					:key="`warn-${warn.id}-${Math.random()}`">
					<img
						:src="`/static/img/common/warnInfo/${warn.warntypeCode}${warn.warntypeCode===chosedWarn.warntypeCode&&'C'||''}.png`"
						alt="">
					{{warn.warntypeName}}: <i>{{warn.infoCount||0}}/{{warn.dataCount||0}}</i>
				</span>
			</p>
		</a-spin>
		<singleTable :table="searchTable.table" :search="searchTable.search" ref="warnInfoCommonTable"
					 class="warnInfo-common-table"></singleTable>

	</div>
</template>
<script>
	import moment from 'moment'
	import singleTable from '@/components/singleTable/singleTable'
	import {getUrlData} from '../../../api/common'
	import {mapActions, mapState} from 'vuex'
	import {isEmptyObject} from '../../../libs/tool'
	import {getConst} from '../../../api/hotelConst'

	export default {
		components: {
			singleTable
		},
		data () {
			return {
				loading: true,

				findWarnClass: {
					url: 'a_warn_findWarnClass_get',
					loading: true,
					toData: {
						hotelId: '',
						beginDate: moment().format('YYYY-MM-DD') + ' 00:00:00',
						endDate: moment().format('YYYY-MM-DD') + ' 23:59:59',
						ownerId: '',
						warnOwner: '',
						warntypeCode: '',
						ownerName: ''
					},
					defaultValueData: [],
					data: []
				},
				chosedWarn: {},
				ownerData: {},

				searchTable: {
					table: {
						url: 'a_warn_readWarnInfoData_get',///hotel/analysis/warn/readWarnInfoData
						type: 'main',
						baseData: [],
						noDataShowStatus: false,
						keyName: 'ii',
						tableSlot: ['expandedRowRender'],
						slotName: {expandedRowRender: 'description'},
						expand: this.expand,
						data: {
							beginDate: moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
							endDate: moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59',
							hotelid: '',
							warntypeOwner: '',
							warntypeCode: '',
							ownerName: '',
							page: '0',
							size: '10'
						},
						hideButtonSearch: true,
						banDblClick: true,
						x: 5320,
						urls: {},
						sortReturnData: this.sortReturnData,
						columns:
							[
								{title: '告警时间', dataIndex: 'begintime', width: 180, align: 'center'},
								{title: '告警归属', dataIndex: 'warntypeOwnerName', width: 120, align: 'center'},
								{title: '告警类型', dataIndex: 'warntypeName', width: 180, align: 'center'},
								{title: '告警对象', dataIndex: 'ownerName', width: 140, align: 'center'},
								// {title: '酒店名称', dataIndex: 'hotelName', width: 520},
								// {title: 'mac地址', dataIndex: 'mac', width: 180},
								// {title: '终端名称', dataIndex: 'terminalName', width: 380},
								// {title: '房间名称', dataIndex: 'roomName', width: 380},
								// {title: '告警类型编码', dataIndex: 'warntypeCode', width: 180},
								{title: '消息是否发送', dataIndex: 'notifyingName', width: 120, align: 'center'},
								{title: '告警详情', dataIndex: 'info', width: 400},
								{title: '告警详细说明', dataIndex: 'details', width: 400},
							],
						buttons: {},
						//hidePaginationPart: true
					},
					search: {}
				},
			}
		},

		computed: {
			...mapState({
				getPegination: state => state.data.pegination,
				getSearch: state => state.data.search,
				getChoseHotel: state => state.common.choseHotel,
				getOnresize: state => state.app.onresize
			}),
		},
		watch: {
			getOnresize () {
				this.getHeight()
			},
			getChoseHotel (val) {
				val && !isEmptyObject(val) && this.getFindWarnClass(true)
			},
			getSearch (val) {

				this.searchTable.table.data = {...this.searchTable.table.data, ...val, warntypeOwner: val.warnOwner}
				this.searchTable.table.baseData = []

				/*this.findWarnClass.toData.beginDate = val.beginDate
				this.findWarnClass.toData.endDate = val.endDate
				this.findWarnClass.toData.warntypeCode = val.type
				this.findWarnClass.toData.warnOwner = val.owner*/

				this.findWarnClass.toData = {...this.findWarnClass.toData, ...val}
				this.findWarnClass.toData.ownerId = ''

				!val.reset && this.getFindWarnClass(true)

				//!val.reset && this.changeStatus()
			},
			getPegination (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			},
			chosedWarn (val) {

			}
		},
		methods: {
			...mapActions([
				'handleChangeTableStatus',
			]),
			expand (expanded, record, type) {
				if (!expanded) return false
				this.findWarnClass.toData.ownerId = record.ownerId
				this.getFindWarnClass(false, record)
			},
			changeStatus () {
				!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
			},
			getOwner () {
				getConst('owner').then(res => {
					res.length && res.forEach(item => {
						this.ownerData[item.value] = item.name
					})
				})
			},
			sortReturnData (data) {
				data && data.length && data.forEach((item, i) => {
					data[i].notifyingName = ['不发送', '发送'][item.notifying]
					data[i].warntypeOwnerName = this.ownerData[item.warntypeOwner]
					data[i].description = ''
				})
				return data
			},
			getFindWarnClass (status, record) {
				this.loading = status
				this.findWarnClass.toData.hotelId = this.$store.state.common.choseHotel.id
				getUrlData(this.findWarnClass.url, this.findWarnClass.toData).then(res => {
					let arr = []
					this.loading = false
					/*if (res.code !== 200) {

						return false
					}*/
					if (res.code === 200 && !isEmptyObject(res.data)) {
						for (let i in res.data) {
							arr.push(res.data[i])
						}
					}

					if (status) {
						this.findWarnClass.data = arr || []
						this.chosedWarn = arr[0] || {}
						this.searchTable.table.noDataShowStatus = isEmptyObject(this.chosedWarn)

						this.searchTable.table.data.warntypeCode = this.chosedWarn.warntypeCode || ''
						this.changeStatus()

						this.$nextTick(() => {
							this.getHeight()
						})

					} else {
						record.description = ''
						arr.length && arr.forEach(item => {
							record.description += `${item.warntypeName} : <span style="color: red;margin:0 10px 0 4px">${item.infoCount}/${item.dataCount} ;</span>`
						})
					}

				}, err => {
					this.loading = false
				})
			},
			topWarnClick (warn) {
				this.chosedWarn = warn
				this.searchTable.table.data.warntypeCode = warn.warntypeCode
				this.changeStatus()
			},
			getHeight () {
				setTimeout(() => {
					if (this.$refs.warnInfoCommonTable && this.$refs.warnInfoCommonTable.$el && this.$refs.warnInfoCommonTable.$el.style) {
						this.$refs.warnInfoCommonTable.$el.style.cssText = `height:calc(100% - ${this.$refs.topName.offsetHeight + 6}px)`
					}
				}, 300)

			}
		},
		updated () {
			this.getHeight()
		},
		created () {
			this.getOwner()
			if (this.$route.query.date) {
				let tommorrow = moment(moment(this.$route.query.date).add(1, 'days')).format('YYYY-MM-DD'),
					today = moment(this.$route.query.date).format('YYYY-MM-DD')
				/*this.searchTable.table.data.beginDate = `${yester} 00:00:00`
				this.searchTable.table.data.endDate = `${this.$route.query.date}`
				this.findWarnClass.toData.beginDate = `${yester} 00:00:00`
				this.findWarnClass.toData.endDate = this.$route.query.date*/

				this.searchTable.table.data.endDate = `${today} 23:59:59`  //
				this.searchTable.table.data.beginDate = `${today} 00:00:00`
				this.findWarnClass.toData.endDate = `${today} 23:59:59`
				this.findWarnClass.toData.beginDate = `${today} 00:00:00`

			}
		},
		mounted () {
			this.getFindWarnClass(true)
			this.getHeight()
			//this.getData(JSON.parse(JSON.stringify(this.urls)))
			// this.$nextTick(() => {
			//
			// })

		}
	}
</script>
<style lang="less">
	.warnInfo-common {
		.warnInfo-common-table {
			height: calc(100% - 44px);
			background-color: #fff;

			.ant-table-fixed {
				background-color: rgba(0, 0, 0, 0);

				.ant-table-expanded-row-level-1 {
					background-color: rgba(0, 0, 0, 0);

					[colspan="1"] {
						opacity: 0;
						border-right-width: 0;

						p {
							width: 27px;
							height: 14px;
							overflow: hidden;
						}


					}
				}
			}
		}

		.topName {
			background-color: #EAFAFA;
			line-height: 38px;
			min-height: 38px;
			margin-bottom: 6px;

			span {
				line-height: 38px;
				height: 38px;
				color: #333;
				font-size: 14px;
				display: inline-block;
				margin: 0 10px;
				cursor: pointer;

				&.chosed {
					color: #0084C9;
					border-bottom: 2px solid #0084C9;

				}

				i {
					font-style: normal;
					color: #DB3114;
				}

				img {
					margin: -2px 6px;
				}

			}
		}
	}
</style>
