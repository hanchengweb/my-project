<template>
  <div class="ranking">
    <!-- 本人 -->
    <div class="main">
      <!-- 排名 -->
      <!-- {{self.seq}} -->
      <div class="rank">
        <img src="../../../static/images/onem.png"
             alt=""
             v-if="self.seq===1"
             class="rank-img">
        <img src="../../../static/images/twom.png"
             alt=""
             v-else-if="self.seq===2"
             class="rank-img">
        <img src="../../../static/images/threem.png"
             alt=""
             v-else-if="self.seq===3"
             class="rank-img">
        <span v-else
              class="rank-span">{{self.seq}}</span>
      </div>
      <div class="rank-detail">
        <!-- 头像 -->
        <div class="rank-image">
          <img :src="urlImg"
               class="image-div"
               alt="">
        </div>
        <!-- 昵称 -->
        <div class="rank-name">{{self.nickName}}</div>
        <!-- 用电 -->
        <div class="rank-use"
             v-if="type==='carbon'">{{self.credit}}</div>
        <div class="rank-use"
             v-else-if="'employ'">{{self.avgEnergyConsumer}}</div>
        <!-- 点赞 -->
        <div class="rank-dian"
             @click="likeFun(self)"
             v-if="self.nickName">
          <p class="rank-nmb">{{self.like}}</p>
          <img src="../../../static/images/dianzan.png"
               alt=""
               class="rank-img"
               v-if="!self.tag">
          <img src="../../../static/images/dianzanr.png"
               alt=""
               class="rank-img"
               v-else>
        </div>
      </div>
    </div>
    <div class="orRank">
      <!-- 排行 -->
      <div class="rank-all"
           v-for="(item, index) in rank"
           :key="index">
        <!-- 排名 -->
        <div class="rank">
          <img src="../../../static/images/onem.png"
               alt=""
               v-if="item.seq===1"
               class="rank-img">
          <img src="../../../static/images/twom.png"
               alt=""
               v-else-if="item.seq===2"
               class="rank-img">
          <img src="../../../static/images/threem.png"
               alt=""
               v-else-if="item.seq===3"
               class="rank-img">
          <span v-else
                class="rank-span">{{item.seq}}</span>
        </div>
        <div class="rank-detail">
          <!-- 头像 -->
          <div class="rank-image">
            <img :src="item.headimgurl"
                 class="image-div"
                 alt="">
          </div>
          <!-- 昵称 -->
          <div class="rank-name">{{item.nickName}}</div>
          <!-- 用电 -->
          <div class="rank-use"
               v-if="type==='carbon'">{{item.credit}}</div>
          <div class="rank-use"
               v-else-if="'employ'">{{item.avgEnergyConsumer}}</div>
          <!-- 点赞 -->
          <div class="rank-dian"
               @click="likeOther(item)">
            <p class="rank-nmb">{{item.like}}</p>
            <img src="../../../static/images/dianzan.png"
                 alt=""
                 class="rank-img"
                 v-if="!item.tag">
            <img src="../../../static/images/dianzanr.png"
                 alt=""
                 class="rank-img"
                 v-else>
          </div>
        </div>
      </div>
    </div>
    <div class="share-mark">
      <button open-type="share"
              class="shareBtn">
        <img src="../../../static/images/sharei.png"
             alt=""
             class="imgBtn">
        <span>分享到微信好友</span>
      </button>
      <button class="shareBtn"
              @click="markShare()">
        <img src="../../../static/images/shengi.png"
             alt=""
             class="imgBtn">
        <span>生成分享图片</span>
      </button>
    </div>
    <div class="returnHome"
         @click="returnhomeFun()">
      <img src="../../../static/images/homepage.png"
           alt=""
           class="homePng">
    </div>
  </div>
