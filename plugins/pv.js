import PageViewService from '../service/PageViewService'
import config from '../server-config.js'

const logPageView = (r) => {
  PageViewService.save({
    name: r.name,
    path: r.path,
    fullPath: r.fullPath,
    params: r.params && JSON.stringify(r.params),
    query: r.query && JSON.stringify(r.query),
    userAgent: window.navigator.userAgent
  }).then((result, error) => {
    error && console.warn('pageview save error', error)
  })
}

if (process.BROWSER_BUILD && config.isProd) {
  window.onNuxtReady(app => {
    let route = app.$route
    logPageView(route)
    app.$router.afterEach((r) => {
      logPageView(r)
    })
  })
}
