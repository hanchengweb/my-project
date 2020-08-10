<template>
  <div class="content">
     <img src="/static/images/defaultno.png" alt="" class="defaultno">
     <p class="defaultno-p">敬请期待</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ids: 0
    }
  },
  onShow () {
    this.from = this.$root.$mp.query.from
    let barTitle
    switch (this.from) {
      case 'discount':
        barTitle = '优惠券'
        break
      case 'cash':
        barTitle = '代金券'
        break
      case 'change':
        barTitle = '兑换记录'
        break
    }
    wx.setNavigationBarTitle({
      title: barTitle,
      success: function (res) {
        // success
      }
    })
  }
}
</script>
<style scoped lang="less">
  .content{
    .defaultno{
      width: 300rpx;
      height: 262rpx;
      display: block;
      padding-top: 160rpx;
      margin:68rpx auto
    }
    .defaultno-p{
      font-family:PingFangSC-Regular;
      font-size:17px;
      color:#919191;
      text-align:center;
    }
  }
</style>
