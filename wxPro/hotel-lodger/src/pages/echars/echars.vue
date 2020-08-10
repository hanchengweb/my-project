<template>
  <div class="echarts-wrap">
    <div class="wrap-one"
         @click="toFun()">
      <span>累计用电</span>
      <img src="../../../static/images/wrapOne.png"
           alt=""
           class="one-img">
    </div>

    <broken></broken>
    <!-- <p class="wrap-two">功率曲线图</p> -->
    <div class="wrap-two"
         @click="toFun1()">
      <span>实时功率</span>
      <img src="../../../static/images/wrapTwo.png"
           alt=""
           class="one-img">
    </div>
    <p class="title">
      <span class="title-dian"></span>
      <span class="title-span">近六个小时</span>
    </p>
    <broken1></broken1>
  </div>
</template>

<script>
import broken from '../../components/brokenOne'
import broken1 from '../../components/brokenOne1'
export default {
  components: {
    broken,
    broken1
  },
  data () { },
  onShareAppMessage: function (res) {
    var that = this
    return {
      title: '邀您加入E度电',
      path: '/pages/index/main',
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  methods: {
    toFun () {
      wx.navigateTo({
        url: `../explain/main?id=1`
      })
    },
    toFun1 () {
      wx.navigateTo({
        url: `../explain/main?id=2`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.echarts-wrap {
  width: 100%;
  position: relative;
  border-top: 2rpx solid #eeeeee;
  .wrap-one {
    display: flex;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-size: 30rpx;
    color: #333333;
    margin-left: 34rpx;
    margin-top: 20rpx;
    .one-img {
      width: 40rpx;
      height: 40rpx;
      margin-left: 20rpx;
    }
  }
  .title {
    display: flex;
    align-items: center;
    margin-left: 34rpx;
    .title-dian {
      width: 12rpx;
      height: 12rpx;
      background: #1ba5e6;
      border-radius: 100%;
      margin-right: 5rpx;
    }
    .title-span {
      font-family: PingFangSC-Regular;
      font-size: 28rpx;
      color: #1ba5e6;
    }
  }
  .wrap-two {
    display: flex;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-size: 30rpx;
    color: #333333;
    margin-left: 34rpx;
    .one-img {
      width: 40rpx;
      height: 40rpx;
      margin-left: 20rpx;
    }
  }
}
</style>