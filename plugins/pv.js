import PageViewService from '../service/PageViewService'
import config from '../server-config.js'

if (process.BROWSER_BUILD && config.isProd) {
  function logPageView (r) {
    PageViewService.save({
      name: r.name,
      path: r.path,
      fullPath: r.fullPath,
      params: r.params && JSON.stringify(r.params),
      query: r.query && JSON.stringify(r.query)
    }).then((result, error) => {
      error && console.warn('pageview save error', error)
    })
  }

  window.onNuxtReady(app => {
    let route = app.$route
    logPageView(route)
    app.$router.afterEach((r) => {
      logPageView(r)
    })
  })
}
