<template>
  <div class="collect">
    <div v-if="collectList=== null"
         class="hotellistno"
         style="text-align:center;font-family: PingFangSC-Regular;font-size: 24rpx;color: #666666;margin-top:200rpx">
      <img src="/static/images/collectlistno.png"
           alt=""
           style="width:320rpx;height:320rpx;">
      <p>暂无数据</p>
    </div>
    <div v-else
         class="hotelList-list">
      <view class="hotelList-li clearfix"
            v-for="(item,index) in collectList"
            :key="index">
        <div class="collect-left"
             :data-index="index"
             @touchstart="touchS"
             @touchmove="touchM"
             @touchend="touchE"
             :style="{'left':'-'+postLeft[index]+'rpx'}">
          <img :src="item.imgUrl"
               alt=""
               class="hotelList-img"
               @error="errHandle(index)">
          <div class="hotelList-list-right">
            <div class="hotelList-title ellipsis">{{item.name}}</div>
            <div class="hotelList-locas clearfix">
              <span class="hotelList-span1">{{item.address}}</span>
              <!-- <span class="hotelList-span2">300米</span> -->
            </div>
            <div class="hotelList-stars clearfix"
                 v-if="item.grade==1">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
            </div>
            <div class="hotelList-stars clearfix"
                 v-if="item.grade==2">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
            </div>
            <div class="hotelList-stars clearfix"
                 v-if="item.grade==3">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
            </div>
            <div class="hotelList-stars clearfix"
                 v-if="item.grade==4">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape2.png"
                   alt="">
            </div>
            <div class="hotelList-stars clearfix"
                 v-if="item.grade==5">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
              <img src="/static/images/shape.png"
                   alt="">
            </div>
            <div class="hotelList-last clearfix">
              <p class="quan"
                 v-if="item.coupon">消费券</p>
              <p>{{item.typeName}}</p>
            </div>
          </div>
        </div>
        <div class="collect-right"
             @click="delectColl(item.hotelId)">删除</div>
      </view>
    </div>
  </div>
</template>

<script>
import { readCollections, readRoomImage, delectCollect } from '@/api/hotelList'
import { getToken, getClientId, getUserNum } from '@/utils/user'
export default {
  data () {
    return {
      ids: 0,
      activityBol: true,
      Idactivity: 0,
      collectList: [],
      postLeft: []
    }
  },
  onShow () {
    this.collectList = []
    this.postLeft = []
    this.init()
  },
  methods: {
    init () {
      let _this = this
      readCollections({ userNum: getUserNum(), token: getToken() }).then(res => {
        _this.postLeft = []
        if (res === 400) {
          _this.collectList = []
          return false
        } else if (res === null) {
          _this.collectList = null
          return false
        }
        res && res.forEach(element => {
          _this.postLeft.push(0)
          element.imgUrl = readRoomImage({ hotelid: element.hotelId, token: getToken() })
        })
        _this.collectList = res && res.length > 0 ? res : []
      })
    },
    touchS (e) {
      this.startX = e.pageX
      this.mpIndex = e.mp.currentTarget.dataset.index
    },
    // 图片加载失败处理
    errHandle (imgDiv) {
      this.collectList[imgDiv].imgUrl = '/static/images/hotellistDefo.png'
    },
    touchM (e) {
      // this.moveX = e.pageX
      // let moveW = this.startX - this.moveX
      // let _this = this
      // if (moveW > 20 && moveW < 200) {
      //   _this.postLeft[_this.mpIndex] = moveW
      //   this.$forceUpdate()
      // }
    },
    touchE (e) {
      this.endX = e.mp.changedTouches[0].pageX
      let moveW = this.startX - this.endX
      let _this = this
      if (moveW > 20) {
        _this.postLeft[_this.mpIndex] = '140'
        this.$forceUpdate()
      } else if (moveW < -20) {
        _this.postLeft[_this.mpIndex] = '0'
        this.$forceUpdate()
      } else {
        wx.navigateTo({
          url: '../hotelDetail/main?id=' + _this.collectList[_this.mpIndex].hotelId
        })
      }
    },
    delectColl (id) {
      let _this = this
      delectCollect({
        hotelid: id,
        userNum: getUserNum(),
        token: getToken()
      }).then(res => {
        _this.init()
      })
    }
  }
}
</script>
<style scope lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
.hotelList-list {
  background-color: #fff;
  .collect-left {
    width: 750rpx;
    overflow: hidden;
    padding: 30rpx;
    height: 282rpx;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    //left:0;
    z-index: 100;
    transition: left 0.2s;
    border-bottom: 2rpx solid #eee;
    background-color: #fff;
  }
  .collect-right {
    background-color: #fdad02;
    color: #fff;
    width: 140rpx;
    height: 282rpx;
    position: absolute;
    top: -2rpx;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hotelList-li {
    position: relative;
    width: 100%;
    height: 282rpx;
    .hotelList-img {
      float: left;
      width: 200rpx;
      height: 220rpx;
    }
    .hotelList-list-right {
      float: left;
      width: 440rpx;
      margin-left: 32rpx;
      .hotelList-title {
        font-family: PingFangSC-Medium;
        font-size: 34rpx;
        color: #333333;
      }
      .hotelList-locas {
        font-family: PingFangSC-Regular;
        font-size: 24rpx;
        color: #999999;
        margin-top: 12rpx;
        .hotelList-span1 {
          float: left;
        }
        .hotelList-span2 {
          float: right;
        }
      }
      .hotelList-stars {
        margin-top: 20rpx;
        image {
          float: left;
          width: 32rpx;
          height: 36rpx;
          margin-right: 20rpx;
        }
      }
      .hotelList-last {
        margin-top: 20rpx;
        p {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          margin-right: 24rpx;
          float: left;
          padding: 4rpx 8rpx;
        }
        .quan {
          color: #e8541e;
          background-color: #fcebe5;
        }
      }
    }
  }
}
</style>
