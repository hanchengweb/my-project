<template>
  <div class="content">
    <a href=""
       class="userInfoTitle clearfix"
       @click="changeAvatar">
      <span class="userInfo-span">头像</span>
      <img src="/static/images/rightNext.png"
           alt=""
           class="lineList-item-tip">
      <img :src="avatarUrl"
           alt=""
           class="userInfoAvatar">
    </a>
    <a href="/pages/userInfoSet/main?from=nickName"
       class="userInfo-item clearfix">
      <span class="userInfo-span">昵称</span>
      <img src="/static/images/rightNext.png"
           alt=""
           class="lineList-item-tip">
      <span class="userInfo-text">{{userInfo.nickName}}</span>
    </a>
    <a href=""
       class="userInfo-item clearfix"
       @click="redirectTo('/pages/userInfoSet/main?from=gender')">
      <span class="userInfo-span">性别</span>
      <img src="/static/images/rightNext.png"
           alt=""
           class="lineList-item-tip">
      <span class="userInfo-text"
            v-if="userInfo.gender==1">男</span>
      <span class="userInfo-text"
            v-else-if="userInfo.gender==2">女</span>
      <span class="userInfo-text"
            v-else>未知</span>
    </a>
    <!-- <a href="/pages/userInfoSet/main?from=phone" class="userInfo-item clearfix">
        <span class="userInfo-span">绑定手机号</span>
        <img src="/static/images/rightNext.png" alt="" class="lineList-item-tip">
        <span class="userInfo-text">18848972318</span>
      </a>
      <a href="/pages/userInfoSet/main?from=date" class="userInfo-item clearfix">
        <span class="userInfo-span">生日</span>
        <img src="/static/images/rightNext.png" alt="" class="lineList-item-tip">
        <span class="userInfo-text">1889-05-05</span>
      </a> -->
  </div>
</template>

<script>
import { uploadHeadImage, headimgUrl } from '../../api/user'
import { getToken, getClientId, setUserInfo } from '@/utils/user'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      avatarUrl: ''
    }
  },
  computed: {
    ...mapState({
      'userInfo': state => state.user.userInfo
    })
  },
  onShow () {
    this.avatarUrl = this.userInfo.avatarUrl
  },
  methods: {
    changeAvatar () {
      let _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // console.log(res)
          const tempFilePaths = res.tempFilePaths
          _this.avatarUrl = tempFilePaths
          wx.uploadFile({
            url: uploadHeadImage,
            filePath: tempFilePaths[0],
            header: {
              token: getToken(),
              clientid: getClientId()
            },
            name: 'headimage',
            success (res) {
              const data = JSON.parse(res.data)
              // console.log(data)
              let newUserInFo = _this.userInfo
              newUserInFo.avatarUrl = headimgUrl({ clientid: getClientId(), token: getToken(), imgCode: data.data, date: new Date() })
              setUserInfo(newUserInFo)
              _this.$store.commit('handleUserInfo', newUserInFo)
            }
          })
        }
      })
    },
    redirectTo (e) {
      wx.redirectTo({
        url: e
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
  background-color: #f2f2f2;
  height: 100%;
  .userInfo-span {
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 32rpx;
    color: #333333;
  }
  .lineList-item-tip {
    float: right;
    width: 30rpx;
    height: 40rpx;
    margin-left: 30rpx;
  }
  .userInfo-text {
    float: right;
  }
  .userInfoTitle {
    height: 180rpx;
    line-height: 180rpx;
    border-bottom: 20rpx solid #f2f2f2;
    padding: 0 30rpx;
    background-color: #fff;
    .userInfoAvatar {
      float: right;
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-top: 30rpx;
    }
    .lineList-item-tip {
      margin-top: 70rpx;
    }
  }
  .userInfo-item {
    height: 104rpx;
    line-height: 104rpx;
    border-bottom: 1px solid #f2f2f2;
    background-color: #fff;
    color: #9f9f9f;
    padding: 0 30rpx;
    .lineList-item-tip {
      margin-top: 30rpx;
    }
  }
}
</style>
