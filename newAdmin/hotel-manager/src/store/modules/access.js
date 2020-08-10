export default {
  state: {
    subAccess: {}
  },
  mutations: {
    setSubAccess (state, subAccess) {
      state.subAccess = subAccess
    }
  },
  actions: {
    handleSubAccess ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('setSubAccess', data)
        resolve()
      })
    }
  }
}
