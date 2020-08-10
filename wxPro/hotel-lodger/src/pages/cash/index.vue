<template>
  <div class="content">
     <div class="cash-item clearfix">
       <div class="cash-item-left">
         <p>10.00元</p>
         <p>满199减10</p>
       </div>
       <div class="cash-item-con">[新客礼]10元酒店通用[0元酒店通用</div>
       <button type="primary" class="cash-button">现使用</button>
     </div>
     <div class="cash-item clearfix">
       <div class="cash-item-left">
         <p>10.00元</p>
         <p>满199减10</p>
       </div>
       <div class="cash-item-con">[新客礼]10元酒店通用</div>
       <button type="primary" class="cash-button">现使用</button>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  onShow () {
  }
}
</script>
<style scope lang="less">
  .content{
    .cash-item{
      margin:24rpx 38rpx 0;
      background: #FFF7EC;
      height: 176rpx;
    }
    .cash-item-left{
      float: left;
      width: 200rpx;
      text-align: center;
        color: #FE6804;
      p:nth-child(1){
        font-size: 38rpx;
        margin-top: 40rpx;
      }
      p:nth-child(2){
        font-size: 24rpx;
      }
    }
    .cash-item-con{
      float: left;
      font-size: 28rpx;
      color: #000;
      width: 300rpx;
      height: 100%;
      display: flex;
      align-items: center
    }
    .cash-button{
      float: right;
      background:#fdad02;
      border-radius:200rpx;
      width:148rpx;
      height:56rpx;
      line-height: 56rpx;
      color: #fff;
      font-family:PingFangSC-Regular;
      font-size:28rpx;
      margin-top: 60rpx;
      margin-right: 20rpx;
    }
  }
</style>
