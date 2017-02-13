import Vue from 'vue'
import dateformat from 'dateformat'

Vue.filter('date', (time, format = 'yyyy-mm-dd HH:ss') => {
  return dateformat(new Date(time), format)
})
