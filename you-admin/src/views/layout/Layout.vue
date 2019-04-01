<template>
  <div class="app-wrapper">
    <top-bar></top-bar>
    <div class="app-main-con">
      <side-bar class="side-bar-wrapper"></side-bar>
      <app-main class="app-main-wrapper"></app-main>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar/index.vue'
import TopBar from './components/TopBar.vue'
import AppMain from './components/AppMain.vue'

export default {
  components: {
    SideBar,
    TopBar,
    AppMain
  }
}
</script>

<style>
.app-wrapper {
  height: 100%;
}
.app-main-con {
  display: flex;
  height: calc(100vh - 70px);
}
.side-bar-wrapper {
  width: 170px;
}
.app-main-wrapper {
  flex: 1;
}
</style>
