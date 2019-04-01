import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/utils/auth'

const whiteList = ['/login'] // 免登录白名单，不重定向
router.beforeEach((to, from, next) => {
  NProgress.start()
  if( getToken() ) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.state.user.role) { // 用户有role
        next()
      } else { // 用户无role，需要获取role
        store.dispatch('getUserInfo').then(role => {
          store.dispatch('permission/createRoutes', {role}).then(() => {
            router.addRoutes(store.state.permission.addRouters)
            next({ ...to, replace: true })
          })
        }).catch(err => {
          store.dispatch('frontLogOut').then(() => {
            Message.error(err || '验证失败，请重新登录')
            next({ path: '/' })
          })
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) != -1) { // 在免登录白名单
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})