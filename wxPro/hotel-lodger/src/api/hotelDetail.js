import fly from '../server/fly'

const aipLodger = 'api/hotel-lodger'

// 获取酒店信息
export function getInfo (param) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/hotel/readHotel?hotelid=${param.hotelId}&userNum=${
        param.userNum
      }`
  )
}

// 获取酒店详细信息
export function getAllInfo (param) {
  return fly.get(
    aipLodger + `/hotel/lodger/hotel/readHotelInfo?hotelid=${param}`
  )
}

// 酒店图片
export function getAllInfoimg (param) {
  return fly.get(
    `api/hotel-manager/hotel/manager/hotelEnviroImage/readHotelImage/${param}`
  )
}

// 酒店图片
export const getOneInfoimg = param => {
  return (
    fly.config.baseURL +
    `api/hotel-manager/hotel/manager/hotelEnviroImage/readHotelImage?id=${
      param.id
    }&clientid=${param.clientid}&token=${param.token}`
  )
}

// 优惠劵图片
export const getOneInfoimg1 = param => {
  return (
    fly.config.baseURL +
    `api/hotel-lodger/hotel/lodger/hotel/readGoodsImage?category=${
      param.id
    }&clientid=${param.clientid}&token=${param.token}`
  )
}

// 点击收藏
export function postCollect (param) {
  return fly.post(
    aipLodger +
      `/hotel/lodger/user/doFavourite/?userNum=${param.userNum}&hotelid=${
        param.hotelId
      }`
  )
}

// 取消收藏
export function cancelCollect (param) {
  return fly.delete(
    aipLodger +
      `/hotel/lodger/user/cancelFavourite/?userNum=${param.userNum}&hotelid=${
        param.hotelId
      }`
  )
}

// 查询酒店可用优惠劵列表
export function queryCoupon (param) {
  return fly.get(
    aipLodger +
      `/hotel/coupon/consumtml/findByHotelIdAndOEQT?companyCode=${
        param.companyCode
      }&hotelId=${param.hotelId}`
  )
}

// 劵兑换
export function getExchange (param) {
  return fly.post(
    aipLodger +
      `/hotel/coupon/consumer/exchangeCouponOfHotel?hotelId=${
        param.hotelId
      }&userNum=${param.userNum}&tpmNum=${param.tpmNum}&companyCode=${
        param.companyCode
      }`
  )
}
