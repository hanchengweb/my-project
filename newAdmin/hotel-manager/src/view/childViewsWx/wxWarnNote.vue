<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import {getConst, getAlarmTypeWx} from '../../api/hotelConst'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				searchTable: {
					table: {
						type: 'main',
						deleteColumnsIndex: 3,
						data: {
							warntypeCode: '',
							page: '0',
							size: '10'
						},
						sortReturnData: this.sortReturnData,
						urls: {},
						buttons: {
							hideFlag: true
						},
						modal: {
							sortReturnModalData: this.sortReturnModalData,
							data: {
								warntypeCode: []
							},
						},
					},
					search: {
						isShowHigh: false,
						nameArray: [{
							name: '告警类型', type: 'select', data: [], span: '6', dataIndex: 'warntypeCode'
						},]
					}
				},
				alarmTypeWx: {}
			}
		},
		methods: {
			...mapActions([
				'handleChangeTableStatus'
			]),
			sortReturnData (data) {

				data && data.length && data.forEach((item, i) => {
					data[i].warntypeName = this.alarmTypeWx[item.warntypeCode]
				})
				return data
			},
			sortReturnModalData (values) {
				return values
			},
			changeStatus (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				this.handleChangeTableStatus(Math.random())
			},
			getAlarmTypeWx () {
				getAlarmTypeWx().then(res => {
					this.searchTable.table.modal.data.warntypeCode = res
					this.searchTable.search.nameArray[0].data = res
					res && res.length && res.forEach(item => {
						this.alarmTypeWx[item.value] = item.name
					})
				})
			}
		},
		computed: {
			...mapState({
				getPegination: state => state.data.pegination,
				getSearch: state => state.data.search
			}),
		},
		watch: {
			getPegination (val) {
				if (!val.reset) {
					this.changeStatus(val)
				} else {
					this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				}
			},
			getSearch (val) {
				if (!val.reset) {
					this.changeStatus(val)
				} else {
					this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				}
			}
		},
		created () {
			this.getAlarmTypeWx()
		},
		mounted () {
			this.handleChangeTableStatus(Math.random())
		}
	}
</script>
