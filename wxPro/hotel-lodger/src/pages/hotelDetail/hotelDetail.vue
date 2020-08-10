<template>
  <div class="hotelDetail">
    <!-- 顶部轮播 -->
    <div class="top-swaip">
      <img :src="oneImg"
           alt=""
           class="oneImg"
           v-if="!imgbol">
      <img src="../../../static/images/noimg.png"
           alt=""
           v-else-if="imgbol"
           class="oneImg">
      <span class="imgNmb"
            @click="imgList">{{imgNmb}}</span>
      <img src="../../../static/images/Shap.png"
           alt=""
           class="collect"
           @click="getShow"
           v-if="!hotel.like">
      <img src="../../../static/images/33.png"
           alt=""
           class="collect"
           @click="getShow"
           v-else-if="hotel.like">
    </div>
    <!-- 酒店详情 -->
    <div class="infoDetail">
      <!-- 酒店标签 -->
      <p class="info-tag">
        <span class="tag-one">赠消费卷</span>
      </p>
      <!-- 酒店 -->
      <p class="hotel-name"
         @click="detailInfo()">
        <span class="name-span">{{hotel.name}}</span>
        <img src="../../../static/images/rightNext.png"
             alt=""
             class="hotel-state">
      </p>
      <!-- 酒店评级 -->
      <div class="hotel-star">
        <p class="star-p">
          <img src="../../../static/images/shape.png"
               alt=""
               class="star-img"
               v-for="(item, index) in hotel.grade">
          <img src="../../../static/images/jhu.png"
               alt=""
               class="star-img"
               v-for="(item, index) in hgh">
        </p>
        <img src="../../../static/images/wen.png"
             alt=""
             class="wen-img"
             @click="toFun2()">
      </div>
      <!-- 导航 -->
      <div class="hotel-navigation">
        <p class="adress-p">
          <img src="../../../static/images/dw.png"
               alt=""
               class="img-span">
          <span class="adress-span">{{hotel.address}}</span>
        </p>
        <p class="nav-btn"
           @click="navigationFun()">
          <img src="../../../static/images/hgh.png"
               alt=""
               class="img-btn">
          <span class="title-btn">导航</span>
        </p>
      </div>
      <!-- 优惠卷标示 -->
      <div class="preferential-title">
        <img src="../../../static/images/tanbgi.png"
             alt=""
             class="title-img">
      </div>
    </div>
    <!-- 优惠卷 -->
    <div class="preferential">
      <div class="preferential-one"
           v-for="(item, index) in couponArr"
           :key="index">
        <div class="one-left">
          <div class="img-left">
            <img :src='item.src'
                 alt=""
                 class="img-all">
          </div>
          <div class="p-left">
            <p class="name-p">{{item.couponName}}
              <span class="detail-p">({{item.equalInfo}})</span>
            </p>
            <p class="limit-p">{{item.activeTimeInfo}}</p>
          </div>
        </div>
        <div class="one-right">
          <button class="btn-right"
                  @click="convertFun(item)"
                  v-if="credit > item.equalNum">兑换</button>
          <button class="btn-right1"
                  v-else>兑换</button>
          <!-- <span class="btn-right"
                @click="convertFun(item)">兑换</span> -->
        </div>
      </div>
      <img src="../../../static/images/noshow.png"
           alt=""
           class="noShowimg"
           v-if="noBol">
    </div>
  </div>
