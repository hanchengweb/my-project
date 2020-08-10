export const routes = [{
    path: '/main',
    name: 'Main',
    component: () => import ('@/view/main/main'),
    children: [{
        path: "menu",
        name: "menu",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/menu`)
    }, {
        path: "const",
        name: "const",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/const`)
    }, {
        path: "dept",
        name: "dept",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/dept`)
    }, {
        path: "dict",
        name: "dict",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/dict`)
    }, {
        path: "dict",
        name: "dict",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/dict`)
    }, {
        path: "mapping",
        name: "mapping",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/mapping`)
    }, {
        path: "module",
        name: "module",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/module`)
    }, {
        path: "role",
        name: "role",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/role`)
    }, {
        path: "rolemodule",
        name: "rolemodule",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/rolemodule`)
    }, {
        path: "system",
        name: "system",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/system`)
    }, {
        path: "token",
        name: "token",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/token`)
    }, {
        path: "user",
        name: "user",
        meta: {
            key: "",
            openKey: ""
        },
        component: () =>
            import(`@/view/childView/user`)
    }]
}]
