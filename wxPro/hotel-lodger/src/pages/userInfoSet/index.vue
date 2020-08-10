<template>
  <div class="content">
    <div class="set-nickName clearfix"
         v-if="from=='nickName'">
      <span>昵称</span>
      <input type="text"
             class="set-nickName-ipt"
             auto-focus
             v-model="nickNameValue">
      <img src="/static/images/setFork.png"
           alt=""
           class="set-nickName-fork"
           @click="cleanValue">
    </div>
    <div class="set-gender"
         v-if="from=='gender'">
      <div class="set-gender-item clearfix"
           @click="changeGender(1)">
        <span>男</span>
        <img src="/static/images/setCross.png"
             alt=""
             v-if="genderBoy">
      </div>
      <div class="set-gender-item clearfix"
           @click="changeGender(2)">
        <span>女</span>
        <img src="/static/images/setCross.png"
             alt=""
             v-if="!genderBoy">
      </div>
    </div>
    <button type="primary"
            class="focusSure"
            @click="okFns"> 完成 </button>
  </div>
</template>

<script>
import { updateSex, updateNickname } from '@/api/user'
import { setUserInfo, getUserNum } from '@/utils/user'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      nickNameValue: '',
      nickNameShow: false,
      genderShow: true,
      genderBoy: true,
      from: '',
      sex: ''
    }
  },
  onShow () {
    this.genderBoy = this.userInfo.gender === 1
    this.sex = this.userInfo.gender
    this.nickNameValue = this.userInfo.nickName
    this.from = this.$root.$mp.query.from
    let barTitle
    switch (this.from) {
      case 'nickName':
        barTitle = '昵称'
        break
      case 'gender':
        barTitle = '性别'
        break
    }
    wx.setNavigationBarTitle({
      title: barTitle,
      success: function (res) {
        // success
      }
    })
  },
  computed: {
    ...mapState({
      'userInfo': state => state.user.userInfo
    })
  },
  methods: {
    cleanValue () {
      this.nickNameValue = ''
    },
    changeGender (e) {
      this.genderBoy = !this.genderBoy
      this.sex = e
    },
    okFns () {
      let _this = this
      if (_this.from === 'gender') {
        updateSex({ sex: _this.sex, userNum: getUserNum() }).then(res => {
          // console.log(res)
          if (res === 'SUCCESS') {
            let newUserInFo = _this.userInfo
            newUserInFo.gender = _this.sex
            setUserInfo(newUserInFo)
            _this.$store.commit('handleUserInfo', newUserInFo)
            // mpvue.navigateTo({ url: '/pages/userInfo/main' })
            wx.redirectTo({
              url: '/pages/userInfo/main'
            })
          }
        })
      }
      if (_this.from === 'nickName') {
        updateNickname({ nickname: _this.nickNameValue, userNum: getUserNum() }).then(res => {
          if (res === 'SUCCESS') {
            let newUserInFo = _this.userInfo
            newUserInFo.nickName = _this.nickNameValue
            setUserInfo(newUserInFo)
            _this.$store.commit('handleUserInfo', newUserInFo)
            // mpvue.navigateTo({ url: '/pages/userInfo/main' })
            wx.redirectTo({
              url: '/pages/userInfo/main'
            })
          }
        })
      }
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
  padding-top: 30rpx;
  overflow: hidden;
  .set-nickName {
    height: 100rpx;
    line-height: 100rpx;
    background-color: #fff;
    padding: 0 30rpx;
    span {
      font-family: PingFangSC-Regular;
      font-size: 30rpx;
      color: #333333;
      float: left;
    }
    .set-nickName-ipt {
      float: left;
      height: 100%;
      width: 260px;
      padding-left: 30rpx;
    }
    .set-nickName-fork {
      float: right;
      width: 28rpx;
      height: 28rpx;
      margin-top: 36rpx;
    }
  }
  .set-gender {
    background-color: #fff;
    .set-gender-item {
      height: 100rpx;
      line-height: 100rpx;
      padding: 0 40rpx;
      border-bottom: 1px solid #f2f2f2;
      span {
        float: left;
      }
      image {
        float: right;
        height: 40rpx;
        width: 40rpx;
        margin-top: 30rpx;
      }
    }
  }
  .focusSure {
    width: 686rpx;
    height: 94rpx;
    background-color: #008bcd;
    margin-top: 40rpx;
  }
}
</style>
