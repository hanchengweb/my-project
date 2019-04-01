import request from '@/utils/request'

export function userLogin(payload) {
  return request({
    url: '/wxAdmin/login',
    method: 'get',
    params: {
      adminAccount: payload.userName,
      adminPassword: payload.pwd
    }
  })
}

export function getInfo() {
  return request({
    url: '/wxAdmin/getAdminPermission',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/wxAdmin/logout',
    method: 'get',
  })
}