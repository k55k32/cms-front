import dao from './BaseDao'

export default {
  gitHubLogin (code) {
    return dao.post(`guest/login/github/${code}`)
  },
  getGuestInfo (token) {
    return dao.post(`guest/${token}`)
  }
}
