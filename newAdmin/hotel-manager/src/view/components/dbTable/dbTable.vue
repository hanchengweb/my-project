<template>
  <div class="dbTable">
    <!-- 表格上半部 -->
    <searchTable :class="dbTable.tabsTable?'topTable':'topTable2'"
                 :searchTableJson="dbTable.searchTable"></searchTable>
    <!-- 表格下半部 -->
    <tabsTable class="bottomTable"
               :tabsTableJson="dbTable.tabsTable" v-if="dbTable.tabsTable"></tabsTable>
  </div>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import tabsTable from '@/components/tabsTable/tabsTable'
import { mapActions } from 'vuex'

export default {

  components: {
    searchTable,
    tabsTable
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions([
      'handleChangeSubTableStatus'
    ])
  },
  created () {
    // console.log(this.dbTable)
  },
  props: {
    dbTable: {},
    searchTableJson: {},
    tabsTableJson: {}
  }
}
</script>
<style lang="less">
.dbTable {
  height: 100%;
  .topTable {
    height: 55%;
  }
  .topTable2{
    height: 100%
  }
  .bottomTable {
    height: calc(45% - 6px);
  }
}
</style>
