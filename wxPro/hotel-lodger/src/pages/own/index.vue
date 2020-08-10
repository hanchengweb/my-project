<template>
  <div class="content">
    <div class="ownBar">
      <img :src="bgmySrc"
           alt=""
           class="ownbg">
      <div class="own-container clearfix">
        <a :href="userInfo.length<=0?'':'/pages/signScan/main'"
           class="floatLeft block-a"><img src="/static/images/ownerMa2.png"
               alt=""
               class="ownBar-left"></a>
        <div class="ownBar-con">
          <div v-if="userInfo.length<=0">
            <button open-type="getUserInfo"
                    @click="getUserfn"
                    class="getUserinfobtn">
              <img src="/static/images/ownAcater.png"
                   alt="">
              <p>登录</p>
            </button>
          </div>
          <div v-else>
            <a href="">
              <img :src="userInfo.avatarUrl"
                   alt="">
              <p>{{userInfo.nickName}}</p>
            </a>
          </div>
        </div>
        <a :href="userInfo.length<=0?'':'/pages/userInfo/main'"
           class="floatleft block-a"><img src="/static/images/ownerMa.png"
               alt=""
               class="ownBar-right"></a>
      </div>
    </div>
    <!-- <div class="own-list clearfix">
      <a href="/pages/creditInfo/main"
         class="ownList-item">
        <img src="/static/images/credit.png"
             alt="">
        <p>碳积分</p>
      </a>
      <a href="/pages/absent/main?from=discount"
         class="ownList-item">
        <img src="/static/images/discount.png"
             alt="">
        <p>优惠券</p>
      </a>
      <a href="/pages/cash/main" class="ownList-item">
      <a href="/pages/absent/main?from=cash"
         class="ownList-item">
        <img src="/static/images/cash.png"
             alt="">
        <p>代金券</p>
      </a>
      <a href="/pages/absent/main?from=change"
         class="ownList-item">
        <a href="/pages/exchange/main" class="ownList-item">
        <img src="/static/images/change.png"
             alt="">
        <p>兑换记录</p>
      </a>
    </div> -->
    <div class="update-own-list clearfix">
      <div class="update-own-li"
           @click="consumeFun1()">
        <img src="/static/images/updateCredit.png"
             alt="">
        <view class="update-own-view">碳积分</view>
      </div>
      <div class="update-own-li"
           @click="consumeFun()">
        <view class="updateQuan-num"
              v-if="count>0">{{count}}</view>
        <img src="/static/images/updateQuan.png"
             alt="">
        <view class="update-own-view">消费券</view>
      </div>
      <div class="update-own-li"
           @click="consumeFun2()">
        <img src="/static/images/updateCollect.png"
             alt="">
        <view class="update-own-view">我的收藏</view>
      </div>
    </div>
    <div class="line-list">
      <!-- <a href="/pages/rule/main"
         class="lineList-item clearfix">
        <img src="/static/images/activityRule.png"
             alt=""
             class="lineList-item-icon">
        <span>用户章程</span>
        <img src="/static/images/rightNext.png"
             alt=""
             class="lineList-item-tip">
      </a> -->
      <!-- <a href="/pages/changelogs/main"
         class="lineList-item clearfix">
        <img src="/static/images/activityRule.png"
             alt=""
             class="lineList-item-icon">
        <span>兑换记录</span>
        <img src="/static/images/rightNext.png"
             alt=""
             class="lineList-item-tip">
      </a> -->
      <a href="/pages/signRecode/main"
         class="lineList-item clearfix">
        <img src="/static/images/qianzhus.png"
             alt=""
             class="lineList-item-icon">
        <span>签住记录</span>
        <img src="/static/images/rightNext.png"
             alt=""
             class="lineList-item-tip">
      </a>
    </div>
  </div>
</template>

