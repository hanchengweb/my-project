<template>
  <div class="content">
    <div class="creditInfo-bar">
      <img :src="bgCreditSrc"
           alt=""
           class="creditInfo-bg">
      <p class="credit-num-text">可用碳积分</p>
      <p class="credit-num">{{creditNum}}</p>
    </div>
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
    <div class="credit-tab clearfix"
         @click="changefun">
      <span :class="incomeShow?'active floatLeft':'floatLeft'"
            data-text="income">收入</span>
      <span :class="!incomeShow?'active floatRight':'floatRight'"
            data-text="outcome">支出</span>
    </div>
    <div class="credit-change">
      <div v-if="incomeShow">
        <div class="credit-item"
             v-for="(item,index) in creditIncome"
             :key="index">
          <div class="credit-item-left floatLeft">
            <p>{{item.description}}</p>
            <p>日期：{{item.date}}</p>
          </div>
          <div class="credit-item-right floatRight">+{{item.credit}}</div>
        </div>
      </div>
      <div v-else>
        <div class="credit-item"
             v-for="(item,index) in creditOutcome"
             :key="index">
          <div class="credit-item-left floatLeft">
            <p>{{item.description}}</p>
            <p>日期：{{item.date}}</p>
          </div>
          <div class="credit-item-right floatRight">-{{item.credit}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usableCredit, readIncome, readExpend, readIncomeByTime, readExpendByTime, readBgImgOfCreditDetail } from '@/api/user'
