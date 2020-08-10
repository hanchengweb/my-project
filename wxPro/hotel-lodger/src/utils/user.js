export function getToken () {
  return wx.getStorageSync('token')
}
export function setToken (token) {
  return wx.setStorageSync('token', token)
}
export function getClientId () {
  return wx.getStorageSync('ClientId')
}
export function setClientId (ClientId) {
  return wx.setStorageSync('ClientId', ClientId)
}
export function getUserInfo () {
  return wx.getStorageSync('userInfo')
}
export function setUserInfo (userInfo) {
  return wx.setStorageSync('userInfo', userInfo)
}
export function removeUserInfo () {
  return wx.removeStorageSync('userInfo')
}
export function setUserNum (userNum) {
  return wx.setStorageSync('userNum', userNum)
}
export function getUserNum () {
  return wx.getStorageSync('userNum')
}
// 判断是否已定位过
export function getLocation () {
  return wx.getStorageSync('Location')
}
export function setLocation (Location) {
  return wx.setStorageSync('Location', Location)
}
export function removeLocation () {
  return wx.removeStorageSync('Location')
}
