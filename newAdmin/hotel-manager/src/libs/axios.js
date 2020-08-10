import Axios from 'axios'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
import { message } from 'ant-design-vue'
import { isString } from '@/libs/tool'

export const loginOut = () => {
  Cookies.remove(TOKEN_KEY)
  window.location.href = '/#/login'
}
const localHref=window.location.href

let baseURL = process.env.API_ROOT
if(process.env.NODE_ENV=='development'){
  baseURL = process.env.API_ROOT
}else{
  if(localHref.indexOf('power.hztaijue.com')!=-1){
    baseURL='http://power.hztaijue.com/api/'
  }else{
    baseURL="http://"+localHref.split('/')[2]+"/api/"
  }
}
console.log(baseURL)
const CancelToken = Axios.CancelToken
let cancel

class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }

  getUrlFormData (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret.substring(0, ret.length - 1)
  }

  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }

  // 请求拦截
  interceptors (instance, url, type, msg, options) {
    let _this = this
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        /* config.headers = {
                        'Content-Type': 'multipart/form-data'
                    }; */
        config.headers['Content-Type'] =
          type || 'application/x-www-form-urlencoded'
        if (!config.url.includes('/login')) {
          config.headers['token'] = Cookies.get(TOKEN_KEY)
          // config.headers['token'] = 'test_123'
        }
        if (!type) {
          if (config.method || options.formUrl) {
            config.url = `${config.url}?${_this.getUrlFormData(config.data)}`
          } else {
            config.transformRequest = [
              function (data) {
                return _this.getUrlFormData(data)
              }
            ]
          }
        }
        if (config.url.includes('/root/menu/tree')) {
          config.url += `&token=${Cookies.get(TOKEN_KEY)}`
        }
        /// /////////////////////
        // config.headers['token'] = 'test_123'
        /// ///////////////////////
        config.doneMsg = msg || ''
        // Spin.show()
        // 在发送请求之前做些什么
        config.cancelToken = new CancelToken(function excutor (c) {
          // 一个处理函数接受一个cancel函数作为参数
          cancel = c
        })
        return config
      },
      error => {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      res => {
        let { data } = res
        const is = this.destroy(url)
        if (!is) {
          setTimeout(() => {
            // Spin.hide()
          }, 500)
        }
        if (url.indexOf('analysis') > -1) data = res.data
        if (!(data instanceof Blob)) {
          if (data.code !== 200) {
            // 后端服务在个别情况下回报201，待确认
            if (data.code === 401) {
              Cookies.remove(TOKEN_KEY)
              // cancel && cancel()
              window.location.href = '/#/login'
              message.destroy()
              message.error('未登录，或登录失效，请登录')
              return false
            } else if (data.data) {
              if (isString(data.data)) {
                message.destroy()
                message.error(data.data)
                return false
              } else {
                return {
                  showTip: true,
                  data: data.data
                }
              }
            } else if (!data.data) {
              message.destroy()
              message.error(`系统出错了!!!错误码:${data.code}`)
              return false
            }
          } else {
            if (res.config.doneMsg) {
              message.success(res.config.doneMsg)
            }
            return data
          }
        }
        // return data
      },
      error => {
        // cancel && cancel()
        console.log('接口失败')
        message.destroy()
        message.error('服务内部错误')
        console.log(error)
        // 对响应错误做点什么
        return Promise.reject(error)
      }
    )
  }

  // 创建实例
  create (url) {
    // const base = url.indexOf('root') > -1 ? baseURL : 'http://192.168.1.154:8080/'
    // const base = url.indexOf('root') > -1 ? baseURL : 'http://192.168.1.229:8080/'
    // const base = url.indexOf('analysis') > -1 ? `https://easy-mock.com/mock/5c8b748d7e5175085b10a6f3/` : baseURL
    const base = baseURL

    let conf = {
      baseURL: base,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }

  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }

  // 请求实例
  request (options) {
    // let url = options.url, arr = ['room', 'hotel', 'terminal', 'modbus']
    // arr.map(item => {
    // 	if (url.indexOf(`${item}user`) > -1) {
    // 		url=url.replace(`${item}user`,`${item}`)
    // 	}
    // })

    var instance = this.create(options.url)
    this.interceptors(instance, options.url, options.type, options.msg, options)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}

export default httpRequest
