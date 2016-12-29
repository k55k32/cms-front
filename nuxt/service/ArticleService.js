import dao from './BaseDao'

export default {
  list (currentPage, pageSize) {
    return dao.page('article/list', currentPage, pageSize)
  },
  get (id) {
    return dao.get('article/detail/' + id)
  }
}
