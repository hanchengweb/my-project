import request from '@/utils/request'
export function queryMerchantCoupon(payload) {
  return request({
    url: '/wxAdmin/listCoupon',
    method: 'get',
    params: {
			page: payload.page,
			size: payload.size
    }
  })
}


export function insertMerchantCoupon(data) {
  return request({
    url: '/wxAdmin/insertCoupon',
    method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
    data: data
  })
}



export function updateMerchantCoupon(data) {
    return request({
        url: '/wxAdmin/updateCoupon',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: data
    })
}

export function obtainMerchantcoupon(payload) {
  return request({
    url: '/wxAdmin/getCouponInfo',
    method: 'get',
    params: {
          id:payload.id
    }
  })
}

export function deleteMerchantCoupon(payload) {
  return request({
    url: '/wxAdmin/getCouponInfo',
    method: 'get',
    params: {
          out:payload.out
    }
  })
}


