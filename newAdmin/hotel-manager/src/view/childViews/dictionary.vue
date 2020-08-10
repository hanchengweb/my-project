<template>
	<dbTable
		:dbTable="dbTable"
	></dbTable>
</template>
<script>

	import dbTable from '@/view/components/dbTable/dbTable'
	import {getFlag} from '@/api/const'
	import {getConst} from '../../api/hotelConst'
	import {isEmptyObject} from '@/libs/tool'
	import {mapActions, mapState} from 'vuex'
	import {changeUrl, getChangeUrl} from '@/libs/util'

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
							deleteColumnsIndex: 1,
							data: {
								name: '',
								code: '',
								flag: '',
								page: '0',
								size: '10'
							},
							urls: {},
							buttons: {
								cache: {
									data: {}
								}
							},
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
								name: '名称', type: 'input', span: '4', dataIndex: 'name'
							}, {
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
								{name: '字典详情', key: 'dictionaryDetail'},
							]
						},
						table: {
							name: 'dictionaryDetail',
							title: 'dictionaryDetail',
							type: 'sub',
							deleteColumnsIndex: {
								dictionaryDetail: 1
							},
							data: {
								pid: '',
								sort: 'seqno',
								page: '0',
								size: '10'
							},
							urls: {},
							buttons: {},
							modal: {
								name: 'dictionaryDetail',
								title: 'dictionaryDetail',
								baseData: {
									add: {}
								},
							},
						},
					}
				}
			}
		},
		methods: {
			...mapActions([
				'handleChangeTableStatus',
				'handleChangeSubTableStatus',
			]),
			testClick (item) {
			},
			getFlag () {
				getConst('flag').then(res => {
					this.dbTable.searchTable.search.nameArray[2].data = res
				})
			},
			changeStatus (type) {
				type === 'sub' ? this.handleChangeSubTableStatus('sub') : this.handleChangeTableStatus(this.$route.name)
			},
		},
		created () {
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
					this.dbTable.tabsTable.table.data.pid = val.id
					this.dbTable.tabsTable.table.modal.baseData.add = {pid: val.id}
					this.dbTable.searchTable.table.buttons.cache.data = {code: val.code}
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
			this.handleChangeTableStatus(this.$route.name)
		}
	}
</script>
