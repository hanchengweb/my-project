import { getData } from '@/api/common'
import { forEach, isArray, isJson } from '@/libs/tool'
import { sortProviceCityTreeCascader } from '../libs/util'

// 状态 pid 14
const pid = {
  outType: 'CHECKOUT_TYPE', // 签驻状态
  name: 'GUEST_ROOM_TYPE', // 客房类型
  protype: 'PRO_TYPE', // 区域类型
  deviceGrade: 'DEVICE_GRADE', // 设备等级
  collectMode: 'COLLECT_MODE', // 采集模式
  protocolCode: 'PROTOCOL', // 通讯协议
  grade: 'BRAND_GRADE', // 品牌等级
  owner: 'ALARM_OWNER', // 归属
  configOwner: 'CONFIG_OWNER', //
  type: 'ROOM_TYPE', // 房间类型
  type1: 'TERMINAL_TYPE', // 类型
  flag: 'FLAG', // 状态
  activityStatus: 'ACTIVITY_STATUS', // 活动状态
  positionStatus: 'ACTIVITY_POSITION', // 活动图位置
  powerGrade: 'POWER_RANK_GRADE',
  roomStatus: 'ROOM_STATUS', // 客房状态
  cascadeType: 'WARN_CASCADE_TYPE', // 告警级联类型
  activitylist: 'ACTIVITY_LIST', // 活动列表
  lodgerImage: 'LODGER_IMAGE', // 系统背景图位置
  powerRank: 'POWER_RANK_GRADE', // 能耗等级
  imageType: 'HOTEL_IMAGE_TYPE', // 酒店环境图展示方式
  hotelType: 'HOTEL_TYPE', // 酒店类型编码
  couponStatus: 'COUPON_STATUS', // 券使用状态
  lowCarbonGrade: 'POWER_RANK_GRADE',
  // 券模板
  couponType: 'COUPON_TYPE', // 劵类型
  couponOwnerType: 'COUPON-OWNER_TYPE', // 劵隶属类型
  giveChannel: 'COUPON_CHANNEL', // 投放渠道
  generalizeModel: 'COUPON_SPREAD', // 推广方式
  equalModel: 'COUPON_EQUAL_TYPE', // 等价类别
  ownerType: 'AD_BELONG_TYPE', // 归属者类型
  scope: 'AD_AFFECT_SCOPE', // 投放范围
  status: 'AD_STATUS', // 计划状态
  auditStatus: 'AD_AUDIT_STATUS', // 审核状态
  category: 'AD_MATERAIL_TYPE', // 物料类别
  state: 'AD_STATE' // 广告投放状态
}

export const getStatus = () => {
  return getData({
    name: 'h_dictionaryDetail__get',
    data: { pid: 7 }
  }).then(res => {})
}

export const getConst = type => {
  return getData({
    // name: `h_dictionary_dic_/${pid[type]}/_get`,
    name: `h_common_dictionary_get`,
    data: { flag: 1, code: pid[type] }
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
    // console.log(arr)
    return arr
  })
}

export const getConstOther = type => {
  return getData({
    name: `l_activityPage_page_get`,
    data: { flag: 1, code: pid[type], page: 0, size: 100, status: 1 }
  }).then(info => {
    const res = info.data.content
    const arr = []
    res &&
			res &&
			res.length &&
			forEach(res, item => {
			  let obj = {
			    key: item.id,
			    value: item.id,
			    title: item.name
			  }
			  arr.push({ ...item, ...obj })
			})
    // console.log(arr)
    return arr
  })
}