</template>
<script>
import { getInfo, getAllInfoimg, getOneInfoimg, postCollect, cancelCollect, queryCoupon, getExchange, getOneInfoimg1 } from '../../api/hotelDetail'
import { getEarnings } from '../../api/sign'
import { getClientId, getToken, getUserNum } from '@/utils/user'
export default {
  name: 'hotelDetail',
  data () {
    return {
      hotel: {},
      hgh: 0,
      oneImg: '',
      imgbol: false,
      imgNmb: '',
      hotelId: '',
      couponArr: [],
      noBol: false,
      credit: ''
    }
  },
  onShow () {
    this.oneImg = ''
    this.hotel = {}
    this.couponArr = []
    this.hotelId = this.$root.$mp.query.id
    this.getHotelinfo()
    this.getImg()
    this.getTanearn()
  },
  methods: {
    toFun2 () {
      wx.navigateTo({
        url: `../explain/main?id=3`
      })
    },
    imgList () {
      wx.navigateTo({
        url: `../imgList/main?id=${this.hotelId}`
      })
    },
    // 获取酒店信息
    async getHotelinfo () {
      wx.showLoading({
        title: '加载中...'
      })
      let param = {
        userNum: getUserNum(),
        hotelId: this.hotelId
      }
      const result = await getInfo(param)
      this.hotel = result
      this.hgh = 5 - this.hotel.grade
      this.getHotelconpon()
    },
    // 查询酒店可用优惠劵列表
    async getHotelconpon () {
      this.noBol = false
      let param = {
        hotelId: this.hotelId,
        companyCode: this.hotel.companyCode
      }
      const result = await queryCoupon(param)
      this.couponArr = result
      if (this.couponArr === null) {
        this.noBol = true
      } else {
        this.couponArr.forEach(item => {
          if (item.goodsCategoryIconCode) {
            item.src = getOneInfoimg1({ id: item.goodsCategoryIconCode, clientid: getClientId(), token: getToken() })
          } else {
            item.src = '../../../static/images/moren2.png'
          }
        })
        this.noBol = false
      }
      wx.hideLoading()
    },
    // 查看酒店图片
    async getImg () {
      let param = this.hotelId
      const result = await getAllInfoimg(param)
      this.imgNmb = result.length
      if (this.imgNmb === 0) {
        this.imgbol = true
      } else {
        this.imgbol = false
        this.oneImg = getOneInfoimg({ id: result[0].id, clientid: getClientId(), token: getToken() })
      }
    },
    convertFun (item) {
      let str = '当前有' + this.credit + '碳积分'
      if (this.credit < item.equalNum) {
        wx.showModal({
          title: '提示',
          content: '当前用户碳积分不足',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        let that = this
        wx.showModal({
          title: str,
          content: '是否兑换',
          success (res) {
            if (res.confirm) {
              that.getDui(item)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },
    // 兑换卷
    async getDui (item) {
      let param = {
        hotelId: this.hotelId,
        userNum: getUserNum(),
        tpmNum: item.tpmNum,
        companyCode: this.hotel.companyCode
      }
      const result = await getExchange(param)
      if (result === 'OK') {
        this.getTanearn()
        this.getHotelconpon()
        wx.showModal({
          title: '兑换成功',
          content: '是否跳转至优惠劵列表',
          success (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: `../concome/main`
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.showModal({
          title: '兑换失败',
          content: result,
          success (res) {
            if (res.confirm) {
              console.log('用户点击取消')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      this.getHotelconpon()
      setTimeout(() => {
        wx.hideLoading()
      }, 300)
    },
    // 获取碳积分
    async getTanearn () {
      let param = {
        userNum: getUserNum()
      }
      const result = await getEarnings(param)
      this.credit = result.credit
    },
    // 导航
    navigationFun () {
      let objadress = this.bMapTransQQMap(this.hotel.bd09Lon, this.hotel.bd09Lat)
      wx.openLocation({
        latitude: objadress.lat,
        longitude: objadress.lng,
        scale: 28
      })
    },
    // 腾讯经纬度转化未百度经纬度
    bMapTransQQMap (lng, lat) {
      let xpi = 3.14159265358979324 * 3000.0 / 180.0
      let x = lng - 0.0065
      let y = lat - 0.006
      let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xpi)
      let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xpi)
      let lngs = z * Math.cos(theta)
      let lats = z * Math.sin(theta)
      return {
        lng: lngs,
        lat: lats
      }
    },
    detailInfo () {
      wx.navigateTo({
        url: `../hotelInfo/main?id=${this.hotelId}`
      })
    },
    // 点击收藏图标
    getShow () {
      if (!this.hotel.like) {
        this.postShowcang()
      } else {
        this.cancelShowcang()
      }
    },
    // 收藏
    async postShowcang () {
      let param = {
        userNum: getUserNum(),
        hotelId: this.hotelId
      }
      const result = await postCollect(param)
      this.getHotelinfo()
    },
    // 取消收藏
    async cancelShowcang () {
      let param = {
        userNum: getUserNum(),
        hotelId: this.hotelId
      }
      const result = await cancelCollect(param)
      this.getHotelinfo()
    }
  }
}
</script>
<style lang="scss">
.hotelDetail {
  width: 100%;
  height: 100%;
  // 顶部轮播
  .top-swaip {
    box-sizing: border-box;
    height: 320rpx;
    position: relative;
    .oneImg {
      height: 100%;
      width: 100%;
    }
    .imgNmb {
      position: absolute;
      display: inline-block;
      width: 80rpx;
      padding: 5rpx 0;
      border-radius: 15rpx;
      background-color: rgb(58, 74, 78);
      color: white;
      bottom: 20rpx;
      right: 50rpx;
      font-size: 24rpx;
      text-align: center;
    }
    .collect {
      position: absolute;
      height: 64rpx;
      width: 64rpx;
      top: 24rpx;
      right: 30rpx;
    }
  }
  // 酒店详情
  .infoDetail {
    margin: 0 auto;
    width: calc(100% - 50rpx);
    padding: 10rpx 20rpx 20rpx 20rpx;
    height: 400rpx;
    border-bottom: 4rpx solid #f7f5f5;
    // 酒店标签
    .info-tag {
      .tag-one {
        box-sizing: border-box;
        background: rgb(250, 238, 234);
        border-radius: 1px;
        padding: 5rpx;
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 24rpx;
        color: rgb(222, 123, 87);
        letter-spacing: 0;
      }
    }
    // 酒店
    .hotel-name {
      margin: 12rpx 0 16rpx 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48rpx;
      .name-span {
        font-family: PingFangSC-Medium;
        font-size: 34rpx;
        color: #333333;
        letter-spacing: 0;
      }
      .hotel-state {
        width: 40rpx;
        height: 40rpx;
        margin-right: 12rpx;
      }
    }
    // 酒店评级
    .hotel-star {
      height: 40rpx;
      margin-bottom: 24rpx;
      display: flex;
      align-items: center;
      .star-p {
        width: 260rpx;
        height: 40rpx;
        .star-img {
          width: 32rpx;
          height: 36rpx;
          margin-right: 20rpx;
        }
      }
      .wen-img {
        width: 36rpx;
        height: 36rpx;
        margin-left: 38rpx;
      }
    }
    // 导航
    .hotel-navigation {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .adress-p {
        display: flex;
        align-items: center;
        .img-span {
          width: 28rpx;
          height: 28rpx;
        }
        .adress-span {
          display: inline-block;
          width: 500rpx;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          margin-left: 12rpx;
        }
      }
      .nav-btn {
        display: flex;
        align-items: center;
        background: #19d100;
        border-radius: 66rpx;
        width: 136rpx;
        height: 60rpx;
        margin: 0 12rpx 0 0;
        .img-btn {
          width: 30rpx;
          height: 30rpx;
          box-flex: 1;
          margin-left: 15rpx;
        }
        .title-btn {
          font-family: PingFangSC-Regular;
          font-size: 28rpx;
          color: #ffffff;
          letter-spacing: 0;
          white-space: nowrap;
          margin-left: 8rpx;
        }
      }
    }
    // 优惠卷标示
    .preferential-title {
      width: 100%;
      height: 106rpx;
      margin: 32rpx auto 0;
      .title-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // 优惠卷
  .preferential {
    box-sizing: border-box;
    height: calc(100vh - 750rpx);
    overflow: auto;
    text-align: center;
    .noShowimg {
      width: 200rpx;
      height: 200rpx;
    }
    .preferential-one {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16rpx 23rpx 26rpx 20rpx;
      height: 130rpx;
      border-bottom: 2rpx solid #f7f5f5;
      .one-left {
        display: flex;
        .img-left {
          width: 88rpx;
          height: 88rpx;
          margin-right: 16rpx;
          .img-all {
            width: 100%;
            height: 100%;
          }
        }
        .p-left {
          .name-p {
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #333333;
            letter-spacing: 0;
            margin-bottom: 16rpx;
            .detail-p {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #919191;
              letter-spacing: 0;
            }
          }
          .limit-p {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #919191;
            letter-spacing: 0;
            text-align: left;
          }
        }
      }
      .one-right {
        display: flex;
        align-items: center;
        justify-content: center;
        .btn-right {
          width: 132rpx;
          height: 56rpx;
          line-height: 56rpx;
          background: #ffffff;
          border: 1px solid #fdad02;
          border-radius: 66rpx;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #fdad02;
          letter-spacing: 0;
        }
        .btn-right1 {
          width: 132rpx;
          height: 56rpx;
          line-height: 56rpx;
          background: #ffffff;
          border: 1px solid #919191;
          border-radius: 66rpx;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #919191;
          letter-spacing: 0;
        }
      }
    }
  }
}
</style>