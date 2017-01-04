import service from '../service/SettingService'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    setting: {}
  },
  mutations: {
    changeSetting (state, setting) {
      state.setting = setting
    }
  },
  actions: {
    loadSetting ({state, commit}) {
      if (!Object.keys(state.setting).length) {
        return service.list().then(setting => {
          commit('changeSetting', setting)
          return setting
        })
      }
      return Promise.resolve(state.setting)
    }
  }
})
!process.BROWSER_BUILD && store.dispatch('loadSetting')

export default store
