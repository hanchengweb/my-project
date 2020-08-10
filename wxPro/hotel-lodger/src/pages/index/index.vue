<template>
  <div class="content">
    <swiper indicator-dots="true"
            autoplay="true"
            interval="2000"
            duration="500"
            indicator-color="#fff"
            indicator-active-color="#e2e2e2"
            class="swiperh">
      <block v-for="(item,index) in imgUrls"
             :key="index">
        <a>
          <swiper-item>
            <image :src="item.src"
                   class="slide-image"
                   mode="scaleToFill" />
          </swiper-item>
        </a>
      </block>
    </swiper>
    <div class="newList">
      <div class="newOne"
           v-for="(item, index) in newLists"
           :key="index"
           @click="toDetail(item.id)">
        <div class="new-title">{{item.name}}</div>
        <img :src="item.src"
             alt=""
             class="new-img">
      </div>
      <!-- <div class="newOne">
        <div class="new-title">自然不可改良、生活可以选择选择绿色生活、健康适度消费</div>
        <img src="../../../static/images/moren.png"
             alt=""
             class="new-img">
      </div>
      <div class="newOne">
        <div class="new-title">自然不可改良、生活可以选择选择绿色生活、健康适度消费</div>
        <img src="../../../static/images/moren.png"
             alt=""
             class="new-img">
      </div> -->
    </div>
  </div>
</template>

<script>
import { readActivity, activityImg } from '@/api/user'
import { imgList, readImg, newList, readnewImg } from '@/api/index'
import { setUserInfo, setToken, getUserInfo, getClientId, getToken } from '@/utils/user'
export default {
  data () {
    return {
      imgUrls: [],
      group: [],
      newLists: []
    }
  },
  methods: {
    // 获取轮播图图片列表
    async getLunlist () {
      const result = await imgList()
      result.forEach((item) => {
        item.src = readImg({ id: item.id, clientid: getClientId(), token: getToken() })
      })
      this.imgUrls = result
    },
    // 获取新闻列表
    async getNewlist () {
      this.newLists = []
      const result = await newList()
      result.content.forEach((item) => {
        item.src = readnewImg({ id: item.id, clientid: getClientId(), token: getToken() })
      })
      this.newLists = result.content
    },
    // 跳转详情
    toDetail (id) {
      wx.navigateTo({
        url: `../activity/main?id=${id}`
      })
    },
    activityFun (item) {
      if (item.activityImgCode !== '3cc9420a4872477790a4d3097a50595a' && item.activityImgCode !== 'd8f04651d4c047a79579b8f45a9091db') {
        wx.navigateTo({
          url: `../activity/main?id=${item.id}&activityid=${item.activityid}`
        })
      }
    },
    lazyload () {
      let _this = this
      setTimeout(function () {
        wx.createSelectorQuery().selectAll('.imglist').boundingClientRect((ret) => {
          ret.forEach((item, index) => {
            if (item.top <= _this.height) {
              _this.$set(_this.group, index, true)
            }
          })
        }).exec()
      }, 0)
    }
  },

  created () {
    // this.getLunlist()
  },
  onLoad () {

  },
  mounted () {

  },
  onShow () {
    this.getLunlist()
    this.getNewlist()
    // this.init()
    this.height = wx.getSystemInfoSync().windowHeight
  },
  onPageScroll () { // 滚动事件 this.showImg()
    this.lazyload()
  },
  onShareAppMessage: function (res) {
    var that = this
    return {
      title: '邀您加入E度电',
      path: '/pages/index/main',
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  }
}
</script>

<style scoped lang="less">
.content {
  swiper {
    height: 418rpx;
    width: 100%;
    image {
      width: 100%;
      //height: 418rpx !important;
    }
  }
  .newList {
    .newOne {
      // border: 1px solid red;
      margin-top: 30rpx;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 134rpx;
      .new-title {
        width: 510rpx;
        min-height: 100rpx;
        margin-right: 24rpx;
        font-family: PingFangSC-Medium;
        font-size: 17px;
        color: #333333;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 36rpx;
      }
      .new-img {
        width: 128rpx;
        height: 128rpx;
        margin-right: 48rpx;
      }
    }
  }
  // .index-content {
  //   padding: 0 12rpx;
  // }
  // .imglist {
  //   width: 100%;
  //   height: 160rpx;
  //   float: left;
  //   transition: opacity 1s linear 0.01s;
  //   opacity: 0;
  // }
  // .loaded {
  //   opacity: 1;
  // }
  // .indexbar {
  //   .indexbar-item {
  //     width: 50%;
  //     height: 162rpx;
  //     padding-left: 20rpx;
  //     box-sizing: border-box;
  //     image {
  //       width: 120rpx;
  //       height: 120rpx;
  //       margin-top: 15rpx;
  //     }
  //   }
  // }
  // .indexbar-item-text {
  //   font-family: PingFangSC-Medium;
  //   font-size: 16px;
  //   color: #333333;
  //   padding-top: 20rpx;
  //   .indexbar-itemp2 {
  //     font-family: PingFangSC-Regular;
  //     font-size: 12px;
  //     padding-top: 20rpx;
  //     color: #919191;
  //   }
  // }
}
</style>
