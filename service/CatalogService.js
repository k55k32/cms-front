import dao from './BaseDao'

export default {
  list () {
    return dao.get('catalog/list-detail')
  },
}
