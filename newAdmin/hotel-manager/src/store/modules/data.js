import {resetData} from '@/libs/util'

export default {
  state: {
    treeSelect: {},
    tree: {},
    pegination: {},
    subPegination: {},
    search: {},
    subSearch: {},
    modalData: {},
    tabs: {},
    choseTr: {},
    companychoseTr: {},
    subChoseTr: {}
  },
  mutations: {
    setTreeSelect (state, treeSelect) {
      state.treeSelect = treeSelect
    },
    setTree (state, tree) {
      state.tree = tree
    },
    setTabs (state, tabs) {
      state.tabs = tabs
    },
    setPegination (state, pegination) {
      state.pegination = pegination
    },
    setSubPegination (state, subPegination) {
      state.subPegination = subPegination
    },
    setSearch (state, search) {
      state.search = search
    },
    setSubSearch (state, subSearch) {
      state.subSearch = subSearch
    },
    setModalData (state, modalData) {
      state.modalData = modalData
    },
    setChoseTr (state, choseTr) {
      state.choseTr = choseTr
    },
    setCompanyChoseTr (state, companychoseTr) {
      state.companychoseTr = companychoseTr
    },
    setSubChoseTr (state, choseTr) {
      state.subChoseTr = choseTr
    }

  },
  actions: {
    handleModalData ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setModalData', data)
        resolve()
      })
    },
    handleTabs ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setTabs', data)
        resolve()
      })
    },
    handleChoseTr ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setChoseTr', data)
        resetData(commit, state.subSearch, 'setSubSearch')
        resetData(commit, state.subPegination, 'setSubPegination')
        resolve()
      })
    },
    handleSubChoseTr ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setSubChoseTr', data)
        resolve()
      })
    },
    handleCompanyChoseTr ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setCompanyChoseTr', data)
        resolve()
      })
    },
    handleTreeSelect ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setTreeSelect', data)
        resetData(commit, state.tree, 'setTree')
        resetData(commit, state.search, 'setSearch')
        resetData(commit, state.pegination, 'setPegination')
        resetData(commit, state.choseTr, 'setChoseTr')
        resetData(commit, state.subSearch, 'setSubSearch')
        resetData(commit, state.subPegination, 'setSubPegination')
        resolve()
      })
    },
    handleTree ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setTree', data)
        resetData(commit, state.search, 'setSearch')
        resetData(commit, state.pegination, 'setPegination')
        resetData(commit, state.choseTr, 'setChoseTr')
        resetData(commit, state.subSearch, 'setSubSearch')
        resetData(commit, state.subPegination, 'setSubPegination')
        resolve()
      })
    },
    handleSearch ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setSearch', data)
        resetData(commit, state.pegination, 'setPegination')
        resetData(commit, state.choseTr, 'setChoseTr')
        resetData(commit, state.subSearch, 'setSubSearch')
        resetData(commit, state.subPegination, 'setSubPegination')
        resolve()
      })
    },
    handleSubSearch ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setSubSearch', data)
        resetData(commit, state.subPegination, 'setSubPegination')
        resolve()
      })
    },
    handlePegination ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setPegination', data)
        resetData(commit, state.choseTr, 'setChoseTr')
        resetData(commit, state.subSearch, 'setSubSearch')
        resetData(commit, state.subPegination, 'setSubPegination')
        resolve()
      })
    },
    handleSubPegination ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setSubPegination', data)
        resolve()
      })
    }

  }
}
