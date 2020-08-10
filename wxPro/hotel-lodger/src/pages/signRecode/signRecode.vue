<template>
  <div class="signRecode">
    <!-- 时间搜索 -->
    <div class="recode-date">
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
    </div>
    <!-- 记录列表 -->
    <div class="recode">
      <div class="recode-one"
           v-for="(item, index) in dataHotel"
           :key="index">
        <div class="recodeOne-left">
          <img :src="item.hotelImgUrl"
               alt=""
               class="morenImg"
               @error="errHandle()">
        </div>
        <div class="recodeOne-center">
          <p class="hotel-name">{{item.hotelName}}</p>
          <p class="hotel-leve">
            <span v-for="(item, index1) in item.grade"
                  class="star-nmb">
              <img src="../../../static//images/shape.png"
                   alt=""
                   class="nmb-img">
            </span>
            <span v-for="(item, index2) in item.numb"
                  class="star-nmb">
              <img src="../../../static/images/jhu.png"
                   alt=""
                   class="nmb-img">
            </span>
          </p>
          <p class="hotel-intime">签住时间：{{item.inTime}}</p>
          <p class="hotel-intime">签退时间：{{item.realOutTime}}</p>
        </div>
        <div class="recodeOne-right">
          <p class="hotel-room">{{item.roomName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getInrecord } from '../../api/sign'
import { hotelimgUrl } from '../../api/user'
import { getToken, getClientId, getUserNum } from '@/utils/user'
export default {
  data () {
    return {
      dateStart: '起始时间',
      dateEnd: '结束时间',
      dataHotel: [],
      nowD1: ''
    }
  },
  onShow () {
    this.getDate()
  },
  methods: {
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
      let param = {
        checkinBeginTime: this.dateStart,
        checkinEndTime: this.dateEnd,
        checkoutBeginTime: '',
        checkoutEndTime: '',
        userNum: getUserNum()
      }
      this.getCode(param)
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

      if (this.dateStart !== '起始时间' && this.dateStart.length > 0 && this.dateEnd !== '结束时间' && this.dateEnd.length > 0) {
        let param = {
          checkinBeginTime: this.dateStart,
          checkinEndTime: this.dateEnd,
          checkoutBeginTime: '',
          checkoutEndTime: '',
          userNum: getUserNum()
        }
        this.getCode(param)
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

      if (this.dateStart !== '起始时间' && this.dateStart.length > 0 && this.dateEnd !== '结束时间' && this.dateEnd.length > 0) {
        let param = {
          checkinBeginTime: this.dateStart,
          checkinEndTime: this.dateEnd,
          checkoutBeginTime: '',
          checkoutEndTime: '',
          userNum: getUserNum()
        }
        this.getCode(param)
      }
    },
    // 获取记录
    async getCode (param) {
      this.dataHotel = []
      const result = await getInrecord(param)
      this.dataHotel = result.map(item => {
        return {
          hotelName: item.hotelName,
          grade: item.grade,
          numb: 5 - item.grade,
          inTime: item.inTime.slice(0, 16),
          realOutTime: item.realOutTime.slice(0, 16),
          roomName: item.roomName,
          hotelImgUrl: hotelimgUrl({ clientid: getClientId(), token: getToken(), id: item.hotelId })
        }
      })
    },
    // 图片加载失败处理
    errHandle (imgDiv) {
      this.urlHeader = '/static/images/moren.png'
    }
  }
}
</script>
<style lang="less">
.signRecode {
  width: 100%;
  overflow: hidden;
  .recode-date {
    width: 100%;
    height: 68rpx;
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
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
  .recode {
    padding: 68rpx 0 0 40rpx;
    .recode-one {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 30rpx 40rpx 30rpx 0;
      border-bottom: 1px solid #eeeeee;
      .recodeOne-left {
        margin-right: 26rpx;
        .morenImg {
          width: 180rpx;
          height: 180rpx;
        }
      }
      .recodeOne-center {
        width: 100%;
        margin-right: 10rpx;
        .hotel-name {
          font-family: PingFangSC-Medium;
          font-size: 15px;
          color: #333333;
          line-height: 20.98px;
        }
        .hotel-leve {
          .star-nmb {
            display: inline-block;
            width: 26rpx;
            height: 28rpx;
            margin-right: 20rpx;
            .nmb-img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .hotel-intime {
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #919191;
          margin-top: 14rpx;
        }
      }
      .recodeOne-right {
        width: 112rpx;
        padding-right: 24rpx;
        .hotel-room {
          width: 112rpx;
          height: 32rpx;
          background: #f7eae6;
          border-radius: 6rpx;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #e8541e;
          letter-spacing: 0;
          padding: 5rpx;
          text-align: center;
        }
      }
    }
  }
}
</style>