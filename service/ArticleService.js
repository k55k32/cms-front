import dao from './BaseDao'
import apiConfig from '../server-config'

export default {
  list (currentPage, pageSize) {
    return dao.page('article/list', currentPage, pageSize)
  },
  get (id) {
    return dao.get('article/detail/' + id)
  },
  getRender (id) {
    return dao.get(apiConfig.proxyApi + 'article-render/' + id)
  }
}
