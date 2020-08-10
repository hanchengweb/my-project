import fly from '../server/fly'

const aipLodger = 'api/hotel-lodger'
// 获取酒店信息
export function getInfo (param) {
  return fly.get(
    aipLodger + `/hotel/lodger/check/readCheckRoomInfo?userNum=${param.userNum}`
  )
}
// 获取碳积分收益
export function getEarnings (param) {
  return fly.get(
    aipLodger + `/hotel/lodger/check/readCreditIncome?userNum=${param.userNum}`
  )
}
// 查询用电情况
export function getPower (param) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/check/readPowerInfoByDate?checkNum=${
        param.checkNum
      }&userNum=${param.userNum}`
  )
}
// 查询最低用电量
export function getLowuser (param) {
  return fly.get(
    aipLodger + `/hotel/lodger/check/readMinElectOfRoomMonth?roomid=${param}`
  )
}

// 获取用户是否签驻
export function checkIfIn (param) {
  return fly.get(
    aipLodger + `/hotel/lodger/check/checkIfIn?userNum=${param.userNum}`
  )
}

// 用户签退
export function checkOutin (param) {
  return fly.delete(
    aipLodger + `/hotel/lodger/check/checkout?checkNum=${param}`
  )
}

// 获取最高功率
export function getMaxpower (param) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/check/readMaxPower?checkNum=${param.checkNum}&userNum=${
        param.userNum
      }`
  )
}

// 获取个人平均能耗
export function getAvgpower (param, param1) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/check/readAvgEnergyConsumer?roomid=${param}&inTime=${param1}`
  )
}

// 获取签驻记录
export function getInrecord (param) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/check/readCheckHistory?checkinBeginTime=${
        param.checkinBeginTime
      }&checkinEndTime=${param.checkinEndTime}&checkoutBeginTime=${
        param.checkoutBeginTime
      }&checkoutEndTime=${param.checkoutEndTime}&userNum=${param.userNum}`
  )
}
// 本次节能
export function energyPower (param) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/check/savingElect?roomid=${param.roomid}&hotelid=${
        param.hotelid
      }&inTime=${param.inTime}`
  )
}
// 获取概要信息
export function getroomInfor (param) {
  return fly.get(
    aipLodger + `/hotel/lodger/check/readAvgConsumer?roomid=${param}`
  )
}
