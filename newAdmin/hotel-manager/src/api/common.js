import axios from '@/libs/api.request'

import store from '@/store'

import { getPath } from '@/libs/util'

export const getData = params => {
  params.data = params.data || {}
  let obj = getPath(params.name, params.data.id)
  if (obj.url.indexOf('analysis') > -1) {
    params.data = { ...params.data, hotelid: store.state.common.choseHotel.id }
  }
  if (params.data.noHotelIdStatus) {
    delete params.data.hotelid
    delete params.data.noHotelIdStatus
  }
  // console.log(params)
  // if (params.name === 'p_adunit_queryToHotel_get') {
  //   params.type = 'application/json;charset=UTF-8'
  // }
  return axios.request({
    url: obj.url,
    method: obj.method,
    data: params.data,
    type: params.type,
    msg: params.msg,
    formUrl: params.formUrl
  })
}
export const getUrlData = (url, data) => {
  // console.log(url)
  return getData({
    name: url,
    data: data
  })
}
