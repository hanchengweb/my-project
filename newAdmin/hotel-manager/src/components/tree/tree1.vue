<template>
	<a-table
		:columns="columns"
		:dataSource="data"
		:pagination="false"
		:showHeader="false"
		:customRow="customRowFun"
		id="treeSelf">
    <span slot="name" slot-scope="name">
		<img src="/static/img/components/tree/treeItem.png" alt="" style="margin: -6px 4px -6px 0"/>{{name}}
    </span>
	</a-table>

</template>
<script type="text/jsx">

	const columns = [{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		scopedSlots: {customRender: 'name'},
	}]
	let updateChosed = {}
	import {isArray} from '@/libs/tool'
	import {getTree} from '@/api/treeData'
	import {sortTreeData, sortListTreeData, choseTableTr} from '@/libs/util'
	import {mapActions} from 'vuex'
	import {updateTreeNode} from '@/libs/util'
	import {updateTreeNodeArray} from '@/api/baseData'

	export default {
		props: {
			treeJson: {}
		},
		data () {
			return {
				columns,
				data: [],
				choseData: {},
				testData: {},
				plusData: {
					system: {
						key: 'tree-top',
						name: '系统',
						children: []
					}
				}
			}
		},
		watch: {
			choseData (val) {
				this.handleTree(this.choseData)
			},
			getChangeTreeStatus (val) {
				if (val) this.getData()
			},
			getUpdateTreeNode (val) {
				updateTreeNodeArray.indexOf(this.$route.name) > -1 && updateTreeNode(val, updateChosed)
			}
		},
		computed: {
			getChangeTreeStatus () {
				return this.$store.state.change.changeTreeStatus
			},
			getUpdateTreeNode () {
				return this.$store.state.app.updateTreeNode
			}
		},
		methods: {
			...mapActions([
				'handleTree',
				'handleChangeTreeStatus',
			]),
			customRowFun (record, index) {
				return {
					on: {
						click: (e) => {
							if (this.treeJson.addType && this.plusData[this.treeJson.addType].key == record.key) return false
							choseTableTr((e.target.tagName == 'TD' ? e.target.parentNode : e.target.offsetParent.parentNode), 'active')
							this.choseData = record
							updateChosed = record
							this.$emit('chose-tree', this.choseData)
						}
					}
				}
			},
			getData () {
				getTree(this.treeJson.url, this.treeJson.data).then(res => {
					if (res) {
						let data = isArray(res.data) ? res.data : [res.data],
							sortData = this.treeJson.sortReturnTreeData ? this.treeJson.sortReturnTreeData(data) : this.treeJson.type != 'list' ? sortTreeData(data) : sortListTreeData(data)

						this.data = this.treeJson.addType ? [{
							...this.plusData[this.treeJson.addType],
							children: sortData
						}] : sortData
					}
					this.handleChangeTreeStatus('')
				}, err => {
					this.handleChangeTreeStatus('')
				})
			}
		},
		created () {
			!this.treeJson.hasTreeSelect && this.getData()
		}
	}
</script>
<style lang="less">
	#treeSelf {
		width: 100%;
		line-height: 34px;
		overflow-y: auto;
		text-align: left;
		font-size: 12px;
		color: #333;
		background-color: #fff;
		&:hover {
		}
		td {
			color: #333;
			cursor: pointer;
		}
		tr:not([display=none]) {
			&:nth-child(odd) td, &:nth-child(odd) th {
				background-color: #fff;
			}
			&:nth-child(even) td, &:nth-child(even) th {
				background-color: #F3F3F3;
			}
		}
		/*.ant-table-thead > tr,.ant-table-tbody > tr{*/
		/*&:nth-child(odd) td,&:nth-child(odd) th{*/
		/*background-color: #F3F3F3;*/
		/*}*/
		/*&:nth-child(even) td,&:nth-child(even) th{*/
		/*background-color: #fff;*/
		/*}*/
		/*}*/

		.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
			padding-top: 0;
			padding-bottom: 0;
			line-height: 34px;
			font-size: 12px;
			border-bottom: 0;
		}

	}
</style>
