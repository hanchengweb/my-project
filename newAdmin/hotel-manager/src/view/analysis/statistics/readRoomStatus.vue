<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import {isEmptyObject} from '../../../libs/tool'
	import {getConst} from '../../../api/hotelConst'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				roomTypeJson: {},
				roomStatusJson: {},
				searchTable: {
					table: {
						url: 'a_statistics_readRoomStatus_get',///hotel/analysis/statistics/readRoomStatus
						type: 'main',
						data: {
							hotelid: '',
							roomName: '',
							beginDate: `${moment(new Date()).format('YYYY-MM-DD')} 00:00:00`,
							endDate: `${moment(new Date()).format('YYYY-MM-DD')} 23:59:59`,
							page: '0',
							size: '10'
						},
						keyName: 'roomId',
						banDblClick: true,
						sortReturnData: this.sortReturnData,
						x: 1000,
						urls: {},
						deleteColumnsIndex: 1,
						columns: [
							{title: '房间名称', dataIndex: 'roomName', width: 120},
							{title: '时间', dataIndex: 'time', width: 120, align: 'center'},
							{title: '客房类型', dataIndex: 'roomTypeName', width: 120, align: 'center'},
							{title: '房间状态', dataIndex: 'statusName', width: 120, align: 'center'},
						],
						buttons: {},
						hidePaginationPart: true,
					},
					search: {
						isShowHigh: false,
						sortReturnSearchData: this.sortReturnSearchData,
						sortReturnSearchResetData: this.sortReturnSearchData,
						defaultVals: {
							time: [moment(new Date()), moment(new Date())],
						},
						nameArray: [{
							name: '起止时间', type: 'timeRange', spans: '6', dataIndex: 'time'
						}, {
							name: '房间名称', type: 'input', span: '4', dataIndex: 'roomName'
						},]
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
			getSearch (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			},
			getPegination (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			},
			getChoseHotel (val) {
				val && !isEmptyObject(val) && this.changeStatus()
			}
		},
		methods: {
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
			changeStatus () {
				!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
			},
			...mapActions([
				'handleChangeTableStatus',
			]),
			sortReturnData (data) {
				data && data.length && data.forEach((item, i) => {
					data[i].roomTypeName = data[i].roomType && this.roomTypeJson[data[i].roomType.toString()] || ''
					data[i].statusName = this.roomStatusJson[data[i].status] || ''
				})
				return data
			},
			getRoomType () {
				getConst('name').then(res => {
					res && res.length && res.forEach(item => {
						this.roomTypeJson[item.value] = item.title
					})
				})
			},
			getRoomStatus () {
				getConst('roomStatus').then(res => {
					res && res.length && res.forEach(item => {
						this.roomStatusJson[item.value] = item.title
					})
				})
			}
		},
		created () {
			this.getRoomType()
			this.getRoomStatus()
		},
		mounted () {
			this.changeStatus()

		}
	}
</script>
