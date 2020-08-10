import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import { forEach, isArray, isEmptyObject } from '@/libs/tool'
import { routes } from '@/router/routes'
import { baseData } from '../api/hotelBaseData'

export const TOKEN_KEY = 'tokenHotel'

export const setToken = token => {
  Cookies.set(TOKEN_KEY, token, {
    expires: config.cookieExpires || 1
  })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}

export const COMPANY_KEY = 'company'

export const setCompany = company => {
  Cookies.set(COMPANY_KEY, company, {
    expires: config.cookieExpires || 1
  })
}

export const getCompany = () => {
  const company = Cookies.get(COMPANY_KEY)
  if (company) {
    return company
  } else {
    return false
  }
}

export const COMPANY_CODE = 'companyCode'

export const setCompanyCode = companyCode => {
  Cookies.set(COMPANY_CODE, companyCode, {
    expires: config.cookieExpires || 1
  })
}

export const getCompanyCode = () => {
  const companyCode = Cookies.get(COMPANY_CODE)
  if (companyCode) {
    return companyCode
  } else {
    return false
  }
}
/**
 * @param {Object} {name:"s_role_i_post",id:"123"} 表格数据二维数组
 * @returns {Object} { url, method }
 * @description 重新获取接口地址并返回
 */
const changePath = name => {
  let newName = ''
  if (name.indexOf('/') > -1) {
    let arr = name.split('/')
    arr.forEach((item, i) => {
      if (i != 1) item = item.replace(/_/g, '~')
      newName += item
    })
  } else {
    newName = name.replace(/_/g, '~')
  }
  return newName
}

export const changeFirstUrl = str => {
  // console.log(str)
  return str.indexOf('wx') > -1
    ? 'o_manager'
    : str.indexOf('terminal') > -1 &&
		  str !== 'terminal' &&
		  str !== 'terminaluser'
      ? 't'
      : 'h'
}

export const getPath = (name, id) => {
  // console.log(name)
  let arr = changePath(name).split('~'),
    url = '',
    len = arr.length - 1
  // console.log(arr)
  arr.forEach((str, index) => {
    // url += index == len ? '' : index == 0 ? str == 'h' ? `/hotel-manager/hotel/manager` : str == 'a' ? `/hotel-analysis/hotel/analysis` : `/root` : str == 'i' ? `/${id}` : `/${str}`
    url +=
			index == len
			  ? ''
			  : index == 0
			    ? str == 't'
			      ? `/hotel-terminal/hotel/terminal/manager`
			      : str == 'h'
			        ? `/hotel-manager/hotel/manager`
			        : str == 'a'
			          ? `/hotel-analysis/hotel/analysis`
			          : str == 'l'
			            ? `/hotel-lodger/hotel/lodger/manager`
			            : str == 'u'
			              ? `/hotel-lodger/hotel/coupon/manager`
			              : str == 'e'
			                ? `/hotel-lodger/hotel/coupon`
			                : str == 'm'
			                  ? `/hotel-manager/hotel/manager/coupon`
			                  : str == 'p'
			                    ? `/hotel-panel/hotel/panel`
			                    : str == 'o'
			                      ? `/hotel-official/hotel/official`
			                      : str == 's'
			                        ? `/system/sys`
			                        : `/hotel-manager/root`
			    : str == 'i'
			      ? `/${id}`
			      : `/${str}`
  })
  return {
    url: url,
    method: arr[arr.length - 1]
  }
}
export const sortMenuData = (arr, key) => {
  const res = []
  arr &&
		arr.length &&
		arr.forEach((item, i) => {
		  const keys = key ? `${key}.${i.toString()}` : i.toString()
		  let obj = {},
		    newItem = item.node && item.node.node ? item.node.node : item.node,
		    newArr = item.node && item.node.childs ? item.node.childs : item.childs
		  if (newArr && newArr.length) {
		    obj.children = []
		    obj.children = sortMenuData(newArr, keys)
		    obj.key = `slideMenu-${keys}`
		  } else {
		    obj.openKey = `slideMenu-${key}`
		    obj.key = `slideMenu-${newItem.moduleid || newItem.name}-${keys}-${
		      newItem.route
		    }`
		  }
		  obj = { ...newItem, ...obj }
		  res.push(obj)
		})
  return res
}

