import {
  getData
} from '@/api/common'

export const getTreeSelectData = (url, data) => {
  return getData({
    name: url,
    data: data
  })
};
