<template>
	<div class="treeTableSearch">
		<searchSelf :search="searchTableJson.search" v-if="!searchTableJson.hideSearch"></searchSelf>
		<div class="clearfix" :style="`height: ${searchTableJson.hideSearch ? '100%' :'calc(100% - 46px)'};`">
			<tree :treeJson="treeJson" @chose-tree="choseTree" class="fl"
				  style="width: 220px;margin-right: 6px;height: 100%;border-top: 1px solid #eee"></tree>
			<singleTable :table="searchTableJson.table" :search="searchTableJson.search" class="fl"
						 style="height: 100%;background-color: #fff;width: calc(100% - 226px)"></singleTable>
		</div>
	</div>
</template>
<script>
	import tree from '@/components/tree/tree'
	import searchSelf from '@/components/search/search'
	import singleTable from '@/components/singleTable/singleTable'

	export default {
		props: {
			treeJson: {},
			searchTableJson: {}
		},
		components: {
			tree,
			searchSelf,
			singleTable
		},
		data () {
			return {}
		},
		methods: {
			choseTree (data) {
				//this.$emit('chose-tree', data)
			}
		},
		created () {
		}
	}
</script>
<style lang="less">
	.treeTableSearch {
		background-color: #F2F4F8 !important;
	}
</style>
