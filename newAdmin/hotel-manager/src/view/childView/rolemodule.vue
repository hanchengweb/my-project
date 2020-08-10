<template>
	<authorTable
		:treeJson="tree"
		:treeSelectJson="treeSelect"
		:tableJson="searchTable"
		@cacheBtn-click="cacheBtnClick"
	></authorTable>
</template>
<script>
	import authorTable from '@/view/components/authorTable/authorTable'
	import {mapActions, mapState} from 'vuex'
	import {getScope, getAccess, getModuleList} from '@/api/const'
	import {isEmptyObject} from '@/libs/tool'
	import {getUrlData, getData} from '@/api/common'

	export default {
		components: {
			authorTable
		},
		data () {
			return {
				tree: {
					url: 's_permission_i_authorsystem_get',
					data: {id: ''},
					addType: 'system',
					type: 'list',
					hasTreeSelect: true
				},
				treeSelect: {
					url: 'r_author_role_tree_get',
					data: '',
				},
				searchTable: {
					search: {
						isShowHigh: false,
						nameArray: [{
							name: '模块组', type: 'select', data: [], spans: '6', dataIndex: 'sort'
						}]
					},
					table: {
						hideButtons: true,
						hidePegination: true,
						banDblClick: true,
						banClick: true,
						url: 's_permission_i_authormodule_list_get',
						type: 'main',
						data: {
							id: '',
							sysid: '',
							menuid: '',
							name: '',
							page_page: '0',
							page_size: '10'
						},
						sortReturnData: this.sortReturnData,
						columnsSlot: {
							scope: {
								type: 'select',
								array: [],
								data: ''
							},
							access: {
								type: 'select',
								array: [],
								data: ''
							},
							operation: {
								type: 'edit',
								// array: [{name: "保存", type: "save"}],
								cb: this.save,
								//editSaveCb: this.editCb,
								editCancelCb: this.editCb,
								delCb: this.delCb,
								url: 's_permission_i_module_put',
								delUrl: 's_permission_i_module_delete',
								data: {
									id: '',
									moduleid: '',
									access: '',
									scope: '',
								}
							}
						},
						columns: [{
							title: '模块组名称',
							dataIndex: 'sort',
							width: '20%'
						}, {
							title: '模块名称',
							dataIndex: 'name',
							width: '20%'
						}, {
							title: '数据范围',
							dataIndex: 'scope',
							width: '25%',
							scopedSlots: {customRender: 'scope'},
						}, {
							title: '操作范围',
							dataIndex: 'access',
							width: '20%',
							scopedSlots: {customRender: 'access'},
						}, {
							title: '操作',
							dataIndex: 'operation',
							scopedSlots: {customRender: 'operation'},
						}]
					},
				},
				cacheData: {
					name: 's_permission_i_cache_post',
					type: 'application/json',
					data: {id: ''}
				}
			}
		},
		methods: {
			editCb () {
				this.changeStatus({})
			},
			delCb (item, data) {
				this.save(data) && getUrlData(item.delUrl, this.save(data)).then(res => {
					if (res && !res.showTip) {

						this.$message.success('删除成功!', 2)
					} else {

						this.$message.error('删除失败!', 2)
					}
					this.changeStatus({})
				})
			},
			cacheBtnClick () {
				const id = this.cacheData.data.id
				if (id) {

					this.$message.loading('同步中...')
					getData(this.cacheData).then(res => {

						if (res && !res.showTip) {
							this.$message.success('同步成功!', 2)
						} else {
							this.$message.error('同步失败!', 2)
						}
					}, err => {

						this.$message.error('同步失败!', 2)
					})
				} else {

					this.$message.info('请先选择人员角色!', 2)
				}

			},
			save (target) {
				if (!target.access || !target.scope) {
					this.$message.info('请勿选择空权限!')
					return false
				}
				return {
					id: this.getTreeSelect,
					moduleid: target.id,
					access: target.access,
					scope: target.scope,
				}
			},
			sortReturnData (data) {
				data.forEach((item, index) => {
					if (!data[index][1]) {
						data[index] = {scope: '', access: '', ...data[index][0].module}
					} else {
						data[index][1].scope = data[index][1].scope.toString()
						data[index][1].access = data[index][1].access.toString()
						data[index] = {...data[index][1], ...data[index][1].module}
					}
				})
				return data
			},
			...mapActions([
				'handleTreeSelect',
				'handleChangeTreeStatus',
				'handleChangeTableStatus'
			]),
			getScope () {
				getScope().then(res => {
					res.unshift({text: '', value: '', name: '', disabled: true})
					this.searchTable.table.columnsSlot.scope.array = res
				})
			},
			getAccess () {
				getAccess().then(res => {
					res.unshift({label: '', value: '', name: '', disabled: true})
					this.searchTable.table.columnsSlot.access.array = res
				})
			},
			changeStatus (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				this.handleChangeTableStatus(this.$route.name)
			},
			getModuleList (id) {
				if (!id) return false
				const data = {sysid: id}
				getModuleList(data).then(res => {
					this.searchTable.search.nameArray[0].data = res
				})
			},
		},
		computed: {
			...mapState({
				getTree: state => state.data.tree,
				getTreeSelect: state => state.data.treeSelect,
				getSearch: state => state.data.search
			}),
			// getTreeSelect() {
			//   return this.$store.state.data.treeSelect;
			// },
			// getTree() {
			//   return this.$store.state.data.tree;
			// },
			// getSearch() {
			//   return this.$store.state.data.search
			// },
		},
		watch: {
			getTreeSelect (val) {
				if (val) {
					this.cacheData.data.id = val
					this.tree.data = {id: val}
					this.searchTable.table.data.id = val
					this.handleChangeTreeStatus(this.$route.name)
				}
			},
			getTree (val) {
				!isEmptyObject(val) && this.getModuleList(val.id)
				!isEmptyObject(val) && this.changeStatus(val.typename == 'Menu' ? {menuid: val.id} : {sysid: val.id})
			},
			getSearch (val) {
				if (!val.reset && !isEmptyObject(val)) {
					this.changeStatus(val)
				} else {
					this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				}
			},
		},
		created () {
			this.handleTreeSelect("");
			this.getScope();
			this.getAccess();
		}
	}
</script>
