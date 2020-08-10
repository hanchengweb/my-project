<template>
  <div class="content">
    <p class="scan-item"><input type="number"
             placeholder="酒店ID"
             v-model="hotelId"></p>
    <p class="scan-item"><input type="number"
             placeholder="房间号"
             v-model="roomId"></p>
    <p class="scan-item"><input type="number"
             placeholder="入住天数"
             v-model="days"></p>
    <button type="primary"
            class="scan-button"
            @click="scanQode">扫描</button>
  </div>
</template>

<script>
import { checkin } from '@/api/user'
import { setUserInfo, setToken, getUserInfo, getClientId, getToken } from '@/utils/user'
export default {
  data () {
    return {
      ids: 0,
      hotelId: '',
      roomId: '',
      days: ''
    }
  },
  onShow () {
  },
  methods: {
    scanQode () {
      let _this = this
      if (_this.hotelId.length <= 0 || _this.roomId.length <= 0 || _this.days.length <= 0) {
        wx.showToast({
          title: '请补全信息',
          duration: 2000
        })
        return false
      }
      wx.scanCode({
        success: (res) => {
          // console.log(res)
          const uuid = res.result
          checkin({
            uuid: uuid,
            hotelId: _this.hotelId,
            roomId: _this.roomId,
            days: _this.days
          }).then(info => {
            if (info !== 400) {
              wx.showToast({
                title: '签住成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
          // setTimeout(function () {
          //   mpvue.navigateTo({url: '../creditInfo/main'})
          // }, 2500)
        },
        fail: (res) => {
          wx.showToast({
            title: '失败',
            icon: 'success',
            duration: 2000
          })
        },
        complete: (res) => {
        }
      })
    }
  }
}
</script>
<style scope lang="less">
.content {
  .scan-item {
    margin: 30rpx 0;
    input {
      width: 600rpx;
      height: 80rpx;
      padding-left: 40rpx;
      background: #f2f2f2;
      border-radius: 200rpx;
      margin: 0 auto;
    }
  }
  .scan-button {
    width: 640rpx;
    margin: 0 auto;
    border-radius: 200rpx;
    background-color: #00acdf;
  }
}
</style>
