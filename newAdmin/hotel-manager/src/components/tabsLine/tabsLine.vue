<template>
  <div class="tabsLineSelf">
    <a-tabs type="card"
            :activeKey="key"
            :defaultActiveKey="defaultActiveKey"
            @change="change">
      <a-tab-pane v-for="i in  arr"
                  :tab="i.name"
                  :key="i.key"></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { getUrlData } from '../../api/common'
import { isEmptyObject } from '../../libs/tool'
import { changeFirstUrl } from '../../libs/util'

export default {
  data () {
    return {
      arr: [{
        name: '附表',
        key: '1'
      }],
      key: '1',
      defaultActiveKey: ''
    }
  },
  props: {
    tabsJson: {},
    table: {}
  },
  watch: {
    tabsJson (val) {
      if (this.tabsJson && this.tabsJson.arr && this.tabsJson.arr.length) {
        this.arr = this.tabsJson.arr
        this.key = this.tabsJson.arr[0].key
        this.defaultActiveKey = this.tabsJson.arr[0].key
      }
    }

  },
  created () {
    if (this.tabsJson && this.tabsJson.arr && this.tabsJson.arr.length) {
      const arr = this.tabsJson.arr
      this.arr = this.tabsJson.arr
      this.key = this.tabsJson.arr[0].key
      this.defaultActiveKey = this.tabsJson.arr[0].key
      !this.tabsJson.noHandleTabs && this.key && this.handleTabs(this.key)
      if (!this.tabsJson.noAccess && this.table && this.table.type && this.table.type == 'sub' && this.$route.matched[0].name === 'Sys') this.getSubAcess(arr)
    }
  },
  methods: {
    getSubAcess (arr) {
      arr.forEach(item => {
        // getUrlData(`${item.key.indexOf('wx') > -1 ? 'o' : 'h'}_${item.key}_info_get`, {}).then(res => {
        if (this.$route.name == 'programCarousel' && item.key == 'programNewsList') {
          getUrlData(`l_homeNews_info_get`, {}).then(res => {
            // console.log(res)
            if (res.code == '200' && res.data) {
              this.handleSubAccess({ ...this.$store.state.access.subAccess, ...{ [item.key]: res.data.access } })
            }
          })
        } else if (this.$route.name == 'programUser' || this.$route.name == 'programCarousel') {
          getUrlData(`l_${item.key}_info_get`, {}).then(res => {
            // console.log(res)
            if (res.code == '200' && res.data) {
              this.handleSubAccess({ ...this.$store.state.access.subAccess, ...{ [item.key]: res.data.access } })
            }
          })
        } else {
          getUrlData(`${changeFirstUrl(item.key)}_${item.key}_info_get`, {}).then(res => {
            // console.log(res)
            if (res.code == '200' && res.data) {
              this.handleSubAccess({ ...this.$store.state.access.subAccess, ...{ [item.key]: res.data.access } })
            }
          })
        }
      })
    },
    change (k) {
      // table.vue随之变化
      (k)
      this.key = k
      this.tabsJson.change && this.tabsJson.change(k)
      !this.tabsJson.noHandleTabs && this.key && this.handleTabs(k)
    },
    ...mapActions([
      'handleTabs',
      'handleSubAccess'
    ])
  }
}
</script>
<style lang="less">
.tabsLineSelf {
  height: 40px;
  overflow: hidden;
  margin-top: 6px;
  background-color: #eafafa;
  margin-bottom: 3px;

  .ant-tabs {
    text-align: left;

    .ant-tabs-bar {
      border-bottom: 1px solid #0cd8d5;
    }

    .ant-tabs-nav-container {
      padding-left: 12px;
    }

    &.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
      margin-top: 10px;
      height: 30px;
      line-height: 30px;
      background-color: #fff;
      font-size: 12px;
      color: #333;
      border-color: #0cd8d5;
      border-radius: 0;
      border-bottom: 1px solid #0cd8d5;

      &.ant-tabs-tab-active {
        border-bottom-color: #fff;
      }
    }
  }
}
</style>
