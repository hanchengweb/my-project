<template>
  <div class="searchTableSelf">
    <!--<search class="searchPart" :search="searchTableJson.search" ref="search"></search>-->
    <singleTable class="tablePart"
                 :table="searchTableJson.table"
                 :search="searchTableJson.search"
                 ref="tableSub"></singleTable>
  </div>
</template>
<script>
import search from '@/components/search/search'
import singleTable from '@/components/singleTable/singleTable'
import { mapActions, mapState } from 'vuex'
import { isArray } from '../../libs/tool'

export default {
  props: {
    searchTableJson: {}
  },
  data () {
    return {}
  },
  components: {
    search,
    singleTable
  },
  computed: {
    ...mapState({
      getTabs: state => state.data.tabs
    })
  },
  watch: {
    getTabs (val, old) {
      // this.getHeight(val)
    }
  },
  methods: {
    getHeight (val) {
      const table = this.searchTableJson.table
      let height = '100%'
      // if (table.type == 'sub') {
      // 	height = table.search && isArray(table.search) && table.search.length && table.search.indexOf(val) > -1 ? 'height:calc(100% - 48px)' : '100%'
      // 	if (this.$refs.tableSub && this.$refs.tableSub.$el && this.$refs.tableSub.$el.style) this.$refs.tableSub.$el.style.cssText = height
      // }
    }
  },
  created () {
    // console.log(this.searchTableJson)
  },
  mounted () {
    this.getHeight(this.searchTableJson.table.title || this.searchTableJson.table.name)
    // console.log(this.searchTableJson)
  }
}
</script>
<style lang="less">
.searchTableSelf {
  .tablePart {
    height: 100%;
    background-color: #fff;
  }
  .searchPart {
    margin-bottom: 4px;
  }
}
</style>
