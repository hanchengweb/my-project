import request from '@/utils/request'

export function addMerchant(payload) {
  return request({
    url: '/wxAdmin/insertWxAdmin',
    method: 'GET',
    params: {
			adminAccount: payload.adminAccount,
			adminPassword: payload.adminPassword,
			adminName:payload.adminName,
			telephone:payload.adminTelephone,
			frozen:payload.adminFrozen,
			shopName:payload.shopName,
			shopPlace:payload.adminShopPlace,
			permission:0	
    }
  })
}

export function queryMerchant(payload) {
  return request({
    url: '/wxAdmin/listWxAdmin',
    method: 'get',
    params: {
       page:payload.page,
			 size:payload.size
    }
  })
}
export function frozenMerchant(payload) {
  return request({
    url: '/wxAdmin/changeWxAdminFrozen',
    method: 'get',
    params: {
       adminAccount: payload.adminAccount,
			 frozen:payload.frozen,
    }
  })
}
export function updateMerchant(payload) {
  return request({
    url: '/wxAdmin/updateWxAdmin',
    method: 'get',
    params: {
      adminAccount: payload.adminAccount,
      adminPassword: payload.adminPassword,
			adminName:payload.adminName,
			telephone:payload.adminTelephone,
			frozen:payload.adminFrozen,
			shopName:payload.shopName,
			shopPlace:payload.adminShopPlace,
			permission:0
    }
  })
}
export function deleteMerchant(payload) {
  return request({
    url: '/wxAdmin/deleteWxAdmin',
    method: 'get',
    params: {
			adminAccount: payload.adminAccount,
    }
  })
}

export function obtainMerchant(payload) {
  return request({
    url: '/wxAdmin/getWxAdminByAccount',
    method: 'get',
    params: {
			adminAccount: payload.adminAccount,
    }
  })
}

export function queryAdminByKeyword(payload) {
  return request({
    url: '/wxAdmin/searchWxAdmin',
    method: 'get',
    params: {
			page: payload.page,
			size: payload.size,
			keyword:payload.keyword
    }
  })
}