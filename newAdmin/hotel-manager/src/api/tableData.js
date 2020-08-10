import {
  getData
} from '@/api/common'

export const getTable = (url, data, type) => {
  if (type) {
    return getData({
      name: url,
      data: data,
      type: type
    })
  } else {
    return getData({
      name: url,
      data: data
    })
  }
}
