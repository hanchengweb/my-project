<template>
  <div>
    <div class="mask"
         style="position:fixed;top:0;left:0;width:100%;heihgt:100%;background:rgba(0,0,0,0.5);z-index :2">账户异常</div>
  </div>
</template>

<script>
import { readToken, doAuthLogin, headimgUrl } from '@/api/user'
import { setToken, getToken, setUserInfo, removeUserInfo, getClientId, setUserNum, getUserNum, removeLocation } from '@/utils/user'
export default {
  created () {
    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({ key: 'logs' }).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    }
  },
  onShow () {

  },
  onHide () {
    // Do something when hide.
    removeLocation()
  },
  onLaunch (options) {
    if (!getToken() || !getUserNum()) {
      // 获取公用Token
      readToken({}).then(res => {
        setToken(res)
      })
      wx.showModal({
        content: '尚未登录，请先登录。',
        success: function (res) {
          if (res.confirm) {
            mpvue.reLaunch({ url: '/pages/own/main' })
          }
        }
      })
    } else {
      doAuthLogin({ userNum: getUserNum() }).then(info => {
        // console.log(info)
        if (info == null) {
          removeUserInfo()
          this.$store.commit('handleUserInfo', '')
          wx.showModal({
            content: '尚未登录，请先登录。',
            success: function (res) {
              if (res.confirm) {
                mpvue.reLaunch({ url: '/pages/own/main' })
              }
            }
          })
        } else if (info.nickname == null || info == null) {
          removeUserInfo()
          this.$store.commit('handleUserInfo', '')
          wx.showModal({
            content: '尚未登录，请先登录。',
            success: function (res) {
              if (res.confirm) {
                mpvue.reLaunch({ url: '/pages/own/main' })
              }
            }
          })
        } else if (info.flag === 2) {
          // wx.showModal({
          //   content: '账户异常'
          // })

          mpvue.reLaunch({ url: '/pages/warn/main' })
        } else {
          let newUserInFo = {
            nickName: info.nickname,
            gender: info.sex,
            avatarUrl: headimgUrl({ clientid: getClientId(), token: getToken(), imgCode: info.headimgcode, userNum: getUserNum() }),
            province: info.province,
            country: info.country,
            city: info.city
          }
          setUserNum(info.userNum)
          setUserInfo(newUserInFo)
          this.$store.commit('handleUserInfo', newUserInFo)
        }
      })
    }
  },
  log () {
  }
}
</script>

<style lang="less">
@import "./style/common.less";
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
  font-family: PingFangSC-Medium;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
