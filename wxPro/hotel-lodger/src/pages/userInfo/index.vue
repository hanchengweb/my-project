<template>
  <div class="content">
    <a href=""
       class="userInfoTitle clearfix"
       @click="upEwm">
      <span class="userInfo-span">头像</span>
      <img src="/static/images/rightNext.png"
           alt=""
           class="lineList-item-tip">
      <img :src="userInfo.avatarUrl"
           alt=""
           class="userInfoAvatar">
    </a>
    <a href=""
       class="userInfo-item clearfix"
       @click="redirectTo('/pages/userInfoSet/main?from=nickName')">
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
    <!--裁剪图片浮层-->
    <view class='fixed-upimg'
          v-if="imageFixed">
      <view class="wx-content-info">
        <view v-if="isShowImg"
              class="wx-corpper"
              :style="{'width':cropperInitW+'rpx','height':cropperInitH+'rpx;background:#000'}">
          <view bindtap='upLoad'
                class="wx-corpper-content"
                :style="{'width':cropperW+'rpx','height':cropperH+'rpx','left':cropperL+'rpx','top':cropperT+'rpx'}">
            <img :src="imageSrc"
                 :style="{'width':cropperW+'rpx','height':cropperH+'rpx'}">
            <view class="wx-corpper-crop-box"
                  @touchstart="contentStartMove"
                  @touchmove="contentMoveing"
                  :style="{'width':cutW+'rpx','height':cutH+'rpx','left':cutL+'rpx','top':cutT+'rpx'}">
              <view class="wx-cropper-view-box">
                <view class="wx-cropper-dashed-h"></view>
                <view class="wx-cropper-dashed-v"></view>
                <view class="wx-cropper-line-t"
                      data-drag="top"
                      @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="wx-cropper-line-r"
                      data-drag="right"
                      @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="wx-cropper-line-b"
                      data-drag="bottom"
                      @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="wx-cropper-line-l"
                      data-drag="left"
                      @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="wx-cropper-point point-t"
                      data-drag="top"
                      @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="wx-cropper-point point-tr"
                      data-drag="topTight"></view>
                <view class="wx-cropper-point point-r"
                      data-drag="right"
                      @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="wx-cropper-point point-rb"
                      data-drag="rightBottom"
                      @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="wx-cropper-point point-b"
                      data-drag="bottom"
                      @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="wx-cropper-point point-bl"
                      data-drag="bottomLeft"></view>
                <view class="wx-cropper-point point-l"
                      data-drag="left"
                      @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="wx-cropper-point point-lt"
                      data-drag="leftTop"></view>
              </view>
            </view>
          </view>
        </view>
        <canvas canvas-id="myCanvas"
                :style="{'position':'absolute','border': '1px solid red', 'width':imageW+'rpx','height':imageH+'rpx','top':'-9999px','left':'-9999px'}"></canvas>
        <div class="lastInfo">
          <button @click="backImageSure"
                  class="getImageSures2">取消</button>
          <button type="primary"
                  @click="getImageSure"
                  class="getImageSures"> 提交</button>
        </div>

      </view>
    </view>
  </div>
</template>

