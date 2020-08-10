<template>
  <div class="imgList">
    <div v-for="item in imgListAll"
         :key="item"
         class="oneImg">
      <img :src="item.src"
           alt=""
           class="imgAll"
           @click="lookFun(item.src)">
    </div>
  </div>
</template>
<script>
import { getAllInfoimg, getOneInfoimg } from '../../api/hotelDetail'
import { getClientId, getToken } from '@/utils/user'
export default {
  name: 'imgList',
  data () {
    return {
      imgListAll: [],
      imgList: []
    }
  },
  onShow () {
    this.hotelId = this.$root.$mp.query.id
    this.getImg()
  },
  methods: {
    lookFun (src) {
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: this.imgList // 需要预览的图片http链接列表
      })
    },
    async getImg () {
      this.imgList = []
      let param = this.hotelId
      const result = await getAllInfoimg(param)
      let arr = []
      result.forEach(item => {
        arr.push({
          src: getOneInfoimg({ id: item.id, clientid: getClientId(), token: getToken() })
        })
        this.imgList.push(getOneInfoimg({ id: item.id, clientid: getClientId(), token: getToken() }))
      })
      this.imgListAll = arr
    }
  }
}
</script>
<style lang="scss">
.imgList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .oneImg {
    width: 350rpx;
    height: 236rpx;
    border-radius: 8rpx;
    overflow: hidden;
    .imgAll {
      width: 350rpx;
      height: 236rpx;
      margin: 20rpx 0;
    }
  }
}
</style>