import Vue from 'vue'

Vue.mixin({
  methods: {
    $cacheGet (key) {
      let data = window.localStorage.getItem(key)
      try {
        return JSON.parse(data)
      } catch (e) {
        console.warn(e)
        return {}
      }
    },
    $cacheSet (key, object) {
      try {
        window.localStorage.setItem(key, JSON.stringify(object))
      } catch (e) {
        console.warn(e)
      }
    }
  }
})