export const sortSubMenuData = arr => {
  let data = {}
  arr.length &&
		arr.forEach(item => {
		  if (item.children && item.children.length && item.route) {
		    data[item.route.toLowerCase()] = item.children
		  }
		})
  return data
}

export const sortTreeData = (arr, changeArr) => {
  const res = []
  arr.forEach((item, index) => {
    let obj = {},
      newItem = item.node && item.node.node ? item.node.node : item.node,
      newArr = item.node && item.node.childs ? item.node.childs : item.childs
    newItem.typename = item.type
    if (changeArr && changeArr.length) {
      changeArr.forEach(item => {
        newItem[item[0]] = newItem[item[1]].toString()
      })
    }
    obj.children = []
    if (newArr && newArr.length) {
      obj.children = sortTreeData(newArr, changeArr)
    }
    newItem.title = newItem.name
    newItem.key = newItem.id
    if (!obj.children.length) newItem.isLeaf = true
    obj = { ...newItem, key: `tree-${newItem.route}-${Math.random()}`, ...obj }
    res.push(obj)
  })
  return res
}
export const sortListTreeData = arr => {
  const res = []
  arr.forEach((item, index) => {
    let obj = {}
    obj.children = []
    if (item.childs && item.childs.length) {
      obj.children = sortListTreeData(item.childs)
    }
    obj = { ...item, key: `tree-${item.route}-${Math.random()}` }
    res.push(obj)
  })
  return res
}
export const resetVuexData = () => {}
export const resetData = (commit, data, name) => {
  let newData = {}
  if (name.lastIndexOf('Pegination') > -1) {
    newData = { ...data, page: 0, reset: true }
  } else if (name.lastIndexOf('Search') > -1) {
    for (let key in data) {
      if (key == 'reset') {
        delete data[key]
      } else {
        data[key] = ''
      }
    }
    newData = { ...data, reset: true }
  } else if (name.lastIndexOf('ChoseTr' > -1)) {
    newData = {}
  }
  commit(name, newData)
}
export const clearData = values => {
  for (let key in values) {
    values[key] = ''
  }
  return values
}
export const choseTableTr = (tr, cls) => {
  if (tr.classList.contains(cls)) return false
  const siblings = tr.parentNode.children
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].classList.remove(cls)
  }
  tr.classList.add(cls)
}
export const clearTableTr = (tbody, cls) => {
  const siblings = tbody.children
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].classList.remove(cls)
  }
}

