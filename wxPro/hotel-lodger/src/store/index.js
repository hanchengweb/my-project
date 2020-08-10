import Vue from 'vue'
import Vuex from 'vuex'
import crement from './modules/crement'
import user from './modules/user'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    crement,
    user
  }
})
export default store
