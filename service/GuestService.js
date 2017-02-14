import dao from './BaseDao'
import apiConfig from '../server-config'

export default {
  login(code) {
      return dao.post(`guest/login/${code}`)
  }
}
