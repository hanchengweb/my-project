const crement = {
  state: {
    count: 0,
    cityName: ''
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },
    handleCity: (state, cityName) => {
      state.cityName = cityName
    }
  },
  actions: {},
  getters: {}
}
export default crement
