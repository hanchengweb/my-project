export const baseData = {
    module: {
        id: {
            name: "ID"
        },
        uri: {
            name: "路径",
            tableShow: true,
            editabled: true
        },
        sort: {
            name: "模块组",
            editabled: true,
            tableShow: true,
            isNeed: true,
        },
        sysid: {
            name: "系统ID",
            isNeed: true
        },
        sysname: {
            name: "系统名称",
            isNeed: true,
            tableShow: true
        },
        name: {
            name: "名称",
            isNeed: true,
            tableShow: true,
            editabled: true
        },
        processkey: {
            name: "流程key",
            editabled: true
        },
        taskkey: {
            name: "任务key",
            editabled: true
        },
        flagname: {
            name: "状态",
            tableShow: true
        },
        flag: {
            name: "状态码"
        }
    },
    moduleMapping: {
        id: {
            name: "ID"
        },
        moduleid: {
            name: "模块ID",
            isNeed: true
        },
        mappingid: {
            name: "资源ID",
            isNeed: true
        },
        mappingname: {
            name: "资源名称",
            isNeed: true,
            editabled: true,
            type: "select"
        }
        //暂停输入
    },

    dept: {
        id: {
            name: "ID"
        },
        pid: {
            name: "上级部门",
            isNeed: true
        },
        code: {
            name: "编码",
            tableShow: true,
        },
        name: {
            name: "名称",
            isNeed: true,
            tableShow: true,
            editabled: true
        },
        tradecode: {
            name: "行业编码",
            isNeed: true,
        },
        tradename: {
            name: "行业名称",
            isNeed: true,
            tableShow: true,
        },
        linkcode: {
            name: "关联编码",
            tableShow: true,
            editabled: true
        },
        flagname: {
            name: "状态",
            tableShow: true
        },
        flag: {
            name: "状态码"
        }
    },
    user: {
        id: {
            name: "ID"
        },
        code: {
            name: "编码",
            editabled: true,
            tableShow: true,
            isNeed: true
        },
        name: {
            name: "名称",
            editabled: true,
            tableShow: true,
            isNeed: true
        },
        password: {
            name: "密码(MD5)",
            modalHidden: true
        },
        // deptid: {
        //   name: "部门ID",
        //   isNeed: true
        // },
        deptcode: {
            name: "部门编号",
            isNeed: true,
        },
        deptname: {
            name: "部门名称",
            tableShow: true,
            isNeed: true
        },
        flagname: {
            name: "状态",
            tableShow: true
        },
        flag: {
            name: "状态码"
        }
    },

    userRole: {
        id: {
            name: "ID"
        },
        roleid: {
            name: "角色ID",
            isNeed: true
        },
        rolename: {
            name: "角色名称",
            isNeed: true,
            type: "selectTree",
            editabled: true,
            tableShow: true,
        },
        userid: {
            name: "用户ID",
            modalHidden: true
        }
    },
    deptType: {
        id: {
            name: "ID"
        },
        deptid: {
            name: "部门"
        },
        name: {
            name: "类型名称",
            editabled: true,
            type: "select",
            tableShow: true,
            isNeed: true
        },
        value: {
            name: "类型值",
        }
    },
    //系统维护
    system: {
        id: {
            name: "ID"
        },
        code: {
            name: "编号",
            isNeed: true,
            tableShow: true,
            editabled: true,
        },
        name: {
            name: "名称",
            isNeed: true,
            tableShow: true,
            editabled: true,
        },
        linkcode: {
            name: "关联编号",
            isNeed: true,
            tableShow: true,
            editabled: true,
        },
        tradecode: {
            name: "行业编号",
            isNeed: true,
            tableShow: true,
        },
        tradename: {
            name: "行业名称",
            isNeed: true,
            tableShow: true,
            editabled: true,
            type: "select"
        },
        remark: {
            name: "说明",
            tableShow: true,
            editabled: true,
            type: "textarea"
        },
        flagname: {
            name: "状态",
            tableShow: true,
        },
        flag: {
            name: "状态码"
        }
    },
    //资源维护
    mapping: {
        id: {
            name: "ID"
        },
        sysid: {
            name: "系统ID"
        },
        sysname: {
            name: "系统名称",
            tableShow: true
        },
        name: {
            name: "名称",
            editabled: true,
            tableShow: true,
            isNeed: true
        },
        uri: {
            name: "路径",
            isNeed: true,
            tableShow: true,
            editabled: true
        },
        flagname: {
            tableShow: true,
            name: "状态"
        },
        flag: {
            name: "状态码"
        }
    },
    //人员维护
    role: {
        id: {
            name: "ID"
        },
        pid: {
            name: "父角色"
        },
        name: {
            name: "名称",
            editabled: true,
            tableShow: true,
        },
        flagname: {
            name: "状态",
            tableShow: true
        },
        flag: {
            name: "状态码"
        }
    },
    //菜单维护
    menu: {
        id: {
            name: "ID"
        },
        sysid: {
            name: "系统ID"
        },
        pid: {
            name: "父ID"
        },
        name: {
            name: "名称",
            tableShow: {
                status: true,
                width: '20%'
            },
            editabled: true,
            isNeed: true,
            type: "input"
        },
        seq: {
            name: "排序",
            editabled: true,
            rule: {
                min: 0,
            },
            type: "number"
        },
        route: {
            name: "路由名",
            tableShow: {
                status: true,
                width: '20%'
            },
            editabled: true,
            type: "input"
        },
        uri: {
            name: "路由地址",
            tableShow: {
                status: true,
                width: '20%'
            },
            editabled: true,
            type: "input"
        },
        moduleid: {
            name: "模块ID"
        },
        modulename: {
            name: "模块",
            tableShow: true,
            editabled: true,
            type: "selectTree"
        },
        icon: {
            name: "图标",
            editabled: true,
            type: "input"
        },
        flagname: {
            name: "状态",
            tableShow: true,
        },
        flag: {
            name: "状态码",
        }
    },
    //字典维护
    dict: {
        id: {
            name: "ID"
        },
        name: {
            name: "名称",
            isNeed: true,
            editabled: true,
            tableShow: true
        },
        code: {
            name: "编号",
            isNeed: true,
            editabled: true,
            tableShow: true
        },
        values: {
            name: "值",
            modalHidden: true
        },
        flagname: {
            name: "状态",
            tableShow: true,
        },
        flag: {
            name: "状态码",
            tableShow: true,
        }
    },
    //系统常量
    const: {
        id: {
            name: "ID"
        },
        sysid: {
            name: "系统ID"
        },
        sysname: {
            name: "系统名称",
            tableShow: true,
        },
        code: {
            name: "编号",
            type: "input",
            isNeed: true,
            editabled: true,
            tableShow: true
        },
        name: {
            name: "名称",
            type: "input",
            editabled: true,
            tableShow: true
        },
        value: {
            name: "值",
            type: "input",
            isNeed: true,
            editabled: true,
            tableShow: true
        },
        flagname: {
            name: "状态",
            type: "input",
            tableShow: true
        },
        flag: {
            name: "状态码",
            type: "input",
        }
    },
    //字典值
    dictVal: {
        id: {
            name: "ID"
        },
        pid: {
            name: "字典ID",
            isNeed: true
        },
        code: {
            name: "值",
            tableShow: true,
            editabled: true,
        },
        name: {
            name: "名称",
            tableShow: true,
            editabled: true,
            isNeed: true
        },
        sort: {
            name: "类型",
            editabled: true,
            tableShow: true,
        },
        seq: {
            name: "序号",
            editabled: true,
            type: "number",
            rule: {
                min: 0,
                step: 1,
                formatter: value => {
                    return parseInt(value)
                },
                parser: value => value
            },
            isNeed: true
        },
        flagname: {
            name: "状态",
            tableShow: true
        },
        flag: {
            name: "状态码"
        }
    },
    token: {
        id: {
            name: "ID"
        },
        name: {
            name: "TOKEN值",
            tableShow: true,
        },
        ip: {
            name: "IP白名单",
            editabled: true,
            type: "textarea"
        },
        userid: {
            name: "用户ID",
            isNeed: true,
        },
        username: {
            name: "用户名称",
            type: "select",
            editabled: true,
            tableShow: true,
            isNeed: true,
        },
        time: {
            name: "失效时间",
            type: "time",
            format: "YYYY-MM-DD HH:mm:ss",
            editabled: true,
            tableShow: true
        },
        remark: {
            name: "说明",
            type: "textarea",
            editabled: true
        },
        sysname: {
            name: "系统名称",
            isNeed: true,
        },
        sysid: {
            name: "系统编码",
            isNeed: true,
            tableShow: true
        },
        flagname: {
            name: "状态",
            tableShow: true
        },
        flag: {
            name: "状态码"
        }

    },

    roleModule: {
        id: {
            name: "ID"
        },
        roleid: {
            name: "角色ID"
        },
        module: {
            name: "模块",
            type: "Object"
        },//暂停
        scope: {
            name: "数据范围",
            tableShow: {
                status: true,
                scopedSlots: {customRender: 'scope'},
            }
        },
        accesss: {
            name: "操作范围",
            tableShow: {
                status: true,
                scopedSlots: {customRender: 'access'},
            }
        }
    },
    roleModuleArea: {
        id: "",
        pid: "",
        dept: ""//暂停
    }
};
export const updateTreeNodeArray = ["menu", "dept", "role"];
export const treeTabs = ["mapping", "module", "menu", "dept", "user", "role", "const"];
