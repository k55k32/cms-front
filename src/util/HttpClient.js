import http from 'http'
import { parse } from 'url'
function getHostAndPath (url) {
  return parse(url)
}
function dataToNameValue (data) {
  let params = []
  Object.keys(data).forEach(k => {
    let v = data[k]
    params.push(`${k}=${v}`)
  })
  return params.join('&')
}

function proessResponse(res, resolve, reject) {
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  if (res.statusCode === 200) {
    let data = ''
    res.on('data', chunk => {
      data += chunk
    })
    res.on('end', () => {
      if (res.headers['content-type'].indexOf('json') > -1)
      data = JSON.parse(data)
      resolve(data)
    })
  } else {
    reject({HttpRequestException: res})
  }
}
function createRequest (opts, resolve, reject) {
  let req = http.request(opts, res => {
    proessResponse(res, resolve, reject)
  })
  req.on('error', e => {
    reject({ServerException: e})
  })
  return req
}
export default {
  get (url, data) {
    return new Promise(function(resolve, reject) {
      if (data) url = `${url}?${dataToNameValue(data)}`
      let opts = { ...getHostAndPath(url), method: 'GET' }
      createRequest(opts, resolve, reject).end()
    })
  },
  post (url, data) {
    return new Promise(function(resolve, reject) {
      if (data) url = `${url}?${dataToNameValue(data)}`
      let opts = { ...getHostAndPath(url), method: 'POST' }
      createRequest(opts, resolve, reject).end()
    })
  }
}
