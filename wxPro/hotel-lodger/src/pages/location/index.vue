<template>
  <div class="content">
    <!-- <view class="section"> 
      <input placeholder="输入关键字" auto-focus type="text" @input="bindKeyInput"/> 
    </view> 
    <view class="sug_info"> 
      <text>{{sugData}}</text> 
    </view> -->

    <!-- <view class="map_container"> 
      <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" show-location="true" :markers="markers" @markertap="makertap"></map> 
    </view>  -->
    <!-- <view class="rgc_info"> 
      <text>{{rgcData.address}}</text> 
      <text>{{rgcData.desc}}</text> 
      <text>{{rgcData.business}}</text> 
    </view> -->
    <!-- <view class="rgc_info"> 
      <text>经度：{{longitude}}</text> 
      <text>纬度：{{latitude}}</text> 
    </view> -->

  </div>
</template>

<script>
// import BMapWX from '@/utils/bmap-wx.js'
import QQMapWX from '@/utils/qqmap-wx-jssdk.js'
var wxMarkerData = []
export default {
  data () {
    return {
      markers: [],
      latitude: '',
      longitude: '',
      rgcData: {},
      sugData: ''
    }
  },
  onShow () {
    var demo = new QQMapWX({
      key: '3YABZ-HSILI-B6GGF-5GVU6-5YGB3-YUFPJ'
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true, // ⾼精度定位
      // 定位成功，更新定位结果
      success: function (res) {
        // demo.reverseGeocoder({
        //   location: {
        //     latitude: res.latitude,
        //     longitude: res.longitude
        //   },
        //   success: function (res) {
        //     console.log(res)
        //     // that.setData({
        //     //   adress: res.result.address_component.district,
        //     //   adress1: res.result.address_component.street
        //     // })
        //   }
        // })
        var latitude = res.latitude
        var longitude = res.longitude
        wx.chooseLocation({
          latitude: latitude,
          longitude: longitude,
          success: function (res) {
            console.log(res)
          }
        })
      },
      // 定位失败回调
      fail: function () {
        wx.showToast({
          title: '定位失败',
          icon: 'none'
        })
      },
      complete: function () {
        // 隐藏定位中信息进度
        wx.hideLoading()
      }
    })
    // var that = this
    // // 新建百度地图对象
    // var BMap = new BMapWX({
    //   ak: 'sAtn0CLBVccMQmuqbtuqyHGXSSB9SaG6'
    // })
    // var fail = function (data) {
    //   console.log(data)
    // }
    // var success = function (data) {
    //   console.log(data)
    //   wxMarkerData = data.wxMarkerData
    //   that.markers = wxMarkerData
    //   that.latitude = wxMarkerData[0].latitude
    //   that.longitude = wxMarkerData[0].longitude
    // }
    // // 发起regeocoding检索请求
    // BMap.regeocoding({
    //   address: '上海',
    //   fail: fail,
    //   success: success,
    //   iconPath: '/static/tabs/sign.png',
    //   iconTapPath: '/static/tabs/sign-active.png'
    // })
  },
  methods: {
    // bindKeyInput: function (e) {
    //   var that = this
    //   // 新建百度地图对象
    //   var BMap = new BMapWX({
    //     ak: 'sAtn0CLBVccMQmuqbtuqyHGXSSB9SaG6'
    //   })
    //   var fail = function (data) {
    //     console.log(data)
    //   }
    //   var success = function (data) {
    //     var sugData = ''
    //     for (var i = 0; i < data.result.length; i++) {
    //       sugData = sugData + data.result[i].name + '\n'
    //     }
    //     that.sugData = sugData
    //     console.log(sugData)
    //   }
    //   // 发起suggestion检索请求
    //   BMap.suggestion({
    //     query: e.mp.detail.value,
    //     region: '北京',
    //     city_limit: true,
    //     fail: fail,
    //     success: success
    //   })
    // }
    // makertap: function (e) {
    //   var that = this
    //   var id = e.markerId
    //   that.showSearchInfo(wxMarkerData, id)
    // },
    // showSearchInfo: function (data, i) {
    //   var that = this
    //   that.rgcData = {
    //     address: '地址：' + data[i].address + '\n',
    //     desc: '描述：' + data[i].desc + '\n',
    //     business: '商圈：' + data[i].business
    //   }
    //   this.$forceUpdate()
    // }
  }
}
</script>
<style scoped lang="less">
  .content{
    // .map_container{ 
    //     height: 300px; 
    //     width: 100%; 
    // } 
    // .map { 
    //     height: 100%; 
    //     width: 100%; 
    // }
    .map_container{ 
    height: 420px; 
    width: 100%; 
} 

.map { 
    height: 100%; 
    width: 100%; 
}

.rgc_info {
    padding: 5px;
}
.rgc_info {
    display: block;
}
  }
</style>
