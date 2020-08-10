export default {
  state: {
    changeTreeStatus: '',
    changeTableStatus: '',
    changeSubTableStatus: '',
    changeExtraTableStatus: '',
    changeHotelTableStatus: '',
    changeProgramCredit: '', // 用户查询-查看明细
    changeleadings: '', // 集团商品管理导入点击
    changeRouterName: '',
    changeRefSearch: ''// 重置
  },
  mutations: {
    setChangeTreeStatus (state, status) {
      state.changeTreeStatus = status
    },
    setchangeProgramCredit (state, status) {
      // console.log(status)
      state.changeProgramCredit = status
    },
    setchangeleadings (state, status) {
      // console.log(status)
      state.changeleadings = status
    },
    setChangeTableStatus (state, status) {
      state.changeTableStatus = status
    },
    setChangeSubTableStatus (state, status) {
      state.changeSubTableStatus = status
    },
    setChangeExtraTableStatus (state, status) {
      state.changeExtraTableStatus = status
    },
    setChangeHotelTableStatus (state, status) {
      state.changeHotelTableStatus = status
    },
    setChangeRouterName (state, status) {
      state.changeRouterName = status
    },
    setChangeRefSearch (state, status) {
      state.changeRefSearch = status
    }
  },
  actions: {
    handleChangeSubTableStatus ({ commit }, data) {
      return new Promise((resolve, reject) => {
        data = data ? Math.random() : data
        commit('setChangeSubTableStatus', data)
        resolve()
      })
    },
    handleChangeRouterName ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('setChangeRouterName', data)
        resolve()
      })
    },
    handleChangeHotelTableStatus ({ commit }, data) {
      return new Promise((resolve, reject) => {
        data = data ? Math.random() : data
        commit('setChangeHotelTableStatus', data)
        resolve()
      })
    },
    handleChangeTableStatus ({ commit }, data) {
      return new Promise((resolve, reject) => {
        data = data ? Math.random() : data
        commit('setChangeTableStatus', data)
        resolve()
      })
    },
    handleChangeTreeStatus ({ commit }, data) {
      return new Promise((resolve, reject) => {
        data = data ? Math.random() : data
        commit('setChangeTreeStatus', data)
        resolve()
      })
    },
    handleChangeProgramCredit ({ commit }, data) {
      return new Promise((resolve, reject) => {
        data = data ? Math.random() : data
        commit('setchangeProgramCredit', data)
        resolve()
      })
    },
    handleChangeleadings ({ commit }, data) {
      return new Promise((resolve, reject) => {
        data = data ? Math.random() : data
        commit('setchangeleadings', data)
        resolve()
      })
    },
    handleChangeExtraTableStatus ({ commit }, data) {
      return new Promise((resolve, reject) => {
        data = data ? Math.random() : data
        commit('setChangeExtraTableStatus', data)
        resolve()
      })
    },
    handleChangeRefSearch ({ commit }, data) {
      return new Promise((resolve, reject) => {
        data = data ? Math.random() : data
        commit('setChangeRefSearch', data)
        resolve()
      })
    }
  }
}
