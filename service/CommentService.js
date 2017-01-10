import dao from './BaseDao'

export default {
  save (comment) {
    return dao.post('comment', comment)
  },
  list (currentPage, pageSize, articleId) {
    return dao.page('comment/list/' + articleId, currentPage, pageSize)
  }
}
