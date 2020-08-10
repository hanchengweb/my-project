import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import app from './modules/app'
import data from './modules/data'
import change from './modules/change'
import common from './modules/common'
import access from './modules/access'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		//
	},
	mutations: {
		//
	},
	actions: {
		//
		handleAllReset ({commit, state}) {
		}
	},
	modules: {
		user,
		app,
		data,
		change,
		common,
		access
	},
	plugins: [createPersistedState()]
})
