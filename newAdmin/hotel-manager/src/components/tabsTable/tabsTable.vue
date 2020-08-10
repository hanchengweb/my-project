<template>
  <div class="tabsTableSelf">
    <tabsLine :tabsJson="tabsTableJson.tabs"
              :table="tabsTableJson.table"></tabsLine>
    <!--<singleTable class="tablePart" ref="bottomTable" :table="tabsTableJson.table"></singleTable>-->
    <searchTable class="tablePart"
                 ref="bottomTable"
                 :searchTableJson="tabsTableJson"></searchTable>
  </div>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import tabsLine from '@/components/tabsLine/tabsLine'

export default {
  components: {
    searchTable,
    tabsLine
  },
  props: {
    tabsTableJson: {}
  },
  created () {
  },
  methods: {}
}
</script>
<style lang="less">
.tabsTableSelf {
  .tablePart {
    height: calc(100% - 40px);
    background-color: #fff;
    .tablePart {
      height: 100%;
    }
  }
}
</style>
