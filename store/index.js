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
      return service.list().then(setting => {
        commit('changeSetting', setting)
        return setting
      })
    },
    async nuxtServerInit ({state}, context) {
      let result =await context.store.dispatch('loadSetting')
      return result
    }
  }
})

Vue.prototype.$setting = (key) => {
  return store.state.setting[key]
}

export default store