<script>
import { uploadHeadImage, headimgUrl } from '../../api/user'
import { getToken, getClientId, setUserInfo, getUserNum } from '@/utils/user'
import { mapState } from 'vuex'
// 手机的宽度
var windowWRPX = 750
// 拖动时候的 pageX
var pageX = 0
// 拖动时候的 pageY
var pageY = 0
var pixelRatio = wx.getSystemInfoSync().pixelRatio
// 调整大小时候的 pageX
var sizeConfPageX = 0
// 调整大小时候的 pageY
var sizeConfPageY = 0
var initDragCutW = 0
var initDragCutL = 0
var initDragCutH = 0
var initDragCutT = 0
// 移动时 手势位移与 实际元素位移的比
var dragScaleP = 2
export default {
  data () {
    return {
      imageNum: '', // 上传的图片id
      headImg: '', // 头像上传
      imageFixed: false, // 裁剪浮层
      // imageSrc: 'http://topmdrt-static.oss-cn-shenzhen.aliyuncs.com/images/testimg2.jpeg',
      imageSrc: '', // 要裁剪的图片
      returnImage: '',
      isShowImg: false,
      // 初始化的宽高
      cropperInitW: windowWRPX,
      cropperInitH: windowWRPX,
      // 动态的宽高
      cropperW: windowWRPX,
      cropperH: windowWRPX,
      // 动态的left top值
      cropperL: 0,
      cropperT: 0,

      // 图片缩放值
      scaleP: 0,
      imageW: 0,
      imageH: 0,

      // 裁剪框 宽高
      cutW: 400,
      cutH: 400,
      cutL: 0,
      cutT: 0
    }
  },
  computed: {
    ...mapState({
      'userInfo': state => state.user.userInfo
    })
  },
  onShow () {
    var _this = this
    wx.getImageInfo({
      src: _this.imageSrc,
      success: function success (res) {
        var innerAspectRadio = res.width / res.height
        // console.log(innerAspectRadio)
        // 根据图片的宽高显示不同的效果   保证图片可以正常显示
        if (innerAspectRadio >= 1) {
          _this.cropperW = windowWRPX
          _this.cropperH = windowWRPX / innerAspectRadio
          // 初始化left right
          _this.cropperL = Math.ceil((windowWRPX - windowWRPX) / 2)
          _this.cropperT = Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2)
          _this.cutL = Math.ceil((windowWRPX - windowWRPX + 340) / 2)
          _this.cutT = Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 20)) / 2)
          _this.scaleP = res.width * pixelRatio / windowWRPX
          _this.imageW = res.width * pixelRatio
          _this.imageH = res.height * pixelRatio
        } else {
          _this.cropperW = windowWRPX * innerAspectRadio
          _this.cropperH = windowWRPX
          // 初始化left right
          _this.cropperL = Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2)
          _this.cropperT = Math.ceil((windowWRPX - windowWRPX) / 2)
          _this.cutL = Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 20)) / 2)
          _this.cutT = Math.ceil((windowWRPX - 340) / 2)
          _this.scaleP = res.width * pixelRatio / windowWRPX
          _this.imageW = res.width * pixelRatio
          _this.imageH = res.height * pixelRatio
        }
        _this.isShowImg = true
        wx.hideLoading()
      }
    })
  },
  methods: {
    redirectTo (e) {
      wx.navigateTo({
        url: e
      })
    },
    // 拖动时候触发的touchStart事件
    contentStartMove (e) {
      pageX = e.touches[0].pageX
      pageY = e.touches[0].pageY
    },
    // 拖动时候触发的touchMove事件
    contentMoveing (e) {
      var _this = this
      var dragLengthX = (pageX - e.touches[0].pageX) * dragScaleP
      var dragLengthY = (pageY - e.touches[0].pageY) * dragScaleP
      var minX = Math.max(_this.cutL - (dragLengthX), 0)
      var minY = Math.max(_this.cutT - (dragLengthY), 0)
      var maxX = _this.cropperW - _this.cutW
      var maxY = _this.cropperH - _this.cutH
      this.cutL = Math.min(maxX, minX)
      this.cutT = Math.min(maxY, minY)
      pageX = e.touches[0].pageX
      pageY = e.touches[0].pageY
    },
    // 提交
    getImageSure () {
      var _this = this
      wx.showLoading({
        title: '图片生成中...'
      })
      // 将图片写入画布
      const ctx = wx.createCanvasContext('myCanvas')
      // ctx.drawImage(res.tempFilePath)
      ctx.drawImage(_this.imageSrc)
      ctx.draw(true, () => {
        // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题
        var canvasW = (_this.cutW / _this.cropperW) * (_this.imageW / pixelRatio)
        var canvasH = (_this.cutH / _this.cropperH) * (_this.imageH / pixelRatio)
        var canvasL = (_this.cutL / _this.cropperW) * (_this.imageW / pixelRatio)
        var canvasT = (_this.cutT / _this.cropperH) * (_this.imageH / pixelRatio)
        wx.canvasToTempFilePath({
          x: canvasL,
          y: canvasT,
          width: canvasW,
          height: canvasH,
          destWidth: canvasW,
          destHeight: canvasH,
          canvasId: 'myCanvas',
          success: function (res) {
            // console.log(res)
            let tempFilePath = res.tempFilePath
            wx.hideLoading()
            // 成功获得地址的地方
            // 判断时上传头像还是二维码
            _this.imageFixed = false
            wx.uploadFile({
              url: uploadHeadImage + '?userNum=' + getUserNum(),
              filePath: tempFilePath,
              header: {
                token: getToken(),
                clientid: getClientId()
              },
              name: 'headimage',
              success (res) {
                const data = res.data
                let data2 = JSON.parse(data)
                let newUserInFo = _this.userInfo
                newUserInFo.avatarUrl = headimgUrl({ clientid: getClientId(), token: getToken(), imgCode: data2.data, date: new Date(), userNum: getUserNum() })
                // console.log(newUserInFo.avatarUrl)
                setUserInfo(newUserInFo)
                _this.$store.commit('handleUserInfo', newUserInFo)
              }
            })
          }
        })
      })
    },
    // 取消
    backImageSure () {
      this.imageFixed = false
    },
    // 设置大小的时候触发的touchStart事件
    dragStart (e) {
      var _this = this
      sizeConfPageX = e.touches[0].pageX
      sizeConfPageY = e.touches[0].pageY
      initDragCutW = _this.cutW
      initDragCutL = _this.cutL
      initDragCutT = _this.cutT
      initDragCutH = _this.cutH
    },
    // 设置大小的时候触发的touchMove事件
    dragMove (e) {
      // console.log(this.cutL)
      var _this = this
      var dragType = e.target.dataset.drag
      switch (dragType) {
        case 'right':
          var dragLength = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
          if (initDragCutW >= dragLength) {
            // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
            if (dragLength < 0 && _this.cropperW > initDragCutL + _this.cutW) {
              _this.cutW = initDragCutW - dragLength
            }
            // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
            if (dragLength > 0) {
              _this.cutW = initDragCutW - dragLength
            } else {
              return false
            }
          } else {
            return false
          }
          break
        case 'left':
          var dragLength1 = (dragLength1 = sizeConfPageX - e.touches[0].pageX) * dragScaleP
          if (initDragCutW >= dragLength1 && initDragCutL > dragLength1) {
            if (dragLength1 < 0 && Math.abs(dragLength1) >= initDragCutW) return
            _this.cutL = initDragCutL - dragLength1
            _this.cutW = initDragCutW + dragLength1
          } else {

          }
          break
        case 'top':
          var dragLength2 = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
          if (initDragCutH >= dragLength2 && initDragCutT > dragLength2) {
            if (dragLength2 < 0 && Math.abs(dragLength2) >= initDragCutH) return
            _this.cutT = initDragCutT - dragLength2
            _this.cutH = initDragCutH + dragLength2
          } else {

          }
          break
        case 'bottom':
          var dragLength3 = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
          if (initDragCutH >= dragLength3) {
            // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
            if (dragLength3 < 0 && _this.cropperH > initDragCutT + _this.cutH) {
              _this.cutH = initDragCutH - dragLength3
            }
            // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
            if (dragLength3 > 0) {
              _this.cutH = initDragCutH - dragLength3
            } else {

            }
          } else {

          }
          break
        case 'rightBottom':
          var dragLengthX = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
          var dragLengthY = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
          if (initDragCutH >= dragLengthY && initDragCutW >= dragLengthX) {
            // bottom 方向的变化
            if ((dragLengthY < 0 && _this.cropperH > initDragCutT + _this.cutH) || (dragLengthY > 0)) {
              _this.cutH = initDragCutH - dragLengthY
            }

            // // right 方向的变化
            if ((dragLengthX < 0 && _this.cropperW > initDragCutL + _this.cutW) || (dragLengthX > 0)) {
              _this.cutW = initDragCutW - dragLengthX
            } else {

            }
          } else {

          }
          break
        default:
          break
      }
    },
    upEwm: function (e) {
      var _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
          // console.log(res)
          if (res.tempFiles[0].size > 100000) {
            wx.showToast({
              icon: 'none',
              title: '图片不能超过3MB',
              duration: 2000
            })
            return false
          }
          _this.imageFixed = true
          _this.imageSrc = tempFilePaths.join()
          wx.getImageInfo({
            src: _this.imageSrc,
            success: function success (res) {
              var innerAspectRadio = res.width / res.height
              if (innerAspectRadio === '1') {
                _this.imageFixed = false
                _this.headImg = tempFilePaths.join()
              } else if (innerAspectRadio > 1) {
                _this.cropperW = windowWRPX
                _this.cropperH = windowWRPX / innerAspectRadio
                _this.cropperL = Math.ceil((windowWRPX - windowWRPX) / 2)
                _this.cropperT = Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2)
                _this.cutL = Math.ceil((windowWRPX - windowWRPX + 340) / 2)
                _this.cutT = Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 20)) / 2)
                _this.scaleP = res.width * pixelRatio / windowWRPX
                _this.imageW = res.width * pixelRatio
                _this.imageH = res.height * pixelRatio
              } else {
                _this.cropperW = windowWRPX * innerAspectRadio
                _this.cropperH = windowWRPX
                _this.cropperL = Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2)
                _this.cropperT = Math.ceil((windowWRPX - windowWRPX) / 2)
                _this.cutL = Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 20)) / 2)
                _this.cutT = Math.ceil((windowWRPX - 340) / 2)
                _this.scaleP = res.width * pixelRatio / windowWRPX
                _this.imageW = res.width * pixelRatio
                _this.imageH = res.height * pixelRatio
              }
              _this.isShowImg = true
              wx.hideLoading()
            }
          })
        }
      })
    }
  }
}
</script>
<style scope lang="less">
@import "./index.less";
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
  .lastInfo {
    position: fixed;
    bottom: 120rpx;
    width: calc(100% - 60rpx);
    margin: 0 30rpx;
    .getImageSures {
      //position:fixed;bottom:120rpx;width:90%;left:50%;transform:translate3d(-50%,0,0)
      float: right;
      width: 200rpx;
    }
    .getImageSures2 {
      float: left;
      width: 200rpx;
    }
  }
}
</style>
