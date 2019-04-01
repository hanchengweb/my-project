<template>
  <el-scrollbar warpClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :default-active="$route.path"
      :router="true"
      text-color="#4d4d4d"
      active-text-color="#4dc4FF">
      <sidebar-item v-for="route in routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  computed: {
    routers() {
      return this.$store.state.permission.routers
    },
  },
  components: {
    SidebarItem
  }
}
</script>

<style>
.scrollbar-wrapper {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden!important;
}
</style>
