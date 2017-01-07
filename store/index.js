import service from '../service/SettingService'
import catalogService from '../service/CatalogService'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    setting: {},
    catalogs: []
  },
  mutations: {
    changeSetting (state, setting) {
      state.setting = setting
    },
    changeCatalogs (state, catalogs) {
      state.catalogs = catalogs
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
