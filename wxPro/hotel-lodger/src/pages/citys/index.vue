<template>
  <div class="content">
    <view class="search-box">
        <view class="search-box-inner clearfix">   
            <icon type="search" size="15" />
            <input placeholder="中文/拼音/首字母" class='search-input' @input='bindSarchInput' placeholder-class='search-input-placeholder' />
        </view>
    </view>
    <view class="locationCs1">
        <view v-if="showLoc">
            <view class="locationCs">
                <view class="locationCs-icon">当前城市</view>
                <view class="locationCs-name clearfix">
                    <view class="locationCs-li ellipsis">杭州</view>
                </view>
            </view>
            <view class="locationCs">
                <view class="locationCs-icon">热门城市</view>
                <view class="locationCs-name clearfix">
                    <view class="locationCs-li ellipsis">上海</view>
                    <view class="locationCs-li ellipsis">北京</view>
                    <view class="locationCs-li ellipsis">杭州</view>
                    <view class="locationCs-li ellipsis">杭州</view>
                    <view class="locationCs-li ellipsis">杭州</view>
                    <view class="locationCs-li ellipsis">杭州</view>
                    <view class="locationCs-li ellipsis">杭州</view>
                    <view class="locationCs-li ellipsis">杭州</view>
                    <view class="locationCs-li ellipsis">杭州</view>
                </view>
            </view>
        </view>
    </view>
    <view class='a-z'>
        <view v-for="(item,index) in cityAZ" :key="index">
            <view :data-id='item.cityName' @click='bindAZ'>{{item.cityName}}</view>
        </view>
    </view>
    <view class='city-item-content'>
        <view v-for="(item,index) in cityResults" :key="index">
            <view v-if="item.cityPinYin.length > 1" class='city-item' :data-cityname='item.cityName' @click='citySelected'>{{item.cityName}}</view>
            <view v-else class='city-item-A-Z' :data-cityname='item.cityName'>{{item.cityName}}</view>
            <!-- <view data-cityname='{{item.cityName}}' bindtap='citySelected' >{{item.cityName}}</view> -->
        </view>
    </view>
  </div>
</template>

<script>
import { cityAZs, cityAls } from '@/utils/allcitys'
export default {
  data () {
    return {
      scrollAZ: null,
      scrollNow: 0,
      cityType: 'begin',
      cityResults: null,
      cityAZ: [],
      citys: [],
      showLoc: true
    }
  },
  onShow () {
    this.cityAZ = cityAZs()
    this.citys = cityAls()
    if (this.cityResults == null) {
      this.cityResults = cityAls()
    }
  },
  onPageScroll: function (e) { // 获取滚动条当前位置
    this.scrollNow = e.scrollTop
  },
  methods: {
    bindAZ: function (e) {
      var currentCityName = e.currentTarget.dataset.id
      var that = this
      // 放入A-Z的scrollTop参数
      if (currentCityName === '热' && this.showLoc) {
        wx.pageScrollTo({
          scrollTop: 109,
          duration: 0
        })
      }
      if (that.scrollAZ == null) {
        wx.createSelectorQuery().selectAll('.city-item-A-Z').fields({
          dataset: true,
          size: true,
          rect: true
        }, function (res) {
          res.forEach(function (re) {
            if (currentCityName === re.dataset.cityname) {
              wx.pageScrollTo({
                scrollTop: re.top + that.scrollNow - 55.5,
                duration: 0
              })
            }
          })
        }).exec()
      } else {
        this.scrollAZ.forEach(function (re) {
          if (currentCityName === re.dataset.cityname) {
            wx.pageScrollTo({
              scrollTop: re.top + that.scrollNow - 55.5,
              duration: 0
            })
          }
        })
      }
    },
    citySelected: function (e) {
      var cityNameTemp = e.currentTarget.dataset.cityname

      //   if (this.data.cityType == 'begin') {
      //     globalData.trainBeginCity = cityNameTemp
      //   }

      //   if (this.data.cityType == 'end') {
      //     globalData.trainEndCity = cityNameTemp
      //   }
      // console.log(cityNameTemp)
      // wx.navigateBack()

      this.$store.commit('handleCity', cityNameTemp)
      wx.switchTab({
        url: '../hotelList/main?city=' + encodeURI(cityNameTemp)
      })
    },
    bindSarchInput: function (e) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })

      var inputVal = e.target.value
      var cityResultsTemp = []
      var citys = this.citys
      let _this = this
      if (inputVal == null || inputVal.trim() === '') {
        _this.cityResults = citys
        _this.showLoc = true
        return
      }
      _this.showLoc = false
      for (var i = 0; i < citys.length; i++) {
        if (citys[i].cityName.indexOf(inputVal) === 0 || citys[i].cityPY.indexOf(inputVal.toLowerCase()) === 0 || citys[i].cityPinYin.indexOf(inputVal.toLowerCase()) === 0) {
          // 去除热门城市
          if (citys[i].cityPY.indexOf('#') !== -1) {
            continue
          }
          var ifHas = false
          for (var j = 0; j < cityResultsTemp.length; j++) {
            if (cityResultsTemp[j] === citys[i]) {
              ifHas = true
              break
            }
          }
          if (!ifHas) {
            cityResultsTemp.push(citys[i])
          }
        }
      }
      this.cityResults = cityResultsTemp
    }
  }
}
</script>
<style scoped lang="less">
.content{
    background-color:#F2F2F2
}
  .a-z{
  width: 35rpx;
  position: fixed;
  top: 112rpx;
  text-align: center;
  right: 5rpx;
  color: #3399CC;
  font-size: 30rpx;
  /* border: 1rpx solid #3399CC; */
}


.city-item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #FFFFFF;
}

.city-item {
  background: #fff;
  /* margin-top: 5rpx; */
  width: 100%;  
  margin-left: 32rpx;
  height: 75rpx;
  font-size: 34rpx;
  line-height: 75rpx;
  font-family:PingFangSC-Regular;
  color:#333333;
  border-bottom: 1rpx solid #F2F2F2;    
  /* border:1rpx solid red; */
}

.city-item-A-Z{
  width: 100%;
  height: 80rpx;
  line-height:80rpx;
  font-size: 30rpx;
  padding-left: 32rpx;
  background-color: #F2F2F2;
  border-top: 1rpx solid #F2F2F2;    
  margin-top: -1rpx;
  color:#999999
}


.search-box {
  top: 0;
  position: fixed;
  width: 100%;
  /* left:5%; */
  background: #fff;
  height: 110rpx;
  font-size: 30rpx;
  //border-bottom:1rpx solid #DDDDDD; 
  icon{
      float: left;
      margin:20rpx;
  }
  .search-box-inner{
      background-color:#F2F2F2;
      width:686rpx;
      height:70rpx;
      margin:24rpx auto
  }
}

.search-input {
    float: left;
    height:100%;
    width:600rpx;
}

.search-input-placeholder {
  text-align: center;
}
.locationCs{
    margin:0 32rpx;
    padding-top:20rpx;
    .locationCs-icon{
        font-family:PingFangSC-Regular;
        font-size:26rpx;
        color:#999999;
        padding:20rpx 0;
    }
    .locationCs-li{
        width:208rpx;
        height:80rpx;
        line-height:80rpx;
        text-align:center;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#333333;
        float:left;
        margin-right:20rpx;
        margin-bottom:20rpx;
        background-color:#fff;
    }
}
.locationCs1{
    margin-top: 110rpx;
}
</style>
