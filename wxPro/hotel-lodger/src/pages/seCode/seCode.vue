<template>
  <div class="scCode">
    <p class="seCode-title">扫一扫 使用消费劵</p>
    <div class="seCode-erwei">
      <img :src="imgsrc"
           alt=""
           class="erweiIng">
    </div>
    <div class="limit">
      <p class="limit-p">
        <span class="detail-span">说明：</span>
        <span class="nei-span">1.一劵一次 不可重复使用</span>
      </p>
      <p class="limit-p">
        <span class="detail-span"></span>
        <span class="nei-span">2.消费劵只可在指定酒店使用</span>
      </p>
      <p class="limit-p">
        <span class="detail-span"></span>
        <span class="nei-span">3.消费劵在有效时间使用，过期作废</span>
      </p>
      <p class="limit-p">
        <span class="detail-span"></span>
        <span class="nei-span">4.酒店对消费劵有最终解释权</span>
      </p>
    </div>
    <p class="refresh">
      <span class="btn-span"
            @click="refresh()">刷新</span>
    </p>
  </div>
</template>
<script>
import { getOneInfoimg } from '../../api/concome'
import { getUserNum, getClientId, getToken } from '@/utils/user'
export default {
  name: 'seCode',
  data () {
    return {
      couponCode: '',
      imgsrc: ''
    }
  },
  onShow () {
    this.couponCode = this.$root.$mp.query.couponCode
    this.readImg()
  },
  methods: {
    refresh () {
      wx.showLoading({
        title: '刷新中...'
      })
      this.readImg()
    },
    readImg () {
      let param = {
        userNum: getUserNum(),
        couponCode: this.couponCode,
        clientid: getClientId(),
        token: getToken()
      }
      this.imgsrc = getOneInfoimg(param)
      wx.hideLoading()
    }
  }
}
</script>
<style lang="scss">
.scCode {
  border-top: 2rpx solid #f3f3f3;
  .seCode-title {
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    margin-top: 30rpx;
    margin-bottom: 20rpx;
  }
  .seCode-erwei {
    width: 400rpx;
    height: 400rpx;
    margin: 0 auto;
    .erweiIng {
      width: 100%;
      height: 100%;
    }
  }
  .limit {
    margin-top: 30rpx;
    box-sizing: border-box;
    padding: 0 0 0 120rpx;
    .limit-p {
      .detail-span {
        display: inline-block;
        width: 80rpx;
        font-family: PingFangSC-Regular;
        font-size: 24rpx;
        color: #999999;
        letter-spacing: 0;
        text-align: right;
      }
      .nei-span {
        font-family: PingFangSC-Regular;
        font-size: 24rpx;
        color: #999999;
        letter-spacing: 0;
      }
    }
  }
  .refresh {
    text-align: center;
    margin-top: 80rpx;
    .btn-span {
      display: inline-block;
      width: 200rpx;
      padding: 20rpx 40rpx;
      color: white;
      background: #0089cb;
      font-size: 30rpx;
    }
    .btn-span:active {
      display: inline-block;
      width: 200rpx;
      padding: 20rpx 40rpx;
      color: white;
      background: #049ee7;
      font-size: 30rpx;
    }
  }
}
</style>