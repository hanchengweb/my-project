import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout.vue'

const Login = () => import('@/views/Login2.vue') // 登录页面组件
// const User = () => import('@/views/User.vue')
// const Admin = () => import('@/views/Admin.vue')
const P404 = () => import('@/views/404.vue') // 404页面组件
const Index = () => import('@/views/index/Index.vue') // 首页
const MerchantManage = () => import('@/views/merchant-manage/Index.vue') // 商户管理
const MerchantAdd = () => import('@/views/merchant-manage/Add.vue')
const UserManage = () => import('@/views/user-manage/Index.vue') // 用户管理
const OrderManage = () => import('@/views/order-manage/Index.vue') // 订单管理
const OrderDetail = () => import('@/views/order-manage/Detail.vue') // 订单详情
const GoodsInformation = () => import('@/views/goods-manage/Information.vue') // 商品信息
const GoodsAdd = () => import('@/views/goods-manage/Add.vue') // 添加商品
const GoodsSort = () => import('@/views/goods-manage/Sort.vue') // 商品分类
const SortAdd = () => import('@/views/goods-manage/SortAdd.vue') // 类目添加
const Coupon = () => import('@/views/marketing/Coupon.vue') // 优惠券
const Couponadd = () => import('@/views/marketing/AddCoupon.vue')
// const Credits = () => import('@/views/marketing/Credits.vue') // 积分

Vue.use(Router)

// 所有权限通用路由表
export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {path: '/404', component: P404, hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      component: Index,
      name: 'index',
      meta: { title: '首页', roles: ['admin', 'merchant'] }
    }]
  }
]

export default new Router({
  routes: constantRouterMap
})

// 需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/merchant',
    component: Layout,
    name: 'merchant',
    redirect: '/merchant/index',
    meta: { title: '商户管理',roles: ['admin'] },
    children: [{
      path: 'index',
      component: MerchantManage,
      name: 'merchantManage',
      meta: { title: '商户信息', roles: ['admin'] }
    }, {
      path: 'addMerchant',
      component: MerchantAdd,
      name: 'merchantAdd',
      meta: { title: '添加商户', roles: ['admin'] }
    }, {
      path: 'editMerchant',
      component: MerchantAdd,
      name: 'merchantEdit',
      meta: { title: '修改商户', roles: ['admin'] },
      hidden: true
    }]
  }, {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: { roles: ['merchant'] },
    children: [{
      path: 'index',
      component: UserManage,
      name: 'userManage',
      meta: { title: '用户管理', roles: ['merchant'] }
    }]
  }, {
    path: '/order',
    component: Layout,
    redirect: '/order/unfinished',
    meta: { title: '订单管理', roles: ['merchant'] },
    children: [{
      path: 'unfinished',
      component: OrderManage,
      name: 'orderUnfinished',
      meta: { title: '未完成订单', roles: ['merchant'] }
    }, {
      path: 'history',
      component: OrderManage,
      name: 'orderHistory',
      meta: { title: '历史订单', roles: ['merchant'] }
    }, {
      path: 'unfinished-detail',
      component: OrderDetail,
      name: 'unfinishedDetail',
      meta: { title: '未完成订单详情', roles: ['merchant'] },
      hidden: true,
    }, {
      path: 'history-detail',
      component: OrderDetail,
      name: 'historyDetail',
      meta: { title: '历史订单详情', roles: ['merchant'] },
      hidden: true,
    }]
  }, {
    path: '/goods',
    component: Layout,
    name: 'goods',
    redirect: '/goods/index',
    meta: {title: '商品管理', roles: ['merchant']},
    children: [{
      path: 'index',
      component: GoodsInformation,
      name: 'goodsInformation',
      meta: { title: '商品信息', roles: ['merchant'] }
    }, {
      path: 'add',
      component: GoodsAdd,
      name: 'goodsAdd',
      meta: { title: '添加商品', roles: ['merchant'] }
    }, {
      path: 'edit',
      component: GoodsAdd,
      name: 'goodsEdit',
      meta: { title: '修改商品', roles: ['merchant'] },
      hidden: true
    }, {
      path: 'sort',
      component: GoodsSort,
      name: 'goodsSort',
      meta: { title: '类目管理', roles: ['merchant'] }
    }, {
      path: 'addSort',
      component: SortAdd,
      name: 'sortAdd',
      meta: { title: '添加类目', roles: ['merchant'] }
    }, {
      path: 'editSort',
      component: SortAdd,
      name: 'sortEdit',
      meta: { title: '修改类目', roles: ['merchant'] },
      hidden: true
    }]
  }, {
    path: '/marketing',
    component: Layout,
    name: 'marketing',
    redirect: '/marketing/coupon',
    meta: { title: '营销推广', roles: ['merchant'] },
    children: [{
      path: 'coupon',
      component: Coupon,
      name: 'coupon',
      meta: { title: '优惠券', roles: ['merchant'] }
    },{
			path:'couponadd',
			component:Couponadd,
			name:'couponadd',
			meta: { title: '添加优惠券', roles: ['merchant'] },
			hidden: true
		},{
			path:'couponedit',
			component:Couponadd,
			name:'couponedit',
			meta: { title: '修改优惠券', roles: ['merchant'] },
			hidden: true
		}]
  }, 
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  }
]
