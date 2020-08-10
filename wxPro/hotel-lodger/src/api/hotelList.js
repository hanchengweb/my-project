import fly from '../server/fly'
const aipLodger = 'api/hotel-lodger'
const aipManage = 'api/hotel-manager'
const aipCoupon = 'api/hotel-coupon'

// 酒店列表
export const readHotels = param => {
  return fly.get(aipLodger + '/hotel/lodger/hotel/readHotels', param)
}
// 酒店星级
export const dictionary = param => {
  return fly.get(aipManage + '/hotel/manager/common/dictionary', param)
}
// 区域位置
export const readDistrict = param => {
  return fly.get(aipLodger + '/hotel/lodger/hotel/readDistrict', param)
}
// 酒店类型
export const readHotelType = param => {
  return fly.get(aipManage + '/hotel/manager/common/dictionary', param)
}
// 品牌
export const hotelBrand = param => {
  return fly.get(aipManage + '/hotel/manager/common/hotelBrand', param)
}
// 酒店图片
export const readRoomImage = param => {
  return (
    fly.config.baseURL +
    aipManage +
    '/hotel/manager/hotelEnviroImage/readImage/' +
    param.hotelid +
    '?token=' +
    param.token
  )
}
// 收藏列表
export const readCollections = param => {
  return fly.get(aipLodger + '/hotel/lodger/user/readFavourites', param)
}
// 删除收藏
export const delectCollect = param => {
  return fly.delete(aipLodger + '/hotel/lodger/user/cancelFavourite', param)
}
// 兑换记录列表
export const exchangerecord = param => {
  return fly.get(
    aipManage + '/hotel/coupon/consumer/exchangerecord/list',
    param
  )
}
// 获取定位信息
export const locationToAddress = param => {
  return fly.get(aipManage + '/hotel/manager/location/locationToAddress', param)
}
