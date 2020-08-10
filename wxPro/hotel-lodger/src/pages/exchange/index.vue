<template>
  <div class="content">
    <div class="exchange-bar clearfix" @click="changefun">
      <div><span :class="statics == 1 ?'active':''" data-static=1>未使用</span></div>
      <div><span :class="statics == 2 ?'active':''" data-static=2>已使用</span></div>
      <div><span :class="statics == 3 ?'active':''" data-static=3>已过期</span></div>
    </div>
    <div class="exchange-list">
      <div v-if=" statics == 1 ">
        <div class="exchange-item clearfix" v-for="(item,index) in exchange1" :key="index">
          <div class="exchange-item-left">
            <div class="exchange1 clearfix">
              <span>￥</span>
              <span>{{item.money}}</span>
            </div>
          </div>
          <div class="exchange-item-con">
            <p class="ellipsis">{{item.title}}</p>
            <p class="ellipsis">{{item.desc}}</p>
            <p class="ellipsis">有效期：{{item.date}}</p>
          </div>
          <div class="exchange-item-right">
            <button type="primary" >现使用</button>
          </div>
        </div>
      </div>
      <div v-else-if=" statics == 2 ">
        <div class="exchange-item clearfix" v-for="(item,index) in exchange2" :key="index">
          <div class="exchange-item-left">
            <img :src="item.src" alt="" class="exchange-img">
          </div>
          <div class="exchange-item-con">
            <p class="ellipsis">{{item.title}}</p>
            <p class="ellipsis">{{item.desc}}</p>
            <p class="ellipsis">有效期：{{item.date}}</p>
          </div>
          <div class="exchange-item-right">
            <div class="exchange1 clearfix">
              <span>￥</span>
              <span>{{item.money}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="exchange-item clearfix" v-for="(item,index) in exchange1" :key="index">
          <div class="exchange-item-left">
            <div class="exchange1 exchange3 clearfix">
              <span>￥</span>
              <span>{{item.money}}</span>
            </div>
          </div>
          <div class="exchange-item-con">
            <p class="ellipsis">{{item.title}}</p>
            <p class="ellipsis">{{item.desc}}</p>
            <p class="ellipsis">有效期：{{item.date}}</p>
          </div>
          <div class="exchange-item-right">
            <img src="/static/images/exchange.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      statics: 1,
      exchange1: [
        {money: 30, title: '30元酒店专享抵用券30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05'}
      ],
      exchange2: [
        {money: 30, title: '30元酒店专享抵用券30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05', src: '/static/images/indexImage3.png'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05', src: '/static/images/indexImage3.png'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05', src: '/static/images/indexImage3.png'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05', src: '/static/images/indexImage3.png'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05', src: '/static/images/indexImage3.png'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05', src: '/static/images/indexImage3.png'},
        {money: 30, title: '30元酒店专享抵用券', desc: '3000积分兑换', date: '2019-05-05', src: '/static/images/indexImage3.png'}
      ]
    }
  },
  onShow () {
  },
  methods: {
    changefun (e) {
      if (e.target.dataset.static) {
        this.statics = e.target.dataset.static
      }
    }
  }
}
</script>
<style scope lang="less">
  html{width: 100%;height: 100%}
  .content{
    height: 100%;
    background-color: #f2f2f2;
    .exchange-bar{
      height: 80rpx;
      line-height: 80rpx;
      font-family:PingFangSC-Medium;
      font-size:30rpx;
      color:#919191;
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
      div{float: left;width: 33.333%;text-align: center}
      span{padding-bottom: 16rpx;}
      .active{color: #008bcd;border-bottom: 2px solid #008bcd}
    }
    .exchange-list{
      margin-top: 80rpx;
      overflow: hidden;
      .exchange-item{
        margin: 20rpx 20rpx 0;
        padding:20rpx;
        background-color: #fff;
        .exchange-item-left{
          float: left;
          font-family:PingFangSC-Light;
          .exchange1{
            color:#e5ae06;
            margin-top: 30rpx;
            span:nth-child(1){
              font-size:36rpx;
              float: left;
            }
            span:nth-child(2){
              font-size:72rpx;
              float: left;
            }
          }
          .exchange3{
            color: #919191
          }
          .exchange-img{
            width: 120rpx;
            height: 120rpx;
            margin-top: 15rpx;
          }
        }
        .exchange-item-con{
          float: left;
          font-family:PingFangSC-Light;
          color:#919191;
          margin-left: 40rpx;
          width: 343rpx;
          p:nth-child(1){
            font-family:PingFangSC-Regular;
            font-size:32rpx;
            color:#666666;
          }
          p:nth-child(2){
            font-size:28rpx;
            margin-top: 20rpx;
          }
          p:nth-child(3){
            font-size:26rpx;
            margin-top: 20rpx;
          }
        }
        .exchange-item-right{
          float: right;
          button{
            background:#fdad02;
            border-radius:200rpx;
            width:148rpx;
            height:56rpx;
            line-height: 56rpx;
            color: #fff;
            font-family:PingFangSC-Regular;
            font-size:28rpx;
            margin-top: 60rpx;
          }
          .exchange1{
            color:#919191;
            margin-top: 30rpx;
            span:nth-child(1){
              font-size:36rpx;
              float: left;
            }
            span:nth-child(2){
              font-size:72rpx;
              float: left;
            }
          }
          image{
            width: 88rpx;
            height: 88rpx;
            margin-top: 36rpx;  
          }
        }
      }
    }
  }
</style>
