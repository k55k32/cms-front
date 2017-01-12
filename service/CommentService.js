import dao from './BaseDao'

export default {
  save (comment) {
    return dao.post('comment', comment)
  },
  list (articleId, params) {
    return dao.get('comment/' + articleId, params)
  },
  listRender (articleId, params) {
    return dao.get('comment/' + articleId, params)
  }
}
