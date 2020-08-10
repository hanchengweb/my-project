<template>
  <div class="explain">
    <div class="grand"
         v-if="id === 1">
      <p class="grand-title">累计用电彩色图说明</p>
      <p class="grand-detail">
        <span class="grand-one">01</span>
        <span class="grand-two">从签住开始计算，到当前为止该房间消耗的电量。黄线:大众能耗水平；绿线：低于大众能耗水平25%；红线：高于大众能耗水平25%。</span>
      </p>
      <p class="grand-detail">
        <span class="grand-one">02</span>
        <span class="grand-two">当累计用电量位于绿线下方时，表示该房间用电行为低于大众能耗水平，节能力较强，值得表扬；当累计用电量位于绿线上方黄线下方时，表示该房间处于略节能状态，请继续保持；</span>
      </p>
      <p class="grand-detail">
        <span class="grand-one">03</span>
        <span class="grand-two">当累计用电量位于黄线上方红线下方时，表示该房间已消耗电量超过大众能耗水平，没有达到节能目标，可关闭部分用电设施减少能耗，如廊灯、卫生间灯、排气扇等。</span>
      </p>
      <p class="grand-detail">
        <span class="grand-one">04</span>
        <span class="grand-two">当累计用电量位于红线上方时，表示该房间消耗电量严重，可能存在浪费行为，建议减少大功率电器的使用，关闭不必要的用电设施，如空调、不看的电视等。</span>
      </p>
    </div>
    <div class="grand"
         v-if="id === 2">
      <p class="grand-title">实时用电功率说明</p>
      <p class="grand-detail">
        <span class="grand-one">01</span>
        <span class="grand-two">展示当前房间近六小时的实时用电功率；当签住时间不足六小时为签住时间到当前时间的实时用电功率。黄线：酒店各签住房间平均用电功率；绿线：低于平均用电功率25%；红线：高于平均用电功率25%。</span>
      </p>
      <p class="grand-detail">
        <span class="grand-one">02</span>
        <span class="grand-two">当实时用电功率位于绿线下方时，表示当前使用的用电设备较少，节能力强，持续保持该状态能够大大地节省用电。</span>
      </p>
      <p class="grand-detail">
        <span class="grand-one">03</span>
        <span class="grand-two">。当实时用电功率位于绿线上方黄线下方时，表示当前正在使用的用电设备比较大众化，略有节能。</span>
      </p>
      <p class="grand-detail">
        <span class="grand-one">04</span>
        <span class="grand-two">当实时用电功率位于黄线上方红线下方时，表示当前使用的用电设备较多，该状态下不能达到节能效果。</span>
      </p>
      <p class="grand-detail">
        <span class="grand-one">05</span>
        <span class="grand-two">当实时功率位于红线上方时，表示当前正在使用的用电设备过多或者大功率电器使用量大，造成了一定浪费。</span>
      </p>
    </div>
    <div class="grand"
         v-if="id === 3">
      <p class="grand-title">酒店绿色标签说明</p>
      <p class="grand-detail">
        <span class="grand-one">01</span>
        <span class="grand-two">绿叶数越多，表示该酒店为用电节能做出的贡献越大，最多为五叶。贡献值由入住该酒店客人节能行为提供。</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'explain',
  data () {
    return {
      id: ''
    }
  },
  onShow () {
    this.id = Number(this.$root.$mp.query.id)
    console.log(this.id)
  }
}
</script>
<style lang="less">
.explain {
  width: 100%;
  .grand {
    padding: 0 36rpx;
    .grand-title {
      font-family: PingFangSC-Medium;
      font-size: 17px;
      color: #333333;
      text-align: center;
    }
    .grand-detail {
      margin-bottom: 36rpx;
      .grand-one {
        display: inline-block;
        background: #008bcd;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffffff;
        padding: 5rpx 10rpx;
        margin-right: 15rpx;
      }
      .grand-two {
        font-family: PingFangSC-Regular;
        font-size: 17px;
        color: #333333;
        text-align: justify;
        line-height: 30px;
      }
    }
  }
}
</style>