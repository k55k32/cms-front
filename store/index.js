import service from '../service/SettingService'
import catalogService from '../service/CatalogService'
import GuestService from '../service/GuestService'
import Vue from 'vue'
import Vuex from 'vuex'
import Const from '../utils/const'

Vue.use(Vuex)
const TOKEN_KEY = Const.TOKEN_KEY
const store = new Vuex.Store({
  state: {
    setting: {},
    catalogs: [],
    isLogin: false,
    guestInfo: {},
    token: ''
  },
  getters: {
    isLogin: state => state.isLogin,
    guestInfo: state => state.guestInfo,
    token: state => state.token
  },
  mutations: {
    changeSetting (state, setting) {
      state.setting = setting
    },
    changeCatalogs (state, catalogs) {
      state.catalogs = catalogs
    },
    loginGuest (state, guestInfo) {
      state.isLogin = true
      state.guestInfo = guestInfo
      state.token = guestInfo.token || state.token
    }
  },
  actions: {
    loadSetting ({state, commit}) {
      return service.list().then(setting => {
        commit('changeSetting', setting)
        return setting
      })
    },
    loadCatalogs ({state, commit}) {
      if (!state.catalogs.length) {
        return catalogService.list().then(catalogs => {
          commit('changeCatalogs', catalogs)
          return catalogs
        })
      }
      return Promise.resolve(state.catalogs)
    },
    async loginGuestFromCache (store) {
      let token = window.localStorage.getItem(TOKEN_KEY)
      if (token) {
        console.log(token)
        let guestInfo = await GuestService.getGuestInfo(token)
        console.log(guestInfo)
        guestInfo.token = token
        store.dispatch('loginGuest', guestInfo)
      }
    },
    loginGuest ({commit}, guestInfo) {
      if (window) {
        window.localStorage.setItem(TOKEN_KEY, guestInfo.token)
      }
      commit('loginGuest', guestInfo)
    },
    async nuxtServerInit ({state}, context) {
      let result = await context.store.dispatch('loadSetting')
      return result
    }
  }
})

Vue.prototype.$setting = (key) => {
  return store.state.setting[key]
}

export default store
