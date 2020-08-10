import { getUserInfo, setUserInfo } from '@/utils/user'
const user = {
  state: {
    userInfo: getUserInfo('userInfo')
  },
  mutations: {
    handleUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {

  },
  getters: {}
}
export default user
