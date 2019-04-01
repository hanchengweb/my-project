<template>
  <div class="app-main">
    <div class="main-con">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-main {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: #F5F6FA;
}
.main-con {
  height: 100%;
  border-radius: 10px;
  background-color: #fff;
}
</style>