</template>
<script>
import { getRank, getUserpower, postUserlike, putUserlike } from '../../api/rank'
import { headimgUrl1, headimgUrl2 } from '../../api/user'
import { getToken, getClientId, getUserNum } from '@/utils/user'
export default {
  data () {
    return {
      type: '',
      roomid: '',
      hotelId: '',
      self: {},
      rank: {},
      urlImg: '',
      inDate: '',
      checkNum: ''
    }
  },
  onShow () {
    this.type = wx.getStorageSync('type')
    this.checkNum = wx.getStorageSync('checkNum')
    let inTime = String(wx.getStorageSync('inTime'))
    let month = inTime.substring(0, 2)
    let day = inTime.substring(3, 5)
    let hour = inTime.split(' ')[1]
    var myDate = new Date()
    let year = myDate.getFullYear()
    let date = year + '-' + month + '-' + day + ' ' + hour
    this.inDate = date
    this.typeChange()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
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
    returnhomeFun () {
      wx.switchTab({
        url: '../index/main'
      })
    },
    markShare () {
      let data = {}
      this.$set(data, 'self', this.self)
      this.$set(data, 'rank', this.rank)
      if (wx.getStorageSync('data')) {
        wx.removeStorageSync('data')
      }
      wx.setStorageSync('data', data)
      wx.navigateTo({
        url: `../sharePng/main`
      })
    },
    // 判断类型
    typeChange () {
      // console.log(this.type)
      if (this.type === 'carbon') {
        wx.setNavigationBarTitle({
          title: '碳积分排行榜'
        })
        this.self = {}
        this.rank = {}
        this.urlImg = ''
        this.roomid = wx.getStorageSync('roomid')
        this.hotelId = wx.getStorageSync('hotelId')
        this.getRanking()
      } else if (this.type === 'employ') {
        wx.setNavigationBarTitle({
          title: '平均能耗排行榜'
        })
        this.roomid = wx.getStorageSync('roomid')
        this.self = {}
        this.rank = {}
        this.urlImg = ''
        this.getUsering()
      }
    },
    // 获取碳积分排行
    async getRanking () {
      let param = {
        userNum: getUserNum(),
        roomid: this.roomid
      }
      const result = await getRank(param)
      this.self = result.self
      this.urlImg = headimgUrl1({ clientid: getClientId(), token: getToken(), imgCode: this.self.headimgurl })
      this.self.headimgurl = this.urlImg
      this.rank = result.data.map(item => {
        return {
          headimgurl: headimgUrl2({ clientid: getClientId(), token: getToken(), imgCode: item.headimgurl }),
          checkNum: item.checkNum,
          credit: item.credit,
          duration: item.duration,
          like: item.like,
          nickName: item.nickName,
          seq: item.seq,
          tag: item.tag
        }
      })
    },
    // 获取用电排行
    async getUsering () {
      let param = this.roomid
      let param1 = this.checkNum
      const result = await getUserpower(param, this.inDate, param1)
      this.self = result.self
      this.urlImg = headimgUrl1({ clientid: getClientId(), token: getToken(), imgCode: this.self.headimgurl })
      this.self.headimgurl = this.urlImg
      this.rank = result.data.map(item => {
        return {
          headimgurl: headimgUrl2({ clientid: getClientId(), token: getToken(), imgCode: item.headimgurl }),
          checkNum: item.checkNum,
          credit: item.credit,
          duration: item.duration,
          like: item.like,
          nickName: item.nickName,
          seq: item.seq,
          avgEnergyConsumer: item.avgEnergyConsumer
        }
      })
    },
    // 给自己点赞
    likeFun (data) {
      let param = {
        checkNum: data.checkNum,
        userNum: data.userNum,
        selfUserNum: getUserNum(),
        inTime: this.inDate
      }
      if (this.type === 'carbon') {
        this.userTan(param)
      } else if (this.type === 'employ') {
        this.userPower(param)
      }
    },
    // 给别人点赞
    likeOther (data) {
      let param = {
        checkNum: data.checkNum,
        userNum: data.userNum,
        selfUserNum: getUserNum(),
        inTime: this.inDate
      }
      if (this.type === 'carbon') {
        this.userTan(param)
      } else if (this.type === 'employ') {
        this.userPower(param)
      }
    },
    // 用电排行点赞
    async userPower (param) {
      const result = await postUserlike(param)
      if (result === 'success') {
        this.getUsering()
      }
    },
    // 碳积分排行点赞
    async userTan (param) {
      const result = await putUserlike(param)
      if (result === 'success') {
        this.getRanking()
      }
    }
  }
}
</script>
<style lang="scss">
.ranking {
  width: 100%;
  border-top: 2rpx solid #f5f5f5;
  position: relative;
  .returnHome {
    position: fixed;
    bottom: 200rpx;
    right: 30rpx;
    width: 60rpx;
    height: 60rpx;
    border: 1px solid #f5f5f5;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    .homePng {
      margin: 0 auto;
      width: 40rpx;
      height: 40rpx;
    }
  }
  .main {
    width: 100%;
    height: 132rpx;
    background-color: #fff;
    border-bottom: 20rpx solid #f5f5f5;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1;
    .rank {
      font-family: PingFangSC-Regular;
      font-size: 30rpx;
      color: #333333;
      letter-spacing: 0.27px;
      margin: 0 24rpx 0 46rpx;
      .rank-img {
        width: 50rpx;
        height: 50rpx;
      }
      .rank-span {
        display: inline-block;
        width: 50rpx;
        height: 50rpx;
        text-align: center;
      }
    }
    .rank-detail {
      display: flex;
      align-items: center;
      .rank-image {
        border-radius: 50%;
        width: 80rpx;
        height: 80rpx;
        margin-right: 28rpx;
        overflow: hidden;
        .image-div {
          width: 100%;
          height: 100%;
        }
      }
      .rank-name {
        width: 60rpx;
        font-family: PingFangSC-Medium;
        font-size: 32rpx;
        color: #333333;
        letter-spacing: 0.26px;
        white-space: nowrap;
        margin-right: 38rpx;
      }
      .rank-use {
        width: 256rpx;
        white-space: nowrap;
        font-family: PingFangSC-Regular;
        font-size: 28rpx;
        color: #333333;
        letter-spacing: 0.24px;
        text-align: center;
      }
      .rank-dian {
        position: absolute;
        right: 30rpx;
        width: 60rpx;
        text-align: center;
        .rank-nmb {
          font-family: PingFangSC-Regular;
          font-size: 24rpx;
          color: #919191;
          letter-spacing: 0.23px;
        }
        .rank-img {
          width: 30rpx;
          height: 30rpx;
          margin: 0 auto;
        }
      }
    }
  }
  .orRank {
    padding-top: 152rpx;
    padding-bottom: 152rpx;
    .rank-all {
      width: 100%;
      height: 132rpx;
      display: flex;
      align-items: center;
      position: relative;
      .rank {
        font-family: PingFangSC-Regular;
        font-size: 30rpx;
        color: #333333;
        letter-spacing: 0.27px;
        margin: 0 24rpx 0 46rpx;
        .rank-img {
          width: 50rpx;
          height: 50rpx;
        }
        .rank-span {
          display: inline-block;
          width: 50rpx;
          height: 50rpx;
          text-align: center;
        }
      }
      .rank-detail {
        height: 100%;
        width: calc(100% - 100rpx);
        display: flex;
        align-items: center;
        border-bottom: 2rpx solid #f5f5f5;
        .rank-image {
          border-radius: 50%;
          width: 80rpx;
          height: 80rpx;
          margin-right: 28rpx;
          overflow: hidden;
          .image-div {
            width: 100%;
            height: 100%;
          }
        }
        .rank-name {
          width: 60rpx;
          font-family: PingFangSC-Medium;
          font-size: 32rpx;
          color: #333333;
          white-space: nowrap;
          letter-spacing: 0.26px;
          margin-right: 38rpx;
        }
        .rank-use {
          width: 256rpx;
          font-size: 28rpx;
          color: #333333;
          letter-spacing: 0.24px;
          text-align: center;
        }
        .rank-dian {
          position: absolute;
          right: 30rpx;
          width: 60rpx;
          text-align: center;
          .rank-nmb {
            font-family: PingFangSC-Regular;
            font-size: 24rpx;
            color: #919191;
            letter-spacing: 0.23px;
          }
          .rank-img {
            width: 30rpx;
            height: 30rpx;
            margin: 0 auto;
          }
        }
      }
    }
  }
  .share-mark {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #f5f5f5;
    .shareBtn {
      border: 1px solid #f5f5f5;
      width: 40%;
      height: 80rpx;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      background-color: white;
      color: #919191;
      border-radius: 40rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .imgBtn {
        width: 30rpx;
        height: 30rpx;
        margin-right: 10rpx;
      }
    }
    .shareBtn::after {
      border: 0;
    }
  }
}
</style>