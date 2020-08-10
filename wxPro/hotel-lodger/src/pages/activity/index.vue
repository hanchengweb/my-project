<template>
  <div class="activity">
    <p class="activity-title">{{newDetail.title}}</p>
    <p class="activity-time">{{newDetail.createTime}}</p>
    <p class="activity-miao">{{newDetail.description}}</p>
    <p class="activity-detail"
       v-html="strs">{{strs}}</p>
  </div>
</template>

<script>
import { newDetail } from '@/api/index'
import { getClientId, getToken } from '@/utils/user'
export default {
  data () {
    return {
      ids: 0,
      newDetail: {},
      strs: ''
    }
  },
  methods: {
    async getnewDetail () {
      const result = await newDetail(this.ids)
      this.newDetail = result
      this.strs = this.newDetail.text
      // console.log(result)
    }
  },
  onShow () {
    this.ids = this.$root.$mp.query.id
    this.getnewDetail()
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
<style scope lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
.activity {
  padding: 0 42rpx;
  .activity-title {
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #333333;
    letter-spacing: -0.43px;
  }
  .activity-time {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9b9b9b;
    line-height: 21px;
    text-align: left;
    margin: 28rpx 0 40rpx 0;
  }
  .activity-miao {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #999999;
    letter-spacing: -0.45px;
    line-height: 30px;
  }
  .activity-detail {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    line-height: 34px;
  }
}
</style>
