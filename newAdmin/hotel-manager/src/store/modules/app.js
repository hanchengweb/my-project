import {getMenuList, getUserHotel} from '@/api/menu'
import {sortMenuData, getRoutersChildren, getRouters, sortSubMenuData} from '@/libs/util'
import Router from '@/router'

export default {
  state: {
    currentName: '',
    menuList: [],
    subMenuList: {},
    updateTreeNode: {},
    onresize: {},
    onbeforeunload: {},
    slideMenuVisible: false,
    treeVisible: true
  },
  mutations: {
    setCurrentName (state, currentName) {
      state.currentName = currentName
    },
    setMenuList (state, menuList) {
      state.menuList = menuList
    },
    setSubMenuList (state, subMenuList) {
      state.subMenuList = subMenuList
    },
    setUpdateTreeNode (state, updateTreeNode) {
      state.updateTreeNode = updateTreeNode
    },
    setOnresize (state, onresize) {
      state.onresize = onresize
    },
    onbeforeunload (state, onbeforeunload) {
      state.onbeforeunload = onbeforeunload
    },
    setSlideMenuVisible (state, visible) {
      state.slideMenuVisible = visible
    },
    setTreeVisible (state, visible) {
      state.treeVisible = visible
    }

  },
  actions: {
    handleCurrentName ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setCurrentName', data)
      })
    },
    updateTreeNode ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('setUpdateTreeNode', data)
      })
    },
    getMenuList ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        getMenuList(data).then(res => {
		  let data = sortMenuData(res.data)
          // data = [...[{name: '首页', key: 'Home', route: 'Home'}], ...data]
          // data = [...data]
          commit('setMenuList', data)
          commit('setSubMenuList', sortSubMenuData(data))
          Router.addRoutes(getRouters(state.menuList).concat([{
            path: '*',
            redirect: '/404'
          }]))
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserHotel ({commit, state, rootState}, data) {
      return new Promise((resolve, reject) => {
        getUserHotel({id: data.id}).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