import { getToken, getClientId, getUserNum } from '@/utils/user'
import { getDay, getDay2, getSixmoun } from '@/utils/date'
export default {
  data () {
    return {
      incomeShow: true,
      creditIncome: [],
      creditOutcome: [],
      dateStart: '起始时间',
      dateEnd: '结束时间',
      endStart: '',
      creditNum: 0,
      nowD1: '',
      bgCreditSrc: '/static/images/creditbgs.png'
    }
  },
  onShow () {
    this.init()
    this.getDate()
    // this.dateEnd = getSixmoun()[0]
    // this.dateStart = getSixmoun()[1]
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
      usableCredit({ userNum: getUserNum() }).then(res => {
        // console.log(res)
        _this.creditNum = res.usableCredit
      })
      readIncome({ userNum: getUserNum() }).then(list => {
        this.creditIncome = list
      })

      readExpend({ userNum: getUserNum() }).then(list => {
        this.creditOutcome = list
      })
    },
    getDate () {
      let myDate = new Date()
      let nowY = myDate.getFullYear()
      let nowM = myDate.getMonth() + 1
      let nowD = myDate.getDate()
      let enddate = nowY + '-' + (nowM < 10 ? '0' + nowM : nowM) + '-' + (nowD < 10 ? '0' + nowD : nowD) // 当前日期
      this.nowD1 = enddate
      let year = myDate.getFullYear()// 获取当前年
      let month = myDate.getMonth() + 1// 获取当前月
      let day = myDate.getDate()// 获取当前日
      let startdate = ''// 当前年月日往前推m个月后获取到的年月日
      let ylow = month - 6// 往前推的总月份换成对应的年数取整
      let mlow = parseInt(6) % 12// 往前推的月数
      if (ylow < 0) {
        year -= 1// 年要再减一
      }
      if ((mlow > month) || (mlow === month)) { // 往前推的月份大于或等于当前月份，12减去往前推的月份加上现在的月份
        year = year - 1
        month = 12 - mlow + month
        startdate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
      } else { // 往前推的月份小于当前月份
        month -= mlow
        startdate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
      }
      this.dateStart = startdate
      this.dateEnd = enddate
      readIncomeByTime({
        beginTime: this.dateStart,
        endTime: this.dateEnd,
        userNum: getUserNum()
      }).then(list => {
        this.creditIncome = list
      })
      readExpendByTime({
        beginTime: this.dateStart,
        endTime: this.dateEnd,
        userNum: getUserNum()
      }).then(list => {
        this.creditOutcome = list
        wx.hideLoading()
      })
    },
    bindDateChange (e) {
      this.dateStart = e.target.value
      let str
      let date = new Date(e.target.value) // 创建日期对象，并初始化
      var year = date.getFullYear()// 年
      var month = date.getMonth() + 7// 月 +6个月  因为js里month从0开始，所以要加1
      if (month > 12) {
        year++
        month -= 12
      }
      if (month < 10) {
        month = '0' + month
      }
      var date2 = new Date(year, month, 0)// 新的年月
      var day1 = date.getDate()
      var day2 = date2.getDate()
      if (day1 > day2) { // 防止+6月后没有31天
        day1 = day2
      }
      str = year + '-' + month + '-' + (day1 < 10 ? '0' + day1 : day1)
      let nextSix = new Date(str)
      let nowDate = new Date()
      if (nextSix <= nowDate) {
        this.dateEnd = str
      } else {
        this.dateEnd = this.nowD1
      }
      // this.dateStart = e.target.value
      // this.endStart = e.target.value
      let _this = this
      if (this.dateStart !== '起始时间' && this.dateStart.length > 0 && this.dateEnd !== '结束时间' && this.dateEnd.length > 0) {
        wx.showLoading({
          title: '加载中...'
        })
        readIncomeByTime({
          beginTime: _this.dateStart,
          endTime: _this.dateEnd,
          userNum: getUserNum()
        }).then(list => {
          this.creditIncome = list
        })
        readExpendByTime({
          beginTime: _this.dateStart,
          endTime: _this.dateEnd,
          userNum: getUserNum()
        }).then(list => {
          this.creditOutcome = list
          wx.hideLoading()
        })
      }
    },
    bindDateChange2 (e) {
      this.dateEnd = e.target.value
      let myDate = new Date(e.target.value)
      let year = myDate.getFullYear()// 获取当前年
      let month = myDate.getMonth() + 1// 获取当前月
      let day = myDate.getDate()// 获取当前日
      let lowData = ''// 当前年月日往前推m个月后获取到的年月日
      let ylow = month - 6// 往前推的总月份换成对应的年数取整
      let mlow = parseInt(6) % 12// 往前推的月数
      if (ylow < 0) {
        year -= 1// 年要再减一
      }
      if ((mlow > month) || (mlow === month)) { // 往前推的月份大于或等于当前月份，12减去往前推的月份加上现在的月份
        year = year - 1
        month = 12 - mlow + month
        if (month < 10) {
          month = '0' + month
        }
        lowData = year + '-' + month + '-' + (day < 10 ? '0' + day : day)
      } else { // 往前推的月份小于当前月份
        month -= mlow
        if (month < 10) {
          month = '0' + month
        }
        lowData = year + '-' + month + '-' + (day < 10 ? '0' + day : day)
      }
      this.dateStart = lowData
      let _this = this
      if (this.dateStart !== '起始时间' && this.dateStart.length > 0 && this.dateEnd !== '结束时间' && this.dateEnd.length > 0) {
        wx.showLoading({
          title: '加载中...'
        })
        readIncomeByTime({
          beginTime: _this.dateStart,
          endTime: _this.dateEnd,
          userNum: getUserNum()
        }).then(list => {
          this.creditIncome = list
        })
        readExpendByTime({
          beginTime: _this.dateStart,
          endTime: _this.dateEnd,
          userNum: getUserNum()
        }).then(list => {
          this.creditOutcome = list
          wx.hideLoading()
        })
      }
    }
  },
  async onPullDownRefresh () {
    // 下拉刷新
    this.init()
    wx.stopPullDownRefresh()
  }
}
</script>
<style scope lang="less">
.content {
  .creditInfo-bar {
    position: relative;
    width: 100%;
    height: 262rpx;
    overflow: hidden;
    .creditInfo-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .credit-num-text {
      font-family: PingFangSC-Regular;
      font-size: 30rpx;
      color: #ffffff;
      text-align: center;
      margin-top: 32rpx;
    }
    .credit-num {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #ffffff;
      text-align: center;
      margin-top: 20rpx;
    }
  }
  .credit-tab {
    color: #919191;
    border-bottom: 1px solid #ebebeb;
    height: 80rpx;
    line-height: 76rpx;
    margin: 15rpx 60rpx 0;
    span {
      width: 150rpx;
      text-align: center;
    }
    .active {
      color: #008bcd;
      border-bottom: 6rpx solid #008bcd;
    }
  }
  .credit-change {
    margin: 0 60rpx;
    .credit-item {
      border-bottom: 1px solid #ebebeb;
      height: 160rpx;
      padding: 0 20rpx;
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
}
</style>
