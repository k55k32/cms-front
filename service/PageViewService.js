import dao from './BaseDao'

export default {
  save (pv) {
    return dao.post('pv', pv)
  }
}
