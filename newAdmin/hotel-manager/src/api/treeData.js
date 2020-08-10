import {
  getData
} from '@/api/common'

export const getTree = (url, data) => {
  return getData({
    name: url,
    data: data
  })
};
