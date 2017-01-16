import Vue from 'vue'

function hasAgent (agent) {
  return navigator.userAgent.indexOf(agent) > -1
}

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
    },
    _isIPhone () {
      return hasAgent('iPhone')
    },
    _isAndroid () {
      return hasAgent('Android')
    },
    _isMobile () {
      return this._isIPhone() || this._isAndroid()
    }
  }
})
