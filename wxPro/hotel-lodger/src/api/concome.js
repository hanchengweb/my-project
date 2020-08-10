import fly from '../server/fly'

const aipLodger = 'api/hotel-lodger'
// 获取未使用
export function getNocoupon (param) {
  return fly.get(
    aipLodger +
      `/hotel/coupon/consumer/unused/list?userNum=${param.userNum}&page=${
        param.page
      }&size=${param.size}`
  )
}
// 获取已使用
export function getYetcoupon (param) {
  return fly.get(
    aipLodger +
      `/hotel/coupon/consumer/used/list?userNum=${param.userNum}&page=${
        param.page
      }&size=${param.size}`
  )
}
// 获取已经过期
export function getOvercoupon (param) {
  return fly.get(
    aipLodger +
      `/hotel/coupon/consumer/expired/list?userNum=${param.userNum}&page=${
        param.page
      }&size=${param.size}`
  )
}
// 获取二维码图片
export const getOneInfoimg = param => {
  return (
    fly.config.baseURL +
    `api/hotel-lodger/hotel/coupon/consumer/readQRImage?userNum=${
      param.userNum
    }&couponCode=${param.couponCode}&clientid=${param.clientid}&token=${
      param.token
    }`
  )
}
