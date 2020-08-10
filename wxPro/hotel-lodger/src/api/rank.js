import fly from '../server/fly'

const aipLodger = 'api/hotel-lodger'
// 获取碳积分排行榜
export function getRank (param) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/check/readCreditRankList?roomid=${param.roomid}&userNum=${
        param.userNum
      }`
  )
}
// 获取用电排行榜
export function getUserpower (param, param1, param2) {
  return fly.get(
    aipLodger +
      `/hotel/lodger/check/readElectRank?roomid=${param}&inTime=${param1}&checkNum=${param2}&direction=1`
  )
}

// 用电排行榜点赞
export function postUserlike (param) {
  return fly.put(
    aipLodger +
      `/hotel/lodger/check/doElectLike?checkNum=${param.checkNum}&userNum=${
        param.userNum
      }&inTime=${param.inTime}`
  )
}

// 碳积分排行榜点赞
export function putUserlike (param) {
  return fly.put(
    aipLodger +
      `/hotel/lodger/check/doCreditLike?checkNum=${param.checkNum}&userNum=${
        param.userNum
      }&inTime=${param.inTime}&selfUserNum=${param.selfUserNum}`
  )
}
