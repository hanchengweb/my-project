import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 判断用户是否有路由权限
 * @param {String} role 用户角色
 * @param {*} route 路由允许角色
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return (route.meta.roles.indexOf(role) != -1)
  } else {
    return true
  }
}

/**
 * 遍历异步挂载路由返回可访问路由
 * @param {String} role 用户角色 
 * @param {Array} routerMap 路由表
 */
function filterRouter(role, routerMap) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length > 0) {
        route.children = filterRouter(role, route.children)
      }
      return true
    } else {
      return false
    }
  })
  return accessedRouters
}

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    createRoutes({commit}, payload) {
      return new Promise(resolve => {
        const {role} = payload
        const accessedRouters = filterRouter(role, asyncRouterMap)
        commit('SET_ROUTERS', accessedRouters);
        resolve()
      })
    }
  }
}

export default permission;