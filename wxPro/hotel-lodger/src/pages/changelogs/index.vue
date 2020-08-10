<template>
  <div class="content">
    <div class="creditInfo-date clearfix">
      <div class="date-lefts">
        <picker mode="date"
                :value="dateStart"
                start="1990-01-01"
                end="2025-12-31"
                fields="day"
                @change="bindDateChange">
          <view class="picker">
            {{dateStart}}
          </view>
        </picker>
      </div>
      <div class="date-cons">至</div>
      <div class="date-rights">
        <picker mode="date"
                :value="dateEnd"
                :start="endStart"
                end="2025-12-31"
                fields="day"
                @change="bindDateChange2">
          <view class="picker">
            {{dateEnd}}
          </view>
        </picker>
      </div>
    </div>
    <div class="credit-change">
      <div class="credit-item clearfix">
        <img src="/static/images/activity.png" alt="" class="credit-item-icon floatLeft">
        <div class="credit-item-left floatLeft">
          <p>早餐券</p>
          <p>杭州西子湖酒店</p>
        </div>
        <div class="credit-item-right floatRight">+87</div>
        <p class="credit-item-text floatRight">2019年8月6日</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, getClientId } from '@/utils/user'
import { exchangerecord } from '@/api/hotelList'
export default {
  data () {
    return {
      dateStart: '起始时间',
      dateEnd: '结束时间',
      endStart: ''
    }
  },
  onShow () {
    this.init()
  },
  methods: {
    changefun (e) {
      let _this = this
      if (e.target.dataset.text) {
        if (e.target.dataset.text === 'outcome') {
          _this.incomeShow = false
        } else if (e.target.dataset.text === 'income') {
          _this.incomeShow = true
        }
      }
    },
    init () {
      let _this = this
      exchangerecord({}).then(res => {
        console.log(res)
      })
    },
    bindDateChange (e) {
      // console.log('picker发送选择改变，携带值为', e.target.value)
      this.dateStart = e.target.value
      this.endStart = e.target.value
      let _this = this
      if (this.dateStart !== '起始时间' && this.dateStart.length > 0 && this.dateEnd !== '结束时间' && this.dateEnd.length > 0) {
        // wx.showLoading({
        //   title: '加载中...'
        // })
      }
    },
    bindDateChange2 (e) {
      // console.log('picker发送选择改变，携带值为', e.target.value)
      this.dateEnd = e.target.value
      let _this = this
      if (this.dateStart !== '起始时间' && this.dateStart.length > 0 && this.dateEnd !== '结束时间' && this.dateEnd.length > 0) {
        // wx.showLoading({
        //   title: '加载中...'
        // })
      }
    }
  },
  async onPullDownRefresh () {
    // 下拉刷新
    this.init()
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    // 上拉加载触底
    // this.creditIncome.push({title: '新增', date: new Date(), credit: 8})
  }
}
</script>
<style scope lang="less">
.content {
  .credit-change {
    margin: 0 30rpx;
    .credit-item {
      border-bottom: 1px solid #ebebeb;
      height: 160rpx;
    }
    .credit-item-left {
      p:nth-child(1) {
        font-size: 32rpx;
        margin-top: 30rpx;
      }
      p:nth-child(2) {
        font-size: 28rpx;
        color: #a4a4a4;
        margin-top: 20rpx;
      }
    }
    .credit-item-right {
      color: #7bc16a;
      font-size: 36rpx;
      margin-top: 50rpx;
    }
  }
  .creditInfo-date {
    @dateWidth: 240rpx;
    padding: 0rpx 60rpx;
    padding-top: 20rpx;
    background-color: #f5f5f5;
    .date-lefts,
    .date-rights {
      float: left;
      width: @dateWidth;
      border-bottom: 1px solid #d8d8d8;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 30rpx;
      color: #666666;
    }
    .picker {
      width: 100%;
      height: 100%;
      text-align: center;
    }
    .date-cons {
      font-family: PingFangSC-Regular;
      font-size: 30rpx;
      color: #919191;
      float: left;
      margin: 0 50rpx;
      margin-top: 6rpx;
    }
  }
  .credit-item-icon{
    width: 100rpx;
    height:100rpx;
    margin-top: 30rpx;
    margin-right:20rpx;
  }
  .credit-item-text{
    font-size:24rpx;
    color: #B1B1B1;
    margin-top:30rpx;
    margin-right: 50rpx;
  }
}
</style>