export const choseTableTrData = (tr, name) => {
  const dataName = `data-${name}`
  if (tr.getAttribute(dataName)) return false

  const siblings = tr.parentNode.children
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].removeAttribute(dataName)
  }
  tr.setAttribute(dataName, true)
}
export const clearTableTrData = (tbody, name) => {
  const dataName = `data-${name}`,
    siblings = tbody.children
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].removeAttribute(dataName)
  }
}
export const selectClassName = (eles, cls) => {
  let arr = []
  for (let i = 0; i < eles.length; i++) {
    if (eles[i].classList.contains(cls)) arr.push(eles[i])
  }
  return arr
}
export const insertDefaultValue = (eles, cls) => {
  const arr = selectClassName(eles, cls)
  for (let i = 0; i < arr.length; i++) {
    arr[i].value = arr[i].dataset.value
  }
}
export const changeUrl = (json, val) => {
  const data = JSON.parse(JSON.stringify(json))
  for (let i in data) {
    if (i == 'noJson') {
      data[i] = data[i]
    } else {
      const arr = data[i].split('/')
      data[i] = arr[0] + '/' + val + '/' + arr[2]
    }
  }
  return data
}
export const getChangeUrl = json => {
  const data = JSON.parse(JSON.stringify(json))
  for (let i in data) {
    if (i != 'noJson') {
      const arr = data[i].split('/')
      data[i] = arr[0] + arr[1] + arr[2]
    }
  }
  return data
}
export const getRouters = list => {
  const json = getRoutersChildren(list),
    children = routes[0].children,
    newRoutes = routes
  newRoutes[0].children = []
  for (let i in json) {
    children.forEach(item => {
      if (item.name == i) newRoutes[0].children.push({ ...item, ...json[i] })
    })
  }
  return newRoutes
}
export const getRoutersChildren = (list, route) => {
  let data = route || {}
  list.forEach(item => {
    if (item.children && item.children.length) {
      getRoutersChildren(item.children, data)
    } else {
      if (!data[item.route]) {
        data[item.route] = {
          meta: {
            key: item.key,
            openKey: item.openKey,
            name: item.name,
            moduleid: item.moduleid
          }
        }
      }
    }
  })
  return data
}
export const getNagList = (route, list) => {
  if (route && !list[route.name]) list[route.name] = route.meta
  return list
}
export const getNagListArr = (key, json) => {
  let index = 0,
    arr = [],
    list = JSON.parse(json)
  for (let i in list) arr.push(i)
  index =
		arr.indexOf(key) == arr.length - 1 ? arr.indexOf(key) - 1 : arr.indexOf(key)
  delete list[key]
  arr = []
  for (let i in list) arr.push(i)
  return arr.length ? arr[index] : false
}
export const delNagList = (key, json) => {
  const list = JSON.parse(json)
  delete list[key]
  return list
}
export const updateTreeNode = (data, node) => {
  if (!data || !node) return false
  if (data.flag == '1') {
    data = { key: `tree-${data.route}-${Math.random()}`, children: [], ...data }
    if (node.children) {
      node.children.push(data)
    } else {
      node.children = new Array()
      node.children.push(data)
    }
  } else if (data.flag == '2') {
    if (node.children && node.children.length) {
      let index = 0
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].id == data.id) {
          index = i
          break
        }
      }
      node.children.splice(index, 1)
    }
  }
}
export const sortProviceCityTree = data => {
  let arr = data || [],
    provice = arr.filter(item => item.protype == 1),
    city = arr.filter(item => item.protype == 2),
    county = arr.filter(item => item.protype == 3)

  if (provice.length) {
    provice.length &&
			provice.forEach((p, i) => {
			  provice[i].title = p.name
			  provice[i].label = p.name
			  provice[i].key = p.code
			  provice[i].value = p.code

			  if (city.length) {
			    provice[i].children = []
			    city.forEach((c, j) => {
			      c.title = c.name
			      c.key = c.code
			      c.label = c.name
			      c.value = c.code
			      if (county.length) {
			        city[j].children = []
			        county.forEach((cc, ii) => {
			          cc.title = cc.name
			          cc.key = cc.code
			          cc.label = cc.name
			          cc.value = cc.code
			          if (c.code == cc.procode) {
			            city[j].children.push(cc)
			          }
			        })
			      }
			      if (p.code == c.procode) {
			        provice[i].children.push(c)
			      }
			    })
			  }
			})
  } else {
    arr.length &&
			arr.forEach(p => {
			  p.title = p.name
			  p.key = p.code
			})
  }
  return provice.length ? provice : arr
}
export const sortProviceCityTreeCascader = data => {
  let arr = data || [],
    provice = arr.filter(item => item.protype == 1),
    city = arr.filter(item => item.protype == 2),
    county = arr.filter(item => item.protype == 3)
  if (provice.length) {
    provice.length &&
			provice.forEach((p, i) => {
			  provice[i].title = p.name
			  provice[i].label = `${p.name}(${p.code})`
			  provice[i].key = p.code
			  provice[i].value = p.code

			  if (city.length) {
			    provice[i].children = []
			    city.forEach((c, j) => {
			      c.title = c.name
			      c.key = c.code
			      c.label = `${c.name}(${c.code})`
			      c.value = c.code
			      if (county.length) {
			        city[j].children = []
			        county.forEach((cc, ii) => {
			          cc.title = cc.name
			          cc.key = cc.code
			          cc.label = `${cc.name}(${cc.code})`
			          cc.value = cc.code
			          if (c.code == cc.procode) {
			            city[j].children.push(cc)
			          }
			        })
			      }
			      if (p.code == c.procode) {
			        provice[i].children.push(c)
			      }
			    })
			  }
			})
  } else {
    arr.length &&
			arr.forEach(p => {
			  p.title = p.name
			  p.key = p.code
			})
  }
  return provice.length ? provice : arr
}

