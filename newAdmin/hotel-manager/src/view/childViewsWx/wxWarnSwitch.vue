<template>
	<dbTable
		:dbTable="dbTable"
	></dbTable>
</template>
<script>

	import dbTable from '@/view/components/dbTable/dbTable'
	import {getFlag} from '@/api/const'
	import {getConst, getAlarmTypeWx} from '../../api/hotelConst'
	import {isEmptyObject} from '@/libs/tool'
	import {mapActions, mapState} from 'vuex'

	export default {
		components: {
			dbTable
		},
		data () {
			return {
				dbTable: {
					searchTable: {
						table: {
							type: 'main',
							deleteColumnsIndex: 2,
							data: {
								code: '',
								flag: '',
								page: '0',
								size: '10'
							},
							urls: {},
							buttons: {},
							modal: {
								urls: {},
								baseData: {
									add: {}
								},
							},
						},
						search: {
							isShowHigh: false,
							nameArray: [{
								name: '编码', type: 'input', span: '4', dataIndex: 'code'
							}, {
								name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
							}]
						}
					},
					tabsTable: {
						search: {},
						tabs: {
							arr: [
								{name: '告警按钮类型', key: 'wxWarnSwitchAlarmtype'},
							]
						},
						table: {
							name: 'wxWarnSwitchAlarmtype',
							title: 'wxWarnSwitchAlarmtype',
							type: 'sub',
							sortReturnData:this.sortReturnDataSub,
							deleteColumnsIndex: {
								wxWarnSwitchAlarmtype: 2
							},
							keyName: 'ii',
							data: {
								switchCode: '',
								page: '0',
								size: '10'
							},
							urls: {},
							buttons: {
								hideFlag: true
							},
							modal: {
								name: 'wxWarnSwitchAlarmtype',
								title: 'wxWarnSwitchAlarmtype',
								baseData: {
									add: {
										switchCode: ''
									}
								},
								data: {}
							},
						},
					}
				},
				alarmTypeWx: {}
			}
		},
		methods: {
			...mapActions([
				'handleChangeTableStatus',
				'handleChangeSubTableStatus',
			]),
			getFlag () {
				getConst('flag').then(res => {
					this.dbTable.searchTable.search.nameArray[1].data = res
				})
			},
			sortReturnDataSub(data){

				data && data.length && data.forEach((item, i) => {
					data[i].alarmName = this.alarmTypeWx[item.alarmType]
				})
				return data
			},
			getAlarmTypeWx () {
				getAlarmTypeWx().then(res => {
					this.dbTable.tabsTable.table.modal.data.alarmType = res
					res && res.length && res.forEach(item => {
						this.alarmTypeWx[item.value] = item.name
					})

				})
			},
			changeStatus (type) {
				type === 'sub' ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
			},
		},
		created () {
			this.getAlarmTypeWx()
			this.getFlag()
		},
		computed: {
			...mapState({
				getChoseTr: state => state.data.choseTr,
				getTree: state => state.data.tree,
				getPegination: state => state.data.pegination,
				getSearch: state => state.data.search,
				getSubSearch: state => state.data.subSearch,
				getSubPegination: state => state.data.subPegination,
			}),
		},
		watch: {
			getChoseTr (val) {
				if (!isEmptyObject(val)) {
					this.dbTable.tabsTable.table.data.switchCode = val.code
					this.dbTable.tabsTable.table.modal.baseData.add.switchCode = val.code
					this.changeStatus('sub')
				}
			},
			getPegination (val) {
				this.dbTable.searchTable.table.data = {...this.dbTable.searchTable.table.data, ...val}
				if (!val.reset) this.changeStatus()
			},
			getSearch (val) {
				this.dbTable.searchTable.table.data = {...this.dbTable.searchTable.table.data, ...val}
				if (!val.reset) this.changeStatus()
			},
			getSubPegination (val) {
				this.dbTable.tabsTable.table.data = {...this.dbTable.tabsTable.table.data, ...val}
				if (!val.reset) this.changeStatus('sub')
			},
			getSubSearch (val) {
				this.dbTable.tabsTable.table.data = {...this.dbTable.tabsTable.table.data, ...val}
				if (!val.reset) this.changeStatus('sub')
			},
		},
		mounted () {
			this.handleChangeTableStatus(Math.random())
		}
	}
</script>
