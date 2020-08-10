<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import {getFlag, getTradeList} from '@/api/const'
	import {getConst} from '../../api/hotelConst'
	import {isEmptyObject} from '../../libs/tool'
	import {getData} from '../../api/common'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				searchTable: {
					table: {
						type: 'main',
						hideSearch: true,
						useUrlStatus: true,
						url: 'h_dictionary_dic_/CACHE_LOAD_TYPE/_get',///hotel/manager/dictionary/dic/{code}
						data: {
							sort: 'seqno,asc',
							page: '0',
							size: '30'
						},
						deleteColumnsIndex: 1,
						banDblClick: true,
						urls: {},
						buttons: {
							hideAdd: true,
							hideDel: true,
							hideFlag: true,
							cache: {
								useUrlCacheStatus: true,
								cacheUrl: 'h_cachemgr_cacheByCode_post',///hotel/manager/cachemgr/cacheByCode?code=
								data: {}
							},
							update: {
								useUrlUpdateStatus: true,
								updateUrl: 'h_cachemgr_sendUpdate_get',///hotel/manager/cachemgr/cacheByCode?code=
								data: {}
							},
							actionsAfter: [{
								name: '清理并同步缓存',
								methods: 'post',
								type: 'cacheAll',
								icon: 'swap',
								data: {
									tag: 'one',
									clear: true
								},
								btnClick: this.btnClickCache
							}]
						},
						pagination: {
							pageSize: 30,
						},
						modal: {
							data: {},
						},
					},
					search: {
						isShowHigh: false,
						/*nameArray: [{
							name: '名称', type: 'input', span: '4', dataIndex: 'name'
						}, {
							name: '编码', type: 'input', span: '4', dataIndex: 'code'
						}, {
							name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
						}]*/
					}
				},
			}
		},
		methods: {
			...mapActions([
				'handleChangeTableStatus'
			]),
			changeStatus (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				this.handleChangeTableStatus(this.$route.name)
			},
			btnClickCache (item) {
				let icon = item.icon
				item.icon = 'loading'
				getData({name: 'h_cachemgr_cacheByCode_post', data: item.data}).then(res => {
					item.icon = icon
					if (res.code == '200') {
						if (res.data.success) {
							this.$message.success('操作成功!')
						} else {
							this.$message.error(res.data.message || '操作失败!')
						}
					}
				}, err => {
					item.icon = icon
				})

			}
		},
		computed: {
			...mapState({
				getPegination: state => state.data.pegination,
				getSearch: state => state.data.search,
				getChoseTr: state => state.data.choseTr,
			}),
		},
		watch: {
			getChoseTr (val) {
				if (!isEmptyObject(val)) {
					this.searchTable.table.buttons.cache.data = {code: val.code, clear: false}
					this.searchTable.table.buttons.actionsAfter[0].data.code = val.code
				}
			},
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
			//this.getFlag()
		},
		mounted () {
			this.handleChangeTableStatus(this.$route.name)
		}
	}
</script>
