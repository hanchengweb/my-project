export default {
	state: {
		tagList: {},
		showHotelChoseStatus: false,
		choseHotel: {},
		commonHotelSearch: {},
		commonHotelPegination: {}

	},
	mutations: {
		setTagList (state, tagList) {
			state.tagList = tagList
		},
		setShowHotelChoseStatus (state, showHotelChoseStatus) {
			state.showHotelChoseStatus = showHotelChoseStatus
		},
		setChoseHotel (state, choseHotel) {
			state.choseHotel = choseHotel
		},
		setCommonHotelSearch (state, commonHotelSearch) {
			state.commonHotelSearch = commonHotelSearch
		},
		setCommonHotelPegination (state, commonHotelSearch) {
			state.commonHotelPegination = commonHotelSearch
		},
	},
	actions: {
		handleTagList ({commit}, data) {
			return new Promise((resolve, reject) => {
				commit('setTagList', data)
				resolve()
			})
		},
		handleShowHotelChoseStatus ({commit}, data) {
			return new Promise((resolve, reject) => {
				commit('setShowHotelChoseStatus', data)
				resolve()
			})
		},
		handleChoseHotel ({commit}, data) {
			return new Promise((resolve, reject) => {
				commit('setChoseHotel', data)
				resolve()
			})
		},
		handleCommonHotelSearch ({commit}, data) {
			return new Promise((resolve, reject) => {
				commit('setCommonHotelSearch', data)
				resolve()
			})
		},
		handleCommonHotelPegination ({commit}, data) {
			return new Promise((resolve, reject) => {
				commit('setCommonHotelPegination', data)
				resolve()
			})
		},

	}
}
