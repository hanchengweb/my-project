<template>
  <div class="hotelList" :style="isMask?'position:fixed':''">
    <div v-if="isMask"
         class="mask"
         @click="closeMask"></div>
    <div class="hotelList-top">
      <div class="clearfix">
        <div class="hotelList-research clearfix">
          <!-- <div class="hotelList-location"
              @click="chooseCity">{{cityName}}</div> -->
          <img src="/static/images/research.png"
               alt=""
               class="hotelList-icon">
          <input type="text"
                 placeholder="酒店/关键词"
                 class="hotelList-ipt"
                 v-model="key"
                 @confirm="sureReach">
        </div>
        <div class="locationNams clearfix"
             @click="openLocation">
          <img src="/static/images/dw.png"
               alt="">
          <span class="ellipsis">{{cityNameTemp}}</span>
        </div>
      </div>
      <div class="hotelList-research-list choose clearfix">
        <div :class="defaultSort=='no'?'hotelList-resear-li':'hotelList-resear-li active'"
             @click="openSort('defaultSort')">
          <span>推荐排序</span>
          <img v-if="defaultSort=='no'"
               src="/static/images/research1.png"
               alt="">
          <img v-else-if="defaultSort=='close'"
               src="/static/images/research3.png"
               alt="">
          <img v-else
               src="/static/images/research2.png"
               alt="">
        </div>
        <div :class="starSort=='no'?'hotelList-resear-li':'hotelList-resear-li active'"
             @click="openSort('starSort')">
          <span>绿色星级</span>
          <img v-if="starSort=='no'"
               src="/static/images/research1.png"
               alt="">
          <img v-else-if="starSort=='close'"
               src="/static/images/research3.png"
               alt="">
          <img v-else
               src="/static/images/research2.png"
               alt="">
        </div>
        <div :class="locationSort=='no'?'hotelList-resear-li':'hotelList-resear-li active'"
             @click="openSort('locationSort')">
          <span>区域位置</span>
          <img v-if="locationSort=='no'"
               src="/static/images/research1.png"
               alt="">
          <img v-else-if="locationSort=='close'"
               src="/static/images/research3.png"
               alt="">
          <img v-else
               src="/static/images/research2.png"
               alt="">
        </div>
        <div :class="typeSort=='no'?'hotelList-resear-li':'hotelList-resear-li active'"
             @click="openSort('typeSort')">
          <span>筛选</span>
          <img v-if="typeSort=='no'"
               src="/static/images/research1.png"
               alt="">
          <img v-else-if="typeSort=='close'"
               src="/static/images/research3.png"
               alt="">
          <img v-else
               src="/static/images/research2.png"
               alt="">
        </div>
        <div class="hotelList-open">
          <div v-if="defaultSort=='open'"
               class="defaultSort-open">
            <div class="defaultSort-open-li clearfix">
              <span class="defaultSort-spa1"></span>
              <span class="defaultSort-spa2">距离优先</span>
              <img src="/static/images/defaultSortIcon.png"
                   alt="">
            </div>
          </div>
          <div v-if="starSort=='open'"
               class="starSort-open">
            <p class="starSort-open-title">绿色星级</p>
            <div class="starSort-open-list clearfix">
              <p v-for="(item,index) in gradeList"
                 :key="index"
                 :class="item.active?'active':''"
                 @click="changeGrade(index)">{{item.name}}</p>
            </div>
            <div class="starSort-open-last clearfix">
              <div class="pouter">
                <p class="cancles"
                  @click="clearSure('gradeList')">清空</p>
                <p class="sures"
                  @click="makeSure">确定</p>
              </div>
            </div>
          </div>
          <div v-if="locationSort=='open'"
               class="locationSort-open">
            <div class="locationSort-open-left clearfix">
              <!-- <span class="suline"></span>
              <span class="suline2">行政区</span> -->
              <div class="citylist_left">行政区</div>
              <div class="citylist clearfix">
                <p v-for="(item,index) in countyList"
                   :key="index"
                   @click="changeCounty(index)"
                   :class="item.active?'active clearfix':'clearfix'">
                  <span>{{item.name}}</span>
                  <img src="/static/images/defaultSortIcon.png"
                       alt=""
                       v-if="item.active">
                </p>
              </div>
            </div>
            <div class="starSort-open-last clearfix">
              <div class="pouter">
                <p class="cancles"
                  @click="clearSure('countyList')">清空</p>
                <p class="sures"
                  @click="makeSure">确定</p>
                </div>
            </div>
          </div>
          <div v-if="typeSort=='open'"
               class="typeSort-open">
            <div class="typeSort-open-con clearfix">
              <div class="typeSort-open-left">
                <div :class="typeValue=='type'?'active typeSort-open-li clearfix':'typeSort-open-li clearfix'"
                     :style="{'background':openBack,'border-left':openBorde}"
                     @click="changeType('type')">
                  主题类型
                </div>
                <div :class="typeValue=='logo'?'active typeSort-open-li clearfix':'typeSort-open-li clearfix'"
                     @click="changeType('logo')">
                  酒店品牌
                </div>
              </div>
              <div class="typeSort-open-right">
                <div v-if="typeValue=='type'"
                     class="clearfix">
                  <div v-for="(item,index) in typeList"
                       :key="index"
                       @click="changeTypeList(index)"
                       :class="item.active?'active typeSort-right-li':'typeSort-right-li'">
                    <span>{{item.name}}</span>
                    <img src="/static/images/defaultSortIcon.png"
                         alt=""
                         v-if="item.active">
                  </div>
                </div>
                <div v-else
                     class="clearfix">
                  <div v-for="(item,index) in brandCodeList"
                       :key="index"
                       @click="changeBrandCodeList(index)"
                       :class="item.active?'active typeSort-right-li':'typeSort-right-li'">
                    <span>{{item.name}}</span>
                    <img src="/static/images/defaultSortIcon.png"
                         alt=""
                         v-if="item.active">
                  </div>
                </div>
              </div>
            </div>
            <div class="starSort-open-last clearfix">
              <div class="pouter">
                <p class="cancles"
                  @click="clearSure('brandCodeList')">清空</p>
                <p class="sures"
                  @click="makeSure">确定</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hotelList.length<=0"
         class="hotellistno"
         style="text-align:center;font-family: PingFangSC-Regular;font-size: 24rpx;color: #666666;padding-top: 360rpx;">
      <img src="/static/images/hotellistno.png"
           alt=""
           style="width:320rpx;height:320rpx;">
      <p>暂无数据</p>
    </div>
    <div v-else
         class="hotelList-list">
      <div class="hotelList-li clearfix"
           v-for="(item,index) in hotelList"
           :key="index"
           @click="detailFun(item.id)">
        <img :src="item.imgUrl"
             alt=""
             class="hotelList-img"
             @error="errHandle(index)">
        <div class="hotelList-list-right">
          <div class="hotelList-title ellipsis">{{item.name}}</div>
          <div class="hotelList-locas clearfix">
            <span class="hotelList-span1 ellipsis">{{item.address}}</span>
            <span class="hotelList-span2">{{item.distance}}米</span>
          </div>
          <div class="hotelList-stars clearfix"
               v-if="item.grade==0">
            <img src="/static/images/shape2.png"
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
    </div>
  </div>
