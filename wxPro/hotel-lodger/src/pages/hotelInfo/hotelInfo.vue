<template>
  <div class="hotelInfo">
    <!-- 顶部轮播 -->
    <div class="top-swaip"
         @click="imgList">
      <img :src="oneImg"
           alt=""
           class="oneImg">
      <span class="imgNmb">{{imgNmb}}</span>
    </div>
    <!-- 酒店信息 -->
    <div class="hotel-info">
      <p class="info-title">酒店信息</p>
      <p class="info-detail"
         v-if="hotel.info !== null">{{hotel.info}}</p>
    </div>
    <p class="hotel-one1">
      <span class="one-span">酒店名称</span>
      <span class="two-span">{{hotel.name}}</span>
    </p>
    <p class="hotel-one1">
      <span class="one-span">酒店地址</span>
      <span class="two-span">{{hotel.address}}</span>
    </p>
    <p class="hotel-one">
      <span class="one-span">酒店电话</span>
      <span class="two-span">{{hotel.telephone}}</span>
    </p>
    <p class="hotel-one">
      <span class="one-span">备注</span>
      <span class="two-span"
            v-if="hotel.typeName !== null">{{hotel.typeName}}</span>
    </p>
  </div>
</template>
<script>
import { getAllInfo, getAllInfoimg, getOneInfoimg } from '../../api/hotelDetail'
import { getClientId, getToken } from '@/utils/user'
export default {
  name: 'hotelInfo',
  data () {
    return {
      hotel: {},
      oneImg: '',
      imgNmb: '',
      hotelId: ''
    }
  },
  onShow () {
    this.hotelId = this.$root.$mp.query.id
    // this.hotelId = 11
    this.getHotelInfo()
    this.getImg()
  },
  methods: {
    imgList () {
      wx.navigateTo({
        url: `../imgList/main?id=${this.hotelId}`
      })
    },
    async getHotelInfo () {
      let param = this.hotelId
      const result = await getAllInfo(param)
      this.hotel = result
    },
    async getImg () {
      let param = this.hotelId
      const result = await getAllInfoimg(param)
      this.imgNmb = result.length
      this.oneImg = getOneInfoimg({ id: result[0].id, clientid: getClientId(), token: getToken() })
    }
  }
}
</script>
<style lang="scss">
.hotelInfo {
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
  }
  .hotel-info {
    width: 100%;
    box-sizing: border-box;
    padding: 13rpx 20rpx 40rpx 20rpx;
    border-bottom: 2rpx solid #eeeeee;
    .info-title {
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0.26px;
    }
    .info-detail {
      margin-top: 14rpx;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
      word-wrap: break-word;
    }
  }
  .hotel-one {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 34rpx 20rpx 28rpx 20rpx;
    border-bottom: 2rpx solid #eeeeee;
    box-sizing: border-box;
    .one-span {
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0.26px;
      white-space: nowrap;
      padding-right: 10rpx;
    }
    .two-span {
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
      text-align: right;
    }
  }
  .hotel-one1 {
    display: flex;
    justify-content: space-between;
    padding: 34rpx 20rpx 28rpx 20rpx;
    border-bottom: 2rpx solid #eeeeee;
    box-sizing: border-box;
    .one-span {
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0.26px;
      white-space: nowrap;
      padding-right: 10rpx;
    }
    .two-span {
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
      text-align: right;
    }
  }
}
</style>