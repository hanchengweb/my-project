<template>
  <div class="treeTable clearfix">
    <div class="fl leftTree"
         :class="{hideTreeS:getTreeVisible}">
      <treeTop :tableJson="searchTableJson"
               :treeTop="treeJson"
               :isDbTable="false"></treeTop>
      <tree class="tree"
            :treeJson="treeJson"
            @chose-tree="choseTree"></tree>
    </div>
    <searchTable class="fr rightTable"
                 :searchTableJson="searchTableJson"
                 :class="{hideTree:getTreeVisible}"></searchTable>
  </div>
</template>
<script>
import tree from '@/components/tree/tree'
import searchTable from '@/components/searchTable/searchTable'
import treeTop from '@/components/treeTop/treeTop'
import { mapState } from 'vuex'

export default {
  props: {
    treeJson: {},
    searchTableJson: {}
  },
  components: {
    tree,
    treeTop,
    searchTable
  },
  created () {
    // console.log(this.searchTableJson.table)
  },
  computed: {
    ...mapState({
      getTreeVisible: state => state.app.treeVisible
    })
  },
  methods: {
    choseTree (data) {
      this.$emit('chose-tree', data)
    }
  }
}
</script>
<style lang="less">
.treeTable {
  .rightTable {
    height: 100%;
    width: calc(100% - 226px);
    /*-webkit-transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);*/
    /*transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);*/
    /*transition-property: width, background, padding;*/
    /*transition-duration: 0.3s, 0.3s, 0.15s;*/
    /*transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1);*/
    /*transition-delay: 0s, 0s, 0s;*/
    &.hideTree {
      width: 100%;
    }
  }
  .leftTree {
    width: 220px;
    height: 100%;
    background-color: #f3f3f3;
    margin-right: 6px;
    overflow: hidden;
    /*-webkit-transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);*/
    /*transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);*/
    /*transition-property: width, background, padding;*/
    /*transition-duration: 0.3s, 0.3s, 0.15s;*/
    /*transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1);*/
    /*transition-delay: 0.3s, 0s, 0s;*/
    &.hideTreeS {
      width: 0;
      margin-right: 0;
    }
    .tree {
      height: calc(100% - 44px);
    }
    .title {
      font-size: 14px;
      color: #333;
      text-align: left;
      line-height: 42px !important;
      margin-bottom: 4px;
      background-color: #fff;
      padding-left: 10px;
      img {
        display: block;
        float: left;
        margin-top: 12px;
        margin-right: 6px;
      }
    }
  }
}
</style>
