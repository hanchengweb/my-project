<template>
  <div class="content">
    <p>签住二维码</p>
    <img :src="src"
         alt=""
         class="img-datail">
    <p>扫一扫 进入签住中心</p>
    <button @click="update"
            class="updates">刷新</button>
  </div>
</template>

<script>
// https://lzdx-b-dev.oss-cn-hangzhou.aliyuncs.com/image/column/Mb5iipm4x4.png
import { readQRCode, readQRImage, findQRScanStatus } from '@/api/user'
import { getToken, getClientId, getUserNum } from '@/utils/user'
export default {
  data () {
    return {
      src: '',
      timer1: null,
      uuid: '',
      paths: '',
      oldnumber: 1,
      newnumber: 1
    }
  },
  onShow () {
    // eslint-disable-next-line no-undef
    var pages = getCurrentPages()
    var currentPage = pages[pages.length - 1]
    var url = currentPage.route
    this.paths = url
    this.getScan()
    let _this = this
    this.timer1 = setInterval(function () {
      _this.getScan()
      _this.newnumber++
    }, 1000 * 60 * 1)
  },
  methods: {
    getScan () {
      let _this = this
      readQRCode({
        token: getToken(),
        clientid: getClientId(),
        userNum: getUserNum()
      }).then(info => {
        _this.uuid = info
        _this.src = readQRImage({
          token: getToken(),
          clientid: getClientId(),
          width: 300,
          height: 300,
          uuid: info,
          userNum: getUserNum(),
          date: new Date()
        })
        _this.findQR()
      })
    },
    findQR () {
      let _this = this
      findQRScanStatus({
        uuid: _this.uuid,
        token: getToken(),
        clientid: getClientId(),
        userNum: getUserNum()
      }).then(res => {
        if (_this.oldnumber === _this.newnumber) {
          if (res === 'REQUEST_TIMEOUT') {
            if (_this.paths !== 'other') {
              _this.findQR()
            }
          } else if (res === 'OK') {
            mpvue.reLaunch({ url: '/pages/sign/main' })
          }
        } else {
          _this.oldnumber = _this.newnumber
        }
      })
    },
    update () {
      this.getScan()
      clearInterval(this.timer1)
      let _this = this
      this.timer1 = setInterval(function () {
        _this.getScan()
      }, 1000 * 60 * 4)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer1)
    this.timer1 = null
  },
  onUnload: function () {
    clearInterval(this.timer1)
    this.timer1 = null
    this.paths = 'other'
  }
}
</script>
<style scope lang="less">
.content {
  padding-top: 92rpx;
  text-align: center;
  p {
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #333333;
  }
  .img-datail {
    width: 600rpx;
    height: 600rpx;
  }
  .updates {
    color: white;
    background: #008bcd;
    width: 250rpx;
    margin: 0 auto;
    margin-top: 100rpx;
    font-size: 30rpx;
    border-radius: 0 !important;
  }
  .updates:active {
    color: white;
    background: #049ee7;
    width: 250rpx;
    margin: 0 auto;
    margin-top: 100rpx;
    font-size: 30rpx;
    border-radius: 0 !important;
  }
}
</style>
