<template>
  <div>
    <div class="sign"
         v-if="inIf">
      <!-- 酒店详情 -->
      <div class="sign-header"
           @click="toHotel()">
        <div class="header-left">
          <img :src="urlHeader"
               alt=""
               class="moren-img"
               @error="errHandle()">
        </div>
        <div class="header-right">
          <p class="right-name">{{hotel.hotelName}}</p>
          <p class="right-adress">
            <img src="../../../static/images/dw.png"
                 alt=""
                 class="adress-img">
            <span class="adress-title">{{hotel.hotelAddress}}</span>
          </p>
          <p class="right-star">
            <span v-for="(item, index) in hotel.grade"
                  class="star-nmb">
              <img src="../../../static//images/shape.png"
                   alt=""
                   class="nmb-img">
            </span>
            <span v-for="(item, index) in numb"
                  class="star-nmb">
              <img src="../../../static/images/jhu.png"
                   alt=""
                   class="nmb-img">
            </span>
          </p>
        </div>
      </div>
      <div class="division">
        <span class="division-one"></span>
        <span class="division-two">[本次入住]</span>
        <span class="division-one"></span>
      </div>
      <!-- 用电详情 -->
      <div class="sign-footer">
        <!-- 第一排 -->
        <div class="centerF-one">
          <div class="centerO-first">
            <p class="first-one">{{hotel.roomName}}</p>
            <p class="first-two">房间号</p>
          </div>
          <div class="centerO-first">
            <p class="first-one">{{signTime}}</p>
            <!-- <p class="first-three">{{signTime1}}</p> -->
            <p class="first-two">签住时间</p>
          </div>
          <div class="centerO-first">
            <p class="first-three">{{time}}</p>
            <p class="first-three">{{time1}}</p>
            <p class="first-two">签住时长</p>
          </div>
        </div>
        <!-- 第二排 -->
        <div class="centerF-one">
          <div class="centerO-first">
            <p class="first-one"
               v-if="powerUser">{{powerUser.totalElect}}</p>
            <p class="first-one"
               v-else>0</p>
            <p class="first-two">累计用电</p>
          </div>
          <div class="centerO-first">
            <p class="first-one"
               v-if="powerUser">{{powermax}}w</p>
            <p class="first-one"
               v-else>0</p>
            <p class="first-two">最高功率</p>
          </div>
          <div class="centerO-first"
               @click="echarsChang()">
            <img src="../../../static/images/echars.png"
                 alt=""
                 class="first-img">
            <p class="first-four">查看用电曲线</p>
            <img src="../../../static/images/shaped.png"
                 alt=""
                 class="second-img">
          </div>
        </div>
        <!-- 第三排 -->
        <div class="centerF-one">
          <div class="centerO-first">
            <p class="first-one">{{credit}}</p>
            <p class="first-two">本次碳积分</p>
          </div>
          <div class="centerO-first">
            <p class="first-one">{{elect}}</p>
            <p class="first-two">本次节能</p>
          </div>
          <div class="centerO-first"
               @click="paiChange()">
            <img src="../../../static/images/yezi.png"
                 alt=""
                 class="first-img">
            <p class="first-four">碳积分排行榜</p>
            <img src="../../../static/images/shaped.png"
                 alt=""
                 class="second-img">
          </div>
        </div>
        <div class="division">
          <span class="division-one"></span>
          <span class="division-two">[客房概要信息]</span>
          <span class="division-one"></span>
        </div>
        <!-- 第四排 -->
        <div class="centerF-one">
          <div class="centerO-first">
            <p class="first-one">{{roomDeatil.checkCount}}</p>
            <p class="first-two">签住次数</p>
          </div>
          <div class="centerO-first">
            <p class="first-one">{{roomDeatil.perHourPower}}</p>
            <p class="first-two">单次时间能耗</p>
          </div>
          <div class="centerO-first">
            <p class="first-one">{{roomDeatil.perCountPower}}</p>
            <p class="first-two">单次入住能耗</p>
          </div>
        </div>
      </div>
      <!-- 签退按钮 -->
      <div class="sign-bottom"
           @click="checkOutFun()">
        <button class="bottom-btn">签退</button>
      </div>
    </div>
    <div v-else
         class="noINto">
      <div class="noINto-top">
        <img src="../../../static/images/noSign.png"
             alt=""
             class="noINto-img">
        <p class="noINto-p">暂未签住...</p>
      </div>
      <div class="noINto-cao">
        <span class="noINto-btn"
              @click="changFun()">签住码</span>
        <span class="noINto-gang">|</span>
        <span class="noINto-btn"
              @click="changRecode()">签住记录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo, getEarnings, getPower, getLowuser, checkIfIn, checkOutin, getMaxpower, getAvgpower, energyPower, getroomInfor } from '../../api/sign'
