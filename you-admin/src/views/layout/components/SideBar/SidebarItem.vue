<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <el-menu-item v-if="hasOneShowingChild(item.children) && !onlyOneChild.children" :index="resolvePath(onlyOneChild.path)">
      <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
    </el-menu-item>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item v-if="child.children&&child.children.length>0" :base-path="resolvePath(child.path)" :item="child" :key="child.path" class="nest-menu"></sidebar-item>

        <el-menu-item v-else :index="resolvePath(child.path)" :key="child.name">
          <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null,
    }
  },
  methods: {
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    },
  }
}
</script>

<style scoped>

</style>
