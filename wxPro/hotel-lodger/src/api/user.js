import fly from '../server/fly'
import { getDay } from '@/utils/date'
const aipLodger = 'api/hotel-lodger'
const aipImgUp = 'api/hotel-lodger-123'
const aipManage = 'api/hotel-manager'
const aipLodgerW = 'api/hotel-lodger789'

/* 用户 */
// 获取token
export const readToken = param => {
  return fly.get(aipLodger + '/boot/lodger/readToken', param)
}
// 微信用户Code认证登录
export const doAuth = param => {
  return fly.get(aipLodger + '/hotel/lodger/auth/doAuth2', param)
}
// 用户非敏感信息
export const readInsensitive = param => {
  return fly.get(aipLodger + '/hotel/lodger/user/readInsensitive', param)
}
// 用户非敏感信息修改
export const doAuthLogin = param => {
  return fly.get(aipLodger + '/hotel/lodger/user/doAuthLogin', param)
}
// 绑定用户微信信息
export const bindWxUserInfo = param => {
  return fly.post(
    aipLodger + `/hotel/lodger/user/bindWxUserInfo?userNum=${param.userNum}`,
    param
  )
}
// 更新用户昵称
export const updateNickname = param => {
  return fly.post(
    aipLodger +
      '/hotel/lodger/user/updateNickname?nickname=' +
      param.nickname +
      '&userNum=' +
      param.userNum,
    param
  )
}
// 更新用户性别
export const updateSex = param => {
  return fly.post(
    aipLodger +
      '/hotel/lodger/user/updateSex?sex=' +
      param.sex +
      '&userNum=' +
      param.userNum,
    param
  )
}
// 用户头像更新上传
export const uploadHeadImage =
  fly.config.baseURL + aipLodger + '/hotel/lodger/user/uploadHeadImage'
// 读取用户头像
export const headimgUrl = param => {
  return (
    fly.config.baseURL +
    aipLodger +
    '/hotel/lodger/user/readHeadImage?clientid=' +
    param.clientid +
    '&token=' +
    param.token +
    '&imgCode=' +
    param.imgCode +
    '&userNum=' +
    param.userNum +
    '&t=' +
    new Date()
  )
}
// 读取酒店图片
export const hotelimgUrl = param => {
  return (
    fly.config.baseURL +
    `api/hotel-manager/hotel/manager/hotelEnviroImage/readImage/${
      param.id
    }?clientid=${param.clientid}&token=${param.token}`
  )
}
export const headimgUrl1 = param => {
  return (
    fly.config.baseURL +
    aipLodger +
    '/hotel/lodger/user/readHeadImage?clientid=' +
    param.clientid +
    '&token=' +
    param.token +
    '&imgCode=' +
    param.imgCode
  )
}
export const headimgUrl2 = param => {
  return (
    fly.config.baseURL +
    aipLodger +
    '/hotel/lodger/user/readHeadImage2?clientid=' +
    param.clientid +
    '&token=' +
    param.token +
    '&imgCode=' +
    param.imgCode
  )
}
/* 积分 */

// 当前可用积分
export const usableCredit = param => {
  return fly.get(aipLodger + '/hotel/lodger/credit/readEffectiveCredit', param)
}
// 积分收入（默认查询）
export const readIncome = param => {
  return fly.get(aipLodger + '/hotel/lodger/credit/readIncome', param)
}
// 积分支出
export const readExpend = param => {
  return fly.get(aipLodger + '/hotel/lodger/credit/readExpend', param)
}
// 积分收入（按时间搜索）
export const readIncomeByTime = param => {
  return fly.get(aipLodger + '/hotel/lodger/credit/readIncomeByTime', param)
}
// 积分支出（按时间搜索）
export const readExpendByTime = param => {
  return fly.get(aipLodger + '/hotel/lodger/credit/readExpendByTime', param)
}

/* 用户二维码 */

// 读取用户二维码标识uuid
export const readQRCode = param => {
  return fly.get(aipLodger + '/hotel/lodger/user/readQRCode', param)
}
// 读取用户二维码
export const readQRImage = param => {
  return (
    fly.config.baseURL +
    aipLodger +
    '/hotel/lodger/user/readQRImage?clientid=' +
    param.clientid +
    '&token=' +
    param.token +
    '&userNum=' +
    param.userNum +
    '&width=' +
    param.width +
    '&height=' +
    param.height +
    '&uuid=' +
    param.uuid +
    '&t=' +
    param.date
  )
}
// 扫码签驻
export const checkin = param => {
  return fly.post(
    aipLodger +
      '/hotel/lodger/check/checkin?uuid=' +
      param.uuid +
      '&hotelId=' +
      param.hotelId +
      '&roomId=' +
      param.roomId +
      '&days=' +
      param.days,
    param
  )
}
// 查看当前二维码的扫描状态
export const findQRScanStatus = param => {
  return fly.get(aipLodger + '/hotel/lodger/user/findQRScanStatus', param)
}

/* 活动 */

// 根据位置读取首页图片信息
export const readActivity = param => {
  return fly.get(
    aipLodger + '/hotel/lodger/activity/readAcitivityImgInfoByLocation',
    param
  )
}
// 查询具体活动详情
export const readActivityInfo = param => {
  return fly.get(
    aipLodger + '/hotel/lodger/activity/readAcitivityDetail',
    param
  )
}
// 读取首页图片
export const activityImg = param => {
  return (
    fly.config.baseURL +
    aipLodger +
    '/hotel/lodger/activity/readAcitivityImg?clientid=' +
    param.clientid +
    '&token=' +
    param.token +
    '&activityImgCode=' +
    param.imgCode +
    '&t=' +
    param.date
  )
}

/* 系统相关 */

// 读取个人中心背景图
export const readBgImgOfMe = param => {
  return (
    fly.config.baseURL +
    aipLodger +
    '/hotel/lodger/system/readBgImgOfMe?clientid=' +
    param.clientid +
    '&token=' +
    param.token +
    '&t=' +
    getDay()
  )
}
// 读取积分明细背景图
export const readBgImgOfCreditDetail = param => {
  return (
    fly.config.baseURL +
    aipLodger +
    '/hotel/lodger/system/readBgImgOfCreditDetail?clientid=' +
    param.clientid +
    '&token=' +
    param.token +
    '&t=' +
    getDay()
  )
}
// 读取用户章程
export const readRules = param => {
  return fly.get(aipLodger + '/hotel/lodger/system/readRules', param)
}
// 查看用户未使用(可使用)的消费劵数量
export const count = param => {
  return fly.get(aipLodger + '/hotel/coupon/consumer/unused/count', param)
}
