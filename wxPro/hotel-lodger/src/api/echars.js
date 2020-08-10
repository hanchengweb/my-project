import fly from '../server/fly'

const aipLodger = 'api/hotel-lodger'
// 获取功率曲线
export function getPower1 (param) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/check/readPowerCurve?roomid=${param.roomid}&inTime=${
        param.inTime
      }`
  )
}
// 获取累计用电
export function getUserpower (param) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/check/readElectCurve?roomid=${param.roomid}&inTime=${
        param.inTime
      }`
  )
}
