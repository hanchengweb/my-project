<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import {getConst, getAlarmType} from '../../../api/hotelConst'
	import {isEmptyObject} from '../../../libs/tool'
	import {getUrlData} from '../../../api/common'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				urls: ['Hotel', 'Modbus', 'Terminal', 'Room'],
				ownerData: {},
				highArray: {
					Room: {
						name: '房间名称', type: 'input', spans: '6', dataIndex: 'roomName'
					},
					Terminal: {
						name: '终端名称', type: 'input', spans: '6', dataIndex: 'terminalName'
					},
					Modbus: {
						name: '通讯机地址', type: 'input', spans: '6', dataIndex: 'mac'
					},
					all: [{
						name: '房间名称', type: 'input', spans: '6', dataIndex: 'roomName'
					}, {
						name: '终端名称', type: 'input', spans: '6', dataIndex: 'terminalName'
					}, {
						name: '通讯机地址', type: 'input', spans: '6', dataIndex: 'mac'
					}]
				},
				searchTable: {
					table: {
						url: 'a_warn_readWarnInfoData_get',///hotel/analysis/warn/readWarnInfoData
						type: 'main',
						baseData: [],
						keyName: 'ii',
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
						banDblClick: true,
						x: 5320,
						urls: {},
						sortReturnData: this.sortReturnData,
						columns: [
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
					search: {
						isShowHigh: false,
						sortReturnSearchData: this.sortReturnSearchData,
						sortReturnSearchResetData: this.sortReturnSearchData,
						onFieldChange: this.onFieldChange,
						showSearchStatus: true,
						showHotel: true,
						defaultVals: {
							time: [moment(new Date()), moment(new Date)]
						},
						nameArray: [{
							name: '起止时间', type: 'timeRange', spans: '6', dataIndex: 'time'
						}, {
							name: '告警归属', type: 'select', data: [], spans: '4', dataIndex: 'warntypeOwner', width: 90
						}, {
							name: '告警类型', type: 'select', data: [], spans: '4', dataIndex: 'warntypeCode'
						}, {
							name: '告警对象', type: 'input', data: [], spans: '5', dataIndex: 'ownerName'
						}],
						// highArray: [{
						// 	name: '房间名称', type: 'input', spans: '6', dataIndex: 'roomName'
						// }, {
						// 	name: '终端名称', type: 'input', spans: '6', dataIndex: 'terminalName'
						// }, {
						// 	name: '通讯机地址', type: 'input', spans: '6', dataIndex: 'mac'
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
				this.searchTable.table.baseData = []
				// if (val.warntypeOwner) {
				// 	this.searchTable.table.url = `a_warn_read${this.toUpperCaseFun(val.warntypeOwner)}_get`
				// }

				!val.reset && this.changeStatus()
			},
			getPegination (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			}
		},
		methods: {
			changeStatus () {
				// if (this.searchTable.table.data.warntypeOwner) {
				// 	this.handleChangeTableStatus(Math.random())
				// } else {
				// 	this.getData(JSON.parse(JSON.stringify(this.urls)))
				// }
				!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
			},
			getOwner () {
				getConst('owner').then(res => {
					res.length && res.forEach(item => {
						this.ownerData[item.value] = item.name
					})
					this.searchTable.search.nameArray[1].data = res
				})
			},
			toUpperCaseFun (str) {
				return str.replace(/\b\w+\b/g, (word) => {
					return word.substring(0, 1).toUpperCase() + word.substring(1)
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
				if (item.dataIndex === 'warntypeOwner') {
					this.getAlarmType(value)
					form.setFieldsValue && form.setFieldsValue({warntypeCode: ''})
				}
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
			},
			getData (arr) {
				if (arr.length === 1) {
					this.searchTable.table.url = `a_warn_read${arr[0]}_get`
					this.handleChangeTableStatus(Math.random())
				} else {
					const url = `a_warn_read${arr[0]}_get`
					arr.splice(0, 1)
					getUrlData(url, this.searchTable.table.data).then(res => {

						const data = res && res.data || []
						this.searchTable.table.baseData = [...this.searchTable.table.baseData, ...data]
						this.getData(arr)
					}, err => {
						this.getData(arr)
					})
				}
			},
		},
		created () {
			if (this.$route.query.date) {
				this.searchTable.table.data.beginDate = `${this.$route.query.date} 00:00:00`
				this.searchTable.table.data.endDate = `${this.$route.query.date} 23:59:59`
				this.searchTable.search.defaultVals.time = [moment(this.$route.query.date), moment(this.$route.query.date)]
			}

			this.getOwner()
		},
		mounted () {
			//this.getData(JSON.parse(JSON.stringify(this.urls)))
			this.changeStatus()

		}
	}
</script>
