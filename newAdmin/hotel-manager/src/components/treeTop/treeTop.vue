<template>
  <div id="treeTop">
    <a-button :icon="getSlideMenuVisible?`menu-unfold`:`menu-fold`"
              class="slideMenuBtn"
              v-if="(table && !isEmptyObject(table) &&table.type=='main')||isAnalysis ||isHotel"
              @click="changeLeftVisible"></a-button>
    <!--<a-input-search-->
    <!--placeholder="请输入搜索内容"-->
    <!--@search="onSearch"-->
    <!--@change="onChange"-->
    <!--v-model="value"-->
    <!--enterButton-->
    <!--class="inputSearch"-->
    <!--v-if="treeTop && treeTop.type=='input'"-->
    <!--/>-->
    <p class="clearfix title"><img src="/static/img/components/tree/treeTop.png"
           alt="">{{treeTop.title}}</p>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { isEmptyObject } from '../../libs/tool'

export default {
  props: {
    treeTop: {},
    tableJson: {},
    isDbTable: false
  },
  data () {
    return {
      value: '',
      table: {}
    }
  },
  computed: {
    ...mapState({
      getSlideMenuVisible: state => state.app.slideMenuVisible,
    })
  },
  created () {
    // console.log(this.treeTop)
    this.table = this.isDbTable ? this.tableJson.searchTable.table : this.tableJson.table
    if (!this.table || isEmptyObject(this.table)) {
      this.searchVisible = true
    }
    this.isSys = this.$route.matched[0].name === 'Sys'
    this.isAnalysis = this.$route.matched[0].name === 'Analysis'
    this.isHotel = this.table.type === 'hotel'
  },
  methods: {
    isEmptyObject,
    ...mapActions([
      'handleTreeSelect',
    ]),
    onSearch (val) {
      this.handleTreeSelect(this.value)
    },
    onChange (e) {
    },
    changeLeftVisible () {
      //this.$store.commit('setSlideMenuVisible')

      this.$store.commit('setSlideMenuVisible', !this.$store.state.app.slideMenuVisible)
    }
  }
}
</script>
<style lang="less">
#treeTop {
  font-size: 14px;
  color: #333;
  text-align: left;
  line-height: 42px;
  margin-bottom: 4px;
  background-color: #fff;
  padding-right: 10px;
  position: relative;

  .slideMenuBtn {
    position: absolute;
    border-width: 0;
    padding: 5px;
    font-size: 24px;
    height: 42px;
    left: 0;
    border-right-width: 1px;
    border-radius: 0;
  }

  .inputSearch {
    width: calc(100% - 40px);
    margin-left: 40px;
  }

  .title {
    padding-left: 40px;
    margin-bottom: 0;

    img {
      display: block;
      float: left;
      margin-top: 8px;
      margin-right: 6px;
    }
  }
}
</style>
