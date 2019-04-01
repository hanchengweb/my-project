import Vue from 'vue'
import Vuex from 'vuex'

import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission
  }
})