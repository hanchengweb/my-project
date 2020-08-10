<template>
  <div class="treeTable clearfix authorTable">
    <div class="fl leftTree">
      <p class="title clearfix">
        <span class="fl block">人员角色分类:</span>
        <a-button key="`button-key-cache`" class="" style="margin-left: 20px" @click="cacheBtnClick">
          缓存同步
        </a-button>
        <treeSelect
          class="treeSelect fl"
          :treeSelectJson="treeSelectJson"
        ></treeSelect>
      </p>
      <tree class="tree" :treeJson="treeJson"></tree>
    </div>
    <searchTable class="rightTable fr" :searchTableJson="tableJson"  ></searchTable>
  </div>
</template>
<script>
  import tree from '@/components/tree/tree'
  import treeSelect from '@/components/treeSelect/treeSelect'
  import searchTable from '@/components/searchTable/searchTable'

  export default {
    components: {
      tree,
      treeSelect,
      searchTable
    },
    props: {
      treeJson: {},
      treeSelectJson: {},
      tableJson: {}
    },
    methods: {
      cacheBtnClick(){
        this.$emit("cacheBtn-click");
      }
    },
    created(){
    }
  }
</script>
<style lang="less">
  .treeTable {
    &.authorTable .rightTable{
      //background-color: #fff;
    }
    .rightTable {
      height: 100%;
      width: calc(100% - 226px);
    }
    .leftTree {
      width: 220px;
      height: 100%;
      background-color: #F3F3F3;
      margin-right: 6px;
      .tree {
        height: calc(100% - 56px);
      }
      .title {
        font-size: 14px;
        color: #333;
        text-align: left;
        line-height: 52px;
        margin-bottom: 4px;
        background-color: #fff;
        padding-left: 10px;
        .treeSelect {
          width: 160px;
          margin-left: 10px;
        }
      }
    }
  }
</style>
