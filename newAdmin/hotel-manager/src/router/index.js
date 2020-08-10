import Vue from 'vue'
import Router from 'vue-router'
import { getToken, getCompany } from '@/libs/util'
import { getAccess } from '@/api/menu'
import store from '@/store'

Vue.use(Router)
const LOGIN_PAGE_NAME = 'Login'
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/view/login/login')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/view/errors/404')
    },
    {
      path: '/analysis',
      name: 'Analysis',
      redirect: '/analysis/main',
      component: () => import('@/view/main/main'),
      children: [
        {
          path: 'main',
          name: 'AnalysisMain',
          meta: {},
          component: () => import('@/view/hotelAnalysis/main')
        },
        {
          path: 'readRoomPoint',
          name: 'readRoomPoint',
          meta: {
            name: '电量点位查询'
          },
          component: () => import('@/view/analysis/actual/readRoomPoint')
        },
        {
          path: 'readCollectData',
          name: 'readCollectData',
          meta: {
            name: '采集数据查询'
          },
          component: () => import('@/view/analysis/actual/readCollectData')
        },
        {
          path: 'comparedEle',
          name: 'comparedEle',
          meta: {
            name: '电量对比查询'
          },
          component: () => import('@/view/analysis/actual/comparedEle')
        },
        {
          path: 'readTerminalData',
          name: 'readTerminalData',
          meta: {
            name: '终端数据查询'
          },
          component: () => import('@/view/analysis/actual/readTerminalData')
        },
        {
          path: 'readEleData',
          name: 'readEleData',
          meta: {
            name: '电量数据查询'
          },
          component: () => import('@/view/analysis/actual/readEleData')
        },
        {
          path: 'readEnergyGrade',
          name: 'readEnergyGrade',
          meta: {
            name: '能耗等级查询'
          },
          component: () => import('@/view/analysis/statistics/readEnergyGrade')
        },
        {
          path: 'readEnergyGradeAnalysis',
          name: 'readEnergyGradeAnalysis',
          meta: {
            name: '能耗等级分析'
          },
          component: () =>
						import('@/view/analysis/statistics/readEnergyGradeAnalysis')
        },
        {
          path: 'readHotelYear',
          name: 'readHotelYear',
          meta: {
            name: '电量统计报表'
          },
          component: () => import('@/view/analysis/statistics/readHotelYear')
        },
        {
          path: 'readRoomStatus',
          name: 'readRoomStatus',
          meta: {
            name: '房态分析'
          },
          component: () => import('@/view/analysis/statistics/readRoomStatus')
        },
        {
          path: 'largerPowerAnalysis', /// hotel/analysis/statistics/largerPowerAnalysis
          name: 'largerPowerAnalysis',
          meta: {
            name: '房间最大功率分析'
          },
          component: () =>
						import('@/view/analysis/statistics/largerPowerAnalysis')
        },
        {
          path: 'emptyAnalysis',
          name: 'emptyAnalysis',
          meta: {
            name: '房间空耗电分析'
          },
          component: () => import('@/view/analysis/statistics/emptyAnalysis')
        },
        {
          path: 'powerFactorAnalysis', /// hotel/analysis/statistics/powerFactorAnalysis
          name: 'powerFactorAnalysis',
          meta: {
            name: '进行功率因子分析'
          },
          component: () =>
						import('@/view/analysis/statistics/powerFactorAnalysis')
        },
        {
          path: 'warnInfo1',
          name: 'warnInfo1',
          meta: {
            name: '告警数据查询1'
          },
          component: () => import('@/view/analysis/warn/warnInfo1')
        },
        {
          path: 'warnInfo2',
          name: 'warnInfo2',
          meta: {
            name: '告警数据查询2'
          },
          component: () => import('@/view/analysis/warn/warnInfo2')
        },
        {
          path: 'warnInfo3',
          name: 'warnInfo3',
          meta: {
            name: '告警数据查询3'
          },
          component: () => import('@/view/analysis/warn/warnInfo3')
        },
        {
          path: 'programSignCurrent', //  当前签驻
          name: 'programSignCurrent',
          component: () => import('@/view/childViewsWxlsms/programSignCurrent')
        },
        {
          path: 'programSignHistory', //  历史签驻
          name: 'programSignHistory',
          component: () => import('@/view/childViewsWxlsms/programSignHistory')
        },
        {
          path: 'programUser', //  用户查询
          name: 'programUser',
          component: () => import('@/view/childViewsWxlsms/programUser')
        },
        {
          path: 'programCredit', //  酒店积分
          name: 'programCredit',
          component: () => import('@/view/childViewsWxlsms/programCredit')
        }
      ]
    },
    {
      path: '/mySpace',
      name: 'mySpace',
      redirect: '/mySpace/main',
      component: () => import('@/view/main/main'),
      children: [
        {
          path: 'main',
          name: 'mySpace',
          meta: {
            key: 'mySpace'
          },
          component: () => import('@/view/mySpace/mySpace')
        }
      ]
    },
    {
      path: '/extra',
      name: 'extra',
      // redirect: '/extra',
      component: () => import('@/view/main/main'),
      children: [
        {
          path: 'warnInfoHome',
          name: 'warnInfoHome',
          meta: {
            key: 'warnInfoHome',
            matchKey: 'Home'
          },
          component: () => import('@/view/childViewsExtra/warnInfo-home')
        },
        {
          path: 'roomInfoHome',
          name: 'roomInfoHome',
          meta: {
            key: 'roomInfoHome',
            matchKey: 'Home'
          },
          component: () =>
						import('@/view/childViewsExtra/roomInfo-operation-home')
        },
        {
          path: 'readDisconnectNetHome',
          name: 'readDisconnectNetHome',
          meta: {
            key: 'readDisconnectNetHome',
            matchKey: 'operationHome'
          },
          component: () =>
						import('@/view/childViewsExtra/operationHome/readDisconnectNet')
        },
        {
          path: 'readErrorPointHome',
          name: 'readErrorPointHome',
          meta: {
            key: 'readErrorPointHome',
            matchKey: 'operationHome'
          },
          component: () =>
						import('@/view/childViewsExtra/operationHome/readErrorPoint')
        },
        {
          path: 'readMissPointHome',
          name: 'readMissPointHome',
          meta: {
            key: 'readMissPointHome',
            matchKey: 'operationHome'
          },
          component: () =>
						import('@/view/childViewsExtra/operationHome/readMissPoint')
        },
        {
          path: 'readMissPointDetailHome',
          name: 'readMissPointDetailHome',
          meta: {
            key: 'readMissPointDetailHome',
            matchKey: 'operationHome'
          },
          component: () =>
						import('@/view/childViewsExtra/operationHome/readMissPointDetail')
        },
        {
          path: 'readWarnInfoHome',
          name: 'readWarnInfoHome',
          meta: {
            key: 'readWarnInfoHome',
            matchKey: 'operationHome'
          },
          component: () =>
						import('@/view/childViewsExtra/operationHome/readWarnInfo')
        }
      ]
    },
    {
      path: '/',
      name: 'Index',
      component: () => import('@/view/main/main'),
      children: [
        {
          path: 'main',
          name: 'home-main',
          meta: {
            key: 'home-main'
          },
          component: () => import('@/view/home/home')
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/home/main',
      component: () => import('@/view/main/main'),
      children: [
        {
          path: 'main',
          name: 'home-main',
          meta: {
            key: 'home-main'
          },
          component: () => import('@/view/home/home')
        }
      ]
    },
    {
      path: '/operationHome',
      name: 'operationHome',
      redirect: '/operationHome/main',
      component: () => import('@/view/main/main'),
      children: [
        {
          path: 'main',
          name: 'operationHome-main',
          meta: {
            key: 'operationHome-main'
          },
          component: () => import('@/view/home/operationHome')
        }
      ]
    },
    {
      path: '/sys',
      name: 'Sys',
      component: () => import('@/view/main/main'),
      children: [
        {
          path: 'configParameter',
          name: 'configParameter',
          component: () => import('@/view/childViews/configParameter')
        },
        {
          path: 'alarmType',
          name: 'alarmType',
          component: () => import('@/view/childViews/alarmType')
        },
        {
          path: 'CacheLoadType',
          name: 'CacheLoadType',
          component: () => import('@/view/childViews/CacheLoadType')
        },
        {
          path: 'bootDept',
          name: 'bootDept',
          component: () => import('@/view/childViewsBoot/bootDept')
        },
        {
          path: 'bootUser',
          name: 'bootUser',
          component: () => import('@/view/childViewsBoot/bootUser')
        },
        {
          path: 'bootRole', // 角色维护
          name: 'bootRole',
          component: () => import('@/view/childViewsBoot/bootRole')
        },
        {
          path: 'dictionary',
          name: 'dictionary',
          component: () => import('@/view/childViews/dictionary')
        },
        {
          path: 'proviceCity',
          name: 'proviceCity',
          component: () => import('@/view/childViews/proviceCity')
        },
        {
          path: 'company',
          name: 'company',
          component: () => import('@/view/childViews/companys')
        },
        {
          path: 'hotel', // 酒店维护
          name: 'hotel',
          component: () => import('@/view/childViews/hotel')
        },
        {
          path: 'hotelUser',
          name: 'hotelUser',
          component: () => import('@/view/childViews/hotelUser')
        },
        {
          path: 'modbus', // 通信机维护
          name: 'modbus',
          component: () => import('@/view/childViews/modbus')
        },
        {
          path: 'modbusUser',
          name: 'modbusUser',
          component: () => import('@/view/childViews/modbusUser')
        },
        {
          path: 'room',
          name: 'room',
          component: () => import('@/view/childViews/room')
        },
        {
          path: 'roomUser',
          name: 'roomUser',
          component: () => import('@/view/childViews/roomUser')
        },
        {
          path: 'terminal',
          name: 'terminal',
          component: () => import('@/view/childViews/terminal')
        },
        {
          path: 'terminalUser',
          name: 'terminalUser',
          component: () => import('@/view/childViews/terminalUser')
        },
        {
          path: 'configField',
          name: 'configField',
          component: () => import('@/view/childViews/configField')
        },
        {
          path: 'enviroImage', //  酒店环境图
          name: 'enviroImage',
          component: () => import('@/view/childViews/enviroImage')
        },
        {
          path: 'wxParameter',
          name: 'wxParameter',
          component: () => import('@/view/childViewsWx/wxParameter')
        },
        {
          path: 'wxTempalteReport',
          name: 'wxTempalteReport',
          component: () => import('@/view/childViewsWx/wxTempalteReport')
        },
        {
          path: 'wxTempalte',
          name: 'wxTempalte',
          component: () => import('@/view/childViewsWx/wxTempalte')
        },
        {
          path: 'wxWarnNote',
          name: 'wxWarnNote',
          component: () => import('@/view/childViewsWx/wxWarnNote')
        },
        {
          path: 'wxWarnSwitch',
          name: 'wxWarnSwitch',
          component: () => import('@/view/childViewsWx/wxWarnSwitch')
        },
        {
          path: 'wxUser',
          name: 'wxUser',
          component: () => import('@/view/childViewsWx/wxUser')
        },
        {
          path: 'wxBindInfo',
          name: 'wxBindInfo',
          component: () => import('@/view/childViewsWx/wxBindInfo')
        },
        {
          path: 'terminalDeveloper',
          name: 'terminalDeveloper',
          component: () => import('@/view/childViewsTerminal/terminalDeveloper')
        },
        {
          path: 'terminalStatus',
          name: 'terminalStatus',
          component: () => import('@/view/childViewsTerminal/terminalStatus')
        },
        {
          path: 'terminalVersion',
          name: 'terminalVersion',
          component: () => import('@/view/childViewsTerminal/terminalVersion')
        },
        {
          path: 'terminalHotelLogo',
          name: 'terminalHotelLogo',
          component: () => import('@/view/childViewsTerminal/terminalHotelLogo')
        },
        {
          path: 'programIndex', //  首页管理
          name: 'programIndex',
          component: () => import('@/view/childViewsWxlsms/programIndex')
        },
        {
          path: 'programActivity', //  活动配置
          name: 'programActivity',
          component: () => import('@/view/childViewsWxlsms/programActivity')
        },
        {
          path: 'programNews', //  活动配置
          name: 'programNews',
          component: () => import('@/view/childViewsWxlsms/programNews')
        },
        {
          path: 'programCarousel', //  首页轮播图管理
          name: 'programCarousel',
          component: () => import('@/view/childViewsWxlsms/programCarousel')
        },
        // {
        //   path: 'programSignCurrent', //  当前签驻
        //   name: 'programSignCurrent',
        //   component: () => import('@/view/childViewsWxlsms/programSignCurrent')
        // },
        // {
        //   path: 'programSignHistory', //  历史签驻
        //   name: 'programSignHistory',
        //   component: () => import('@/view/childViewsWxlsms/programSignHistory')
        // },
        // {
        //   path: 'programUser', //  用户查询
        //   name: 'programUser',
        //   component: () => import('@/view/childViewsWxlsms/programUser')
        // },
        // {
        //   path: 'programCredit', //  酒店积分
        //   name: 'programCredit',
        //   component: () => import('@/view/childViewsWxlsms/programCredit')
        // },
        {
          path: 'programSystem', //  系统背景图
          name: 'programSystem',
          component: () => import('@/view/childViewsWxlsms/programSystem')
        },
        {
          path: 'programHotelunit', //  酒店单位用电配置
          name: 'programHotelunit',
          component: () => import('@/view/childViewsWxlsms/programHotelunit')
        },
        {
          path: 'programUnit', //  单位用电配置
          name: 'programUnit',
          component: () => import('@/view/childViewsWxlsms/programUnit')
        },
        {
          path: 'programCreditGrade', //  酒店能耗等级阙值
          name: 'programCreditGrade',
          component: () => import('@/view/childViewsWxlsms/programCreditGrade')
        },
        {
          path: 'programCreditPlan', //  积分加速
          name: 'programCreditPlan',
          component: () => import('@/view/childViewsWxlsms/programCreditPlan')
        },
        {
          path: 'programRoomCheck', //  酒店入住统计
          name: 'programRoomCheck',
          component: () => import('@/view/childViewsWxlsms/programRoomCheck')
        },
        {
          path: 'panelEdition', //  版本管理
          name: 'panelEdition',
          component: () => import('@/view/panel/panelEdition')
        }
      ]
    },
    {
      path: '/card',
      name: 'Card',
      component: () => import('@/view/main/main'),
      children: [
        {
          path: 'platFormCard', //  商品管理
          name: 'platFormCard',
          component: () => import('@/view/platForm/platFormCard')
        },
        {
          path: 'groupCard', //  集团商品维护
          name: 'groupCard',
          component: () => import('@/view/group/groupCard')
        },
        {
          path: 'groupCardOther', //  集团商品管理
          name: 'groupCardOther',
          component: () => import('@/view/group/groupCardOther')
        },
        {
          path: 'hotelCard', //  消费券维护
          name: 'hotelCard',
          component: () => import('@/view/hotelcs/hotelCard')
        },
        {
          path: 'hotelCardOther', //  消费券管理
          name: 'hotelCardOther',
          component: () => import('@/view/hotelcs/hotelCardOther')
        },
        {
          path: 'groupCoupTemp', //  券模板维护
          name: 'groupCoupTemp',
          component: () => import('@/view/group/groupCoupTemp')
        },
        {
          path: 'groupCoupTempOther', //  券模板管理
          name: 'groupCoupTempOther',
          component: () => import('@/view/group/groupCoupTempOther')
        },
        {
          path: 'hotelExchangeOther', //  兑换记录管理
          name: 'hotelExchangeOther',
          component: () => import('@/view/hotelcs/hotelExchangeOther')
        },
        {
          path: 'hotelExchange', //  兑换记录维护
          name: 'hotelExchange',
          component: () => import('@/view/hotelcs/hotelExchange')
        },
        {
          path: 'hotelRecord', //  核销记录  酒店
          name: 'hotelRecord',
          component: () => import('@/view/hotelcs/hotelRecord')
        },
        {
          path: 'hotelRecordOther', //  核销记录 平台
          name: 'hotelRecordOther',
          component: () => import('@/view/hotelcs/hotelRecordOther')
        }
      ]
    },
    {
      path: '/advert',
      name: 'Advert',
      component: () => import('@/view/main/main'),
      children: [
        {
          path: 'managerPlan', //  平台计划审核管理
          name: 'managerPlan',
          component: () => import('@/view/platForm/managerPlan')
        },
        {
          path: 'managerPlanInfo', //  平台计划审核管理
          name: 'managerPlanInfo',
          component: () => import('@/view/platForm/managerPlanInfo')
        },
        {
          path: 'managerAdMaterial', //  平台物料审核管理
          name: 'managerAdMaterial',
          component: () => import('@/view/platForm/managerAdMaterial')
        },
        {
          path: 'managerAdMaterialInfo', //  平台物料审核管理
          name: 'managerAdMaterialInfo',
          component: () => import('@/view/platForm/managerAdMaterialInfo')
        },
        {
          path: 'platformMatter', //  平台广告物料管理
          name: 'platformMatter',
          component: () => import('@/view/platForm/platformMatter')
        },
        {
          path: 'platformSearch', //  平台广告综合查询
          name: 'platformSearch',
          component: () => import('@/view/platForm/platformSearch')
        },
        {
          path: 'platformPlan', //  平台投放计划管理
          name: 'platformPlan',
          component: () => import('@/view/platForm/platformPlan')
        },
        {
          path: 'groupMatter', //  集团广告物料管理
          name: 'groupMatter',
          component: () => import('@/view/group/groupMatter')
        },
        {
          path: 'groupPlan', //  集团广告计划管理
          name: 'groupPlan',
          component: () => import('@/view/group/groupPlan')
        },
        {
          path: 'groupSearch', //  集团广告查询
          name: 'groupSearch',
          component: () => import('@/view/group/groupSearch')
        },
        {
          path: 'hotelMatter', //  酒店广告物料管理
          name: 'hotelMatter',
          component: () => import('@/view/hotelcs/hotelMatter')
        },
        {
          path: 'hotelSearch', //  酒店广告综合查询
          name: 'hotelSearch',
          component: () => import('@/view/hotelcs/hotelSearch')
        },
        {
          path: 'hotelPlan', //  酒店广告计划管理
          name: 'hotelPlan',
          component: () => import('@/view/hotelcs/hotelPlan')
        }
      ]
    }
  ]
})
const nextFun = (next, to) => {
  const token = getToken()
  const company = getCompany()
  if (!company && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    // next({
    // 	name: 'home' // 跳转到home页
    // })

    next()
  } else if (to.path == '/') { // 将顶部菜单第一个子路由作为首页
    let firstChild = store.state.app.menuList[0]
    const subMenuList = store.state.app.subMenuList, nameX = firstChild.route[0].toLowerCase() + firstChild.route.substring(1)
    if (nameX === 'analysis') {
      next({name: 'Analysis'})// 数据管理
    } else if (!subMenuList[nameX]) {
      next({name: nameX})// 酒店运维、酒店概述
    } else {
      next({path: '/' + nameX + '/' + firstChild.children[0].children[0].route})// 卡券系统、系统管理
    }
    store.dispatch('handleCurrentName', nameX)
  } else {
    next()
  }
}
router.beforeEach((to, from, next) => {
  if (to.query && to.query.moduleid) {
    store.commit('setChoseTr', {})
    store.commit('setTreeSelect', {})
    store.commit('setTree', {})
    getAccess({ ...to.query }).then(
      res => {
        to.params.access = res.data
        nextFun(next, to)
      },
      error => {
        nextFun(next, to)
      }
    )
  } else {
    nextFun(next, to)
  }

  /* if (!token && to.name !== LOGIN_PAGE_NAME) {
        // 未登录且要跳转的页面不是登录页
        next({
            name: LOGIN_PAGE_NAME // 跳转到登录页
        })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登陆且要跳转的页面是登录页
        next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // 已登录且要跳转的页面是登录页
        next({
            name: 'home' // 跳转到home页
        })
    } else {

        next()
    } */
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location)
} // 2019.9.6 解决跳转抛出错误的问题
export default router
