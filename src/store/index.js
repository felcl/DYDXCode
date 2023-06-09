import { createStore } from 'vuex'

// 创建一个新的 store 实例
export const store = createStore({
  state () {
    return {
      address: '',
      leftMenu: false,
      token:"",
      Version:2
    }
  },
  mutations: {
    SETADDRESS (state,address) {
      state.address = address
    },
    SETTOKEN(state,token) {
      state.token = token
    },
    SETLEFTMENU (state,leftMenu){
      state.leftMenu = leftMenu
    },
    SETVERDION (state,Version){
      state.Version = Version
    },
  }
})
