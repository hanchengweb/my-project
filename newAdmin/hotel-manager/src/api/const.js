import { getData } from '@/api/common'
import { forEach, isArray, isJson } from '@/libs/tool'

export const getFlag = () => {
  return getData({
    name: 'r_dict_flag_get'
  }).then(res => {
    const arr = []
    res &&
			res.data &&
			res.data.length &&
			forEach(res.data, item => {
			  let obj = {
			    key: item.code,
			    value: item.code,
			    title: item.name
			  }
			  arr.push({ ...item, ...obj })
			})
    return arr
  })
}
export const getScope = () => {
  return getData({
    name: 'r_dict_authscope_get'
  }).then(res => {
    const data = res.data
    data &&
			data.length &&
			data.forEach((item, index) => {
			  data[index].label = data[index].name
			  data[index].value = data[index].code
			})
    return data
  })
}
export const getAccess = () => {
  return getData({
    name: 'r_dict_authaccess_get'
  }).then(res => {
    const data = res.data
    data &&
			data.length &&
			data.forEach((item, index) => {
			  data[index].label = data[index].name
			  data[index].value = data[index].code
			})
    return data
  })
}
export const getSysList = () => {
  return getData({
    name: 'r_author_system_list_get'
  }).then(res => {
    const data = res.data
    data &&
			data.length &&
			data.forEach((item, index) => {
			  data[index].label = data[index].name
			  data[index].title = data[index].name
			  data[index].value = data[index].id
			  data[index].key = data[index].id
			})
    return data
  })
}
export const getTradeList = () => {
  return getData({
    name: 'r_dict_trade_get'
  }).then(res => {
    const data = res.data
    data &&
			data.length &&
			data.forEach((item, index) => {
			  data[index].label = data[index].name
			  data[index].title = data[index].name
			  data[index].value = data[index].code
			  data[index].key = data[index].code
			})
    return data
  })
}
export const getDeptTypeList = code => {
  return getData({
    name: 'r_dict_depttype_i_get',
    data: {
      code: code,
      id: code
    }
  }).then(res => {
    const data = res.data
    data &&
			data.length &&
			data.forEach((item, index) => {
			  data[index].label = data[index].name
			  data[index].title = data[index].name
			  data[index].value = data[index].code
			  data[index].key = data[index].code
			})
    return data || []
  })
}
export const getMappingList = data => {
  return getData({
    name: 's_mapping_list_get',
    data: data
  }).then(res => {
    const data = res.data
    data &&
			data.length &&
			data.forEach((item, index) => {
			  data[index].label = data[index].name
			  data[index].title = data[index].name
			  data[index].value = data[index].id
			  data[index].key = data[index].id
			})
    return data || []
  })
}

export const getUserList = data => {
  return getData({
    name: 's_user_list_get',
    data: data
  }).then(res => {
    const data = res.data
    data &&
			data.length &&
			data.forEach((item, index) => {
			  data[index].label = data[index].name
			  data[index].title = data[index].name
			  data[index].value = data[index].id
			  data[index].key = data[index].id
			})
    return data || []
  })
}
const sortModuleList = data => {}
export const getModuleListId = (data, type) => {
  return getData({
    name: 's_module_list_get',
    data: data
  }).then(res => {
    const data = res.data
    let json = {},
      arr = []
    data &&
			data.length &&
			data.forEach((item, index) => {
			  data[index].label = data[index].sort
			    ? data[index].sort + '-' + data[index].name
			    : data[index].name
			  data[index].title = data[index].sort
			    ? data[index].sort + '-' + data[index].name
			    : data[index].name
			  data[index].value = data[index].id
			  data[index].key = data[index].id
			  const sort = data[index].sort
			  if (sort) {
			    if (!json[sort]) json[sort] = [data[index]]
			    else json[sort].push(data[index])
			  } else {
			    if (data[index].name && !json[data[index].name]) {
			      json[data[index].name] = data[index]
			    }
			  }
			})
    const loopSelf = (array, name) => {
      let newArr = []
      isArray(array) &&
				array.length &&
				array.forEach(item => {
				  newArr.push({
				    label: name + '-' + item.name,
				    value: item.id.toString(),
				    key: item.id.toString()
				  })
				})
      return newArr
    }
    for (let i in json) {
      if (isJson(json[i])) {
        arr.push({
          label: json[i].name,
          value: json[i].id.toString(),
          key: json[i].id.toString()
        })
      } else if (isArray(json[i])) {
        arr.push({
          label: i,
          value: i,
          key: i,
          disabled: true,
          children: loopSelf(json[i], i)
        })
      }
    }
    arr.unshift({
      label: '不关联模块',
      value: '',
      key: 'none'
    })
    return arr || []
  })
}
export const getModuleList = data => {
  let arr = []
  return getData({
    name: 's_module_sorts_get',
    data: data
  }).then(res => {
    const data = res.data
    data &&
			data.length &&
			data.forEach((item, index) => {
			  // data[index].label = data[index].sort ? (data[index].sort + "-" + data[index].name) : data[index].name;
			  // data[index].title = data[index].sort ? (data[index].sort + "-" + data[index].name) : data[index].name;
			  // data[index].value = data[index].id;
			  // data[index].key = data[index].id;
			  arr.push({
			    key: data[index],
			    value: data[index],
			    label: data[index],
			    title: data[index]
			  })
			})
    return arr || []
  })
}
