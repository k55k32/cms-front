import PageViewService from '../service/PageViewService'
import config from '../server-config.js'

const logPageView = (r, userAgent) => {
  PageViewService.save({
    name: r.name,
    path: r.path,
    fullPath: r.fullPath,
    params: r.params && JSON.stringify(r.params),
    query: r.query && JSON.stringify(r.query),
    userAgent: userAgent
  }).then((result, error) => {
    error && console.warn('pageview save error', error)
  })
}

export default function ({isServer, route, req}) {
  let userAgent = isServer ? req.headers['user-agent'] : window.navigator.userAgent
  if (config.isProd) {
    logPageView(route, userAgent)
  }
}
