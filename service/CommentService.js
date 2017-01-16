import dao from './BaseDao'
import apiConfig from '../server-config'

export default {
  save (comment) {
    return dao.post('comment', comment)
  },
  list (articleId, params) {
    return dao.get('comment/' + articleId, params)
  },
  listRender (articleId, params) {
    return dao.get(apiConfig.proxyApi + 'comments/' + articleId, params)
  }
}
