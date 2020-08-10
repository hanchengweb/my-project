<template>
	<div class="readErrorPoint">
		<commonTop :name="'非法电量详情'"></commonTop>
		<dbTable
			:dbTable="dbTable"
		></dbTable>
	</div>
</template>
<script>
	import commonTop from '../commonTop'
	import dbTable from '@/view/components/dbTable/dbTable'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import {isEmptyObject} from '../../../libs/tool'

	export default {
		components: {
			dbTable,
			commonTop
		},
		data () {
			return {

				dbTable: {
					searchTable: {
						table: {
							type: 'main',
							url: 'a_operationController_readStatiscOfHotel_get',///hotel/analysis/operationController/readStatiscOfHotel
							baseData: [],
							keyName: 'ii',

							data: {
								/*	beginDate: moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
									endDate: moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59',*/
								hotelName: '',
								time: moment().format('YYYY-MM-DD'),
								/*warntypeCode: '',
								page: '0',
								size: '10'*/
							},
							x: 2830,
							columns: [
								// {title: '告警类型编码', dataIndex: 'warntypeCode', width: 380},
								{title: '酒店名称', dataIndex: 'hotelName', width: 160, align: 'center'},
								{title: '酒店编码', dataIndex: 'hotelCode', width: 120, align: 'center'},
								{title: '酒店地址', dataIndex: 'address', width: 180, align: 'center'},
								{title: '异常房间数', dataIndex: 'roomCount', width: 140, align: 'center'},

							],
							sortReturnData: this.sortReturnData,
							urls: {},
							buttons: {},
						},
						search: {
							isShowHigh: false,
							showSearchStatus: true,
							defaultVals: {
								time: moment()
							},
							nameArray: [{
								name: '酒店名称', type: 'input', span: '4', dataIndex: 'hotelName'
							}, {
								name: '日期', type: 'date', spans: '6', dataIndex: 'time'
							}]
						}
					},
					tabsTable: {
						type: 'tabs',
						tabs: {
							arr: [
								{name: '详情', key: 'detail'},
							]
						},
						search: {
							type: 'sub',
							detail: {
								isShowHigh: false,
								showHotel: true,
								showSearchStatus: true,
								sortReturnSearchData: this.sortReturnSearchData,
								sortReturnSearchResetData: this.sortReturnSearchData,
								defaultVals: {
									time: [moment(new Date()), moment(new Date())]
								},
								nameArray: [{
									name: '起止时间', type: 'timeRange', spans: '8', dataIndex: 'time'
								}, {
									name: '房间号', type: 'input', spans: '4', dataIndex: 'roomName'
								}]
							}

						},
						table: {
							url: 'a_operationController_readErrorPoint_get',//
							type: 'sub',
							data: {
								hotelId: '',
								beginTime: moment().format('YYYY-MM-DD') + ' 00:00:00',
								endTime: moment().format('YYYY-MM-DD') + ' 23:59:59',
								roomName: '',
							},
							banDblClick: true,
							// sortReturnData: this.sortReturnData,
							hideButtonSearch: true,
							x: 1400,

							keyName: 'ii',
							urls: {},
							deleteColumnsIndex: 1,
							columns: [
								{title: '酒店名称', dataIndex: 'hotelName', width: 120},
								{title: 'MAC地址', dataIndex: 'mac', width: 160, align: 'center'},
								{title: '时间', dataIndex: 'errorTime', width: 180, align: 'center'},
								{title: '电压', dataIndex: 'u', width: 120, align: 'center'},
								{title: '电流', dataIndex: 'i', width: 120, align: 'center'},
								{title: '功率', dataIndex: 'p', width: 120, align: 'center'},
								{title: '电量', dataIndex: 'q', width: 120, align: 'center'},
								{title: '房间号', dataIndex: 'roomName', width: 120, align: 'center'},
							],
							buttons: {},
							hidePaginationPart: true,
							pagination: {
								//info: '默认能耗统计执行时间:2019-12-12 12:15:11'
							}
						},
					}
				}
			}
		}
	}

</script>
