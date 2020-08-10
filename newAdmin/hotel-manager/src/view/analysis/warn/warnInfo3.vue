<template>
	<div class="warnInfo3" >
		<buttonSearch :search="searchTable.search" :table="{}"></buttonSearch>
		<warnInfoSelf class="warnInfoSelf" style="height: calc(100% - 42px);"></warnInfoSelf>

	</div>
</template>
<script>
	import buttonSearch from '@/components/buttonSearch/buttonSearch'
	import warnInfoSelf from '@/view/common/warnInfo/warnInfo'
	import moment from 'moment'
	import {getConst, getAlarmType} from '../../../api/hotelConst'

	export default {
		components: {
			buttonSearch,
			warnInfoSelf
		},
		data () {
			return {
				ownerData: {},
				searchTable: {
					table: {},
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
							name: '告警归属', type: 'select', data: [], span: '4', dataIndex: 'warnOwner', width: 90
						}, {
							name: '告警类型', type: 'select', data: [], span: '4', dataIndex: 'warntypeCode'
						}, {
							name: '告警对象', type: 'input', data: [], spans: '5', dataIndex: 'ownerName'
						}],
						// highArray: [{
						// 	name: '通讯机地址', type: 'input', span: '4', dataIndex: 'mac'
						// }, {
						// 	name: '房间名称', type: 'input', span: '4', dataIndex: 'room'
						// }, {
						// 	name: '终端名称', type: 'input', span: '4', dataIndex: 'terminal'
						// }]
					}
				}
			}
		},
		methods: {
			moment,

			onFieldChange (value, item, form) {
				if (item.dataIndex === 'warnOwner') {
					this.getAlarmType(value)
					form.setFieldsValue && form.setFieldsValue({warntypeCode: ''})
				}
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
			getOwner () {
				getConst('owner').then(res => {
					res.length && res.forEach(item => {
						this.ownerData[item.value] = item.name
					})
					this.searchTable.search.nameArray[1].data = res
				})
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
	}

</script>
