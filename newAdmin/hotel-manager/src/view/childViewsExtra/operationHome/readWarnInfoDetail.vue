<template>
	<dbTable
		class="readWarnInfoDetail"
		:dbTable="dbTable"
	></dbTable>
</template>
<script>

	import dbTable from '@/view/components/dbTable/dbTable'
	import moment from 'moment'
	import {mapActions, mapState} from 'vuex'
	import {isEmptyObject} from '../../../libs/tool'
	import {getConst, getAlarmType} from '../../../api/hotelConst'
	import {getUrlData} from '../../../api/common'

	export default {
		components: {
			dbTable
		},
		data () {
			return {
				urls: ['Hotel', 'Modbus', 'Terminal', 'Room'],
				ownerData: {},
				cascadeTypeData: {},
				data: {
					hotel: {
						x: 1850,
						columns: [
							{title: '酒店名称', dataIndex: 'hotelName', width: 520},
							{title: '详情', dataIndex: 'details', width: 400},
						]
					},
					modbus: {
						x: 2230,
						columns: [
							{title: '酒店名称', dataIndex: 'hotelName', width: 520},
							{title: 'mac地址', dataIndex: 'mac', width: 120, align: 'center'},
							{title: '详情', dataIndex: 'details', width: 400},
						]
					},
					room: {
						x: 3480,
						columns: [
							{title: '酒店名称', dataIndex: 'hotelName', width: 520},
							{title: 'mac地址', dataIndex: 'mac', width: 120, align: 'center'},
							{title: '房间名称', dataIndex: 'roomName', width: 120, align: 'center'},
							{title: '详情', dataIndex: 'details', width: 400},
						]
					},
					terminal: {
						x: 2720,
						columns: [
							{title: '酒店名称', dataIndex: 'hotelName', width: 520},
							{title: 'mac地址', dataIndex: 'mac', width: 120, align: 'center'},
							{title: '终端名称', dataIndex: 'terminalName', width: 120, align: 'center'},
							{title: '详情', dataIndex: 'details', width: 400},
						]
					},

				},
				dbTable: {
					searchTable: {
						table: {
							type: 'main',
							url: 'a_operationController_readWarnInfo_get',///hotel/analysis/operationController/readWarnInfo
							baseData: [],
							keyName: 'ii',
							data: {
								begintime: moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
								endtime: moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59',
								// hotelId: '',
								hotelName: '',
								warntypeOwner: '',
								warntypeCode: '',
								page: '0',
								size: '10',
								noHotelIdStatus: true
							},
							x: 2830,
							deleteColumnsIndex: 1,

							columns: [
								{title: '酒店名称', dataIndex: 'hotelName', width: 380},
								{title: '告警时间', dataIndex: 'begintime', width: 160, align: 'center'},
								{title: '告警归属', dataIndex: 'warntypeOwnerName', width: 120, align: 'center'},
								{title: '告警类型', dataIndex: 'warntypeName', width: 180, align: 'center'},
								{title: '告警对象简称', dataIndex: 'target', width: 140, align: 'center'},
								{title: '消息是否发送', dataIndex: 'notifyingName', width: 120, align: 'center'},
								{title: '关联类型', dataIndex: 'cascadeTypeName', width: 120, align: 'center'},
								{title: '告警信息', dataIndex: 'info', width: 400},
							],
							sortReturnData: this.sortReturnData,
							urls: {},
							buttons: {},
						},
						search: {
							isShowHigh: false,
							// showHotel: true,
							defaultVals: {
								time: moment()
							},
							showSearchStatus: true,
							/*sortReturnSearchData: this.sortReturnSearchData,
							sortReturnSearchResetData: this.sortReturnSearchData,*/
							onFieldChange: this.onFieldChange,
							nameArray: [
								{name: '酒店名称', type: 'input', spans: '4', dataIndex: 'hotelName'},
								{
									name: '日期', type: 'date', spans: '6', dataIndex: 'time'
								}, {
									name: '告警归属', type: 'select', data: [], span: '4', dataIndex: 'warntypeOwner'
								}, {
									name: '告警类型', type: 'select', data: [], span: '4', dataIndex: 'warntypeCode'
								}]
						}
					},
					tabsTable: {
						search: {},
						table: {
							hideButtonSearch: true,
							reloadColumnsAfterDataReturn: true,
							type: 'sub',
							url: 'a_operationController_readWarnData_get',////hotel/analysis/operationController/readWarnData
							x: 1850,
							columns: [
								{title: '告警对象', dataIndex: 'ownerName', width: 520},
								{title: '详情', dataIndex: 'details', width: 400},
							],
							data: {
								warnId: '',
								noHotelIdStatus: true,
								//owner: '',
								page: '0',
								size: '10'
							},
							urls: {},
							buttons: {},
						},
					}
				}
			}
		},

		computed: {
			...mapState({
				getPegination: state => state.data.pegination,
				getSearch: state => state.data.search,
				getSubPegination: state => state.data.subPegination,
				getSubSearch: state => state.data.subSearch,
				getChoseTr: state => state.data.choseTr,
				getChoseHotel: state => state.common.choseHotel
			}),
		},
		watch: {
			// getChoseHotel (val) {
			//
			// 	if (val && !isEmptyObject(val)) {
			// 		this.dbTable.searchTable.table.data.hotelId = val.id
			// 		this.changeStatus()
			// 	}
			// },
			getSearch (val) {
				this.dbTable.searchTable.table.data = {...this.dbTable.searchTable.table.data, ...val}
				this.dbTable.searchTable.table.data.begintime = val.time.format('YYYY-MM-DD') + ' 00:00:00'
				this.dbTable.searchTable.table.data.endtime = val.time.format('YYYY-MM-DD') + ' 23:59:59'
				// this.dbTable.searchTable.table.baseData = []
				// if (val.warntypeOwner) {
				// 	this.dbTable.searchTable.table.url = `a_warn_read${this.toUpperCaseFun(val.warntypeOwner)}InfoWarn_get`
				// }
				!val.reset && this.changeStatus()
			},
			getPegination (val) {
				this.dbTable.searchTable.table.data = {...this.dbTable.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			},
			getSubSearch (val) {
				this.dbTable.tabsTable.table.data = {...this.dbTable.searchTable.table.data, ...val}

				!val.reset && this.handleChangeSubTableStatus(Math.random())
			},
			getSubPegination (val) {
				this.dbTable.tabsTable.table.data = {...this.dbTable.searchTable.table.data, ...val}
				!val.reset && this.handleChangeSubTableStatus(Math.random())
			},
			getChoseTr (val) {
				if (val && !isEmptyObject(val)) {
					this.dbTable.tabsTable.table.data.warnId = val.id
					//this.dbTable.tabsTable.table.data.owner = val.warntypeOwner
					//this.dbTable.tabsTable.table.url = `a_warn_read${this.toUpperCaseFun(val.warntypeOwner)}WarnDetail_get`
					//this.dbTable.tabsTable.table = {...this.dbTable.tabsTable.table, ...this.data[val.warntypeOwner]}
					this.handleChangeSubTableStatus(Math.random())
				}
			}
		},
		methods: {
			...mapActions([
				'handleChangeTableStatus',
				'handleChangeSubTableStatus',
			]),
			getOwner () {
				getConst('owner').then(res => {
					res.length && res.forEach(item => {
						this.ownerData[item.value] = item.name
					})
					this.dbTable.searchTable.search.nameArray[2].data = res
					this.getCascadeTypeData()
				})
			},
			getCascadeTypeData () {
				getConst('cascadeType').then(res => {
					res.length && res.forEach(item => {
						this.cascadeTypeData[item.value] = item.name
					})
					this.changeStatus()
				})
			},
			getAlarmType (owner) {
				if (owner) {
					getAlarmType(owner).then(res => {
						this.dbTable.searchTable.search.nameArray[3].data = res
					})
				} else {
					this.dbTable.searchTable.search.nameArray[3].data = []
				}
			},
			onFieldChange (value, item, form) {
				if (item.dataIndex === 'warntypeOwner') {
					this.getAlarmType(value)
					form.setFieldsValue && form.setFieldsValue({warntypeCode: ''})
				}
			},
			toUpperCaseFun (str) {
				return str.replace(/\b\w+\b/g, (word) => {
					return word.substring(0, 1).toUpperCase() + word.substring(1)
				})
			},
			sortReturnData (data) {
				data && data.length && data.forEach((item, i) => {
					item.cascadeType = item.cascadeType ? item.cascadeType.toString() : item.cascadeType
					data[i].notifyingName = ['不发送', '发送'][item.notifying]
					data[i].warntypeOwnerName = this.ownerData[item.warntypeOwner]
					data[i].cascadeTypeName = this.cascadeTypeData[item.cascadeType]
				})
				return data
			},
			changeStatus () {
				// if (this.dbTable.searchTable.table.data.warntypeOwner) {
				// 	this.handleChangeTableStatus(Math.random())
				// } else {
				// 	this.getData(JSON.parse(JSON.stringify(this.urls)))
				// }
				!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())

			},
			sortReturnSearchData (data) {
				if (data.time && data.time.length) {
					data.begintime = data.time[0].format('YYYY-MM-DD') + ' 00:00:00'
					data.endtime = data.time[1].format('YYYY-MM-DD') + ' 23:59:59'
				} else {
					data.begintime = moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00'
					data.endtime = moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
				}
				return data
			},
			getData (arr) {
				if (arr.length === 1) {
					this.dbTable.searchTable.table.url = `a_warn_read${arr[0]}InfoWarn_get`
					this.handleChangeTableStatus(Math.random())
				} else {
					const url = `a_warn_read${arr[0]}InfoWarn_get`
					arr.splice(0, 1)
					getUrlData(url, this.dbTable.searchTable.table.data).then(res => {
						const data = res.data || []
						this.dbTable.searchTable.table.baseData = [...this.dbTable.searchTable.table.baseData, ...data]
						this.getData(arr)
					}, err => {
						this.getData(arr)
					})
				}
			},
		},
		created () {
			// this.getOwner()
			// this.getCascadeTypeData()

			if (this.$route.query.date) {
				this.dbTable.searchTable.search.defaultVals.time = moment(this.$route.query.date)
				this.dbTable.searchTable.table.data.begintime = moment(this.$route.query.date).format('YYYY-MM-DD') + ' 00:00:00'
				this.dbTable.searchTable.table.data.endtime = moment(this.$route.query.date).format('YYYY-MM-DD') + ' 23:59:59'
			}
		},
		mounted () {
			this.getOwner()
			//this.getData(JSON.parse(JSON.stringify(this.urls)))

		}
	}

</script>