import { getPower1, getUserpower } from '../../api/echars'
import { headimgUrl, hotelimgUrl } from '../../api/user'
import { getToken, getClientId, getUserNum } from '@/utils/user'
export default {
  name: 'sign',
  data () {
    return {
      hotel: {},
      credit: '',
      time: '',
      time1: '',
      powerUser: {},
      powermax: '',
      inIf: false,
      urlHeader: null,
      avgnmb: '',
      signTime: '',
      // signTime1: '',
      numb: 0,
      elect: '',
      roomDeatil: {
        checkCount: 0,
        perHourPower: 0,
        perCountPower: 0
      }
    }
  },
  onShow () {
    this.checkIn()
  },
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
    toHotel () {
      wx.navigateTo({
        url: '../hotelDetail/main?id=' + this.hotel.hotelId
      })
    },
    changFun () {
      wx.navigateTo({
        url: `../signScan/main`
      })
    },
    changRecode () {
      wx.navigateTo({
        url: `../signRecode/main`
      })
    },
    // 跳转到用电曲线
    echarsChang () {
      let inTime = String(this.hotel.inDate)
      let month = inTime.substring(0, 2)
      let day = inTime.substring(3, 5)
      let hour = inTime.split(' ')[1]
      var myDate = new Date()
      let year = myDate.getFullYear()
      let date = year + '-' + month + '-' + day + ' ' + hour
      wx.navigateTo({
        url: `../echars/main`
      })
      let query = {
        roomid: this.hotel.roomId,
        inTime: date
      }
      this.getPoweruse(query)
      this.getpowerUser(query)
    },
    paiChange () { // 碳积分
      if (wx.getStorageSync('type')) {
        wx.removeStorageSync('type')
      }
      if (wx.getStorageSync('hotelId')) {
        wx.removeStorageSync('hotelId')
      }
      if (wx.getStorageSync('inTime')) {
        wx.removeStorageSync('inTime')
      }
      wx.setStorageSync('type', 'carbon')
      wx.setStorageSync('roomid', this.hotel.roomId)
      wx.setStorageSync('hotelId', this.hotel.hotelId)
      wx.setStorageSync('inTime', this.hotel.inDate)
      wx.navigateTo({
        url: `../ranking/main`
      })
    },
    // 获取用户是否签驻
    async checkIn () {
      wx.showLoading({
        title: '加载中...'
      })
      let param = {
        userNum: getUserNum()
      }
      const result = await checkIfIn(param)
      if (result) {
        this.inIf = true
        this.getZhuinfo()
        this.getTanearn()
        setTimeout(() => {
          wx.hideLoading()
        }, 200)
      } else {
        this.inIf = false
        setTimeout(() => {
          wx.hideLoading()
        }, 200)
      }
    },
    // 获取最高功率
    async getmaxPowerfun () {
      let param = {
        userNum: getUserNum(),
        checkNum: this.hotel.checkNum
      }
      const result = await getMaxpower(param)
      this.powermax = result.power
    },
    // 获取个人平均能耗
    async getMainpower () {
      let inTime = String(this.hotel.inDate)
      let month = inTime.substring(0, 2)
      let day = inTime.substring(3, 5)
      let hour = inTime.split(' ')[1]
      var myDate = new Date()
      let year = myDate.getFullYear()
      let date = year + '-' + month + '-' + day + ' ' + hour
      let param = this.hotel.roomId
      let param1 = date
      const result = await getAvgpower(param, param1)
      if (result !== null) {
        this.avgnmb = result.avgEnergyConsumer
      } else {
        this.avgnmb = '#'
      }
    },
    // 签退
    async checkOutFun () {
      let param = this.hotel.checkNum
      const result = await checkOutin(param)
      if (result === 'success') {
        this.checkIn()
      }
    },
    // 获取住店详情
    async getZhuinfo () {
      let param = {
        userNum: getUserNum()
      }
      const result = await getInfo(param)
      this.hotel = result
      this.numb = 5 - this.hotel.grade
      this.signTime = this.hotel.inDate.substring(0, 11)
      // this.signTime1 = this.hotel.inDate.substring(7, 12)
      this.getMainpower()
      this.urlHeader = hotelimgUrl({ id: this.hotel.hotelId, clientid: getClientId(), token: getToken() })
      this.getPowerinfo()
      this.getmaxPowerfun()
      this.getEnergy()
      this.getInforoom()
    },
    // 图片加载失败处理
    errHandle (imgDiv) {
      this.urlHeader = '/static/images/moren.png'
    },
    // 获取碳积分
    async getTanearn () {
      let param = {
        userNum: getUserNum()
      }
      const result = await getEarnings(param)
      this.credit = result.credit
      this.time = result.time.split(' ')[0]
      this.time1 = result.time.split(' ')[1]
    },
    // 获取用电情况
    async getPowerinfo () {
      let param = {
        userNum: getUserNum(),
        checkNum: this.hotel.checkNum
      }
      const result = await getPower(param)
      this.powerUser = result
    },
    // 获取功率曲线
    async getPoweruse (query) {
      const result = await getPower1(query)
      wx.setStorageSync('powerData', result)
    },
    // 获取用电量
    async getpowerUser (query) {
      const result = await getUserpower(query)
      if (result) {
        wx.setStorageSync('curveData', result)
      }
    },
    // 获取节能数据
    async getEnergy () {
      let inTime = String(this.hotel.inDate)
      console.log(inTime)
      let month = inTime.substring(0, 2)
      let day = inTime.substring(3, 5)
      let hour = inTime.split(' ')[1]
      var myDate = new Date()
      let year = myDate.getFullYear()
      let date = year + '-' + month + '-' + day + ' ' + hour
      let param = {
        roomid: this.hotel.roomId,
        hotelid: this.hotel.hotelId,
        inTime: date
      }
      const result = await energyPower(param)
      this.elect = result.elect
    },
    // 获取客房概要信息
    async getInforoom () {
      const result = await getroomInfor(this.hotel.roomId)
      if (result !== null) {
        this.roomDeatil = result
      }
    }
  }
}
</script>
<style lang="scss">
.noINto {
  width: 100%;
  text-align: center;
  .noINto-top {
    width: 100%;
    text-align: center;
    .noINto-img {
      width: 300rpx;
      height: 262rpx;
      padding-top: 160rpx;
      margin: 68rpx auto;
    }
    .noINto-p {
      color: rgba(172, 172, 172, 1);
    }
  }
  .noINto-cao {
    width: 100%;
    text-align: center;
    margin-top: 80rpx;
    .noINto-gang {
      margin: 0 60rpx;
      color: gainsboro;
    }
    .noINto-btn {
      display: inline-block;
      color: white;
      font-size: 30rpx;
      background: #008bcd;
      border-radius: 2px;
      width: 200rpx;
      padding: 20rpx 0;
    }
    .noINto-btn:active {
      display: inline-block;
      color: white;
      font-size: 30rpx;
      background: #049ee7;
      border-radius: 2px;
      width: 200rpx;
      padding: 20rpx 0;
    }
  }
}
.sign {
  .sign-header {
    padding: 10rpx 0 28rpx 0;
    border-top: 2rpx solid #f5f5f5;
    width: 100%;
    background: #ffffff;
    display: flex;
    box-sizing: border-box;
    .header-left {
      width: 200rpx;
      height: 200rpx;
      margin: 0 52rpx 0 40rpx;
      .moren-img {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .header-right {
      width: calc(100% - 200rpx);
      .right-name {
        width: 95%;
        font-family: PingFangSC-Medium;
        font-size: 30rpx;
        color: #333333;
        letter-spacing: 0.29px;
      }
      .right-adress {
        width: 90%;
        display: flex;
        align-items: flex-start;
        font-family: PingFangSC-Regular;
        font-size: 28rpx;
        color: #999999;
        letter-spacing: 0.29px;
        margin: 18rpx 0;
        .adress-img {
          width: 50rpx;
          height: 34rpx;
          margin-right: 6rpx;
        }
        .adress-title {
          font-size: 28rpx;
        }
      }
      .right-star {
        height: 40rpx;
        .star-nmb {
          display: inline-block;
          width: 32rpx;
          height: 36rpx;
          margin-right: 20rpx;
          .nmb-img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .division {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .division-one {
      display: inline-block;
      height: 2rpx;
      width: calc(50% - 80rpx);
      background-color: #f2f2f2;
    }
    .division-two {
      display: inline-block;
      width: 160rpx;
      font-family: PingFangSC-Regular;
      font-size: 26rpx;
      color: #919191;
      letter-spacing: -0.09px;
      text-align: center;
    }
  }
  .sign-center {
    box-sizing: border-box;
    padding: 28rpx 0;
    height: 186rpx;
    width: 100%;
    display: flex;
    .center-left {
      width: 50%;
      text-align: center;
      border-right: 2rpx solid #eeeeee;
      .left-roomnumb {
        font-family: PingFangSC-Regular;
        font-size: 30rpx;
        color: #666666;
        letter-spacing: 0.05px;
        margin-bottom: 40rpx;
      }
      .left-img {
        width: 56rpx;
        height: 56rpx;
        margin: 0 auto;
      }
    }
    .center-right {
      width: calc(100% - 50%);
      text-align: center;
      .right-data {
        font-family: PingFangSC-Regular;
        font-size: 30rpx;
        color: #666666;
        letter-spacing: 0.05px;
        margin-bottom: 40rpx;
      }
      .right-img {
        width: 56rpx;
        height: 56rpx;
        margin: 0 auto;
      }
    }
  }
  .sign-footer {
    padding: 0 28rpx 0 34rpx;
    box-sizing: border-box;
    width: 100%;
    .division {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .division-one {
        display: inline-block;
        height: 2rpx;
        width: calc(50% - 80rpx);
        background-color: #f2f2f2;
      }
      .division-two {
        display: inline-block;
        width: 160rpx;
        font-family: PingFangSC-Regular;
        font-size: 26rpx;
        color: #919191;
        letter-spacing: -0.09px;
        text-align: center;
      }
    }
    .centerF-one {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .centerO-first {
        width: 230rpx;
        text-align: center;
        .first-one {
          font-family: PingFangSC-Medium;
          font-size: 36rpx;
          color: #008bcd;
          letter-spacing: 0.06px;
          margin-bottom: 20rpx;
          text-align: center;
          height: 70rpx;
          .first-three1 {
            font-size: 22rpx;
          }
        }
        .first-three {
          font-family: PingFangSC-Medium;
          font-size: 36rpx;
          color: #008bcd;
          margin-bottom: 12rpx;
          letter-spacing: 0.06px;
          text-align: center;
          height: 35rpx;
          white-space: nowrap;
        }
        .first-two {
          font-family: PingFangSC-Regular;
          font-size: 28rpx;
          color: #333333;
          letter-spacing: 0.05px;
          text-align: center;
          white-space: nowrap;
        }
        .first-img {
          width: 48rpx;
          height: 49rpx;
          margin: 8rpx auto 25rpx;
        }
        .second-img {
          width: 16rpx;
          height: 16rpx;
        }
        .first-four {
          font-family: PingFangSC-Medium;
          font-size: 28rpx;
          color: #008bcd;
          letter-spacing: 0.06px;
          text-align: center;
        }
      }
    }
    .centerF-one:nth-child(1) {
      height: 188rpx;
      .centerO-first {
        margin-top: 32rpx;
        position: relative;
      }
    }
    .centerF-one:nth-child(2) {
      border-top: 2rpx solid #eeeeee;
      border-bottom: 2rpx solid #eeeeee;
      height: 202rpx;
      .centerO-first {
        margin-top: 32rpx;
      }
    }
    .centerF-one:nth-child(3) {
      height: 202rpx;
      .centerO-first {
        margin-top: 44rpx;
      }
    }
    .centerF-one:nth-child(5) {
      height: 206rpx;
      .centerO-first {
        margin-top: 36rpx;
      }
    }
  }
  .sign-bottom {
    margin: 50rpx 32rpx 12rpx;
    .bottom-btn {
      background: #008bcd;
      border-radius: 4rpx;
      font-family: PingFangSC-Regular;
      font-size: 36rpx;
      color: #ffffff;
    }
    .bottom-btn:active {
      background: #049ee7;
      border-radius: 4rpx;
      font-family: PingFangSC-Regular;
      font-size: 36rpx;
      color: #ffffff;
    }
  }
}
</style>