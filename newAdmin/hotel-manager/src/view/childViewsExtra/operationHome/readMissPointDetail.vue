<template>
	<div class="readMissPointDetail" id="readMissPointDetail">
		<commonTop :name="'遗漏点详情查询'" :backName="'遗漏点详情'"></commonTop>
		<buttonSearch :search="search" :table="{}" style="height: 42px;margin-top:5px;margin-left: 80px;"
					  class="buttonSearchCls"></buttonSearch>
		<searchTable :searchTableJson="searchTable" class="tableCls"></searchTable>
		<a-button-group class="actionBtns">
			<a-button :icon="btn.icon" :disabled="btn.disabled" v-for="btn in btns" :key="btn.url"
					  @click="btnClick(btn)">{{btn.name}}
			</a-button>
		</a-button-group>
		<!--		icon: 'snippets',-->
	</div>
</template>
<script>
	import commonTop from '../commonTop'
	import searchTable from '@/components/searchTable/searchTable'
	import buttonSearch from '@/components/buttonSearch/buttonSearch'
	import {mapActions, mapState} from 'vuex'
	import moment from 'moment'
	import {isEmptyObject} from '../../../libs/tool'
	import {getData} from '../../../api/common'

	export default {
		components: {
			commonTop,
			searchTable,
			buttonSearch
		},
		data () {
			return {
				call: {},
				btns: [{
					data: {
						ignoreFail: true,
						data: [],
						noHotelIdStatus: true
					},
					name: '历史数据召测',
					icon: 'snippets',
					disabled: true,
					url: 'a_operationController_callHistory_post'///hotel/analysis/operationController/checkMisspoint
				}, {
					data: {
						data: [],
						noHotelIdStatus: true
					},
					icon: 'snippets',
					disabled: true,
					name: '缺失数据校验',
					url: 'a_operationController_checkMisspoint_post'///hotel/analysis/operationController/checkMisspoint
				}],
				search: {
					isShowHigh: false,
					// showHotel: true,
					/*sortReturnSearchData: this.sortReturnSearchData,
					sortReturnSearchResetData: this.sortReturnSearchData,*/
					defaultVals: {
						time: moment()
					},
					nameArray: [{
						name: 'MAC地址', type: 'input', spans: '4', dataIndex: 'mac'
					}, {
						name: '时间', type: 'date', spans: '6', dataIndex: 'time',
					},]
				},
				selectedRows: [],
				searchTable: {
					table: {
						url: 'a_operationController_readMisspoint_get',///hotel/analysis/operationController/readMisspoint
						type: 'main',
						data: {
							hotelId: '',
							mac: '',
							time: '',
							noHotelIdStatus: true
						},
						banDblClick: true,
						// sortReturnData: this.sortReturnData,
						hideButtonSearch: true,
						x: 1400,
						urls: {},
						deleteColumnsIndex: 1,
						keyName: 'ii',
						columns: [
							{title: '酒店名称', dataIndex: 'hotelName', width: 120},
							{title: 'MAC地址', dataIndex: 'mac', width: 160, align: 'center'},
							{title: '时间', dataIndex: 'time', width: 180, align: 'center'},
						],
						buttons: {},
						hidePaginationPart: true,
						pagination: {
							//info: '默认能耗统计执行时间:2019-12-12 12:15:11'
						},
						beforeBanClickTr: this.beforeBanClickTr,
						banClick: true,
						rowSelection: {
							onChange: this.onRowChange,
							onSelectAll: this.onSelectAll,
							onSelectInvert: this.onSelectInvert
						},
					},
					search: {}
				},
			}
		},

		computed: {
			...mapState({
				getSearch: state => state.data.search,
				getChoseHotel: state => state.common.choseHotel
			}),
		},
		watch: {
			getSearch (val) {
				val.time = moment(val.time).format('YYYY-MM-DD HH:mm:ss')
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				!val.reset && this.changeStatus()
			},
			getChoseHotel (val) {
				val && !isEmptyObject(val) && this.changeStatus()
			},
			selectedRows (val) {

			}

		},
		methods: {
			changeStatus () {
				//!isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
				this.handleChangeTableStatus(Math.random())
			},
			...mapActions([
				'handleChangeTableStatus',
			]),
			beforeBanClickTr (data, target) {
				const tagName = target.tagName,
					tr = tagName === 'TD' ? target.parentNode : target.tagName === 'SPAN' ? target.parentNode.parentNode : target
				tr && tr.getElementsByTagName('label') && tr.getElementsByTagName('label').length && tr.getElementsByTagName('label')[0] && tr.getElementsByTagName('label')[0].click && tr.getElementsByTagName('label')[0].click()
			},
			onRowChange (selectedRowKeys, selectedRows) {
				this.selectChange(selectedRows)
			},
			onSelectAll (selected, selectedRows, changeRows) {
				this.selectChange(selectedRows)
			},
			onSelectInvert (selectedRows) {
				this.selectChange(selectedRows)
			},
			selectChange (selectedRows) {
				this.selectedRows = selectedRows
				this.btns.forEach(item => {
					item.disabled = !!!selectedRows.length
				})
			},
			btnClick (btn) {
				let data = {data: []}, icon = btn.icon
				this.selectedRows.forEach(item => {
					data.data.push({
						mac: item.mac,
						time: item.time
					})
				})
				btn.icon = 'loading'
				btn.disabled = true
				getData({name: btn.url, data: {...btn.data, ...data}, type: 'application/json'}).then(res => {
					btn.icon = icon
					btn.disabled = false
					if (res.code === 200) {
						!res.data.success && this.$message.error(res.data.message)
						res.data.success && this.$message.success(res.data.message)
					}
					this.changeStatus()
				}, err => {
					btn.icon = icon
					btn.disabled = false
					this.changeStatus()
				})

			}
		},
		created () {
			this.searchTable.table.data = {...this.searchTable.table.data, ...this.$route.query}
			this.searchTable.table.data.time = moment(this.searchTable.table.data.time).format('YYYY-MM-DD HH:mm:ss')
			this.search.defaultVals.time = moment(this.$route.query.time || '')
			if (!this.searchTable.table.data.time) this.searchTable.table.data.time = moment().format('YYYY-MM-DD HH:mm:ss')
		},
		mounted () {
			this.changeStatus()
		}
	}
</script>
<style lang="less">
	#readMissPointDetail {
		overflow: hidden;
		position: relative;

		.actionBtns {
			position: absolute;
			top: 45px;
			left: 0;

			.ant-btn {
				border-top-width: 0;
				border-bottom-width: 0;
				font-size: 12px;
				line-height: 42px;
				height: 42px;
				border-radius: 0;
				background-color: #fff;
			}

		}

		.buttonSearchCls {
		}

		.tableCls {
			height: calc(100% - 82px);
		}
	}
</style>
