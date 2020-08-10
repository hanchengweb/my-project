export const baseSettings = {
  company: {
    name: '集团（company）',
    x: 1450,
    data: {
      name: {
        name: '集团名称',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        isNeed: true,
        editabled: true
      },
      code: {
        name: '编码',
        maxLength: 6,
        showLength: 6,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      deptCode: {
        name: '部门编码',
        maxLength: 60,
        showLength: 60,
        tableShow: {
          width: 150,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  hotel: {
    name: '酒店相关(hotel)',
    x: 4510,
    data: {
      name: {
        name: '酒店名称',
        maxLength: 40,
        showLength: 40,
        tableShow: {
          width: 500
        },
        editabled: true,
        isNeed: true
      },
      code: {
        name: '酒店编码',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      outerCoding: {
        name: '酒店的外部编码',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      deptCode: {
        name: '所属部门编码',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      companyCode: {
        name: '集团编码',
        type: 'select',
        editabled: true,
        isNeed: true
      },
      companyName: {
        name: '集团名称',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        modalHidden: true
      },
      brandCode: {
        name: '品牌编码',
        type: 'select',
        editabled: true,
        isNeed: true
      },
      brandName: {
        name: '品牌名称',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 380
        },
        modalHidden: true
      },
      minPrice: {
        name: '酒店客房最低价格',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 130,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      maxPrice: {
        name: '酒店客房最高价格',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 130,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      proviceCode: {
        name: '省份编码',
        maxLength: 6,
        modalHidden: true,
        isNeed: true
      },
      provice: {
        name: '省份',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      cityCode: {
        name: '城市编码',
        maxLength: 6,
        modalHidden: true,
        isNeed: true
      },
      city: {
        name: '城市',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      countyCode: {
        name: '县(区)编码',
        maxLength: 6,
        editabled: true,
        modalHidden: true,
        type: 'select'
      },
      county: {
        name: '县(区)',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      proCityConutry: {
        name: '省/市/县',
        editabled: true,
        type: 'cascader',
        isNeed: true
      },
      telephone: {
        name: '联系电话',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        editabled: true
      },
      bd09Lon: {
        name: '百度经度',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      bd09Lat: {
        name: '百度纬度',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      hotelType: {
        name: '酒店类型',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      address: {
        name: '酒店地址',
        maxLength: 40,
        showLength: 40,
        tableShow: {
          width: 500
        },
        type: 'textarea',
        editabled: true
      },
      createTime: {
        name: '创建时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        delStatus: true,
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '更新时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        delStatus: true,
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      remark: {
        name: '备注信息',
        maxLength: 255,
        showLength: 50,
        tableShow: {
          width: 650
        },
        type: 'textarea',
        editabled: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  hoteluser: {
    name: '酒店相关(hotel)',
    x: 4510,
    data: {
      name: {
        name: '酒店名称',
        maxLength: 40,
        showLength: 40,
        tableShow: {
          width: 500
        },
        // editabled: true,
        isNeed: true
      },
      code: {
        name: '酒店编码',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        // editabled: true,
        isNeed: true
      },
      outerCoding: {
        name: '酒店的外部编码',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        }
        // editabled: true,
      },
      deptCode: {
        name: '所属部门编码',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 150,
          align: 'center'
        },
        // editabled: true,
        isNeed: true
      },
      companyCode: {
        name: '集团编码',
        // editabled: true,
        modalHidden: true,
        isNeed: true
      },
      companyName: {
        name: '集团名称',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        isNeed: true
        // modalHidden: true
      },
      brandCode: {
        name: '品牌编码',
        type: 'select',
        editabled: true,
        isNeed: true
      },
      brandName: {
        name: '品牌名称',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 380
        },
        modalHidden: true
      },
      proviceCode: {
        name: '省份编码',
        maxLength: 6,
        modalHidden: true,
        isNeed: true
      },
      provice: {
        name: '省份',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      cityCode: {
        name: '城市编码',
        maxLength: 6,
        modalHidden: true,
        isNeed: true
      },
      city: {
        name: '城市',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      countyCode: {
        name: '县(区)编码',
        maxLength: 6,
        editabled: true,
        modalHidden: true,
        type: 'select'
      },
      county: {
        name: '县(区)',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      proCityConutry: {
        name: '省/市/县',
        editabled: true,
        type: 'cascader'
      },
      telephone: {
        name: '联系电话',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      longitude: {
        name: '经度',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      latitude: {
        name: '纬度',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      address: {
        name: '酒店地址',
        maxLength: 40,
        showLength: 40,
        tableShow: {
          width: 500
        },
        type: 'textarea',
        editabled: true
      },
      createTime: {
        name: '创建时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        delStatus: true,
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '更新时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        delStatus: true,
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      remark: {
        name: '备注信息',
        maxLength: 255,
        showLength: 50,
        tableShow: {
          width: 650
        },
        type: 'textarea',
        editabled: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  modbus: {
    name: '通讯机(modbus)',
    x: 2280,
    data: {
      hotelId: {
        name: '酒店id',
        modalHidden: true,
        isNeed: true
      },
      hotelName: {
        name: '酒店名称',
        maxLength: 40,
        showLength: 40,
        tableShow: {
          width: 500
        },
        modalHidden: true
      },
      mac: {
        name: 'MAC',
        maxLength: 12,
        showLength: 12,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      deviceGrade: {
        name: '设备等级',
        type: 'select',
        isNeed: true,
        editabled: true
      },
      deviceGradeName: {
        name: '设备等级',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      collectMode: {
        name: '采集模式',
        type: 'select',
        isNeed: true,
        editabled: true
      },
      collectModeName: {
        name: '采集模式',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      protocolCode: {
        name: '通讯协议',
        type: 'select',
        isNeed: true,
        editabled: true
      },
      protocolCodeName: {
        name: '通讯协议',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        tableShow: {
          width: 150,
          align: 'center'
        },
        delStatus: true,
        modalHidden: true
      },
      updateTime: {
        name: '更新时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        tableShow: {
          width: 150,
          align: 'center'
        },
        delStatus: true,
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  modbususer: {
    name: '通讯机(modbus)',
    x: 2280,
    data: {
      hotelId: {
        name: '酒店id',
        modalHidden: true,
        isNeed: true
      },
      hotelName: {
        name: '酒店名称',
        maxLength: 40,
        showLength: 40,
        tableShow: {
          width: 500
        },
        modalHidden: true
      },
      mac: {
        name: 'MAC',
        maxLength: 12,
        showLength: 12,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true
        // editabled: true
      },
      deviceGrade: {
        name: '设备等级',
        type: 'select',
        isNeed: true
        // editabled: true
      },
      deviceGradeName: {
        name: '设备等级',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      collectMode: {
        name: '采集模式',
        type: 'select',
        isNeed: true
        // editabled: true
      },
      collectModeName: {
        name: '采集模式',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      protocolCode: {
        name: '通讯协议',
        type: 'select',
        isNeed: true
        // editabled: true
      },
      protocolCodeName: {
        name: '通讯协议',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        tableShow: {
          width: 150,
          align: 'center'
        },
        delStatus: true,
        modalHidden: true
      },
      updateTime: {
        name: '更新时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        tableShow: {
          width: 150,
          align: 'center'
        },
        delStatus: true,
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  room: {
    name: '房间相关(room)',
    x: 2140,
    data: {
      hotelId: {
        name: '酒店id',
        modalHidden: true,
        isNeed: true
      },
      // hotelName: {
      // 	name: '酒店名称',
      // 	tableShow: {},
      // 	modalHidden: true
      // },
      mac: {
        name: 'MAC',
        maxLength: 12,
        showLength: 12,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true,
        type: 'select'
      },
      ammeter: {
        name: '房间序号',
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      name: {
        name: '房间名称',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      roomType: {
        name: '房间类型',
        editabled: true,
        // isNeed: true,
        type: 'select'
      },
      typeName: {
        name: '房间类型',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      guestRoomType: {
        name: '客房类型',
        editabled: true,
        // isNeed: true,
        type: 'select'
      },
      guestRoomTypeName: {
        name: '客房类型',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      floor: {
        name: '楼层',
        maxLength: 3,
        showLength: 3,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
        // isNeed: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        delStatus: true,
        modalHidden: true
      },
      updateTime: {
        name: '更新时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        delStatus: true,
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  roomuser: {
    name: '房间相关(room)',
    x: 2140,
    data: {
      hotelId: {
        name: '酒店id',
        modalHidden: true,
        isNeed: true
      },
      hotelName: {
        name: '酒店名称',
        tableShow: {
          width: 500
        },
        modalHidden: true
      },
      mac: {
        name: 'MAC',
        maxLength: 12,
        showLength: 12,
        tableShow: {
          width: 120,
          align: 'center'
        },
        // editabled: true,
        isNeed: true,
        type: 'select'
      },
      ammeter: {
        name: '房间序号',
        tableShow: {
          width: 120,
          align: 'center'
        },
        // editabled: true,
        isNeed: true
      },
      name: {
        name: '房间名称',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 120,
          align: 'center'
        },
        // editabled: true,
        isNeed: true
      },
      roomType: {
        name: '房间类型',
        editabled: true,
        isNeed: true,
        type: 'select'
      },
      typeName: {
        name: '房间类型',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      guestRoomType: {
        name: '客房类型',
        editabled: true,
        isNeed: true,
        type: 'select'
      },
      guestRoomTypeName: {
        name: '客房类型',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      floor: {
        name: '楼层',
        maxLength: 3,
        showLength: 3,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        delStatus: true,
        modalHidden: true
      },
      updateTime: {
        name: '更新时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        delStatus: true,
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  brand: {
    name: '品牌（brand）',
    x: 1320,
    data: {
      companyName: {
        name: '集团名称',
        maxLength: 20,
        showLength: 20,
        // tableShow: {
        // 	width: 380
        // },
        isNeed: true
      },
      companyCode: {
        name: '集团编码',
        maxLength: 6,
        showLength: 6,
        // tableShow: {
        // 	width: 120
        // },
        isNeed: true
      },
      name: {
        name: '品牌名称',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 160
        },
        editabled: true,
        isNeed: true
      },
      code: {
        name: '品牌编码',
        maxLength: 6,
        showLength: 6,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      grade: {
        name: '品牌等级',
        type: 'select',
        isNeed: true,
        editabled: true
      },
      gradeName: {
        name: '品牌等级',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  terminal: {
    name: '终端（terminal）',
    x: 950,
    data: {
      hotelName: {
        name: '酒店名称',
        modalHidden: true
      },
      hotelId: {
        name: '酒店id',
        modalHidden: true,
        isNeed: true
      },
      mac: {
        name: 'MAC',
        maxLength: 12,
        showLength: 12,
        tableShow: {
          width: 120,
          align: 'center'
        },
        type: 'select',
        editabled: true,
        isNeed: true
      },
      ammeter: {
        name: '终端序号',
        maxLength: 8,
        showLength: 8,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      name: {
        name: '终端名称',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true // 是否可编辑
      },
      floor: {
        name: '楼层',
        maxLength: 3,
        showLength: 3,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      type1: {
        name: '类型',
        type: 'select',
        maxLength: 3,
        showLength: 3,
        modalHidden: false, // 按钮是否隐藏
        editabled: true
      },
      typeName: {
        name: '类型',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true // 按钮是否隐藏
      },
      flag: {
        name: '状态',
        modalHidden: true // 按钮是否隐藏
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  terminaluser: {
    name: '终端（terminal）',
    x: 950,
    data: {
      hotelName: {
        name: '酒店名称',
        tableShow: {
          width: 500
        },
        modalHidden: true
      },
      hotelId: {
        name: '酒店id',
        modalHidden: true,
        isNeed: true
      },
      mac: {
        name: 'MAC',
        maxLength: 12,
        showLength: 12,
        tableShow: {
          width: 120,
          align: 'center'
        },
        type: 'select',
        // editabled: true,
        isNeed: true
      },
      ammeter: {
        name: '终端序号',
        maxLength: 8,
        showLength: 8,
        tableShow: {
          width: 120,
          align: 'center'
        },
        // editabled: true,
        isNeed: true
      },
      name: {
        name: '终端名称',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 120,
          align: 'center'
        }
        // editabled: true,
      },
      floor: {
        name: '楼层',
        maxLength: 3,
        showLength: 3,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  config: {
    name: '配置（config）',
    x: 3380,
    data: {
      owner: {
        name: '归属',
        isNeed: true,
        modalHidden: true
      },
      ownerName: {
        name: '归属',
        maxLength: 60,
        showLength: 60,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true
      },
      ownerId: {
        name: '归属id',
        modalHidden: true,
        isNeed: true
      },
      field: {
        name: '配置项',
        type: 'select',
        editabled: true
      },
      fieldName: {
        name: '配置项',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 300
        },
        modalHidden: true
      },
      value: {
        name: '参数值',
        maxLength: 255,
        showLength: 100,
        type: 'textarea',
        tableShow: {
          width: 800
        },
        isNeed: true,
        editabled: true
      },
      remark: {
        name: '备注',
        type: 'textarea',
        editabled: true,
        maxLength: 255,
        showLength: 100,
        tableShow: {
          width: 650
        }
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  configParameter: {
    name: '系统配置相关(config_parameter)',
    title: '常量维护',
    x: 3000,
    data: {
      name: {
        name: '参数名称',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 300
        },
        editabled: true,
        isNeed: true
      },
      code: {
        name: '参数编码',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 300
        },
        editabled: true,
        isNeed: true
      },
      value: {
        name: '参数值',
        maxLength: 255,
        showLength: 100,
        tableShow: {
          width: 1250
        },
        type: 'textarea',
        editabled: true,
        isNeed: true
      },
      info: {
        name: '参数说明',
        maxLength: 255,
        showLength: 50,
        tableShow: {
          width: 650
        },
        type: 'textarea',
        editabled: true
      },
      editName: {
        name: '是否可编辑', // (1可编辑，2不可编辑),
        maxLength: 4,
        showLength: 4,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        modalHidden: true
      },
      edit: {
        name: '是否可编辑',
        type: 'select',
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      seqno: {
        name: '序号',
        modalHidden: false,
        editabled: true
      }
    }
  },
  alarmConfig: {
    name: '告警配置（alarm_config）',
    x: 2800,
    data: {
      owner: {
        name: '归属',
        maxLength: 15,
        showLength: 15,
        modalHidden: true
        // tableShow: {
        // 	width: 220
        // },
        // isNeed: true
      },
      ownerName: {
        name: '归属',
        maxLength: 15,
        showLength: 15,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true
      },
      ownerId: {
        name: '归属id',
        modalHidden: true,
        isNeed: true
      },
      alarmType: {
        name: '告警类型',
        type: 'select',
        editabled: true,
        isNeed: true
      },
      alarmTypeName: {
        name: '告警类型',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 300
        },
        modalHidden: true
      },
      value: {
        name: '配置值',
        type: 'textarea',
        maxLength: 255,
        showLength: 100,
        tableShow: {
          width: 800
        },
        editabled: true,
        isNeed: true
      },
      circleTime: {
        name: '告警周期',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      remark: {
        name: '备注',
        type: 'textarea',
        maxLength: 255,
        showLength: 50,
        tableShow: {
          width: 650
        },
        editabled: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  hotelGuestRoomType: {
    name: '酒店客房类型（hotel_guest_room_type）',
    x: 1140,
    data: {
      hotelId: {
        name: '酒店id',
        modalHidden: true,
        isNeed: true
      },
      name: {
        name: '客房类型',
        tableShow: {
          width: 380
        },
        isNeed: true,
        editabled: true,
        type: 'select',
        syncField: 'code'
      },
      code: {
        name: '客房类型值',
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true
      },
      seqno: {
        name: '序号',
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  configField: {
    name: '参数配置（config_field）',
    x: 3600,
    data: {
      name: {
        name: '参数名称',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 300
        },
        isNeed: true,
        editabled: true
      },
      code: {
        name: '参数编码',
        maxLength: 4,
        showLength: 4,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      strategy: {
        name: '查找策略',
        type: 'select',
        mode: 'multiple',
        isNeed: true,
        editabled: true
      },
      strategyName: {
        name: '查找策略',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 150
        },
        modalHidden: true
      },
      owner: {
        name: '参数所属',
        type: 'select',
        // mode: 'multiple',
        isNeed: true,
        editabled: true
      },
      ownerName: {
        name: '参数所属',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      activated: {
        name: '是否启用', // （1启用，0不启用）
        type: 'select',
        isNeed: true,
        editabled: true
      },
      activatedName: {
        name: '是否启用', // （1启用，0不启用）
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      defaultValue: {
        name: '默认参数值',
        maxLength: 255,
        showLength: 100,
        tableShow: {
          width: 800
        },
        type: 'textarea',
        isNeed: true,
        editabled: true
      },
      remark: {
        name: '备注', // （1启用，0不启用）
        type: 'textarea',
        editabled: true,
        maxLength: 255,
        showLength: 50,
        tableShow: {
          width: 650
        }
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      seqno: {
        name: '序号',
        modalHidden: false,
        editabled: true
      }
    }
  },
  alarmType: {
    name: '告警类型（alarm_type）',
    title: '告警类型维护',
    layout: '',
    x: 3780,
    data: {
      name: {
        name: '告警类型名称',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 300
        },
        editabled: true,
        isNeed: true
      },
      code: {
        name: '告警类型值',
        maxLength: 4,
        showLength: 4,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      owner: {
        name: '归属',
        type: 'select',
        editabled: true,
        isNeed: true
      },
      ownerName: {
        name: '归属',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      strategyName: {
        name: '查找策略',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 150
        },
        modalHidden: true
      },
      strategy: {
        name: '查找策略',
        type: 'select',
        mode: 'multiple',
        editabled: true,
        isNeed: true
      },
      activated: {
        name: '是否启用', // （1启用，0不启用）
        editabled: true,
        isNeed: true,
        type: 'select'
      },
      activatedName: {
        name: '是否启用', // （1启用，0不启用）
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      circleTime: {
        name: '告警周期(秒)',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        isNeed: true
      },
      defaultValue: {
        name: '默认值',
        maxLength: 255,
        showLength: 100,
        tableShow: {
          width: 800
        },
        type: 'textarea',
        editabled: true,
        isNeed: true
      },
      remark: {
        name: '说明',
        maxLength: 255,
        showLength: 50,
        tableShow: {
          width: 650
        },
        type: 'textarea',
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      seqno: {
        name: '序号',
        modalHidden: false,
        editabled: true
      }
    }
  },
  hotelInfo: {
    name: '酒店简介',
    x: 3600,
    data: {
      info: {
        name: '酒店简介',
        maxLength: 50,
        showLength: 50,
        tableShow: {
          width: 300
        },
        type: 'textarea',
        isNeed: true,
        editabled: true
      }
    }
  },
  modbusDeviceConfig: {
    name: '通讯机配置（modbus_device_config）',
    x: 5600,
    data: {
      mac: {
        name: 'MAC地址',
        maxLength: 12,
        showLength: 12,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true
      },
      tip: {
        name: '远程升级服务器地址',
        maxLength: 32,
        showLength: 32,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      tport: {
        name: '远程升级服务器端口',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      uip: {
        name: '远程服务器地址',
        maxLength: 32,
        showLength: 32,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      uport: {
        name: '远程服务器端口',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      bip: {
        name: '远程备用服务器地址',
        maxLength: 32,
        showLength: 32,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      bport: {
        name: '远程备用服务器端口',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      modbus: {
        name: '本地modbus通讯设置',
        maxLength: 45,
        showLength: 45,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      ip: {
        name: '本地静态地址',
        maxLength: 32,
        showLength: 32,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      mask: {
        name: '本地静态子网掩码',
        maxLength: 32,
        showLength: 32,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      gateway: {
        name: '本地静态网关',
        maxLength: 32,
        showLength: 32,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      freeze: {
        name: '冻结时间',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      rola: {
        name: 'ROLA模块的设置参数',
        maxLength: 32,
        showLength: 32,
        tableShow: {
          width: 480,
          align: 'center'
        },
        editabled: true
      },
      checkTime: {
        name: '校准时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        delStatus: true,
        modalHidden: true
      },
      runarea: {
        name: '程序运行区域',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      }
    }
  },
  proviceCity: {
    name: '省市配置（provice_city）',
    title: '省市维护',
    layout: '',
    x: 1320,
    data: {
      proName: {
        name: '上级名称',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      procode: {
        name: '上级编码',
        isNeed: true
      },
      name: {
        name: '名称',
        maxLength: 10,
        showLength: 10,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      code: {
        name: ' 编码',
        maxLength: 6,
        showLength: 6,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      protype: {
        name: ' 区域类型',
        isNeed: true,
        modalHidden: true
      },
      protypeName: {
        name: ' 区域类型',
        maxLength: 3,
        showLength: 3,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true,
        isNeed: true
      },
      seqno: {
        name: ' 序号',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      pathway: {
        name: ' 完整区域路径',
        maxLength: 30,
        showLength: 30,
        tableShow: {
          width: 450
        },
        isNeed: true,
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  dictionary: {
    name: '字典（dictionary）',
    title: '字典维护',
    layout: '',
    x: 1040,
    data: {
      name: {
        name: '参数名称',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        editabled: true
      },
      code: {
        name: '参数编码',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        editabled: true
      },
      editName: {
        name: '是否可编辑', // (1可编辑，2不可编辑),
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true,
        modalHidden: true
      },
      edit: {
        name: '是否可编辑',
        type: 'select',
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      seqno: {
        name: '序号',
        modalHidden: false,
        editabled: true
      }
    }
  },
  dictionaryDetail: {
    name: '字典详情（dictionary_detail）',
    x: 1080,
    data: {
      pid: {
        name: '上级id',
        // tableShow: {
        // 	width: '20%'
        // },
        modalHidden: true,
        isNeed: true
      },
      name: {
        name: '名称',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        isNeed: true,
        editabled: true
      },
      code: {
        name: '编码',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        isNeed: true,
        editabled: true
      },
      seqno: {
        name: '排序',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  CacheLoadType: {
    name: '缓存维护（dictionary_detail）',
    x: 1080,
    data: {
      pid: {
        name: '上级id',
        // tableShow: {
        // 	width: '20%'
        // },
        modalHidden: true,
        isNeed: true
      },
      name: {
        name: '名称',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        isNeed: true,
        editabled: true
      },
      code: {
        name: '编码',
        maxLength: 20,
        showLength: 20,
        tableShow: {
          width: 380
        },
        isNeed: true,
        editabled: true
      },
      seqno: {
        name: '排序',
        maxLength: 11,
        showLength: 11,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  wxUser: {
    name: '微信用户',
    data: {
      uphone: {
        name: '用户标识',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      uname: {
        name: '用户名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      utype: {
        name: '用户类型',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      utypeName: {
        name: '用户类型',
        isNeed: true,
        type: 'select',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  wxUserhotel: {
    name: '用户关联酒店表',
    data: {
      userId: {
        name: '用户id',
        isNeed: true,
        modalHidden: true
        /* tableShow: {
					width: 120,
					align: 'center'
				},
				editabled: true */
      },
      companyCode: {
        name: '集团编码',
        isNeed: true,
        // tableShow: {
        // 	width: 120,
        // 	align: 'center'
        // },
        type: 'select',
        editabled: true
      },
      companyName: {
        name: '集团名称',
        isNeed: true,
        type: 'select',
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true,
        editabled: true
      },
      hotelName: {
        name: '酒店名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true,
        editabled: true
      },
      hotelId: {
        name: '酒店id',
        isNeed: true,
        // tableShow: {
        // 	width: 120,
        // 	align: 'center'
        // },
        modalHidden: true,
        editabled: true
      }
      /* flag: {
				name: '状态',
				modalHidden: true
			},
			flagName: {
				name: '状态',
				tableShow: {
					width: 120,
					align: 'center'
				},
			}, */
    }
  },
  wxBinduser: {
    name: '用户绑定信息（wx_binduser）',
    data: {
      nickname: {
        name: '昵称', // （0否，1是）
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        editabled: true
      },
      type: {
        name: '用户类型', // （1:微信公众号, 2:小程序 ）
        isNeed: true,
        // tableShow: {
        // 	width: 180,
        // 	align: 'center'
        // },
        editabled: true
      },
      typeName: {
        name: '用户类型', // （1:微信公众号, 2:小程序 ）
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        editabled: true
      },
      openid: {
        name: '微信OPENID',
        isNeed: true,
        tableShow: {
          width: 280,
          align: 'center'
        },
        editabled: true
      },
      unionid: {
        name: '微信UNIONID', // （0否，1是）
        isNeed: true,
        tableShow: {
          width: 280,
          align: 'center'
        },
        editabled: true
      },
      subscribe: {
        name: '是否关注公众号', // （0否，1是）
        isNeed: true,
        // tableShow: {
        // 	width: 180,
        // 	align: 'center'
        // },
        editabled: true
      },
      subscribeName: {
        name: '是否关注公众号', // （0否，1是）
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        editabled: true
      },
      subscribeTime: {
        name: '关注时间', // （0否，1是）
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        editabled: true
      },
      sex: {
        name: '性别', // （值为1时是男性，值为2时是女性，值为0时是未知 ）
        isNeed: true,
        // tableShow: {
        // 	width: 180,
        // 	align: 'center'
        // },
        editabled: true
      },
      sexName: {
        name: '性别', // （值为1时是男性，值为2时是女性，值为0时是未知 ）
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        editabled: true
      },
      country: {
        name: '国家', // （值为1时是男性，值为2时是女性，值为0时是未知 ）
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        editabled: true
      },
      province: {
        name: '省份', // （值为1时是男性，值为2时是女性，值为0时是未知 ）
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        editabled: true
      },
      city: {
        name: '市', // （值为1时是男性，值为2时是女性，值为0时是未知 ）
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        editabled: true
      },
      userId: {
        name: '用户id',
        isNeed: true,
        modalHidden: true
        /* tableShow: {
					width: 120,
					align: 'center'
				},
				editabled: true */
      }
      /* flag: {
				name: '状态',
				modalHidden: true
			},
			flagName: {
				name: '状态',
				tableShow: {
					width: 120,
					align: 'center'
				},
			}, */
    }
  },
  wxBindInfo: {
    name: '微信用户管理主表（wx_binduser）',
    data: {
      userId: {
        name: '用户id',
        isNeed: true
      },
      nickname: {
        name: '昵称',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        }
      },
      openid: {
        name: '微信OPENID',
        isNeed: true,
        tableShow: {
          width: 280,
          align: 'center'
        }
      },
      unionid: {
        name: '微信UNIONID',
        isNeed: true,
        tableShow: {
          width: 280,
          align: 'center'
        }
      },
      uphone: {
        name: '用户标识',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      uname: {
        name: '用户名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      utype: {
        name: '用户类型',
        isNeed: true
      },
      utypeName: {
        name: '用户类型',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  wxUserfollow: {
    name: '用户关注的酒店（wx_userfollow）',
    data: {
      openid: {
        name: '标识',
        isNeed: true
      },
      hotelId: {
        name: '酒店id',
        isNeed: true,
        editabled: true
      },
      hotelName: {
        name: '酒店名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      fock: {
        name: '是否默认',
        isNeed: true,
        editabled: true
      },
      fockName: {
        name: '是否默认',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
      // flag: {
      // 	name: '状态',
      // 	modalHidden: true
      // },
      // flagName: {
      // 	name: '状态',
      // 	tableShow: {
      // 		width: 120,
      // 		align: 'center'
      // 	},
      // },
    }
  },
  wxWarnNote: {
    name: '告警处理方式（wx_warn_note）',
    data: {
      warntypeCode: {
        name: '告警类型编码',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        type: 'select',
        editabled: true
      },
      warntypeName: {
        name: '告警类型名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      info: {
        name: '处理方法',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      }
      // flag: {
      // 	name: '状态',
      // 	modalHidden: true
      // },
      // flagName: {
      // 	name: '状态',
      // 	tableShow: {
      // 		width: 120,
      // 		align: 'center'
      // 	},
      // },
    }
  },
  wxTempalte: {
    name: '告警消息模板（wx_template）',
    data: {
      name: {
        name: '模板名称',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        editabled: true
      },
      warntype: {
        name: '告警类型',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      warntypeName: {
        name: '告警类型',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      templateId: {
        name: '模板id',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        type: 'textarea',
        editabled: true
      },
      url: {
        name: '跳转链接',
        isNeed: true,
        tableShow: {
          width: 380,
          align: 'center'
        },
        type: 'textarea',
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  wxTempalteReport: {
    name: '报表消息模板（wx_template_report）',
    data: {
      name: {
        name: '报表名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      code: {
        name: '报表类型',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      templateId: {
        name: '模板id',
        isNeed: true,
        tableShow: {
          width: 300,
          align: 'center'
        },
        type: 'textarea',
        editabled: true
      },
      url: {
        name: '跳转链接',
        isNeed: true,
        tableShow: {
          width: 300,
          align: 'center'
        },
        type: 'textarea',
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  wxWarnSwitch: {
    name: '告警按钮（wx_warn_switch）',
    data: {
      name: {
        name: '按钮名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      code: {
        name: '按钮编码',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      actived: {
        name: '是否启用',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      activedName: {
        name: '是否启用',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  wxWarnSwitchAlarmtype: {
    name: '告警类型（wx_warn_switch_alarmtype）',
    data: {
      switchCode: {
        name: '按钮编码',
        isNeed: true
      },
      alarmType: {
        name: '告警类型',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        type: 'select',
        editabled: true
      },
      alarmName: {
        name: '告警名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
        // editabled: true
      }
      /* flag: {
				name: '状态',
				modalHidden: true
			},
			flagName: {
				name: '状态',
				tableShow: {
					width: 120,
					align: 'center'
				},
			}, */
    }
  },
  wxParameter: {
    name: '微信参数（wx_parameter）',
    data: {
      name: {
        name: '参数名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      value: {
        name: '参数值',
        isNeed: true,
        tableShow: {
          width: 680
        },

        editabled: true
      },
      info: {
        name: '说明',
        isNeed: true,
        tableShow: {
          width: 380,
          align: 'center'
        },
        type: 'textarea',
        editabled: true
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  terminalDeveloper: {
    name: '开发者信息（terminal_developer）',
    data: {
      id: {
        name: 'id',
        isNeed: true,
        modalHidden: true
      },
      name: {
        name: '名称',
        isNeed: true,
        tableShow: {
          width: 200,
          align: 'center'
        },
        editabled: true
      },
      telephone: {
        name: '电话',
        isNeed: true,
        tableShow: {
          width: 140,
          align: 'center'
        },
        editabled: true
      },
      address: {
        name: '地址',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        type: 'textarea',
        editabled: true
      },
      logo: {
        name: '图片',
        isNeed: true,
        type: 'upload',
        fileType: 'image',
        max: 1,
        hideUploadList: true,
        mode: 'multiple',
        min: 1,
        imgUrl: {
          check: 't_readDevelpoerTwobarcode', /// hotel/terminal/readDevelpoerTwobarcode
          add: 't_manager_terminalDeveloper_saveOne', /// hotel/terminal/manager/terminalDeveloper/saveOne
          update: 't_manager_terminalDeveloper_updateOne'
        },
        editabled: true
      }
    }
  },
  terminalStatus: {
    name: '终端信息（terminal_status）',
    data: {
      id: {
        name: 'id',
        isNeed: true,
        modalHidden: true
      },
      hotelId: {
        name: '酒店ID',
        isNeed: true,
        editabled: true,
        modalHidden: true
      },
      deviceId: {
        name: '终端设备ID',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      deviceIp: {
        name: '设备ip',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      status: {
        name: '状态', // （0:未知,1连接,2:断开）
        isNeed: true,
        editabled: true,
        type: 'select'
      },
      statusName: {
        name: '状态', // （0:未知,1连接,2:断开）
        modalHidden: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      jsVersion: {
        name: 'JS版本',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      apkVersion: {
        name: 'APK版本',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      updateTime: {
        name: '更新时间',
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  terminalVersion: {
    name: '终端版本信息（terminal_version）',
    data: {
      id: {
        name: 'id',
        modalHidden: true,
        isNeed: true
      },
      name: {
        name: '名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      apkFileName: {
        name: '文件名称',
        modalHidden: true,
        tableShow: {
          width: 180,
          align: 'center'
        }
      },
      apkVersion: {
        name: '程序版本',
        isNeed: true,
        editabled: true,
        type: 'number',
        rule: {
          min: 1
        },
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      info: {
        name: '版本信息',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      jsVersion: {
        name: 'js版本',
        isNeed: true,
        editabled: true,
        type: 'number',
        rule: {
          min: 1
        },
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      downurl: {
        name: 'APK下载路径',
        isNeed: true,
        editabled: true,
        type: 'textarea',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      apkFile: {
        name: '压缩包',
        isNeed: true,
        type: 'upload',
        fileType: 'apk',
        max: 1,
        download: true,
        hideUploadList: true,
        mode: 'multiple',
        min: 1,
        editabled: true,
        fileUrl: {
          download: 't_apkdown',
          // check: 't_hotelLogo',///hotel/terminal/hotelLogo?hotelid=
          add: 't_manager_terminalVersion_saveOne', /// hotel/terminal/manager/terminalDeveloper/saveOne
          update: 't_manager_terminalVersion_updateOne'
        }
      },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  terminalHotelLogo: {
    name: '酒店logo（terminal_hotel_logo）',
    data: {
      id: {
        name: 'id',
        modalHidden: true,
        isNeed: true
      },
      hotelId: {
        name: '酒店ID',
        isNeed: true,
        modalHidden: true
      },
      fileName: {
        name: '图片名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      fileSuffix: {
        name: '图片类型',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      logo: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {
          check: 't_hotelLogo', /// hotel/terminal/hotelLogo?hotelid=
          add: 't_manager_terminalHotelLogo_saveOne', /// hotel/terminal/manager/terminalDeveloper/saveOne
          update: 't_manager_terminalHotelLogo_updateOne'
        }
      }
    }
  },
  bootDept: {
    name: 'boot-部门',
    data: {
      id: {
        name: 'ID',
        modalHidden: true
      },
      pid: {
        name: '上级部门',
        isNeed: true,
        modalHidden: true
      },
      code: {
        name: '编码',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      name: {
        name: '名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      tradecode: {
        name: '行业编码',
        isNeed: true,
        type: 'select'
      },
      tradename: {
        name: '行业名称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      linkcode: {
        name: '关联编码',
        tableShow: {
          width: 120,
          align: 'center'
        },
        editabled: true
      },
      flagname: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      flag: {
        name: '状态码'
      }
    }
  },
  bootDeptType: {
    name: 'boot-部门类型',
    data: {
      id: {
        name: 'ID',
        modalHidden: true
      },
      deptid: {
        name: '部门',
        modalHidden: true
      },
      name: {
        name: '类型名称',
        editabled: true,
        type: 'select',
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true
      },
      value: {
        name: '类型值',
        tableShow: {
          width: 120,
          align: 'center'
        }
      }
    }
  },
  bootUser: {
    name: 'boot-人员',
    data: {
      id: {
        name: 'ID',
        modalHidden: true
      },
      code: {
        name: '编码',
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true
      },
      name: {
        name: '名称',
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        isNeed: true
      },
      logincode: {
        name: '登录编号',
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      password: {
        name: '密码(MD5)',
        modalHidden: true
      },
      // deptid: {
      //   name: "部门ID",
      //   isNeed: true
      // },
      deptcode: {
        name: '部门编号',
        isNeed: true
      },
      deptname: {
        name: '部门名称',
        tableShow: {
          width: 300,
          align: 'center'
        },
        isNeed: true
      },
      flagname: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      flag: {
        name: '状态码'
      }
    }
  },
  bootUserRole: {
    name: 'boot-人员角色类型',
    data: {
      id: {
        name: 'ID',
        modalHidden: true
      },
      roleid: {
        name: '角色ID',
        isNeed: true,
        modalHidden: true
      },
      rolename: {
        name: '角色名称',
        isNeed: true,
        type: 'selectTree',
        editabled: true,
        tableShow: {
          width: 180
        }
      },
      userid: {
        name: '用户ID',
        modalHidden: true
      }
    }
  },
  bootRole: {
    name: 'boot-角色',
    data: {
      id: {
        name: 'ID',
        modalHidden: true
      },
      pid: {
        name: '父角色',
        modalHidden: true
      },
      name: {
        name: '名称',
        editabled: true,
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      tradecode: {
        name: '行业编码',
        isNeed: true,
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      tradename: {
        name: '行业名称',
        isNeed: true,
        tableShow: {
          width: 200,
          align: 'center'
        },
        type: 'select'
      },
      flagname: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      flag: {
        name: '状态码'
      }
    }
  },
  programIndex: {
    name: '首页配置',
    data: {
      activityTitle: {
        name: '活动标题',
        isNeed: true,
        tableShow: {
          width: 100,
          align: 'center'
        },
        editabled: true
      },
      seqno: {
        name: '排序序号',
        isNeed: true,
        tableShow: {
          width: 100,
          align: 'center'
        },
        type: 'number',
        rule: {
          min: 1
        },
        editabled: true
      },
      activityImgLocation: {
        name: '活动图位置',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      locationName: {
        name: '活动图位置',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态码',
        modalHidden: true
      },
      // name: {
      //   name: '关联活动',
      //   tableShow: {
      //     width: 200,
      //     align: 'center'
      //   },
      //   type: 'select',
      //   editabled: true
      // },
      // status: {
      //   name: '关联活动状态',
      //   modalHidden: true
      // },
      // statusName2: {
      //   name: '关联活动状态',
      //   tableShow: {
      //     width: 140,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      // starttime: {
      //   name: '关联活动上线时间',
      //   tableShow: {
      //     width: 150,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      // endtime: {
      //   name: '关联活动下线时间',
      //   tableShow: {
      //     width: 150,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      logo: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {
          check: 't_hotelLogo', /// hotel/terminal/hotelLogo?hotelid=
          add: 't_manager_terminalHotelLogo_saveOne', /// hotel/terminal/manager/terminalDeveloper/saveOne
          update: 't_manager_terminalHotelLogo_updateOne'
        }
      }
    }
  },
  programSystem: {
    name: '系统背景图',
    data: {
      name: {
        name: '名称',
        isNeed: true,
        editabled: true
      },
      code: {
        name: '背景图位置',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      codeName: {
        name: '背景图位置',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态码',
        modalHidden: true
      },
      logo: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  programNews: {
    name: '首页新闻管理',
    data: {
      title: {
        name: '新闻名称',
        tableShow: {
          width: 180,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      description: {
        name: '新闻描述',
        tableShow: {
          width: 180,
          align: 'center'
        },
        type: 'textarea',
        isNeed: true,
        editabled: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态码',
        modalHidden: true
      },
      image: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  programNewsList: {
    name: '首页新闻列表',
    data: {
      title: {
        name: '新闻名称',
        tableShow: {
          width: 180,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      description: {
        name: '新闻描述',
        tableShow: {
          width: 180,
          align: 'center'
        },
        type: 'textarea',
        isNeed: true,
        editabled: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态码',
        modalHidden: true
      }
    }
  },
  programCarousel: {
    name: '首页轮播图管理',
    data: {
      title: {
        name: '名称',
        tableShow: {
          width: 180,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      imgName: {
        name: '图片名称',
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      imgSuffix: {
        name: '图片类型',
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      seqno: {
        name: '序号',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 80
        },
        editabled: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态码',
        modalHidden: true
      },
      image: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  homeBannerDetail: {
    name: '首页轮播图详情',
    data: {
      title: {
        name: '名称',
        tableShow: {
          width: 180,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      description: {
        name: '描述',
        tableShow: {
          width: 180,
          align: 'center'
        },
        isNeed: true,
        editabled: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态码',
        modalHidden: true
      }
    }
  },
  programActivity: {
    name: '活动配置',
    data: {
      num: {
        name: '活动编号',
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      name: {
        name: '活动名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 160,
          align: 'center'
        }
      },
      redirectUrl: {
        name: '跳转链接',
        // isNeed: true,
        editabled: true,
        tableShow: {
          width: 180,
          align: 'center'
        }
      },
      status: {
        name: '状态',
        modalHidden: true
      },
      statusName2: {
        name: '状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      starttime: {
        name: '开始时间',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        editabled: true
      },
      endtime: {
        name: '结束时间',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        editabled: true
      }
    }
  },
  programUser: {
    name: '用户查询',
    data: {
      userNum: {
        name: '用户编号',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      nickname: {
        name: '昵称',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      // headimgcode: {
      //   name: '用户头像',
      //   isNeed: true,
      //   type: 'select',
      //   modalHidden: true
      // },
      sex: {
        name: '性别',
        modalHidden: true
      },
      sexName: {
        name: '性别',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      birthday: {
        name: '生日',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      telphone: {
        name: '手机号',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      cityss: {
        name: '城市',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      lastTime: {
        name: '最后登录时间',
        isNeed: true,
        type: 'select',
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      flag: {
        name: '状态码',
        modalHidden: true
      }
    }
  },
  memberWechat: {
    name: '用户查询_微信用户',
    data: {
      userNum: {
        name: '用户编号',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      openid: {
        name: 'openid',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        editabled: true
      },
      unionid: {
        name: 'unionid',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        editabled: true
      }
    }
  },
  memberCredit: {
    name: '用户查询_积分查询',
    data: {
      userNum: {
        name: '用户编号',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      sumCredit: {
        name: '总积分',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      usableCredit: {
        name: '可用积分',
        isNeed: true,
        type: 'select',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      convertedCredit: {
        name: '已兑换积分',
        isNeed: true,
        type: 'select',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      freezeCredit: {
        name: '冻结积分',
        isNeed: true,
        type: 'select',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  memberCreditExpend: {
    name: '用户查询_支出明细',
    data: {
      userNum: {
        name: '用户编号',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      credit: {
        name: '碳积分',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      time: {
        name: '时间',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      description: {
        name: '描述',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  memberCreditIncome: {
    name: '用户查询_收入明细',
    data: {
      userNum: {
        name: '用户编号',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      credit: {
        name: '碳积分',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      time: {
        name: '时间',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      description: {
        name: '描述',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  memberCreditFreeze: {
    name: '用户查询_冻结明细',
    data: {
      userNum: {
        name: '用户编号',
        isNeed: true,
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      credit: {
        name: '碳积分',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      type: {
        name: '积分冻结类型',
        isNeed: true,
        type: 'select',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      time: {
        name: '时间',
        isNeed: true,
        type: 'select',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      description: {
        name: '描述',
        isNeed: true,
        type: 'select',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  programSignHistory: {
    name: '历史签住',
    data: {
      userNum: {
        name: '用户编号',
        isNeed: true,
        tableShow: {
          width: 140,
          align: 'center'
        },
        modalHidden: true
      },
      checkNum: {
        name: '签住编号',
        isNeed: true,
        tableShow: {
          width: 140,
          align: 'center'
        },
        modalHidden: true
      },
      inTime: {
        name: '签住时间',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      outTime: {
        name: '预计签退时间',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      realOutTime: {
        name: '真实签退时间',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      roomName: {
        name: '房间号',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      roomType: {
        name: '客房类型',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      sumCredit: {
        name: '累计积分',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      outType: {
        name: '签退类型',
        modalHidden: true
      },
      outTypeName: {
        name: '签退类型',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      checkStatus: {
        name: '签退状态',
        modalHidden: true
      },
      checkStatusName: {
        name: '签退状态',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      hotelAddress: {
        name: '酒店地址',
        isNeed: true,
        tableShow: {
          width: 200,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  programSignCurrent: {
    name: '当前签住',
    data: {
      userNum: {
        name: '用户编号',
        isNeed: true,
        tableShow: {
          width: 138,
          align: 'center'
        },
        modalHidden: true
      },
      checkNum: {
        name: '签住编号',
        isNeed: true,
        tableShow: {
          width: 140,
          align: 'center'
        },
        modalHidden: true
      },
      inTime: {
        name: '签住时间',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      outTime: {
        name: '预计签退时间',
        isNeed: true,
        tableShow: {
          width: 180,
          align: 'center'
        },
        modalHidden: true
      },
      roomName: {
        name: '房间号',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      roomType: {
        name: '客房类型',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      sumCredit: {
        name: '累计积分',
        isNeed: true,
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  programHotelunit: {
    name: '酒店单位用电配置',
    data: {
      spring: {
        name: '春天',
        isNeed: true,
        tableShow: {
          width: 200,
          align: 'center'
        },
        editabled: true
      },
      summer: {
        name: '夏天',
        isNeed: true,
        tableShow: {
          width: 200,
          align: 'center'
        },
        editabled: true
      },
      autumn: {
        name: '秋天',
        isNeed: true,
        tableShow: {
          width: 200,
          align: 'center'
        },
        editabled: true
      },
      winter: {
        name: '冬天',
        isNeed: true,
        tableShow: {
          width: 200,
          align: 'center'
        },
        editabled: true
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 200
        },
        modalHidden: true
      }
    }
  },
  programUnit: {
    name: '单位用电配置',
    data: {
      spring: {
        name: '春天',
        isNeed: true,
        tableShow: {
          width: 250,
          align: 'center'
        },
        editabled: true
      },
      summer: {
        name: '夏天',
        isNeed: true,
        tableShow: {
          width: 250,
          align: 'center'
        },
        editabled: true
      },
      autumn: {
        name: '秋天',
        isNeed: true,
        tableShow: {
          width: 250,
          align: 'center'
        },
        editabled: true
      },
      winter: {
        name: '冬天',
        isNeed: true,
        tableShow: {
          width: 250,
          align: 'center'
        },
        editabled: true
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 200
        },
        modalHidden: true
      }
    }
  },
  programCredit: {
    name: '酒店积分',
    data: {
      sumCredit: {
        name: '积分总数',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      realCredit: {
        name: '实际积分数',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      planCredit: {
        name: '加速计划积分数',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      lowCarbonGrade: {
        name: '低碳等级',
        type: 'select',
        isNeed: true
      },
      lowCarbonGradeName: {
        name: '低碳等级',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      }
    }
  },
  programCreditGrade: {
    name: '酒店能耗等级阙值',
    data: {
      minCredit: {
        name: '最低积分',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        type: 'number',
        rule: {
          min: 1
        },
        editabled: true
      },
      maxCredit: {
        name: '最高积分',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        type: 'number',
        rule: {
          min: 1
        },
        editabled: true
      },
      // gradeCode: {
      //   name: '等级编码',
      //   tableShow: {
      //     align: 'center',
      //     width: 120
      //   },
      //   modalHidden: true
      // },
      gradeName: {
        name: '等级名称',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      powerRank: {
        name: '等级',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      }
    }
  },
  programCreditPlan: {
    name: '积分加速',
    data: {
      starttime: {
        name: '开始时间',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 160
        },
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        editabled: true
      },
      endtime: {
        name: '结束时间',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 160
        },
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        editabled: true
      },
      rate: {
        name: '加速速率',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        type: 'number',
        rule: {
          min: 0
        },
        editabled: true
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      }
    }
  },
  programRoomCheck: {
    name: '酒店入住统计',
    data: {
      roomName: {
        name: '房间名称',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      checkCount: {
        name: '签住次数',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      checkHours: {
        name: '签住时长(h)',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      sumPower: {
        name: '总耗电量(kwh)',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 160
        },
        editabled: true
      },
      perHourPower: {
        name: '单位时间耗电量(kwh)',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 160
        },
        editabled: true
      },
      perCountPower: {
        name: '单次入住耗电量(kwh)',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 160
        },
        editabled: true
      }
    }
  },
  enviroImage: {
    name: '系统背景图',
    data: {
      imageName: {
        name: '图片名称',
        tableShow: {
          align: 'center',
          width: 180
        },
        modalHidden: true
      },
      imageWidth: {
        name: '图片宽度(px)',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      imageHeight: {
        name: '图片高度(px)',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      showType: {
        name: '展示方式',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      imgtypeName: {
        name: '展示方式',
        isNeed: true,
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      seqno: {
        name: '序号',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 100
        },
        editabled: true
      },
      masterName: {
        name: '是否为主图',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 100
        },
        modalHidden: true
      },
      image: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  platFormCard: {
    name: '券商品管理',
    data: {
      name: {
        name: '名称',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      image: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  groupCard: {
    name: '集团商品管理',
    data: {
      name: {
        name: '名称',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      systemDefaultName: {
        name: '是否为系统产品',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      image: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  groupCardOther: {
    name: '集团商品管理',
    data: {
      name: {
        name: '名称',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      systemDefaultName: {
        name: '是否为系统产品',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      image: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  hotelCardOther: {
    name: '消费券维护',
    data: {
      userNum: {
        name: '用户编码',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 180
        }
      },
      couponName: {
        name: '劵名称',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponNum: {
        name: '劵编号',
        info: 'Basic'
      },
      couponCode: {
        name: '劵码',
        info: 'Basic'
      },
      // goodsCategoryIconCode: {
      //   name: '编码',
      //   info:'Basic',
      // },
      couponOwnerTypeName: {
        name: '劵隶属类型',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponCost: {
        name: '核算成本',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      goodsCategoryName: {
        name: '商品类别名称',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      receiveChannelName: {
        name: '获取渠道名称',
        info: 'Get',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      receiveTime: {
        name: '获取时间',
        info: 'Get',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      useNum: {
        name: '核销编号',
        info: 'Use',
        tableShow: {
          align: 'center',
          width: 160
        }
      },
      useTime: {
        name: '核销时间',
        info: 'Use',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      useInfo: {
        name: '核销备注',
        info: 'Use',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      companyName: {
        name: '集团名称',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      hotelName: {
        name: '酒店名称',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      useDirection: {
        name: '使用说明',
        info: 'Basic',
        type: 'textarea',
        tableShow: {
          align: 'center',
          width: 300
        }
      },
      couponStatusName: {
        name: '券状态',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      activeInfo: {
        name: '有效时间',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      generalizeModelName: {
        name: '推广方式',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      exchangeOrderNum: {
        name: '劵兑换订单编号',
        info: 'Exchange',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      equalInfo: {
        name: '等价信息',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      exchangeOrderTime: {
        name: '劵兑换时间',
        info: 'Exchange',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      atyName: {
        name: '活动名称',
        info: 'Activity',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      distributeTypeName: {
        name: '发放方式',
        info: 'Activity',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      image: {
        name: '商品类别图标',
        info: 'Basic',
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  hotelCard: {
    name: '消费券维护',
    data: {
      userNum: {
        name: '用户编码',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 180
        }
      },
      couponName: {
        name: '劵名称',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponNum: {
        name: '劵编号',
        info: 'Basic'
      },
      couponCode: {
        name: '劵码',
        info: 'Basic'
      },
      couponOwnerTypeName: {
        name: '劵隶属类型',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponCost: {
        name: '核算成本',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      goodsCategoryName: {
        name: '商品类别名称',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      receiveChannelName: {
        name: '获取渠道名称',
        info: 'Get',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      receiveTime: {
        name: '获取时间',
        info: 'Get',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      useNum: {
        name: '核销编号',
        info: 'Use',
        tableShow: {
          align: 'center',
          width: 160
        }
      },
      useTime: {
        name: '核销时间',
        info: 'Use',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      useInfo: {
        name: '核销备注',
        info: 'Use',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      companyName: {
        name: '集团名称',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      hotelName: {
        name: '酒店名称',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      useDirection: {
        name: '使用说明',
        info: 'Basic',
        type: 'textarea',
        tableShow: {
          align: 'center',
          width: 220
        }
      },
      couponStatusName: {
        name: '券状态',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      activeInfo: {
        name: '有效时间',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      generalizeModelName: {
        name: '推广方式',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      exchangeOrderNum: {
        name: '劵兑换订单编号',
        info: 'Exchange',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      equalInfo: {
        name: '等价信息',
        info: 'Basic',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      exchangeOrderTime: {
        name: '劵兑换时间',
        info: 'Exchange',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      atyName: {
        name: '活动名称',
        info: 'Activity',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      distributeTypeName: {
        name: '发放方式',
        info: 'Activity',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      image: {
        name: '商品类别图标',
        info: 'Basic',
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  groupCoupTempOther: {
    name: '券模板管理',
    data: {
      tpmTitle: {
        name: '模板标题',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 160
        },
        editabled: true
      },
      couponName: {
        name: '劵名称',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      // couponType: {
      //   name: '劵类型',
      //   isNeed: true,
      //   type: 'select',
      //   editabled: true
      // },
      // couponTypeName: {
      //   name: '劵类型',
      //   tableShow: {
      //     align: 'center',
      //     width: 120
      //   },
      //   modalHidden: true
      // },
      // couponOwnerType: {
      //   name: '劵隶属类型',
      //   isNeed: true,
      //   type: 'select',
      //   editabled: true
      // },
      // couponOwnerTypeName: {
      //   name: '劵隶属类型',
      //   tableShow: {
      //     align: 'center',
      //     width: 120
      //   },
      //   modalHidden: true
      // },
      couponCost: {
        name: '核算成本',
        isNeed: true,
        type: 'number',
        rule: {
          min: 0
        },
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      goodsCategory: {
        name: '商品品类',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      goodsCategoryName: {
        name: '商品品类',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      giveChannel: {
        name: '投放渠道',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      giveChannelName: {
        name: '投放渠道',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      giveNum: {
        name: '投放数量',
        isNeed: true,
        type: 'number',
        rule: {
          min: 0
        },
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      surplusNum: {
        name: '余量',
        type: 'number',
        rule: {
          min: 0
        },
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      hotelLimitTag: {
        name: '酒店标签',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      useDirection: {
        name: '使用说明',
        type: 'textarea',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 280
        },
        editabled: true
      },
      generalizeModel: {
        name: '推广方式',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      generalizeModelName: {
        name: '推广方式',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      equalModel: {
        name: '等价类别',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      equalModelName: {
        name: '等价类别',
        modalHidden: true
      },
      equalNum: {
        name: '等价额度',
        type: 'number',
        rule: {
          min: 0
        },
        isNeed: true,
        editabled: true
      },
      tpmCreaterName: {
        name: '创建者名称',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      tpmCreatetime: {
        name: '创建时间',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      activeInfo: {
        name: '有效时间',
        tableShow: {
          align: 'center',
          width: 180
        },
        modalHidden: true
      },
      equalInfo: {
        name: '等价信息',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      activeModel: {
        name: '有效期模式',
        type: 'select',
        isNeed: true,
        editabled: true
      },
      activeStarttime: {
        name: '有效起始时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true
      },
      activeEndtime: {
        name: '有效结束时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true
      },
      activeDays: {
        name: '有效天数',
        type: 'number',
        rule: {
          min: 0
        },
        isNeed: true,
        editabled: true
      },
      flag: {
        name: '模板状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '模板状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      }
    }
  },
  groupCoupTemp: {
    name: '券模板维护',
    data: {
      tpmTitle: {
        name: '模板标题',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 160
        },
        editabled: true
      },
      couponName: {
        name: '劵名称',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      // couponType: {
      //   name: '劵类型',
      //   isNeed: true,
      //   type: 'select',
      //   editabled: true
      // },
      // couponTypeName: {
      //   name: '劵类型',
      //   tableShow: {
      //     align: 'center',
      //     width: 120
      //   },
      //   modalHidden: true
      // },
      // couponOwnerType: {
      //   name: '劵隶属类型',
      //   isNeed: true,
      //   type: 'select',
      //   editabled: true
      // },
      // couponOwnerTypeName: {
      //   name: '劵隶属类型',
      //   tableShow: {
      //     align: 'center',
      //     width: 120
      //   },
      //   modalHidden: true
      // },
      couponCost: {
        name: '核算成本',
        type: 'number',
        rule: {
          min: 0
        },
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      goodsCategory: {
        name: '商品品类',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      goodsCategoryName: {
        name: '商品品类',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      giveChannel: {
        name: '投放渠道',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      giveChannelName: {
        name: '投放渠道',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      giveNum: {
        name: '投放数量',
        isNeed: true,
        type: 'number',
        rule: {
          min: 0
        },
        tableShow: {
          align: 'center',
          width: 120
        },
        editabled: true
      },
      surplusNum: {
        name: '余量',
        type: 'number',
        rule: {
          min: 0
        },
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      hotelLimitTag: {
        name: '酒店标签',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      useDirection: {
        name: '使用说明',
        type: 'textarea',
        isNeed: true,
        tableShow: {
          align: 'center',
          width: 280
        },
        editabled: true
      },
      generalizeModel: {
        name: '推广方式',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      generalizeModelName: {
        name: '推广方式',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      equalModel: {
        name: '等价类别',
        isNeed: true,
        type: 'select',
        editabled: true
      },
      equalModelName: {
        name: '等价类别',
        modalHidden: true
      },
      equalNum: {
        name: '等价额度',
        type: 'number',
        rule: {
          min: 0
        },
        isNeed: true,
        editabled: true
      },
      tpmCreaterName: {
        name: '创建者名称',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      tpmCreatetime: {
        name: '创建时间',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      activeInfo: {
        name: '有效时间',
        tableShow: {
          align: 'center',
          width: 180
        },
        modalHidden: true
      },
      equalInfo: {
        name: '等价信息',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      activeModel: {
        name: '有效期模式',
        type: 'select',
        isNeed: true,
        editabled: true
      },
      activeStarttime: {
        name: '有效起始时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true
      },
      activeEndtime: {
        name: '有效结束时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true
      },
      activeDays: {
        name: '有效天数',
        type: 'number',
        rule: {
          min: 0
        },
        isNeed: true,
        editabled: true
      },
      flag: {
        name: '模板状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '模板状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      }
    }
  },
  groupHotelSign: {
    name: '酒店标签',
    data: {
      couponTypeName: {
        name: '券类型',
        tableShow: {
          align: 'center',
          width: 160
        }
      },
      companyName: {
        name: '集团名称',
        tableShow: {
          align: 'center',
          width: 450
        }
      },
      hotelName: {
        name: '酒店名称',
        tableShow: {
          align: 'center',
          width: 160
        }
      }
    }
  },
  selectedHotel: {
    name: '可选酒店',
    data: {
      companyName: {
        name: '集团名称',
        tableShow: {
          align: 'center',
          width: 250
        }
      },
      brandName: {
        name: '品牌名称',
        tableShow: {
          align: 'center',
          width: 200
        }
      },
      name: {
        name: '酒店名称',
        tableShow: {
          align: 'center',
          width: 120
        }
      }
    }
  },
  availableHotel: {
    name: '待选酒店',
    data: {
      companyName: {
        name: '集团名称',
        tableShow: {
          align: 'center',
          width: 250
        }
      },
      brandName: {
        name: '品牌名称',
        tableShow: {
          align: 'center',
          width: 200
        }
      },
      name: {
        name: '酒店名称',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      orderTime: {
        name: '兑换订单时间',
        tableShow: {
          align: 'center',
          width: 110
        }
      },
      userNum: {
        name: '用户编号',
        tableShow: {
          align: 'center',
          width: 160
        }
      },
      tpmNum: {
        name: '劵模板编号',
        tableShow: {
          align: 'center',
          width: 180
        }
      },
      couponTypeName: {
        name: '劵类型',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      couponName: {
        name: '劵名称',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      couponNum: {
        name: '劵编号',
        tableShow: {
          align: 'center',
          width: 160
        }
      },
      couponCode: {
        name: '劵码',
        tableShow: {
          align: 'center',
          width: 160
        }
      },
      equalInfo: {
        name: '等价信息',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      discountCouponNum: {
        name: '优惠券编号',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      discountAmount: {
        name: '优惠总额度',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      allocationAmount: {
        name: '分摊额度',
        tableShow: {
          align: 'center',
          width: 100
        }
      }
    }
  },
  hotelExchangeOther: {
    name: '兑换记录(平台、集团)',
    data: {
      orderNum: {
        name: '兑换订单编号',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      orderTime: {
        name: '兑换订单时间',
        tableShow: {
          align: 'center',
          width: 150
        }
      },
      userNum: {
        name: '用户编号',
        tableShow: {
          align: 'center',
          width: 180
        }
      },
      tpmNum: {
        name: '劵模板编号',
        tableShow: {
          align: 'center',
          width: 200
        }
      },
      // couponTypeName: {
      //   name: '劵类型',
      //   tableShow: {
      //     align: 'center',
      //     width: 120
      //   }
      // },
      couponName: {
        name: '劵名称',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponNum: {
        name: '劵编号',
        tableShow: {
          align: 'center',
          width: 230
        }
      },
      couponCode: {
        name: '劵码',
        tableShow: {
          align: 'center',
          width: 160
        }
      },
      equalInfo: {
        name: '等价信息',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      discountCouponNum: {
        name: '优惠券编号',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      discountAmount: {
        name: '优惠总额度',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      allocationAmount: {
        name: '分摊额度',
        tableShow: {
          align: 'center',
          width: 100
        }
      }
    }
  },
  hotelExchange: {
    name: '兑换记录(酒店)',
    data: {
      orderNum: {
        name: '兑换订单编号',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      orderTime: {
        name: '兑换订单时间',
        tableShow: {
          align: 'center',
          width: 150
        }
      },
      userNum: {
        name: '用户编号',
        tableShow: {
          align: 'center',
          width: 180
        }
      },
      tpmNum: {
        name: '劵模板编号',
        tableShow: {
          align: 'center',
          width: 200
        }
      },
      // couponTypeName: {
      //   name: '劵类型',
      //   tableShow: {
      //     align: 'center',
      //     width: 120
      //   }
      // },
      couponName: {
        name: '劵名称',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponNum: {
        name: '劵编号',
        tableShow: {
          align: 'center',
          width: 230
        }
      },
      couponCode: {
        name: '劵码',
        tableShow: {
          align: 'center',
          width: 160
        }
      },
      equalInfo: {
        name: '等价信息',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      discountCouponNum: {
        name: '优惠券编号',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      discountAmount: {
        name: '优惠总额度',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      allocationAmount: {
        name: '分摊额度',
        tableShow: {
          align: 'center',
          width: 100
        }
      }
    }
  },
  hotelRecordOther: {
    name: '券核销记录(平台、集团)',
    data: {
      useNum: {
        name: '核销编号',
        tableShow: {
          align: 'center',
          width: 150
        }
      },
      useTime: {
        name: '核销时间',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      useInfo: {
        name: '核销备注',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      userNum: {
        name: '用户编号',
        tableShow: {
          align: 'center',
          width: 180
        }
      },
      tpmNum: {
        name: '模板编号',
        tableShow: {
          align: 'center',
          width: 180
        }
      },
      couponTypeName: {
        name: '劵类型',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponName: {
        name: '劵名称',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponNum: {
        name: '劵编号',
        tableShow: {
          align: 'center',
          width: 230
        }
      },
      couponCode: {
        name: '劵码',
        tableShow: {
          align: 'center',
          width: 180
        }
      }
    }
  },
  hotelRecord: {
    name: '券核销记录(酒店)',
    data: {
      useNum: {
        name: '核销编号',
        tableShow: {
          align: 'center',
          width: 150
        }
      },
      useTime: {
        name: '核销时间',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      useInfo: {
        name: '核销备注',
        tableShow: {
          align: 'center',
          width: 100
        }
      },
      userNum: {
        name: '用户编号',
        tableShow: {
          align: 'center',
          width: 180
        }
      },
      tpmNum: {
        name: '模板编号',
        tableShow: {
          align: 'center',
          width: 180
        }
      },
      couponTypeName: {
        name: '劵类型',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponName: {
        name: '劵名称',
        tableShow: {
          align: 'center',
          width: 120
        }
      },
      couponNum: {
        name: '劵编号',
        tableShow: {
          align: 'center',
          width: 230
        }
      },
      couponCode: {
        name: '劵码',
        tableShow: {
          align: 'center',
          width: 180
        }
      }
    }
  },
  panelEdition: {
    name: '版本管理',
    data: {
      versionName: {
        name: '版本名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      versionCode: {
        name: '版本号',
        isNeed: true,
        editabled: true,
        type: 'number',
        rule: {
          min: 1
        },
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      versionContent: {
        name: '版本更新内容',
        isNeed: true,
        editabled: true,
        type: 'textarea',
        tableShow: {
          width: 250,
          align: 'center'
        }
      },
      url: {
        name: 'APK下载路径',
        isNeed: true,
        editabled: true,
        type: 'textarea',
        tableShow: {
          width: 280,
          align: 'center'
        }
      },
      md5: {
        name: 'APK文件的MD5',
        // isNeed: true,
        editabled: true,
        // button: true,//生成按钮显示
        tableShow: {
          width: 250,
          align: 'center'
        }
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '更新时间',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      // publishRemark: {
      //   name: '发布备注',
      //   isNeed: true,
      //   editabled: true,
      //   type: 'textarea',
      //   tableShow: {
      //     width: 120,
      //     align: 'center'
      //   }
      // },
      flag: {
        name: '状态',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      file: {
        name: '压缩包',
        isNeed: true,
        type: 'upload',
        fileType: 'apk',
        max: 1,
        download: true,
        hideUploadList: true,
        mode: 'multiple',
        min: 1,
        editabled: true,
        fileUrl: {
          download: 't_apkdown',
          // check: 't_hotelLogo',///hotel/terminal/hotelLogo?hotelid=
          add: 't_manager_terminalVersion_saveOne', /// hotel/terminal/manager/terminalDeveloper/saveOne
          update: 't_manager_terminalVersion_updateOne'
        }
      }
    }
  },
  platformPlan: {
    name: '平台投放计划管理',
    data: {
      name: {
        name: '计划名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 380,
          align: 'center'
        }
      },
      status: {
        name: '计划状态',
        modalHidden: true
      },
      statusName: {
        name: '计划状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      startTime: {
        name: '投放开始时间',
        type: 'startTime',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      endTime: {
        name: '投放结束时间',
        type: 'endTime',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 150,
          align: 'center'
        }
      },
      auditStatus: {
        name: '审核状态',
        modalHidden: true
      },
      auditStatusName: {
        name: '审核状态',
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      auditTime: {
        name: '审核时间',
        tableShow: {
          width: 150,
          align: 'center'
        }
      },
      auditOption: {
        name: '审核意见',
        type: 'textarea',
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 120,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  platformSearch: {
    name: '平台广告综合查询',
    data: {
      name: {
        name: '计划名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      startTime: {
        name: '投放开始时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      endTime: {
        name: '投放结束时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      status: {
        name: '计划状态',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      statusName: {
        name: '计划状态',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      auditStatus: {
        name: '审核状态',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      auditStatusName: {
        name: '审核状态',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerType: {
        name: '归属者类型',
        type: 'select',
        isNeed: true,
        modalHidden: true
      },
      ownerTypeName: {
        name: '归属者类型',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      // ownerIdentifier: {
      //   name: '归属标识',
      //   type: 'select',
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      ownerName: {
        name: '归属名称',
        type: 'select',
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  adMaterial: {
    name: '关联投放物料',
    data: {
      name: {
        name: '物料名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      category: {
        name: '物料类别',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      categoryName: {
        name: '物料类别',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      type: {
        name: '类型',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      measurement: {
        name: '宽高',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      sizes: {
        name: '大小',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      // duration: {
      //   name: '时长',
      //   isNeed: true,
      //   modalHidden: true,
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   }
      // },
      path: {
        name: '路径',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 280,
          align: 'center'
        }
      },
      // flag: {
      //   name: '状态',
      //   isNeed: true,
      //   type: 'select',
      //   modalHidden: true
      // },
      // flagName: {
      //   name: '状态',
      //   tableShow: {
      //     align: 'center',
      //     width: 120
      //   },
      //   modalHidden: true
      // },
      // auditStatus: {
      //   name: '审核状态',
      //   isNeed: true,
      //   modalHidden: true
      // },
      // auditStatusName: {
      //   name: '审核状态',
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      // ownerType: {
      //   name: '归属者类型',
      //   isNeed: true,
      //   modalHidden: true
      // },
      // ownerTypeName: {
      //   name: '归属者类型',
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      creater: {
        name: '创建者',
        tableShow: {
          width: 200,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 140,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 140,
          align: 'center'
        },
        modalHidden: true
      },
      // seqno: {
      //   name: '序号',
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      material: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  adPlanChannel: {
    name: '关联投放对象',
    data: {
      companyName: {
        name: '集团名称',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 300,
          align: 'center'
        }
      },
      hotelName: {
        name: '酒店名称',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 300,
          align: 'center'
        }
      }
    }
  },
  companylist: {
    name: '集团列表',
    data: {
      code: {
        name: '集团编码',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      name: {
        name: '集团名称',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 300,
          align: 'center'
        }
      }
    }
  },
  hotelslist: {
    name: '酒店列表',
    data: {
      companyName: {
        name: '集团名称',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      name: {
        name: '酒店名称',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 300,
          align: 'center'
        }
      }
    }
  },
  platformMatter: {
    name: '平台广告物料投放管理',
    data: {
      name: {
        name: '物料名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 180,
          align: 'center'
        }
      },
      category: {
        name: '物料类别',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      categoryName: {
        name: '物料类别',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      type: {
        name: '类型',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      measurement: {
        name: '宽高',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      sizes: {
        name: '大小',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      // duration: {
      //   name: '时长',
      //   isNeed: true,
      //   modalHidden: true,
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   }
      // },
      path: {
        name: '路径',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 280,
          align: 'center'
        }
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      auditStatus: {
        name: '审核状态',
        isNeed: true,
        modalHidden: true
      },
      auditStatusName: {
        name: '审核状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerType: {
        name: '归属者类型',
        isNeed: true,
        modalHidden: true
      },
      ownerTypeName: {
        name: '归属者类型',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 140,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 140,
          align: 'center'
        },
        modalHidden: true
      },
      // seqno: {
      //   name: '序号',
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      material: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  groupMatter: {
    name: '集团广告物料投放管理',
    data: {
      name: {
        name: '物料名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 250,
          align: 'center'
        }
      },
      category: {
        name: '物料类别',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      categoryName: {
        name: '物料类别',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      type: {
        name: '类型',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      measurement: {
        name: '宽高',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      sizes: {
        name: '大小',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      // duration: {
      //   name: '时长',
      //   isNeed: true,
      //   modalHidden: true,
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   }
      // },
      path: {
        name: '路径',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 280,
          align: 'center'
        }
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      auditStatus: {
        name: '审核状态',
        isNeed: true,
        modalHidden: true
      },
      auditStatusName: {
        name: '审核状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerType: {
        name: '归属者类型',
        isNeed: true,
        modalHidden: true
      },
      ownerTypeName: {
        name: '归属者类型',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 200,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      // seqno: {
      //   name: '序号',
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      material: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  avalibleMaterial: {
    name: '可关联物料',
    data: {
      name: {
        name: '物料名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      category: {
        name: '物料类别',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      categoryName: {
        name: '物料类别',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      type: {
        name: '类型',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      measurement: {
        name: '宽高',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      sizes: {
        name: '大小',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      // duration: {
      //   name: '时长',
      //   isNeed: true,
      //   modalHidden: true,
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   }
      // },
      path: {
        name: '路径',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 280,
          align: 'center'
        }
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      auditStatus: {
        name: '审核状态',
        isNeed: true,
        modalHidden: true
      },
      auditStatusName: {
        name: '审核状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerType: {
        name: '归属者类型',
        isNeed: true,
        modalHidden: true
      },
      ownerTypeName: {
        name: '归属者类型',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 200,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      // seqno: {
      //   name: '序号',
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   },
      //   modalHidden: true
      // },
      material: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  groupPlan: {
    name: '集团投放计划管理',
    data: {
      name: {
        name: '计划名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 260,
          align: 'center'
        }
      },
      status: {
        name: '计划状态',
        modalHidden: true
      },
      statusName: {
        name: '计划状态',
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      startTime: {
        name: '投放开始时间',
        type: 'startTime',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      endTime: {
        name: '投放结束时间',
        type: 'endTime',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 150,
          align: 'center'
        }
      },
      auditStatus: {
        name: '审核状态',
        modalHidden: true
      },
      auditStatusName: {
        name: '审核状态',
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      auditTime: {
        name: '审核时间',
        tableShow: {
          width: 150,
          align: 'center'
        }
      },
      auditOption: {
        name: '审核意见',
        type: 'textarea',
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 200,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  groupSearch: {
    name: '集团广告综合查询',
    data: {
      name: {
        name: '计划名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      startTime: {
        name: '投放开始时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      endTime: {
        name: '投放结束时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      status: {
        name: '计划状态',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      statusName: {
        name: '计划状态',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      auditStatus: {
        name: '审核状态',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      auditStatusName: {
        name: '审核状态',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerType: {
        name: '归属者类型',
        type: 'select',
        isNeed: true,
        modalHidden: true
      },
      ownerTypeName: {
        name: '归属者类型',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerName: {
        name: '归属名称',
        type: 'select',
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  hotelMatter: {
    name: '集团广告物料投放管理',
    data: {
      name: {
        name: '物料名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 260,
          align: 'center'
        }
      },
      category: {
        name: '物料类别',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      categoryName: {
        name: '物料类别',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      type: {
        name: '类型',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      measurement: {
        name: '宽高',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      sizes: {
        name: '大小',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      // duration: {
      //   name: '时长',
      //   isNeed: true,
      //   modalHidden: true,
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   }
      // },
      path: {
        name: '路径',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 280,
          align: 'center'
        }
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      auditStatus: {
        name: '审核状态',
        isNeed: true,
        modalHidden: true
      },
      auditStatusName: {
        name: '审核状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerType: {
        name: '归属者类型',
        isNeed: true,
        modalHidden: true
      },
      ownerTypeName: {
        name: '归属者类型',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 200,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      material: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  },
  hotelPlan: {
    name: '酒店投放计划管理',
    data: {
      name: {
        name: '计划名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      status: {
        name: '计划状态',
        modalHidden: true
      },
      statusName: {
        name: '计划状态',
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      startTime: {
        name: '投放开始时间',
        type: 'startTime',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        tableShow: {
          width: 150,
          align: 'center'
        },
        editabled: true
      },
      endTime: {
        name: '投放结束时间',
        type: 'endTime',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 150,
          align: 'center'
        }
      },
      auditStatus: {
        name: '审核状态',
        modalHidden: true
      },
      auditStatusName: {
        name: '审核状态',
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      auditTime: {
        name: '审核时间',
        tableShow: {
          width: 150,
          align: 'center'
        }
      },
      auditOption: {
        name: '审核意见',
        type: 'textarea',
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 200,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  hotelSearch: {
    name: '酒店广告综合查询',
    data: {
      name: {
        name: '计划名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      startTime: {
        name: '投放开始时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      endTime: {
        name: '投放结束时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 120,
          align: 'center'
        }
      },
      status: {
        name: '计划状态',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      statusName: {
        name: '计划状态',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      auditStatus: {
        name: '审核状态',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      auditStatusName: {
        name: '审核状态',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerType: {
        name: '归属者类型',
        type: 'select',
        isNeed: true,
        modalHidden: true
      },
      ownerTypeName: {
        name: '归属者类型',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerName: {
        name: '归属名称',
        type: 'select',
        tableShow: {
          width: 160,
          align: 'center'
        },
        modalHidden: true
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  managerPlan: {
    name: '投放计划审核',
    data: {
      name: {
        name: '计划名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 300,
          align: 'center'
        }
      },
      startTime: {
        name: '投放开始时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 150,
          align: 'center'
        }
      },
      endTime: {
        name: '投放结束时间',
        type: 'time',
        format: 'YYYY-MM-DD HH:mm:ss',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 150,
          align: 'center'
        }
      },
      status: {
        name: '计划状态',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      statusName: {
        name: '计划状态',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      auditStatus: {
        name: '审核状态',
        isNeed: true,
        modalHidden: true,
        type: 'select'
      },
      auditStatusName: {
        name: '审核状态',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      auditTime: {
        name: '审核时间',
        tableShow: {
          width: 150,
          align: 'center'
        }
      },
      auditOption: {
        name: '审核意见',
        type: 'textarea',
        tableShow: {
          width: 200,
          align: 'center'
        }
      },
      ownerType: {
        name: '归属者类型',
        type: 'select',
        isNeed: true,
        modalHidden: true
      },
      ownerTypeName: {
        name: '归属者类型',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerName: {
        name: '归属名称',
        type: 'select',
        tableShow: {
          width: 300,
          align: 'center'
        },
        modalHidden: true
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 200,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      }
    }
  },
  managerAdMaterial: {
    name: '物料审核',
    data: {
      name: {
        name: '物料名称',
        isNeed: true,
        editabled: true,
        tableShow: {
          width: 300,
          align: 'center'
        }
      },
      category: {
        name: '物料类别',
        isNeed: true,
        editabled: true,
        type: 'select'
      },
      categoryName: {
        name: '物料类别',
        type: 'select',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      type: {
        name: '类型',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      measurement: {
        name: '宽高',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      sizes: {
        name: '大小',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 100,
          align: 'center'
        }
      },
      // duration: {
      //   name: '时长',
      //   isNeed: true,
      //   modalHidden: true,
      //   tableShow: {
      //     width: 100,
      //     align: 'center'
      //   }
      // },
      path: {
        name: '路径',
        isNeed: true,
        modalHidden: true,
        tableShow: {
          width: 280,
          align: 'center'
        }
      },
      flag: {
        name: '状态',
        isNeed: true,
        type: 'select',
        modalHidden: true
      },
      flagName: {
        name: '状态',
        tableShow: {
          align: 'center',
          width: 120
        },
        modalHidden: true
      },
      auditStatus: {
        name: '审核状态',
        isNeed: true,
        modalHidden: true
      },
      auditStatusName: {
        name: '审核状态',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerType: {
        name: '归属者类型',
        isNeed: true,
        modalHidden: true
      },
      ownerTypeName: {
        name: '归属者类型',
        tableShow: {
          width: 100,
          align: 'center'
        },
        modalHidden: true
      },
      ownerName: {
        name: '拥有者名称',
        tableShow: {
          width: 300,
          align: 'center'
        },
        modalHidden: true
      },
      creater: {
        name: '创建者',
        tableShow: {
          width: 200,
          align: 'center'
        },
        modalHidden: true
      },
      createTime: {
        name: '创建时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      updateTime: {
        name: '修改时间',
        tableShow: {
          width: 150,
          align: 'center'
        },
        modalHidden: true
      },
      material: {
        name: '图片',
        isNeed: true,
        editabled: true,
        type: 'upload',
        fileType: 'image',
        hideUploadList: true,
        mode: 'multiple',
        max: 1,
        min: 1,
        imgUrl: {}
      }
    }
  }
}
let tempData = {}
for (let i in baseSettings) tempData[i] = baseSettings[i].data
export const baseData = tempData

export const updateTreeNodeArray = ['proviceCity', 'hotel']
export const treeTabs = [
  'proviceCity',
  'modbus',
  'programCredit',
  'hotel',
  'room',
  'terminal',
  'terminalHotelLogo',
  'terminalStatus',
  'bootDept',
  'bootUser',
  'bootRole',
  'programSignCurrent',
  'programSignHistory'
]
export const changeModalTimeData = {
  // hotel: ['createTime', 'updateTime']
}
// 展示左边侧栏的模块
export const showSlideMennuArr = ['sys', 'analysis', 'card', 'advert']
// 上传页面列表
export const uploadTabs = [
  'terminalHotelLogo',
  'terminalDeveloper',
  'terminalVersion',
  'programIndex',
  'programSystem',
  'enviroImage',
  'platFormCard',
  'groupCard',
  'programNews',
  'programCarousel',
  'homeBannerDetail',
  'platformMatter',
  'groupMatter',
  'hotelMatter',
  'panelEdition',
  'adMaterial'
  // 'hotel'
]

export const cacheAllTabs = [
  'hotel',
  'modbus',
  'room',
  'terminal',
  'alarmConfig',
  'configField',
  'alarmType',
  'company',
  'brand',
  'config',
  'configParameter',
  'dictionary'
]
// 显示同步REDIS缓存
export const cacheSingleTabs = [
  'hotel',
  'hoteluser',
  'modbus',
  'modbususer',
  'room',
  'roomuser',
  'terminal',
  'terminaluser',
  'configField',
  'alarmType',
  'company',
  'configParameter',
  'dictionary',
  'CacheLoadType'
]
// 显示更新通知按钮
export const updateSingleTabs = [
  'hotel',
  'hoteluser',
  'modbus',
  'modbususer',
  'room',
  'roomuser',
  'terminal',
  'terminaluser',
  'configField',
  'alarmType',
  'company',
  'configParameter',
  'dictionary',
  'CacheLoadType'
]
