<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import {getFlag, getTradeList} from '@/api/const'
	import {getConst} from '../../api/hotelConst'
	import {isEmptyObject} from '../../libs/tool'

	export default {
		name: 'system',
		components: {
			searchTable
		},
		data () {
			return {
				searchTable: {
					table: {
						type: 'main',
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
							data: {
								tradename: [],
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
			}
		},
		methods: {
			...mapActions([
				'handleChangeTableStatus'
			]),
			getFlag () {
				getConst('flag').then(res => {
					this.searchTable.search.nameArray[2].data = res
				})
			},
			getTradeList () {
				getTradeList().then(res => {
					this.searchTable.table.modal.data.tradename = res
				})
			},
			changeStatus (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				this.handleChangeTableStatus(this.$route.name)
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
					this.searchTable.table.buttons.cache.data = {code: val.code}
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
			this.getFlag()
		},
		mounted () {
			this.handleChangeTableStatus(this.$route.name)
		}
	}
</script>
