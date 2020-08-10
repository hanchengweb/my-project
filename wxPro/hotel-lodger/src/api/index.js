import fly from '../server/fly'
import { getDay } from '@/utils/date'
const aipLodger = 'api/hotel-lodger'

// 图片列表
export const imgList = param => {
  return fly.get(aipLodger + '/hotel/lodger/home/readImageList', param)
}

// 读取图片
export const readImg = param => {
  return (
    fly.config.baseURL +
    `api/hotel-lodger/hotel/lodger/home/readImage/${param.id}?clientid=${
      param.clientid
    }&token=${param.token}`
  )
}

// 新闻列表
export const newList = param => {
  return fly.get(aipLodger + '/hotel/lodger/home/readNewsList', param)
}

// 读取新闻图片
export const readnewImg = param => {
  return (
    fly.config.baseURL +
    `api/hotel-lodger/hotel/lodger/home/readNewsImage/${param.id}?clientid=${
      param.clientid
    }&token=${param.token}`
  )
}

// 新闻详情
export const newDetail = param => {
  return fly.get(aipLodger + `/hotel/lodger/home/readNews?id=${param}`)
}
