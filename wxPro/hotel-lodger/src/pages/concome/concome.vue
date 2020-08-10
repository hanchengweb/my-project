<template>
  <div class="concome">
    <!-- tab切换 -->
    <div class="tab-change">
      <p class="tab-p">
        <span v-for="(item, index) in tabs"
              :key="index"
              class="one-span"
              :class="activeIndex == index ? 'chang-span' : ''"
              @click="tabClick(index, e)">{{item}}</span>
      </p>
      <p class="tab-silder"
         :style="{left: sliderLeft + 'px', transform: 'translateX(' + sliderOffset + 'px)' }"></p>
    </div>
    <!-- 未使用 -->
    <div class="unused"
         v-if="activeIndex === 0">
      <div class="unused-securities"
           @click="scanCode(item)"
           v-for="item in conData1"
           :key="item">
        <div class="securities-left">
          <p class="left-name">{{item.hotelName}}专用券</p>
          <p class="left-time">使用期限：{{item.activeTimeInfo}}</p>
          <p class="left-title">本店有最终解释权</p>
        </div>
        <div class="securities-right">
          <p class="right-type">{{item.couponName}}</p>
        </div>
        <span class="securities-nmb">劵编号：{{item.couponNum}}</span>
        <span class="securities-data">日期：{{item.receiveTime}}</span>
      </div>
    </div>
    <!-- 已使用 -->
    <div class="beused"
         v-else-if="activeIndex === 1">
      <div class="beused-securities"
           v-for="item in conData2"
           :key="item">
        <div class="securities-left">
          <p class="left-name">{{item.hotelName}}专用券</p>
          <p class="left-time">使用期限：{{item.activeTimeInfo}}</p>
          <p class="left-title">本店有最终解释权</p>
        </div>
        <div class="securities-right">
          <p class="right-type">{{item.couponName}}</p>
        </div>
        <span class="securities-nmb">劵编号：{{item.couponNum}}</span>
        <span class="securities-data">日期：{{item.receiveTime}}</span>
      </div>
      <p class="p-detail"
         v-if="bol1">近一年数据到此为止</p>
    </div>
    <!-- 已过期 -->
    <div class="expired"
         v-else-if="activeIndex === 2">
      <div class="expired-securities"
           v-for="item in conData3"
           :key="item">
        <div class="securities-left">
          <p class="left-name">{{item.hotelName}}专用券</p>
          <p class="left-time">使用期限：{{item.activeTimeInfo}}</p>
          <p class="left-title">本店有最终解释权</p>
        </div>
        <div class="securities-right">
          <p class="right-type">{{item.couponName}}</p>
        </div>
        <span class="securities-nmb">劵编号：{{item.couponNum}}</span>
        <span class="securities-data">日期：{{item.receiveTime}}</span>
      </div>
      <p class="p-detail"
         v-if="bol2">近一年数据到此为止</p>
    </div>
  </div>
