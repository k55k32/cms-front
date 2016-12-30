import axios from 'axios'
import serverConfig from '../server-config'

const root = serverConfig.api

function getUrl(path) {
  if (path.startsWith('http:') || path.startsWith('https:')) {
    return path
  } else {
    return root + path
  }
}

function proessData(response) {
  let result = response.data
  if (result.success) {
    return result.data
  }
  throw new Error(`${result.code}:${result.msg}`)
}

function get (path, data) {
  let url = getUrl(path)
  return axios.get(url, data).then(proessData)
}
function post (path, data) {
  let url = getUrl(path)
  return axios.post(url, data).then(proessData)
}
function page (path, currentPage = 1, pageCount = 10, data = {}){
  data.currentPage = currentPage
  data.pageCount = pageCount
  return get(path, data)
}

export default { get, post, page }
