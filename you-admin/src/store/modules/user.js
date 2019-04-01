import {userLogin, getInfo, logout} from '@/api/user.js'
import {removeToken} from '@/utils/auth.js'

const user = {
  state: {
    role: '',
  },
  mutations: {
    SET_ROLE(state, role) {
      state.role = role
    },
    // SET_TOKEN(state, token) {
    //   state.token = token
    // }
  },
  actions: {
    async login({}, payload) {
      try {
        const res = await userLogin(payload)
        // const token = res.data.token
        // setToken(token)
        return Promise.resolve(res.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfo({commit}) {
      try {
        const res = await getInfo()
        let role = '';
        if (res.data.obj === 0) {
          role = 'merchant'
        } else if(res.data.obj === 1) {
          role = 'admin'
        }
        commit('SET_ROLE', role)
        return Promise.resolve(role)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    frontLogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          if (res.data.code === 1) {
            commit('SET_ROLE', '')
            removeToken()
            resolve()
          } else {
            reject('操作失败')
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user;