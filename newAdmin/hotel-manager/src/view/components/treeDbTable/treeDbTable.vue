<template>
  <div class="treeDbTable clearfix">
    <div class="fl leftTree"
         :class="{hideTreeS:getTreeVisible}">
      <!--<p class="title clearfix"><img src="/static/img/components/tree/treeTop.png" alt="">模块列表</p>-->
      <!-- 城市树控件头部 -->
      <treeTop :tableJson="dbTable"
               :treeTop="treeJson"
               :isDbTable="true"></treeTop>
      <!-- 城市树控件主体 -->
      <tree class="tree"
            :treeJson="treeJson"
            @chose-tree="choseTree"></tree>
    </div>
    <!-- 表格详情部分 -->
    <div class="fr rightTable"
         :class="{hideTree:getTreeVisible}">
      <dbTable :dbTable="dbTable"></dbTable>
    </div>

  </div>
</template>
<script>
import dbTable from '@/view/components/dbTable/dbTable'
import tree from '@/components/tree/tree'
import treeTop from '@/components/treeTop/treeTop'
import { mapState } from 'vuex'

export default {
  components: {
    tree,
    dbTable,
    treeTop
  },
  props: {
    dbTable: {},
    treeJson: {}
  },
  created () {
    // console.log(this.treeJson)
  },
  computed: {
    ...mapState({
      getTreeVisible: state => state.app.treeVisible,
    })
  },
  watch: {},
  methods: {
    choseTree (data) {
      this.$emit('chose-tree', data)
    }
  }
}
</script>
<style lang="less">
.treeDbTable {
  .rightTable {
    height: 100%;
    width: calc(100% - 226px);
    -webkit-transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-property: width, background, padding;
    transition-duration: 0.3s, 0.3s, 0.15s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
      cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0s, 0s, 0s;
    &.hideTree {
      width: 100%;
    }
    .topTable {
      height: 60%;
    }
    .bottomTable {
      height: calc(40% - 14px);
    }
  }
  .leftTree {
    width: 220px;
    height: 100%;
    background-color: #f3f3f3;
    margin-right: 6px;
    overflow: hidden;
    -webkit-transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-property: width, background, padding;
    transition-duration: 0.3s, 0.3s, 0.15s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
      cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0s, 0s, 0s;
    &.hideTreeS {
      width: 0;
      margin-right: 0;
    }
    .tree {
      height: calc(100% - 44px);
    }
  }
}
</style>
