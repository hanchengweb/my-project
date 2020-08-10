<template>
  <div id="canvas-container">
    <canvas canvas-id='myCanvas'
            style="width:100%;height:1250rpx;"
            class="canvasP"></canvas>
    <cover-view @click="shareFun()"
                class="saveBtn">
      <cover-view class="saveBtn-span">保存到相册</cover-view>
    </cover-view>
    <!-- <div class="saveDiv">
      <button class="saveBtn"
              @click="shareFun()">保存到相册</button>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      info: {},
      src: '/static/images/dianzan.png',
      src1: '/static/images/dianzanr.png',
      src2: '/static/images/sharePng.png',
      heardUrl: '',
      type: ''
    }
  },
  onShow () {
    this.info = wx.getStorageSync('data')
    this.type = wx.getStorageSync('type')
    this.getAvaterInfo()
  },
  methods: {
    // 数字转文字
    convertToChinaNum (num) {
      // eslint-disable-next-line no-array-constructor
      var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九')
      // eslint-disable-next-line no-array-constructor
      var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿')// 可继续追加更高位转换值
      if (!num || isNaN(num)) {
        return '零'
      }
      var english = num.toString().split('')
      var result = ''
      for (var i = 0; i < english.length; i++) {
        var desi = english.length - 1 - i// 倒序排列设值
        result = arr2[i] + result
        var arr1index = english[desi]
        result = arr1[arr1index] + result
      }
      // 将【零千、零百】换成【零】 【十零】换成【十】
      result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
      // 合并中间多个零为一个零
      result = result.replace(/零+/g, '零')
      // 将【零亿】换成【亿】【零万】换成【万】
      result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
      // 将【亿万】换成【亿】
      result = result.replace(/亿万/g, '亿')
      // 移除末尾的零
      result = result.replace(/零+$/, '')
      // 将【零一十】换成【零十】
      // result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
      // 将【一十】换成【十】
      result = result.replace(/^一十/g, '十')
      return result
    },
    beginDraw () {
      let avaterSrc
      let cardInfo
      if (this.info.self) {
        avaterSrc = this.heardUrl
        cardInfo = this.info.self
      }
      this.sharePosteCanvas(avaterSrc, cardInfo)
    },
    sharePosteCanvas (avaterSrc, cardInfo) {
      var that = this
      const ctx = wx.createCanvasContext('myCanvas') // 创建画布
      var width = ''
      wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function (rect) {
        var height = rect.height * 0.5
        var right = rect.right
        width = rect.width
        var left = rect.left + rect.width * 0.05

        // 绘制背景图
        ctx.drawImage(that.src2, 0, 0, width, rect.height)
        // 绘制标题
        if (that.type === 'carbon') {
          let width1 = width / 2 - 48
          ctx.setFontSize(16)
          ctx.setFillStyle('#ffffff')
          ctx.fillText('碳积分排行榜', width1, 30) // y 38
        } else if (that.type === 'employ') {
          let width2 = width / 2 - 52
          ctx.setFontSize(16)
          ctx.setFillStyle('#ffffff')
          ctx.fillText('平均能耗排行榜', width2, 30) // y 38
        }
        // 绘制本人头像
        if (avaterSrc) {
          let widthimg = width / 2 - 20
          ctx.drawImage(avaterSrc, widthimg, 45, 40, 40) // y 85
          ctx.setFillStyle('#fff')
          ctx.setTextAlign('left')
        }
        // 绘制我
        let widthMain = width / 2 - 8
        ctx.setFontSize(14)
        ctx.setFillStyle('#ffffff')
        ctx.fillText('我', widthMain, 105) // y 112

        // 绘制排名
        let strpai = `第${that.convertToChinaNum(cardInfo.seq)}名`
        let widthPai = width / 2 - strpai.length / 2 * 14
        ctx.setFontSize(14)
        ctx.setFillStyle('#ffffff')
        ctx.fillText(strpai, widthPai, 125) // y 132

        // 绘制积分数
        if (that.type === 'carbon') {
          let widthNum = width / 4 - String(cardInfo.credit).length / 2 * 7
          ctx.setFontSize(14)
          ctx.setFillStyle('#ffffff')
          ctx.fillText(cardInfo.credit, widthNum, 105) // y 112
        } else if (that.type === 'employ') {
          let widthNum = width / 4 - String(cardInfo.avgEnergyConsumer).length / 2 * 7
          ctx.setFontSize(14)
          ctx.setFillStyle('#ffffff')
          ctx.fillText(cardInfo.avgEnergyConsumer, widthNum, 105) // y 112
        }

        // 绘制碳积分文字
        if (that.type === 'carbon') {
          let widthTan = width / 4 - 21
          ctx.setFontSize(14)
          ctx.setFillStyle('#ffffff')
          ctx.fillText('碳积分', widthTan, 125) // y 112
        } else if (that.type === 'employ') {
          let widthTan = width / 4 - 28
          ctx.setFontSize(14)
          ctx.setFillStyle('#ffffff')
          ctx.fillText('平均能耗', widthTan, 125) // y 112
        }

        // 绘制点赞数
        if (cardInfo.like || cardInfo.like === 0) {
          let widthNum = width / 4 * 3 - String(cardInfo.like).length / 2 * 7
          ctx.setFontSize(14)
          ctx.setFillStyle('#ffffff')
          ctx.fillText(cardInfo.like, widthNum, 105) // y 112
        }
        // 绘制点赞图标
        if (that.src) {
          let widthNum = width / 4 * 3 - 5
          if (cardInfo.tag) {
            ctx.drawImage(that.src1, widthNum, 115, 15, 15)
          } else {
            ctx.drawImage(that.src1, widthNum, 115, 15, 15)
          }
        }

        // 绘制白色背景板
        let widthBgc = rect.width - 32
        ctx.setFillStyle('#fff')
        ctx.fillRect(16, 145, widthBgc, 400)

        // 他人排行
        that.drawOther(ctx)
      }).exec()

      setTimeout(function () {
        ctx.draw()
        wx.hideLoading()
      }, 1000)
    },
    // 绘制他人排行
    drawOther (ctx) {
      if (this.info.rank.length) {
        let length = this.info.rank.length
        if (length >= 6) {
          length = 6
        }
        for (let i = 0; i < length; i++) {
          let height
          if (i === 0) {
            height = 180
            this.drawFun(ctx, this.info.rank[0], height)
          } else {
            height = 180 + 65 * i
            this.drawFun(ctx, this.info.rank[i], height)
          }
        }
      } else {
        console.log('没有他人排行')
      }
    },
    // 绘制
    drawFun (ctx, data, height) {
      let width
      let that = this
      let heardImg
      if (data.headimgurl) {
        wx.downloadFile({
          url: data.headimgurl, // 头像图片路径
          success: function (res) {
            wx.hideLoading()
            if (res.statusCode === 200) {
              heardImg = res.tempFilePath
              wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function (rect) {
                width = rect.width
                // 昵称
                if (data.seq) {
                  let width
                  if (data.seq === 1) {
                    width = 20
                    ctx.drawImage('/static/images/onem.png', width, height - 15, 25, 25)
                    ctx.setFillStyle('#fff')
                    ctx.setTextAlign('left')
                  } else if (data.seq === 2) {
                    width = 20
                    ctx.drawImage('/static/images/twom.png', width, height - 15, 25, 25)
                    ctx.setFillStyle('#fff')
                    ctx.setTextAlign('left')
                  } else if (data.seq === 3) {
                    width = 20
                    ctx.drawImage('/static/images/threem.png', width, height - 15, 25, 25)
                    ctx.setFillStyle('#fff')
                    ctx.setTextAlign('left')
                  } else {
                    width = 32
                    ctx.setFontSize(14)
                    ctx.setFillStyle('#333333')
                    ctx.fillText(data.seq, width, height)
                  }
                }
                // 头像为正方形
                if (heardImg) {
                  let avaterSrchei
                  avaterSrchei = height - 25
                  ctx.drawImage(heardImg, 55, avaterSrchei, 40, 40)
                  ctx.setFillStyle('#fff')
                  ctx.setTextAlign('left')
                }
                // 昵称
                if (data.nickName) {
                  ctx.setFontSize(14)
                  ctx.setFillStyle('#333333')
                  ctx.fillText(data.nickName, 110, height)
                }
                // 用电
                if (data.credit || data.credit === 0) {
                  let width = rect.width / 3 * 2 - String(data.credit).length / 2 * 7
                  ctx.setFontSize(14)
                  ctx.setFillStyle('#333333')
                  ctx.fillText(data.credit, width, height)
                }

                // 点赞
                if (data.like || data.like === 0) {
                  let width = rect.width - 40
                  let like
                  like = height - 5
                  ctx.setFontSize(14)
                  ctx.setFillStyle('#333333')
                  ctx.fillText(data.like, width, like)
                }

                // 点赞图标
                if (that.src) {
                  let width = rect.width - 45
                  let src
                  src = height - 1
                  if (data.tag) {
                    ctx.drawImage(that.src1, width, src, 15, 15)
                  } else {
                    ctx.drawImage(that.src, width, src, 15, 15)
                  }
                }

                // 边框
                ctx.setFillStyle('#f5f5f5')
                ctx.fillRect(16, height + 25, rect.width - 32, 1)
              }).exec()
            } else {
              wx.showToast({
                title: '头像下载失败！',
                icon: 'none',
                duration: 2000,
                success: function () {
                }
              })
            }
          }
        })
      }
    },
    // 下载图片
    getAvaterInfo: function () {
      wx.showLoading({
        title: '生成中...',
        mask: true
      })
      var that = this
      wx.downloadFile({
        url: that.info.self.headimgurl, // 头像图片路径
        success: function (res) {
          wx.hideLoading()
          if (res.statusCode === 200) {
            that.heardUrl = res.tempFilePath
            that.beginDraw()
          } else {
            wx.showToast({
              title: '头像下载失败！',
              icon: 'none',
              duration: 2000,
              success: function () {
              }
            })
          }
        }
      })
    },
    // 保存图片
    shareFun () {
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success () {
          // 授权成功
          wx.showLoading({
            title: '正在保存',
            mask: true
          })
          var that = this
          setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: 'myCanvas',
              success: function (res) {
                wx.hideLoading()
                var tempFilePath = res.tempFilePath
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePath,
                  success (res) {
                    // eslint-disable-next-line no-undef
                    // utils.aiCardActionRecord(19)
                    wx.showModal({
                      content: '图片已保存到相册，赶紧晒一下吧~',
                      showCancel: false,
                      confirmText: '好的',
                      confirmColor: '#333',
                      success: function (res) {
                      },
                      fail: function (res) { }
                    })
                  },
                  fail: function (res) {
                    wx.showToast({
                      title: res.errMsg,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
              }
            })
          }, 1000)
        },
        fail: function () {
          // 授权失败
          wx.showModal({
            title: '提示',
            content: '您没有访问相册的权限,点击授权重新获取权限。',
            confirmText: '授权',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    console.log('授权成功')
                  }
                })
              }
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
#canvas-container {
  .saveBtn {
    width: 92%;
    height: 90rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #4596e0;
    position: fixed;
    bottom: 20rpx;
    left: 4%;
    text-align: center;
    background: #fff;
    border: 1px solid rgb(233, 230, 230);
    border-radius: 10rpx;
    .saveBtn-span {
      margin-top: 8rpx;
    }
  }
}
</style>