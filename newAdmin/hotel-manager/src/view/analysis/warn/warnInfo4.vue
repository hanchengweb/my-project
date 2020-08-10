<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import {getConst, getAlarmType} from '../../../api/hotelConst'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				ownerData: {},
				searchTable: {
					table: {
						url: 'a_warn_calssification_get',///hotel/analysis/warn/calssification
						type: 'main',
						data: {
							beginDate: moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
							endDate: moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59',
							hotelid: '',
							owner: '',
							type: '',
							page: '0',
							size: '10',
							likeName: ''
						},
						banDblClick: true,
						x: 4540,
						urls: {},
						keyName: 'ii',
						sortReturnData: this.sortReturnData,
						deleteColumnsIndex: 1,
						columns: [
							{title: '告警对象', dataIndex: 'warnObject', width: 520},
							// {title: '酒店名称', dataIndex: 'hotelName', width: 520},
							// {title: 'mac地址', dataIndex: 'modbus', width: 180},
							// {title: '终端名称', dataIndex: 'terminal', width: 380},
							// {title: '房间名称', dataIndex: 'roomName', width: 380},
							//{title: '电压告警（过压和欠压)', dataIndex: 'u', width: 300},
							{title: '电压告警(过压)', dataIndex: 'overU', width: 120, align: 'center'},
							{title: '电压告警(欠压)', dataIndex: 'underU', width: 120, align: 'center'},
							{title: '电流告警(过流)', dataIndex: 'i', width: 120, align: 'center'},
							{title: '功率告警(超标)', dataIndex: 'p', width: 120, align: 'center'},
							{title: '累计电量告警', dataIndex: 'q', width: 120, align: 'center'},
							// {title: '网络链路告警(断开和链接) ', dataIndex: 'net', width: 300},
							{title: '链路告警(链接)', dataIndex: 'activeNet', width: 120, align: 'center'},
							{title: '链路告警(断开)  ', dataIndex: 'disconnetionNet', width: 120, align: 'center'},
							// {title: '终端环境报警(烟雾,湿度)', dataIndex: 'enviroment', width: 300},
							{title: '环境报警(烟雾)', dataIndex: 'somke', width: 120, align: 'center'},
							{title: '环境报警(湿度)', dataIndex: 'hunidity', width: 120, align: 'center'},
							{title: '用房异常告警', dataIndex: 'unnormal', width: 120, align: 'center'},
						],
						hidePaginationPart: true,
						buttons: {},
					},
					search: {
						isShowHigh: false,
						sortReturnSearchData: this.sortReturnSearchData,
						sortReturnSearchResetData: this.sortReturnSearchData,
						onFieldChange: this.onFieldChange,
						defaultVals: {
							time: [moment(new Date()), moment(new Date)]
						},
						nameArray: [{
							name: '起止时间', type: 'timeRange', spans: '6', dataIndex: 'time'
						}, {
							name: '告警归属', type: 'select', data: [], span: '4', dataIndex: 'owner', width: 90
						}, {
							name: '告警类型', type: 'select', data: [], span: '4', dataIndex: 'type'
						}, {
							name: '告警对象', type: 'input', data: [], spans: '5', dataIndex: 'likeName'
						}],
						// highArray: [{
						// 	name: '通讯机地址', type: 'input', span: '4', dataIndex: 'mac'
						// }, {
						// 	name: '房间名称', type: 'input', span: '4', dataIndex: 'room'
						// }, {
						// 	name: '终端名称', type: 'input', span: '4', dataIndex: 'terminal'
						// }]
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
			getChoseHotel (val) {
				val && !isEmptyObject(val) && this.changeStatus()
			},
			getSearch (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			},
			getPegination (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			}
		},
		methods: {
			getOwner () {
				getConst('owner').then(res => {
					res.length && res.forEach(item => {
						this.ownerData[item.value] = item.name
					})
					this.searchTable.search.nameArray[1].data = res
				})
			},
			getAlarmType (owner) {
				if (owner) {
					getAlarmType(owner).then(res => {
						this.searchTable.search.nameArray[2].data = res
					})
				} else {
					this.searchTable.search.nameArray[2].data = []
				}
			},
			onFieldChange (value, item, form) {
				if (item.dataIndex === 'owner') {
					this.getAlarmType(value)
					form.setFieldsValue && form.setFieldsValue({type: ''})
				}
			},
			changeStatus () {
				!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())

			},
			...mapActions([
				'handleChangeTableStatus',
			]),
			sortReturnData (data) {
				data && data.length && data.forEach((item, i) => {
					data[i].notifyingName = ['不发送', '发送'][item.notifying]
					data[i].warntypeOwnerName = this.ownerData[item.warntypeOwner]
				})
				return data
			},
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
			this.getOwner()
		},
		mounted () {
			this.changeStatus()

		}
	}
</script>
