import request from '@/utils/request'
export function queryUser(payload) {
  return request({
    url: '/wxAdmin/listWxUser',
    method: 'get',
    params: {
			page: payload.page,
			size: payload.size
    }
  })
}

export function queryUserByKeyword(payload) {
  return request({
    url: '/wxAdmin/searchWxUser',
    method: 'get',
    params: {
			page: payload.page,
			size: payload.size,
			keyword:payload.keyword
    }
  })
}

export function usePoint(payload) {
  return request({
    url: '/wxAdmin/usePoint',
    method: 'get',
    params: {
			openId: payload.openid,
			point: payload.count,
			remarks:null
    }
  })
}