</template>

<script>
import { readHotels, dictionary, readDistrict, readHotelType, hotelBrand, readRoomImage, locationToAddress } from '@/api/hotelList'
import { getToken, getClientId, getLocation, setLocation } from '@/utils/user'
import { mapState } from 'vuex'
// import BMapWX from '@/utils/bmap-wx2.js'
import QQMapWX from '@/utils/qqmap-wx-jssdk.js'

// 新建百度地图对象
// var BMap = new BMapWX({
//   ak: 'sAtn0CLBVccMQmuqbtuqyHGXSSB9SaG6'
// })
// 新建腾讯地图对象
var qqmapsdk = new QQMapWX({
  key: '3YABZ-HSILI-B6GGF-5GVU6-5YGB3-YUFPJ'
})
export default {
  data () {
    return {
      search: '',
      defaultSort: 'no',
      starSort: 'no',
      locationSort: 'no',
      typeSort: 'no',
      isMask: false,
      typeValue: 'type',
      cityNameTemp: '',
      longitude: '121.4349920',
      latitude: '31.2829760',
      city: '',
      grade: '',
      county: '',
      type: '',
      brandCode: '',
      gradeList: [],
      countyList: [],
      typeList: [],
      brandCodeList: [],
      hotelList: [],
      key: '',
      cityLocation: false,
      openBack: '',
      openBorde: ''
    }
  },
  onShow () {
    // this.hotelList = []
    let _this = this
    // this.county = ''
    wx.showLoading({
      title: '加载中'
    })
    if (!this.cityLocation) {
      if (!getLocation()) {
        // 未进行定位过需重新定位
        wx.getLocation({
          type: 'gcj02',
          altitude: true, // ⾼精度定位
          success: function (res) {
            _this.latitude = res.latitude
            _this.longitude = res.longitude
            console.log('定位完毕')
            // qqmapsdk.reverseGeocoder({
            //   location: { latitude: res.latitude, longitude: res.longitude },
            //   success: function (res) {
            //     console.log('转化完毕')
            //     let infos = res.result.ad_info
            //     _this.city = infos.city_code.split(infos.nation_code)[1]
            //     _this.cityNameTemp = res.result.address_reference.landmark_l2.title
            //     _this.list()
            //     _this.init()
            //     const locationInfo = {
            //       latitude: _this.latitude,
            //       longitude: _this.longitude,
            //       city: _this.city,
            //       cityNameTemp: _this.cityNameTemp
            //     }
            //     setLocation(locationInfo)
            //   },
            //   fail: function (res) {
            //     wx.showToast({
            //       icon: 'none',
            //       title: JSON.stringify(res),
            //       duration: 30000
            //     })
            //   }
            // })
            locationToAddress({location: res.latitude + ',' + res.longitude, token: getToken()}).then(info => {
              if (info.status !== 0 || info.result.adcodeInfo == null) {
                _this.city = ''
                _this.cityNameTemp = ''
              } else {
                _this.city = info.result.adcodeInfo.cityCode
                _this.cityNameTemp = info.result.formattedAddress
              }
              const locationInfo = {
                latitude: _this.latitude,
                longitude: _this.longitude,
                city: _this.city,
                cityNameTemp: _this.cityNameTemp
              }
              _this.list()
              _this.init()
              setLocation(locationInfo)
            })
          }
        })
      } else {
        // console.log(getLocation())
        const locationInfo = getLocation()
        _this.latitude = locationInfo.latitude
        _this.longitude = locationInfo.longitude
        _this.city = locationInfo.city
        _this.cityNameTemp = locationInfo.cityNameTemp
        _this.list()
        _this.init()
      }
    } else {
      _this.list()
      _this.init()
    }
  },
  computed: {
    // ...mapState({
    //   'cityName': state => state.crement.cityName
    // })
  },
  methods: {
    detailFun (id) {
      wx.navigateTo({
        url: '../hotelDetail/main?id=' + id
      })
    },
    // 图片加载失败处理
    errHandle (imgDiv) {
      this.hotelList[imgDiv].imgUrl = '/static/images/hotellistDefo.png'
    },
    // 筛选后的列表
    list () {
      let _this = this
      readHotels({
        bd09Lon1: _this.txMap_to_bdMap(_this.longitude, _this.latitude).lng,
        bd09Lat1: _this.txMap_to_bdMap(_this.longitude, _this.latitude).lat,
        clientid: getClientId(),
        token: getToken(),
        grade: this.grade,
        county: this.county,
        type: this.type,
        city: this.city,
        brandCode: this.brandCode,
        key: this.key
      }).then(info => {
        console.log('接口请求成功')
        console.log(info)
        if (info === 400) {
          _this.hotelList = []
          return false
        }
        info && info.length > 0 && info.forEach(element => {
          element.imgUrl = readRoomImage({ hotelid: element.id, token: getToken() })
        })
        _this.hotelList = info && info.length > 0 ? info : []
        _this.$forceUpdate()
      })
    },
    // 初始化
    init () {
      let _this = this
      // 酒店星级
      dictionary({
        code: 'POWER_RANK_GRADE',
        token: getToken()
      }).then(info => {
        _this.gradeList = []
        info && info.length > 0 && info.forEach(element => {
          let actives = false
          if (element.code === this.grade) {
            actives = true
          }
          _this.gradeList.push({
            name: element.name,
            active: actives,
            code: element.code
          })
          _this.$forceUpdate()
        })
      })
      // 区域位置
      if (_this.city.length > 0) {
        readDistrict({
          cityCode: _this.city,
          token: getToken()
        }).then(result => {
          _this.countyList = []
          result && result.length > 0 && result.forEach(element => {
            let actives = false
            if (element.code === this.county) {
              actives = true
            }
            _this.countyList.push({
              name: element.name,
              active: actives,
              code: element.code
            })
            _this.$forceUpdate()
          })
        })
      }
      // 酒店类型
      readHotelType({
        code: 'HOTEL_TYPE',
        token: getToken()
      }).then(info => {
        wx.hideLoading()
        _this.typeList = []
        info && info.length > 0 && info.forEach(element => {
          let actives = false
          if (element.code === this.type) {
            actives = true
          }
          _this.typeList.push({
            name: element.name,
            active: actives,
            code: element.code
          })
          _this.$forceUpdate()
        })
      })
      // 酒店类型
      hotelBrand({
        token: getToken()
      }).then(info => {
        _this.brandCodeList = []
        info && info.length > 0 && info.forEach(element => {
          let actives = false
          if (element.code === this.brandCode) {
            actives = true
          }
          _this.brandCodeList.push({
            name: element.name,
            active: actives,
            code: element.code
          })
          _this.$forceUpdate()
        })
      })
    },
    // 切换主题类型
    changeType (e) {
      this.typeValue = e
    },
    // 展开筛选
    openSort (e) {
      let _this = this
      if (e === 'defaultSort') {
        if (_this.defaultSort === 'open') {
          _this.defaultSort = 'close'
          _this.isMask = false
        } else {
          _this.defaultSort = 'open'
          _this.isMask = true
          _this.starSort = _this.starSort === 'no' ? 'no' : 'close'
          _this.typeSort = _this.typeSort === 'no' ? 'no' : 'close'
          _this.locationSort = _this.locationSort === 'no' ? 'no' : 'close'
        }
      }
      if (e === 'starSort') {
        if (_this.starSort === 'open') {
          _this.starSort = 'close'
          _this.isMask = false
        } else {
          _this.starSort = 'open'
          _this.isMask = true
          _this.typeSort = _this.typeSort === 'no' ? 'no' : 'close'
          _this.locationSort = _this.locationSort === 'no' ? 'no' : 'close'
          _this.defaultSort = _this.defaultSort === 'no' ? 'no' : 'close'
        }
      }
      if (e === 'locationSort') {
        if (_this.locationSort === 'open') {
          _this.locationSort = 'close'
          _this.isMask = false
        } else {
          _this.locationSort = 'open'
          _this.isMask = true
          _this.starSort = _this.starSort === 'no' ? 'no' : 'close'
          _this.typeSort = _this.typeSort === 'no' ? 'no' : 'close'
          _this.defaultSort = _this.defaultSort === 'no' ? 'no' : 'close'
        }
      }
      if (e === 'typeSort') {
        if (_this.typeSort === 'open') {
          _this.typeSort = 'close'
          _this.isMask = false
        } else {
          _this.typeSort = 'open'
          _this.isMask = true
          _this.starSort = _this.starSort === 'no' ? 'no' : 'close'
          _this.locationSort = _this.locationSort === 'no' ? 'no' : 'close'
          _this.defaultSort = _this.defaultSort === 'no' ? 'no' : 'close'
        }
      }
    },
    // 切换星级
    changeGrade (index) {
      this.gradeList.forEach((item) => {
        item.active = false
      })
      this.gradeList[index].active = true
      this.grade = this.gradeList[index].code
    },
    // 切换区域
    changeCounty (index) {
      this.countyList.forEach((item) => {
        item.active = false
      })
      this.countyList[index].active = true
      this.county = this.countyList[index].code
    },
    // 切换主题类型筛选
    changeTypeList (index) {
      this.typeList.forEach((item) => {
        item.active = false
      })
      this.typeList[index].active = true
      this.type = this.typeList[index].code
    },
    // 切换品牌
    changeBrandCodeList (index) {
      this.brandCodeList.forEach((item) => {
        item.active = false
      })
      this.brandCodeList[index].active = true
      this.brandCode = this.brandCodeList[index].code
    },
    // 选择城市
    chooseCity () {
      wx.redirectTo({
        url: `../citys/main`
      })
    },
    // 切换位置
    openLocation () {
      let _this = this
      wx.chooseLocation({
        latitude: _this.latitude,
        longitude: _this.longitude,
        success: function (res) {
          console.log(res)
          _this.cityNameTemp = res.name
          // _this.$store.commit('handleCity', res.name)
          _this.cityLocation = true
          _this.longitude = res.longitude
          _this.latitude = res.latitude
          // qqmapsdk.reverseGeocoder({
          //   location: { latitude: res.latitude, longitude: res.longitude },
          //   success: function (res) {
          //     console.log(res)
          //     _this.city = res.result.ad_info.city_code.split(res.result.ad_info.nation_code)[1]
          //     _this.init()
          //     _this.list()
          //     const locationInfo = {
          //       latitude: _this.latitude,
          //       longitude: _this.longitude,
          //       city: _this.city,
          //       cityNameTemp: _this.cityNameTemp
          //     }
          //     setLocation(locationInfo)
          //   }
          // })
          locationToAddress({location: res.latitude + ',' + res.longitude, token: getToken()}).then(info => {
            if (info.status !== 0 || info.result.adcodeInfo == null) {
              _this.city = ''
            } else {
              _this.city = info.result.adcodeInfo.cityCode
            }
            const locationInfo = {
              latitude: _this.latitude,
              longitude: _this.longitude,
              city: _this.city,
              cityNameTemp: _this.cityNameTemp
            }
            _this.list()
            _this.init()
            setLocation(locationInfo)
          })
        }
      })
    },
    // 清空
    clearSure (code) {
      let _this = this
      if (code === 'gradeList') {
        _this.grade = ''
        this.gradeList.forEach((item) => {
          item.active = false
        })
      }
      if (code === 'countyList') {
        _this.county = ''
        this.countyList.forEach((item) => {
          item.active = false
        })
      }
      if (code === 'brandCodeList') {
        _this.brandCode = ''
        _this.type = ''
        _this.openBack = 'transparent'
        _this.openBorde = '8rpx solid transparent'
        setTimeout(function () {
          _this.typeValue = 'type'
          _this.openBack = ''
          _this.openBorde = ''
        }, 10)
        this.brandCodeList.forEach((item) => {
          item.active = false
        })
        this.typeList.forEach((item) => {
          item.active = false
        })
      }
      this.starSort = this.starSort === 'no' ? 'no' : 'close'
      this.locationSort = this.locationSort === 'no' ? 'no' : 'close'
      this.defaultSort = this.defaultSort === 'no' ? 'no' : 'close'
      this.typeSort = this.typeSort === 'no' ? 'no' : 'close'
      this.list()
      this.isMask = false
    },
    // 确定筛选
    makeSure () {
      this.list()
      this.isMask = false
      this.starSort = this.starSort === 'no' ? 'no' : 'close'
      this.locationSort = this.locationSort === 'no' ? 'no' : 'close'
      this.defaultSort = this.defaultSort === 'no' ? 'no' : 'close'
      this.typeSort = this.typeSort === 'no' ? 'no' : 'close'
    },
    // 腾讯地图坐标转化成百度地图
    txMap_to_bdMap (lng, lat) {
      let xpi = 3.14159265358979324 * 3000.0 / 180.0
      let x = lng
      let y = lat
      let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xpi)
      let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xpi)
      let lngs = z * Math.cos(theta) + 0.0065
      let lats = z * Math.sin(theta) + 0.006
      return {
        lng: lngs,
        lat: lats
      }
    },
    // 关闭筛选
    closeMask () {
      this.isMask = false
      this.starSort = this.starSort === 'no' ? 'no' : 'close'
      this.locationSort = this.locationSort === 'no' ? 'no' : 'close'
      this.defaultSort = this.defaultSort === 'no' ? 'no' : 'close'
      this.typeSort = this.typeSort === 'no' ? 'no' : 'close'
    },
    // 搜索
    sureReach () {
      console.log(this.key)
      this.list()
    }
  },
  onReachBottom: function () {
    // 页面触底时执行
  }
}
</script>
<style scope lang="less">
html,
body {
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
}
.hotelList {
  .mask {
    position: fixed;
    top: 190rpx;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }
  .suline {
    background: #0089cb;
    width: 2rpx;
    height: 28rpx;
    float: left;
    margin-top: 6rpx;
  }
  .cancles {
    float: left;
    width: 200rpx;
    background-color: #008bcd;
    color: #fff;
    border-radius: 4rpx;
    padding:15rpx 0
  }
  .sures {
    float: right;
    width: 200rpx;
    color: #fff;
    background-color: #008bcd;
    border-radius: 4rpx;
    padding:15rpx 0
  }
  .starSort-open-last {
    font-family: PingFangSC-Regular;
    font-size: 30rpx;
    text-align: center;
    background-color: #fdfdfd;
    padding:20rpx 0;
    box-shadow: 0px -10rpx 8rpx 0px rgba(216, 216, 216, 0.5)
  }
  .pouter{
    overflow: hidden;
    width:560rpx;
    margin:0 auto
  }
  .hotelList-research {
    margin: 20rpx 24rpx;
    margin-right: 0;
    background-color: #fff;
    height: 60rpx;
    float: left;
    .hotelList-location {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      border-right: 1px solid #333333;
      float: left;
      padding: 0 20rpx;
      margin-top: 10rpx;
    }
    .hotelList-icon {
      float: left;
      width: 48rpx;
      height: 48rpx;
      margin: 6rpx 10rpx;
    }
    .hotelList-ipt {
      font-family: PingFangSC-Regular;
      font-size: 28rpx;
      height: 100%;
      width: 442rpx;
    }
  }
  .locationNams {
    float: left;
    font-size: 24rpx;
    margin-right: 30rpx;
    margin-left:20rpx;
    image {
      margin-top: 30rpx;
      width: 40rpx;
      height: 40rpx;
      float: left;
    }
    span {
      margin-top: 34rpx;
      float: left;
      width: 120rpx;
    }
  }
  .hotelList-research-list {
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    .hotelList-resear-li {
      width: 25%;
      float: left;
      height: 68rpx;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
      display: flex;
      justify-content: center;
      align-items: center;
      > image {
        width: 40rpx;
        height: 28rpx;
      }
    }
    .active {
      color: #0089cb;
    }
  }
  .hotelList-list {
    background-color: #fff;
    padding-top: 168rpx;
    .hotelList-li {
      margin: 0 30rpx;
      padding: 30rpx 0;
      border-bottom: 1px solid #eee;
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
            width: 300rpx;
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
  .hotelList-open {
    position: absolute;
    top: 79rpx;
    left: 0;
    width: 100%;
    background-color: #fff;
    .defaultSort-open {
      //box-shadow:-1px -2px 4px 0 rgba(216,216,216,0.50);
      .defaultSort-open-li {
        height: 68rpx;
        line-height: 68rpx;
        .defaultSort-spa1 {
          float: left;
          width: 2rpx;
          height: 28rpx;
          margin-top: 20rpx;
          background: #0089cb;
        }
        .defaultSort-spa2 {
          float: left;
          font-family: PingFangSC-Regular;
          font-size: 28rpx;
          color: #0089cb;
          margin-left: 20rpx;
        }
        image {
          float: right;
          width: 48rpx;
          height: 40rpx;
          margin-top: 14rpx;
          margin-right: 26rpx;
        }
      }
    }
  }
  .hotelList-top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    background-color: #f3f3f3;
    .choose {
      box-shadow: 0 2px 4px 0 rgba(216, 216, 216, 0.5);
    }
  }
  .starSort-open {
    .starSort-open-title {
      font-family: PingFangSC-Medium;
      font-size: 28rpx;
      color: #333333;
      margin: 20rpx 16rpx;
      font-weight: bold;
    }
    .starSort-open-list {
      margin: 0 34rpx;
      p {
        background: #f5f5f5;
        border: 0 solid #eeeeee;
        border-radius: 4rpx;
        width: 130rpx;
        height: 66rpx;
        line-height: 66rpx;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 28rpx;
        color: #333333;
        float: left;
        margin-right: 52rpx;
        margin-bottom: 34rpx;
      }
      p:nth-child(4n + 4) {
        margin-right: 0;
      }
      .active {
        background: #f5fcff;
        color: #008bcd;
      }
    }
  }
  .locationSort-open {
    background: linear-gradient(-179deg, #ebebeb 0%, #fdfdfd 100%);
    .locationSort-open-left {
      .suline2 {
        font-family: PingFangSC-Regular;
        font-size: 28rpx;
        color: #0089cb;
        float: left;
        margin-left: 20rpx;
      }
      .citylist_left {
        float: left;
        width: 150rpx;
        height: 88rpx;
        border-left: 8rpx solid #0089cb;
        line-height: 88rpx;
        padding-left: 20rpx;
        font-family: PingFangSC-Regular;
        font-size: 28rpx;
        background-color: #fff;
        box-sizing: border-box;
        color: #0089cb;
      }
      .citylist {
        width: 600rpx;
        font-family: PingFangSC-Regular;
        font-size: 28rpx;
        float: left;
        background-color: #fff;
        width: calc(100% - 150rpx);
        color: #666666;
        max-height: 400rpx;
        overflow-y: auto;
        padding-top: 18rpx;
        margin-bottom: 16rpx;
        p {
          margin-left: 20rpx;
          line-height: 70rpx;
          border-bottom: 1px solid #eee;
          height: 70rpx;
          span {
            float: left;
          }
          image {
            float: right;
            width: 48rpx;
            height: 40rpx;
            margin-top: 14rpx;
            margin-right: 26rpx;
          }
        }
        .active {
          color: #0089cb;
        }
      }
    }
  }
  .typeSort-open {
    background: linear-gradient(-179deg, #ebebeb 0%, #fdfdfd 100%);
    .typeSort-open-left {
      float: left;
      color: #0089cb;
      .typeSort-open-li {
        width: 150rpx;
        height: 88rpx;
        border-left: 4rpx solid transparent;
        line-height: 88rpx;
        padding-left: 16rpx;
        font-family: PingFangSC-Regular;
        font-size: 28rpx;
        box-sizing: border-box;
      }
      .active {
        border-left: 8rpx solid #0089cb;
        background-color: #fff;
      }
    }
    .typeSort-open-right {
      float: left;
      width: 560rpx;
      background-color: #fff;
      width: calc(100% - 150rpx);
      font-family: PingFangSC-Regular;
      font-size: 28rpx;
      max-height: 400rpx;
      overflow-y: auto;
      padding-top: 18rpx;
      margin-bottom: 16rpx;
      .typeSort-right-li {
        color: #666666;
        margin-left: 20rpx;
        line-height: 70rpx;
        border-bottom: 1px solid #eee;
        height: 70rpx;
        span {
          float: left;
        }
        image {
          float: right;
          width: 48rpx;
          height: 40rpx;
          margin-top: 14rpx;
          margin-right: 26rpx;
        }
      }
      .active {
        color: #0089cb;
      }
    }
  }
}
</style>