export const getConstGoods = code => {
  return getData({
    name: `u_consumerGoodsCategory_page_get`,
    data: { flag: 1, companyCode: code, page: 0, size: 100 }
  }).then(info => {
    const res = info.data.content
    const arr = []
    res &&
			res &&
			res.length &&
			forEach(res, item => {
			  let obj = {
			    key: item.id,
			    value: item.id,
			    title: item.name
			  }
			  arr.push({ ...item, ...obj })
			})
    // console.log(arr)
    return arr
  })
}
// 获取品牌
export const getBrand = data => {
  return getData({
    name: 'h_brand__get',
    data: { ...data, flag: 1 }
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
export const getBrandUser = code => {
  return getData({
    name: 'h_hotel_brand__get', /// hotel/manager/hotel/brand?companyCode=
    data: { companyCode: code, flag: 1 }
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

export const getCompanys = data => {
  return getData({
    name: 'h_company__get',
    data: { ...data, flag: 1 }
  }).then(res => {
    const arr = []
    res &&
			res.data &&
			res.data.length &&
			forEach(res.data, item => {
			  let obj = {
			    key: item.code,
			    value: item.code,
			    title: item.name,
			    label: item.name,
			    id: item.id
			  }
			  arr.push({ ...item, ...obj })
			})
    return arr
  })
}
export const getProviceCityCounty = () => {
  return getData({
    name: 'h_common_proviceCity1__get',
    data: { flag: 1 } /// hotel/manager/proviceCity/protype=3
  }).then(res => {
    return (
      (res &&
				res.data &&
				res.data.length &&
				sortProviceCityTreeCascader(res.data)) ||
			[]
    )
  })
}

export const getProviceCityCountyUser = () => {
  return getData({
    name: 'h_common_proviceCity1__get',
    data: { flag: 1 } /// hotel/manager/proviceCity/protype=3
  }).then(res => {
    return (
      (res &&
				res.data &&
				res.data.length &&
				sortProviceCityTreeCascader(res.data)) ||
			[]
    )
  })
}
// 获取区县
export const getCountyCode = data => {
  data = data || {}
  return getData({
    name: 'h_common_proviceCity__get',
    data: { ...data, protype: 3, flag: 1 } /// hotel/manager/proviceCity/protype=3
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
//
export const getHotelGuestRoomType = id => {
  return getData({
    name: 'h_hotelGuestRoomType__get',
    data: { hotelId: id, flag: 1 } /// hotel/manager/hotelGuestRoomType/hotelId=当前选中的酒店id
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

export const getHotelGuestRoomTypeUser = (id, owner) => {
  return getData({
    name: `h_${owner}_hotelGuestRoomType__get`,
    data: { hotelid: id, flag: 1 } /// hotel/manager/hotelGuestRoomType/hotelId=当前选中的酒店id
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

export const getModbusMac = id => {
  return getData({
    name: 'h_modbus__get',
    data: { hotelId: id, flag: 1 } /// hotel/manager/hotelGuestRoomType/hotelId=当前选中的酒店id
  }).then(res => {
    const arr = []
    res &&
			res.data &&
			res.data.length &&
			forEach(res.data, item => {
			  let obj = {
			    key: item.mac,
			    value: item.mac,
			    title: item.mac
			  }
			  arr.push({ ...item, ...obj })
			})
    return arr
  })
}

export const getModbusMacUser = (id, owner) => {
  return getData({
    name: `h_${owner}_modbus__get`,
    data: { hotelid: id, flag: 1 } /// hotel/manager/hotelGuestRoomType/hotelId=当前选中的酒店id
  }).then(res => {
    const arr = []
    res &&
			res.data &&
			res.data.length &&
			forEach(res.data, item => {
			  let obj = {
			    key: item.mac,
			    value: item.mac,
			    title: item.mac
			  }
			  arr.push({ ...item, ...obj })
			})
    return arr
  })
}

export const getConfigField = owner => {
  // if (owner == 'companys') owner = 'company'
  return getData({
    name: 'h_common_findConfigFieldByStrategy__get',
    data: { strategy: owner, flag: 1 } /// hotel/manager/hotelGuestRoomType/hotelId=当前选中的酒店id
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

export const getUserTypeWx = () => {
  return getData({
    name: 'h_dictionary_dic_/WECHAT_USER_TYPE/_get', /// hotel/manager/dictionary/dic/WECHAT_USER_TYPE
    data: { flag: 1 } // 下拉选（/hotel/manager/alarmType/?owner=当前的owner）
  }).then(res => {
    const arr = []
    if (res && res.data) {
      res.data.content.forEach(item => {
        let obj = {
          key: item.code,
          value: item.code,
          title: item.name
        }
        arr.push({ ...item, ...obj })
      })
    }
    // res &&
    // 	res.data &&
    // 	res.data.length &&
    // 	forEach(res.data, item => {
    // 	  let obj = {
    // 	    key: item.code,
    // 	    value: item.code,
    // 	    title: item.name
    // 	  }
    // 	  arr.push({ ...item, ...obj })
    // 	})
    // console.log(arr)
    return arr
  })
}

export const getAlarmTypeWx = () => {
  return getData({
    name: 'h_alarmType__get', /// hotel/manager/alarmType/
    // data: {flag: 1}//下拉选（/hotel/manager/alarmType/?owner=当前的owner）
    data: {}
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

export const getAlarmType = owner => {
  // if (owner == 'companys') owner = 'company'
  return getData({
    name: 'h_common_findAlarmTypeByStrategy__get',
    data: { strategy: owner, flag: 1 } // 下拉选（/hotel/manager/alarmType/?owner=当前的owner）
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

export const dictData = {
  edit: {
    defaultVal: 1,
    name: 'editName',
    data: {
      0: '不可编辑',
      1: '可编辑'
    },
    select: [
      { key: 0, value: 0, title: '不可编辑' },
      { key: 1, value: 1, title: '可编辑' }
    ]
  },
  grade: {
    name: 'gradeName',
    fun: getConst,
    type: 'const'
  },
  checkStatus: {
    // 签注状态
    name: 'outType',
    fun: getConst,
    type: 'const'
  },
  activated: {
    defaultVal: 1,
    name: 'activatedName',
    data: {
      0: '不启用',
      1: '启用'
    },
    select: [
      { key: 0, value: 0, title: '不启用' },
      { key: 1, value: 1, title: '启用' }
    ]
  },
  actived: {
    defaultVal: 1,
    name: 'activedName',
    data: {
      0: '不启用',
      1: '启用'
    },
    select: [
      { key: 0, value: 0, title: '不启用' },
      { key: 1, value: 1, title: '启用' }
    ]
  },
  type: {
    // defaultVal: 1,
    name: 'typeName',
    data: {
      1: '微信公众号', // 用户类型（1:微信公众号, 2:小程序 ）
      2: '小程序'
    },
    select: [
      { key: 1, value: 1, title: '微信公众号' },
      { key: 2, value: 2, title: '小程序' }
    ]
  },
  type1: {
    // defaultVal: 1,
    name: 'typeName',
    data: {
      0: '通信机', // 用户类型（1:微信公众号, 2:小程序 ）
      1: '采集器'
    },
    select: [
      { key: 0, value: 0, title: '通信机' },
      { key: 1, value: 1, title: '采集器' }
    ]
  },
  subscribe: {
    // defaultVal: 1,
    name: 'subscribeName', // 是否关注（0否，1是）
    data: {
      0: '不关注', // 用户类型（1:微信公众号, 2:小程序 ）
      1: '关注'
    },
    select: [
      { key: 0, value: 0, title: '不关注' },
      { key: 1, value: 1, title: '小程序' }
    ]
  },
  sex: {
    // defaultVal: 1,
    name: 'sexName', // 性别（值为1时是男性，值为2时是女性，值为0时是未知 ）
    data: {
      0: '未知', // 用户类型（1:微信公众号, 2:小程序 ）
      1: '男性',
      2: '女性'
    },
    select: [
      { key: 0, value: 0, title: '未知' },
      { key: 1, value: 1, title: '男性' },
      { key: 2, value: 2, title: '女性' }
    ]
  },

  fock: {
    defaultVal: 1,
    name: 'fockName',
    data: {
      0: '不默认',
      1: '默认'
    },
    select: [
      { key: 0, value: 0, title: '不默认' },
      { key: 1, value: 1, title: '默认' }
    ]
  },
  status: {
    defaultVal: 1, // 0:未知,1连接,2:断开
    name: 'statusName',
    data: {
      0: '未知',
      1: '连接',
      2: '断开'
    },
    select: [
      { key: 0, value: 0, title: '未知' },
      { key: 1, value: 1, title: '连接' },
      { key: 2, value: 2, title: '断开' }
    ]
  },
  utype: {
    fun: getUserTypeWx,
    type: '',
    name: 'utypeName'
  },
  warntype: {
    fun: getAlarmTypeWx,
    type: '',
    name: 'warntypeName'
  },
  flag: {
    defaultVal: 0,
    fun: getConst,
    type: 'const',
    name: 'flagName'
  },
  master: {
    defaultVal: 0,
    fun: getConst,
    type: 'const',
    name: 'masterName'
  },
  owner: {
    name: 'ownerName',
    fun: getConst,
    type: 'const'
  },
  protype: {
    name: 'protypeName',
    fun: getConst,
    type: 'const'
  },
  collectMode: {
    name: 'collectModeName',
    fun: getConst,
    type: 'const'
  },
  protocolCode: {
    name: 'protocolCodeName',
    fun: getConst,
    type: 'const'
  },
  deviceGrade: {
    name: 'deviceGradeName',
    fun: getConst,
    type: 'const'
  },
  strategy: {
    name: 'strategyName',
    fun: getConst,
    type: 'const'
  },
  couponType: {
    name: 'couponTypeName',
    fun: getConst,
    type: 'const'
  },
  status: {
    name: 'statusName',
    fun: getConst,
    type: 'const'
  },
  auditStatus: {
    name: 'auditStatusName',
    fun: getConst,
    type: 'const'
  },
  category: {
    name: 'categoryName',
    fun: getConst,
    type: 'const'
  },
  couponOwnerType: {
    name: 'couponOwnerTypeName',
    fun: getConst,
    type: 'const'
  },
  ownerType: {
    name: 'ownerTypeName',
    fun: getConst,
    type: 'const'
  },
  giveChannel: {
    name: 'giveChannelName',
    fun: getConst,
    type: 'const'
  },
  equalModel: {
    name: 'equalModelName',
    fun: getConst,
    type: 'const'
  },
  generalizeModel: {
    name: 'generalizeModelName',
    fun: getConst,
    type: 'const'
  },
  lowCarbonGrade: {
    name: 'lowCarbonGradeName',
    fun: getConst,
    type: 'const'
  }
  // field: {
  // 	name: 'fieldName',
  // 	fun: getConfigField,
  // 	type: 'owner'
  // }
}

const widthToLength = {
  3: 100,
  4: 110,
  6: 120,
  10: 160,
  11: 170,
  12: 180,
  15: 220,
  20: 380,
  30: 450,
  32: 480,
  40: 520,
  45: 580,
  50: 650,
  100: 1250,
  mac: 12
}
