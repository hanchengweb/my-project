<template>
  <div class="activity">
      <p style="marign:20px auto;text-align:center">用户状态异常</p>
  </div>
</template>

<script>
import { doAuthLogin } from '@/api/user'
export default {
  data () {
    return {
      ids: 0,
      activityBol: true,
      Idactivity: 0
    }
  },
  onShow () {
    this.init()
  },
  methods: {
    init () {
      doAuthLogin({}).then(info => {
        if (info.flag !== 2) {
          mpvue.reLaunch({ url: '/pages/index/main' })
        }
      })
    }
  },
  onPullDownRefresh () {
    // 下拉刷新
    this.init()
    wx.stopPullDownRefresh()
  }
}
</script>
<style scope lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
</style>
