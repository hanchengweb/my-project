<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script type="text/jsx">
	import searchTable from '@/components/searchTable/searchTable'
	import moment from 'moment'
	import {mapActions, mapState} from 'vuex'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				searchData: {
					u: {label: '电压', value: 'u'},
					i: {label: '电流', value: 'i'},
					p: {label: '功率', value: 'p'},
					q: {label: '电量', value: 'q'},
				},
				nowSearchData: ['u', 'i', 'p', 'q'],
				searchTable: {
					table: {
						type: 'main',
						url: 'a_actual_comparedEle_get',
						deleteColumnsIndex: 1,
						data: {
							// beginDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
							// endDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
							hotelid: '',
							date: `${moment(new Date()).format('YYYY-MM-DD')} 00:00:00`,
							data: 'u,i,p,q',
							interval: 15,
							page: '0',
							size: '10'
						},
						tableSlot: ['type'],
						htmlRecordStatus: true,
						banDblClick: true,
						x: 900,
						keyName: 'ii',
						urls: {},
						columns: [
							{title: '房间名称', dataIndex: 'roomName', width: 120},
							{title: '类型', dataIndex: 'type', width: 80, scopedSlots: {customRender: 'type'}},
						],
						sortReturnData: this.sortReturnData,
						reloadColumnsAfterDataReturn: true,
						buttons: {},
						pagination: {
							info: '电压(V), 电流(A), 功率(KW), 电量(kW/H)',
							infoStyle: 'margin-left:-44px;color:#999'
						}
					},
					search: {
						isShowHigh: false,
						sortReturnSearchData: this.sortReturnSearchData,
						sortReturnSearchResetData: this.sortReturnSearchResetData,
						onFieldChange: this.onFieldChange,
						defaultVals: {
							date: moment(new Date()),
							interval: 15,
							num: 15,
							data: ['u', 'i', 'p', 'q']
						},
						nameArray: [{
							name: '时间', type: 'date', spans: '5', dataIndex: 'date',
							disabledDate: this.disabledDate
						}, {
							name: '间隔',
							type: 'number',
							spans: '3',
							dataIndex: 'interval',
							defaultValue: 15,
							onBlur: this.onBlur,
							min: 5,
							step: 5
						}, {
							name: '类型', type: 'checkbox', spans: '9', dataIndex: 'data', options: [
								{label: '电压', value: 'u'},
								{label: '电流', value: 'i'},
								{label: '功率', value: 'p'},
								{label: '电量', value: 'q'},
							],
							defaultValue: ['u', 'i', 'p', 'q']
						},
							{
								name: '房间名称', type: 'input', spans: '5', dataIndex: 'roomName'
							},
						],
						// highArray: [{
						// 	name: '房间名称', type: 'input', spans: '5', dataIndex: 'roomName'
						// },]
						// nameArray: [{
						// 	name: '时间', type: 'date', spans: '5', dataIndex: 'date'
						// }, {
						// 	name: '时刻', type: 'radio', spans: '6', dataIndex: 'interval', options: [
						// 		{label: '首尾', value: 0},
						// 		{label: '间隔', value: 5},
						// 	],
						// 	defaultValue: 0
						// }, {
						// 	name: '间隔',
						// 	type: 'number',
						// 	spans: '3',
						// 	dataIndex: 'num',
						// 	defaultValue: 5,
						// 	onBlur: this.onBlur,
						// 	min: 5,
						// 	step: 5
						// },
						// ],
						// highArray: [
						// 	{
						// 		name: '类型', type: 'checkbox', spans: '9', dataIndex: 'data', options: [
						// 			{label: '电压', value: 'u'},
						// 			{label: '电流', value: 'i'},
						// 			{label: '功率', value: 'p'},
						// 			{label: '电量', value: 'q'},
						// 		],
						// 		defaultValue: ['u', 'i', 'p', 'q']
						// 	}, {
						// 		name: '房间名称', type: 'input', spans: '5', dataIndex: 'roomName'
						// 	},
						// ]
					}
				},
			}
		},

		computed: {
			...mapState({
				getSearch: state => state.data.search,
				getPegination: state => state.data.pegination,
				getChoseHotel: state => state.common.choseHotel
			}),

		},
		watch: {
			getSearch (val) {
				val.date = val.date ? `${val.date.format('YYYY-MM-DD')} 00:00:00` : ''
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				if (!val.reset) {
					this.nowSearchData = val.data
					this.changeStatus()
				}
			},
			getPegination (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				if (!val.reset) {
					this.changeStatus()
				}
			},
			getChoseHotel (val) {
				val && !isEmptyObject(val) && this.changeStatus()
			}
		},
		methods: {
			disabledDate (current) {
				return current && current > moment().endOf('day')
			},
			onFieldChange (value, item, form) {
			},
			sortReturnSearchResetData (data) {
				data.data = ['u', 'i', 'p', 'q']
				return data
			},
			sortReturnSearchData (data) {
				//if (data.interval !== 0) data.interval = data.num
				if (!data.data || !data.data.length) {
					this.$message.info('请至少选择一个类型!')
					this.searchTable.search.noSearch = true
				} else {

					this.searchTable.search.noSearch = false
				}
				return data
			},
			sortReturnData (dataS) {
				///坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑
				let data = dataS.data
				if (data && data.length) {
					let keys = []
					if (data[0].powers && !isEmptyObject(data[0].powers)) {
						keys = Object.keys(data[0].powers)
						this.searchTable.table.tableSlot = ['type']
						this.searchTable.table.columns = [
							{title: '房间名称', dataIndex: 'roomName', width: 120, align: 'center'},
							{
								title: '类型',
								dataIndex: 'type',
								width: 60,
								align: 'center',
								scopedSlots: {customRender: 'type'}
							}]
						keys.map(key => {
							this.searchTable.table.tableSlot.push(key)

							this.searchTable.table.columns.push({
								title: key,
								dataIndex: key,
								width: 80,
								scopedSlots: {customRender: key}
							})
						})
						this.searchTable.table.x = 900 + 180 * keys.length
					}
					data.forEach((item, i) => {
						//this.searchTable.table.columns.push({title: item.t, dataIndex: item.t, width: 180})
						data[i].type = ''
						if (this.nowSearchData && this.nowSearchData.length) {
							this.nowSearchData.forEach(d => {
								data[i].type += `<span style="display: block;height:20px;line-height: 20px">${this.searchData[d].label}</span>`
							})
							keys.length && keys.forEach(key => {
								const power = item.powers[key] || {}
								data[i][key] = ''
								this.nowSearchData.forEach(d => {
									data[i][key] += `<span style="display: block;height:20px;line-height: 20px">${typeof power[d] === 'number' ? power[d] : ``}</span>`
								})
							})

						}
					})
				}
				dataS.data = data
				return dataS
				///坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑坑

			},
			onBlur (item, form) {
				const key = item.dataIndex
				if (form && form.getFieldsValue && form.setFieldsValue) {
					let val = form.getFieldsValue([item.dataIndex])[item.dataIndex],
						value = parseInt(val / 5) < 1 ? 5 : (parseInt(val / 5) * 5)
					form.setFieldsValue({[key]: value})
				}
			},
			changeStatus () {
				!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
			},
			...mapActions([
				'handleChangeTableStatus',
			]),
		},
		mounted () {
			this.changeStatus()

		}
	}
</script>
