import dao from './BaseDao'

export default {
  save (comment) {
    return dao.post('comment', comment)
  },
  list (articleId) {
    return dao.page('comment/' + articleId)
  }
}