<script>
import { doAuth, bindWxUserInfo, doAuthLogin, headimgUrl, readBgImgOfMe, count } from '@/api/user'
import { setUserInfo, setToken, getToken, getUserInfo, setClientId, getClientId, setUserNum, getUserNum } from '@/utils/user'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      bgmySrc: '/static/images/ownbgs.png',
      count: 0
    }
  },
  onShow () {
    // this.bgmySrc = readBgImgOfMe({ clientid: getClientId(), token: getToken() })
    doAuthLogin({ userNum: getUserNum() }).then(info => {
      // console.log(info)
      if (info.flag === 2) {
        mpvue.reLaunch({ url: '/pages/warn/main' })
      }
    })
    wx.showLoading({
      title: '加载中'
    })
    count({ userNum: getUserNum(), clientid: getClientId(), token: getToken() }).then(resul => {
      if (resul !== 400) {
        this.count = resul
      }
      wx.hideLoading()
    })
  },
  computed: {
    ...mapState({
      'userInfo': state => state.user.userInfo
    })
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
    // 登录
    getUserfn (e) {
      // console.log(e)
      let _this = this
      // console.log(1)
      wx.getUserInfo({
        lang: 'zh_CN',
        success: function (res) {
          let newUserInFo = res.userInfo
          wx.login({
            success (reslogin) {
              if (reslogin.code) {
                doAuth({
                  code: reslogin.code
                }).then(respons => {
                  setUserNum(respons.userNum)
                  if (respons.status === 2) {
                    mpvue.reLaunch({ url: '/pages/warn/main' })
                    return false
                  }
                  if (respons === '认证登录异常') {
                    return false
                  }
                  setClientId(respons.clientid)
                  setUserNum(respons.userNum)
                  // 绑定信息
                  if (respons.status === 0) {
                    // console.log('新用户')
                    // 新用户
                    bindWxUserInfo({
                      nickname: newUserInFo.nickName,
                      sex: newUserInFo.gender,
                      headimgurl: newUserInFo.avatarUrl,
                      province: newUserInFo.province,
                      country: newUserInFo.country,
                      city: newUserInFo.city,
                      userNum: getUserNum()
                    })
                    _this.userInfo = newUserInFo
                    _this.$forceUpdate()
                    setUserInfo(newUserInFo)
                    _this.$store.commit('handleUserInfo', newUserInFo)
                  } else {
                    // console.log('老用户')
                    // 老用户
                    doAuthLogin({ userNum: getUserNum() }).then(info => {
                      // console.log(info)
                      if (info == null) {
                        bindWxUserInfo({
                          nickname: newUserInFo.nickName,
                          sex: newUserInFo.gender,
                          headimgurl: newUserInFo.avatarUrl,
                          province: newUserInFo.province,
                          country: newUserInFo.country,
                          city: newUserInFo.city,
                          userNum: getUserNum()
                        })
                      } else if (info.nickname != null) {
                        newUserInFo = {
                          nickName: info.nickname,
                          gender: info.sex,
                          avatarUrl: headimgUrl({ clientid: getClientId(), token: getToken(), imgCode: info.headimgcode, userNum: getUserNum() }),
                          province: info.province,
                          country: info.country,
                          city: info.city
                        }
                      } else if (info.flag === 2) {
                        mpvue.reLaunch({ url: '/pages/warn/main' })
                      } else {
                        // 头像为null时重新绑定信息
                        bindWxUserInfo({
                          nickname: newUserInFo.nickName,
                          sex: newUserInFo.gender,
                          headimgurl: newUserInFo.avatarUrl,
                          province: newUserInFo.province,
                          country: newUserInFo.country,
                          city: newUserInFo.city,
                          userNum: getUserNum()
                        })
                      }
                      _this.userInfo = newUserInFo
                      _this.$forceUpdate()
                      setUserInfo(newUserInFo)
                      _this.$store.commit('handleUserInfo', newUserInFo)
                    })
                  }
                  count({ userNum: getUserNum(), clientid: getClientId(), token: getToken() }).then(resul => {
                    _this.count = resul
                    wx.hideLoading()
                  })
                })
              } else { }
            }
          })
        },
        fail: function (res) {
          // console.log(res)
        }
      })
    },
    consumeFun () {
      wx.navigateTo({
        url: `../concome/main`
      })
    },
    consumeFun1 () {
      wx.navigateTo({
        url: `../creditInfo/main`
      })
    },
    consumeFun2 () {
      wx.navigateTo({
        url: `../collect/main`
      })
    }
  }

}
</script>
<style scope lang="less">
html {
  height: 100%;
}
.content {
  height: 100%;
  background-color: #f2f2f2;
  .ownBar {
    width: 100%;
    height: 328rpx;
    position: relative;
    overflow: hidden;
    display: flex;
    .own-container {
      z-index: 2;
      margin: 0 auto;
      margin-top: 60rpx;
    }
    .ownbg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .ownBar-left {
      width: 82rpx;
      height: 82rpx;
      z-index: 2;
    }
    .ownBar-right {
      width: 82rpx;
      height: 82rpx;
      z-index: 2;
    }
    .block-a {
      display: inline-block;
      width: 82rpx;
      height: 82rpx;
    }
    .ownBar-con {
      float: left;
      margin: 0 30rpx;
      font-family: PingFangSC-Regular;
      color: #ffffff;
      text-align: center;
      color: #fff;
      image {
        width: 134rpx;
        height: 134rpx;
        border-radius: 50%;
      }
      .getUserinfobtn {
        background-color: transparent;
        border: none;
        color: #fff;
        font-size: 0;
      }
      p {
        font-size: 32rpx;
        margin-top: 5rpx;
      }
      button::after {
        border: none;
      }
    }
  }
  .own-list {
    border-top: 20rpx solid #f2f2f2;
    .ownList-item {
      float: left;
      width: 25%;
      box-sizing: border-box;
      font-family: PingFangSC-Regular;
      font-size: 0;
      color: #333333;
      text-align: center;
      padding: 30rpx 0;
      image {
        width: 44rpx;
        height: 44rpx;
      }
      p {
        font-size: 30rpx;
        margin-top: 5rpx;
      }
    }
  }
  .line-list {
    background-color: #fff;
    margin-top: 20rpx;
    width: 100%;
    overflow: hidden;
    .lineList-item {
      height: 104rpx;
      width: calc(100% - 60rpx);
      margin: 0 30rpx;
      line-height: 104rpx;
      border-bottom: 1px solid #f2f2f2;
      span {
        float: left;
        font-family: PingFangSC-Regular;
        font-size: 32rpx;
        color: #333333;
      }
      .lineList-item-icon {
        float: left;
        width: 44rpx;
        height: 44rpx;
        margin-top: 32rpx;
        margin-right: 20rpx;
      }
      .lineList-item-tip {
        float: right;
        width: 30rpx;
        height: 40rpx;
        margin-top: 30rpx;
      }
    }
  }
  .update-own-list {
    background-color: #fff;
    border-radius: 8rpx;
    width: 710rpx;
    height: 176rpx;
    margin: 0 auto;
    margin-top: -60rpx;
    position: relative;
    z-index: 10;
    .update-own-li {
      float: left;
      width: 33.3333%;
      text-align: center;
      position: relative;
      image {
        width: 48rpx;
        height: 52rpx;
        padding-top: 36rpx;
      }
      .update-own-view {
        font-family: PingFangSC-Regular;
        font-size: 30rpx;
        color: #333333;
      }
      .updateQuan-num {
        position: absolute;
        top: 20rpx;
        right: 77rpx;
        width: 32rpx;
        height: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ff4d86;
        font-family: PingFangSC-Regular;
        font-size: 22rpx;
        color: #ffffff;
        border-radius: 50%;
      }
    }
  }
}
</style>
