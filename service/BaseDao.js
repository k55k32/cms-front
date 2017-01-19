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

function proessData(response, e) {
  let result = response.data
  if (result.success) {
    return result.data
  }
  console.log('basedao error: ', result, e)
  throw result || e
}

function serialize (data = {}) {
  let dataStr = ''
  Object.keys(data).forEach(k => {
    let value = data[k]
    if (value !== null && value !== undefined) {
      dataStr += `${k}=${value}&`
    }
  })
  return dataStr.substr(0, dataStr.length - 1)
}

function get (path, data) {
  let url = getUrl(path)

  return axios.get(url + '?' + serialize(data)).then(proessData)
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
