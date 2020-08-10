<template>
  <div class="slideMenu">
    <a-menu @click="handleClick"
            :inlineIndent="0"
            :selectedKeys="selectedKeys"
            :defaultOpenKeys="defaultOpenKeys"
            :openKeys="openKeys"
            style="width:100%"
            @openChange="onOpenChange"
            mode="inline"
            :inlineCollapsed="collapsed">
      <template v-for="menu in menuList">
        <a-sub-menu v-if="menu.children && menu.children.length"
                    :key="menu.route||menu.key">
          <span slot="title">
            <a-icon :type="menu.icon"
                    v-if="menu.icon" /><span>{{menu.name}}</span></span>
          <a-menu-item v-for="child in menu.children"
                       :key="`${child.route}_${child.moduleid}`">
            {{child.name}}
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else
                     :key="`${menu.route}_${child.moduleid}`">{{menu.name}}</a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { isEmptyObject } from '../../../../libs/tool'

export default {
  data () {
    return {
      menuList: [],
      selectedKeys: [],
      defaultOpenKeys: [],
      rootSubmenuKeys: [],
      openKeys: [],
      isAnalysis: false,
      collapsed: false
    }
  },
  computed: {
    ...mapState({
      getCurrentName: state => state.app.currentName,
      getChoseHotel: state => state.common.choseHotel
    })
  },
  watch: {
    openKeys (val) {
    },
    selectedKeys (val) {
      // if (this.$store.state.app.currentName === 'analysis') return false
      if (val && val.length) {
        let arr = val[0].split('_')
        // this.$router.push({ name: arr[0], query: { moduleid: arr[1], ...this.$route.query } })
        this.$router.push({ name: arr[0], query: { moduleid: arr[1] } })
      }
    },
    getCurrentName (name) {
      if (name === 'analysis') return false
      this.getMenuList(name)
      this.getDefaultKey(name)
    },
    $route (to, from) {
      to.name !== 'AnalysisMain' && this.getMenuList(to.fullPath.split('/')[1].toLocaleLowerCase())
      this.isAnalysis = to.matched[0].name === 'Analysis' && to.matched[1].name !== 'AnalysisMain'
    }
  },
  created () {
    this.$route.name !== 'AnalysisMain' && this.getMenuList(this.$route.fullPath.split('/')[1].toLocaleLowerCase())
    this.isAnalysis = this.$route.matched[0].name === 'Analysis' && this.$route.matched[1].name !== 'AnalysisMain'
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
      // console.log(openKeys)
      // this.openKeys = openKeys
    },
    getDefaultKey (name) {
      const menuList = this.$store.state.app.subMenuList[name]
      let keyPath = []
      if (menuList && menuList.length) {
        keyPath.unshift(menuList[0].route)
        if (menuList[0].children && menuList[0].children.length) {
          this.defaultOpenKeys = keyPath
          this.openKeys = keyPath
          keyPath.unshift(`${menuList[0].children[0].route}_${menuList[0].children[0].moduleid}`)
        }
      }
      this.selectedKeys = keyPath
      console.log(this.selectedKeys)
      // this.$router.push({name: `${arr[arr.length - 1]}`, query: {moduleid: arr[1]}})
    },
    handleClick (e) {
      if (this.isAnalysis && isEmptyObject(this.$store.state.common.choseHotel)) {
        this.$message.info('请先选择酒店再进行操作!')
        return false
      }
      this.selectedKeys = e.keyPath
      // const arr = e.key.split('-')
      // this.$router.push({name: `${arr[arr.length - 1]}`, query: {moduleid: arr[1]}})
    },
    titleClick () {

    },

    getMenuList (name) {
      this.menuList = this.$store.state.app.subMenuList[name]
      const json = this.getKeyPath(this.$store.state.app.subMenuList[name])
      this.selectedKeys = json[this.$route.name]
      if (json[this.$route.name] && json[this.$route.name][1]) {
        this.defaultOpenKeys = [json[this.$route.name][1]]
        this.openKeys = [json[this.$route.name][1]]
      }
      if (this.$route.name == 'managerAdMaterial') {
        this.defaultOpenKeys = ['Advert-Manager']
        this.openKeys = ['Advert-Manager']
        this.selectedKeys = ['managerAdMaterial', 'managerAdMaterialInfo_531', 'Advert-Manager']
      }
      if (this.$route.name == 'managerPlan') {
        this.defaultOpenKeys = ['Advert-Manager']
        this.openKeys = ['Advert-Manager']
        this.selectedKeys = ['managerPlan', 'managerPlanInfo_532', 'Advert-Manager']
      }
      this.getRootSubmenuKeys(this.menuList)
    },
    getKeyPath (arr) {
      let json = {}
      arr && arr.length && arr.forEach(item => {
        if (item.children && item.children.length) {
          item.children.forEach(i => {
            json[i.route] = [`${i.route}_${i.moduleid}`, item.route]
          })
        } else {
          json[item.route] = [`${item.route}_${item.moduleid}`]
        }
      })
      return json
    },
    getRootSubmenuKeys (list) {
      this.rootSubmenuKeys = []
      list && list.length && list.forEach(item => {
        if (item.children && item.children.length) {
          this.rootSubmenuKeys.push(item.route || item.key)
        }
      })
    }
  }
}
</script>
<style lang="less">
.slideMenu {
  height: calc(100% - 54px);
  min-height: calc(100% - 54px);
  position: absolute;
  left: 0;
  top: 54px;
  width: 176px;
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

  &:hover {
    //overflow-y: scroll;
  }

  .collapsed {
    position: absolute;
    z-index: 3;
    top: 50%;
    right: 0;
  }

  .ant-menu {
    height: 100%;
    color: #666;

    .ant-menu-sub {
      background-color: #f8f8f8;
      border-bottom: 1px solid #8a99a7;
    }

    .ant-menu-submenu-open {
      .ant-menu-submenu-title {
        background-color: #0cd8d5;
        color: #fff;
        border-bottom-color: #0cd8d5;

        &:hover {
          color: #fff;
        }

        .anticon {
          background-color: #21cdcb;
          color: #fff;
        }

        .ant-menu-submenu-arrow {
          color: #fff;
        }
      }
    }

    .ant-menu-item {
      margin: 0 !important;
    }

    .ant-menu-inline .ant-menu-selected:after,
    .ant-menu-inline .ant-menu-item-selected:after {
      left: 0;
    }

    .ant-menu-submenu-title {
      border-bottom: 1px solid #8a99a7;
      margin: 0;
      line-height: 42px;
      height: 42px;
      padding-left: 42px !important;

      .anticon {
        font-size: 18px;
        position: absolute;
        height: 42px;
        width: 42px;
        background-color: #ebebeb;
        color: #919191;
        left: 0;

        svg {
          margin-top: 12px;
        }
      }

      &:first-child {
      }
    }
  }
}
</style>
