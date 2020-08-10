import { getToken, getClientId } from '@/utils/user'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

fly.config.timeout = 1000 * 30
// fly.config.baseURL = 'http://apid'
// fly.config.baseURL = 'http://192.168.1.95:80/'
fly.config.baseURL = 'https://www.hztaijue.com/'
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  // config.headers['X-Tag'] = 'flyio'
  // config.headers['content-type'] = 'application/x-www-form-urlencoded'
  // // 寻找vuex是否accessToken,如果存在添加到请求的参数上
  // let token = store.getters.accessToken
  if (getToken()) {
    config.headers['token'] = getToken()
  }
  if (getClientId()) {
    config.headers['clientid'] = getClientId()
  }
  // config.headers['token'] = getToken()
})

fly.interceptors.response.use(
  response => {
    let responseUrl = response.request.url
    if (response.data.code !== 200) {
      if (response.data.data !== '没有登录或token已经失效，请重新登录.') {
        if (responseUrl.indexOf('/hotel/lodger/check/checkin') !== -1) {
          wx.showToast({
            icon: 'none',
            title: response.data.data,
            duration: 5000
          })
        } else {
          wx.showModal({
            title: '信息提示',
            content: response.data.data,
            success (res) {
              if (res.confirm) {
                console.log('用户点击取消')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          // wx.showToast({
          //   icon: 'none',
          //   title: response.data.data,
          //   duration: 5000
          // })
        }
      }
      return 400
    } else {
      return response.data.data
    }
  },
  err => {
    if (err.status === 0) {
      return '网络连接异常'
    } else if (err.status === 1) {
      return '网络连接超时'
    } else if (err.status === 401) {
      return '用户未登录'
    } else {
      if (err.response.data.message) {
        return err.response.data.message
      } else {
        return '请求数据失败,请稍后再试'
      }
    }
    // Do something with response error
  }
)
export default fly
