<template>
	<div class="treeTableSearch">
		<searchSelf :search="searchTableJson.search" v-if="!searchTableJson.hideSearch"></searchSelf>
        <tabsTable 
               :tabsTableJson="searchTableJson.tabsTable" class="a1"></tabsTable>
	</div>
</template>
<script>
import searchSelf from '@/components/search/search'
import tabsTable from '@/components/tabsTable/tabsTable'

export default {
  props: {
    searchTableJson: {}
  },
  components: {
    searchSelf,
    tabsTable
  },
  data () {
    return {}
  },
  methods: {
    choseTree (data) {
      // this.$emit('chose-tree', data)
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