</template>
<script>
import { getNocoupon, getYetcoupon, getOvercoupon } from '../../api/concome'
import { getClientId, getToken, getUserNum } from '@/utils/user'
export default {
  name: 'concome',
  data () {
    return {
      tabs: ['未使用', '已使用', '已过期'],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      widthAll: '',
      size: 10,
      page: 0,
      conData1: [],
      conData2: [],
      conData3: [],
      bol1: false,
      bol2: false
    }
  },
  onShow () {
    this.bol1 = false
    this.bol2 = false
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        var sliderWidth = res.windowWidth / 10
        that.widthAll = res.windowWidth
        that.sliderLeft = (res.windowWidth / that.tabs.length - sliderWidth) / 2
        that.sliderOffset = res.windowWidth / that.tabs.length * that.activeIndex
      }
    })
    that.getNouse()
  },
  onReachBottom () {
    if (this.activeIndex === 0) {
      this.page = this.page + 1
      this.getNouse()
    } else if (this.activeIndex === 1) {
      this.page = this.page + 1
      this.getYet()
    } else if (this.activeIndex === 2) {
      this.page = this.page + 1
      this.getOver()
    }
  },
  methods: {
    // 获取未使用优惠劵
    async getNouse () {
      let param = {
        userNum: getUserNum(),
        page: this.page,
        size: this.size
      }
      const result = await getNocoupon(param)
      if (this.page >= 1) {
        result.content.forEach(item => {
          this.conData1.push(item)
        })
      } else {
        this.conData1 = result.content
      }
    },
    // 获取已经使用
    async getYet () {
      let param = {
        userNum: getUserNum(),
        page: this.page,
        size: this.size
      }
      const result = await getYetcoupon(param)
      if (this.page >= 1) {
        result.content.forEach(item => {
          this.conData2.push(item)
        })
        if (result.content.length < 10) {
          this.bol1 = true
        }
      } else {
        this.conData2 = result.content
      }
    },
    // 获取已经过期
    async getOver () {
      let param = {
        userNum: getUserNum(),
        page: this.page,
        size: this.size
      }
      const result = await getOvercoupon(param)
      if (this.page >= 1) {
        result.content.forEach(item => {
          this.conData3.push(item)
        })
        if (result.content.length < 10) {
          this.bol2 = true
        }
      } else {
        this.conData3 = result.content
      }
    },
    tabClick (index) {
      this.sliderOffset = this.widthAll / this.tabs.length * index
      this.activeIndex = index
      this.page = 0
      this.bol1 = false
      this.bol2 = false
      if (index === 0) {
        this.getNouse()
      } else if (index === 1) {
        this.getYet()
      } else if (index === 2) {
        this.getOver()
      }
    },
    scanCode (item) {
      wx.navigateTo({
        url: `../seCode/main?couponCode=${item.couponCode}`
      })
    }
  }
}
</script>
<style lang="scss">
.concome {
  overflow: scroll;
  .tab-change {
    border-top: 4rpx solid #f5f5f5;
    border-bottom: 20rpx solid #f5f5f5;
    background-color: #ffffff;
    height: 86rpx;
    position: relative;
    .tab-p {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .one-span {
        font-family: PingFangSC-Medium;
        font-size: 30rpx;
        color: #919191;
        letter-spacing: 0.29px;
        display: inline-block;
        padding: 16rpx 0;
        width: 30%;
        text-align: center;
      }
      .chang-span {
        color: #17bce6;
        font-family: PingFangSC-Medium;
        font-size: 30rpx;
        letter-spacing: 0.29px;
      }
    }
    .tab-silder {
      background: #17bce6;
      width: 60rpx;
      height: 6rpx;
      position: absolute;
      bottom: 0;
      -webkit-transition: -webkit-transform 0.3s;
      transition: -webkit-transform 0.3s;
      transition: transform 0.3s;
      transition: transform 0.3s, -webkit-transform 0.3s;
    }
  }
  .unused {
    .unused-securities {
      width: 710rpx;
      height: 220rpx;
      margin: 36rpx auto;
      background: url("../../../static/images/unsue.png") no-repeat 0 0;
      background-size: 100% 220rpx;
      display: flex;
      align-items: center;
      position: relative;
      .securities-nmb {
        position: absolute;
        top: -22rpx;
        left: 0;
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #919191;
        letter-spacing: -0.1px;
      }
      .securities-data {
        position: absolute;
        bottom: -22rpx;
        right: 0;
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #919191;
        letter-spacing: -0.1px;
        text-align: center;
      }
      .securities-left {
        width: 572rpx;
        height: 200rpx;
        .left-name {
          font-family: PingFangSC-Regular;
          font-size: 24rpx;
          color: #ffffff;
          letter-spacing: 0.27px;
          margin: 16rpx 0 0 30rpx;
          height: 74rpx;
          text-align: left;
        }
        .left-time {
          font-family: PingFangSC-Regular;
          font-size: 22rpx;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          // margin: 35rpx 0 40rpx 0;
          height: 70rpx;
        }
        .left-title {
          font-family: PingFangSC-Regular;
          font-size: 24rpx;
          color: #ffffff;
          letter-spacing: 0;
          text-align: right;
          margin-right: 30rpx;
        }
      }
      .securities-right {
        width: 136rpx;
        height: 200rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .right-type {
          display: flex;
          flex-wrap: wrap;
          width: 22rpx;
          font-family: PingFangSC-Medium;
          font-size: 22rpx;
          color: #ffffff;
          letter-spacing: 0;
        }
      }
    }
  }
  .beused {
    margin-bottom: 20rpx;
    .p-detail {
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #919191;
      letter-spacing: -0.1px;
    }
    .beused-securities {
      width: 710rpx;
      height: 220rpx;
      margin: 36rpx auto;
      background: url("../../../static/images/beuse.png") no-repeat 0 0;
      background-size: 100% 220rpx;
      display: flex;
      align-items: center;
      position: relative;
      .securities-nmb {
        position: absolute;
        top: -22rpx;
        left: 0;
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #919191;
        letter-spacing: -0.1px;
      }
      .securities-data {
        position: absolute;
        bottom: -22rpx;
        right: 0;
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #919191;
        letter-spacing: -0.1px;
        text-align: center;
      }
      .securities-left {
        width: 572rpx;
        height: 200rpx;
        .left-name {
          font-family: PingFangSC-Regular;
          font-size: 24rpx;
          color: #ffffff;
          letter-spacing: 0.27px;
          margin: 16rpx 0 0 30rpx;
          text-align: left;
        }
        .left-time {
          font-family: PingFangSC-Regular;
          font-size: 22rpx;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          margin: 35rpx 0 40rpx 0;
        }
        .left-title {
          font-family: PingFangSC-Regular;
          font-size: 24rpx;
          color: #ffffff;
          letter-spacing: 0;
          text-align: right;
          margin-right: 30rpx;
        }
      }
      .securities-right {
        width: 136rpx;
        height: 200rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .right-type {
          display: flex;
          flex-wrap: wrap;
          width: 22rpx;
          font-family: PingFangSC-Medium;
          font-size: 22rpx;
          color: #ffffff;
          letter-spacing: 0;
        }
      }
    }
  }
  .expired {
    margin-bottom: 20rpx;
    .p-detail {
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #919191;
      letter-spacing: -0.1px;
    }
    .expired-securities {
      width: 710rpx;
      height: 220rpx;
      margin: 36rpx auto;
      background: url("../../../static/images/overdue.png") no-repeat 0 0;
      background-size: 100% 220rpx;
      display: flex;
      align-items: center;
      position: relative;
      .securities-nmb {
        position: absolute;
        top: -22rpx;
        left: 0;
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #919191;
        letter-spacing: -0.1px;
      }
      .securities-data {
        position: absolute;
        bottom: -22rpx;
        right: 0;
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #919191;
        letter-spacing: -0.1px;
        text-align: center;
      }
      .securities-left {
        width: 572rpx;
        height: 200rpx;
        .left-name {
          font-family: PingFangSC-Regular;
          font-size: 24rpx;
          color: #ffffff;
          letter-spacing: 0.27px;
          margin: 16rpx 0 0 30rpx;
          text-align: left;
        }
        .left-time {
          font-family: PingFangSC-Regular;
          font-size: 22rpx;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          margin: 35rpx 0 40rpx 0;
        }
        .left-title {
          font-family: PingFangSC-Regular;
          font-size: 24rpx;
          color: #ffffff;
          letter-spacing: 0;
          text-align: right;
          margin-right: 30rpx;
        }
      }
      .securities-right {
        width: 136rpx;
        height: 200rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .right-type {
          display: flex;
          flex-wrap: wrap;
          width: 22rpx;
          font-family: PingFangSC-Medium;
          font-size: 22rpx;
          color: #ffffff;
          letter-spacing: 0;
        }
      }
    }
  }
}
</style>