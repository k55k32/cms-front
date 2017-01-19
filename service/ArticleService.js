import dao from './BaseDao'
import apiConfig from '../server-config'

export default {
  list (currentPage, pageSize, params) {
    return dao.page('article/list', currentPage, pageSize, params)
  },
  get (id) {
    return dao.get('article/detail/' + id)
  },
  getRender (id) {
    return dao.get(apiConfig.proxyApi + 'article-render/' + id)
  },
  allNames () {
    return dao.get('article/article-map')
  }
}
