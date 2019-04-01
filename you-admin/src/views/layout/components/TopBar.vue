<template>
  <div class="topbar-wrapper">
    <div class="left-con">管理系统</div>
    <div class="right-con" @click="logout">退出</div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('frontLogOut').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
.topbar-wrapper {
  height: 70px;
  background: linear-gradient(to right, #4BD28B, #AEC9F4);
  font-size: 18px;
  font-family: 'PingFangSC-Regular';
  color: #fff;
}
.left-con, .right-con {
  height: 70px;
  line-height: 70px;
}
.left-con {
  float: left;
  margin-left: 51px;
}
.right-con {
  float: right;
  margin-right: 45px;
  cursor: pointer;
}
</style>