export const loadProviceCityData = () => {}

export const addTableDict = (data, dict, json) => {
  // console.log(data)
  // console.log(dict)
  // debugger
  if (!dict || !data.length) return data
  const keys = Object.keys(dict)
  let type1 = false
  if (keys.indexOf('type1') !== -1) {
    type1 = true
  }
  return data.map(item => {
    keys &&
			keys.length &&
			keys.forEach(key => {
			  if (item.hasOwnProperty(key)) {
			    if (type1 && key === 'type') {
			      item[dict['type1'].name] = dict['type1'].data[item['type']]
			    } else {
			      if (dict[key].data) {
			        item[dict[key].name] = dict[key].data[item[key]]
			      } else if (json && json.hasOwnProperty(key)) {
			        const sJson = json[key]
			        let value = sJson[item[key]] || ''
			        if (
			          isArray(item[key]) &&
								item[key].length &&
								item[key].length > 1
			        ) {
			          item[key].forEach(o => {
			            value += `${sJson[o]} `
			          })
			          item[dict[key].name] = value
			        } else {
			          item[dict[key].name] = value
			        }
			      }
			    }
			  }
			})
    return item
  })
}

export const sortSubmitData = (values, name) => {
  const data = baseData[name]
  for (let i in data) {
    if (data[i].delStatus && values.hasOwnProperty(i)) delete values[i]
  }
  for (let i in values) {
    if (typeof values[i] === 'undefined' || values[i] == null) values[i] = ''
  }
  return values
}

export const getAccess = (routeParams, data, choseTr, type, subAccess) => {
  if (type === 'main') {
    if (routeParams.access < 2) {
      return false
    }
  }
  if (type === 'sub') {
    if (subAccess < 2) {
      return false
    }
    if (choseTr.edit === 0) {
      return false
    }
  }
  if (isEmptyObject(data)) {
    return false
  }
  if (data.edit === 0) {
    return false
  }
  return true
  // if (!isEmptyObject(choseTr)) {
  // 	if (choseTr.edit == 0) {
  // 		return false
  // 	} else {
  // 		if (type == 'sub') {
  // 			if (choseTr.flag == 0) {
  // 				return false
  // 			} else {
  // 				return true
  // 			}
  // 		} else {
  // 			return true
  // 		}
  // 	}
  // } else {
  // 	return false
  // }
}

export const delDataReturn = (name, values) => {
  for (let i in baseData[name]) {
    const item = baseData[name][i]
    if (item.delStatus) delete values[i]
  }
  return values
}

export const sortCompanyBrand = (c, b) => {
  c &&
		c.length &&
		c.forEach((item, i) => {
		  c[i].label = item.name
		  c[i].value = item.code
		  c[i].children = []
		  b &&
				b.length &&
				b.forEach((itemB, j) => {
				  itemB.label = itemB.name
				  itemB.value = itemB.code
				  if (itemB.companyCode == item.code) {
				    c[i].children.push(itemB)
				  }
				})
		})
  return c
}
export const $el = {
  addClass: name => {}
}
