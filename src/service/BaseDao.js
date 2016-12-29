import HttpClient from '../util/HttpClient'

const root = global.config.api
function getUrl(path) {
  if (path.startsWith('http:') || path.startsWith('https:')) {
    return path
  } else {
    return root + path
  }
}

function exceptionCatch(e) {
  if (e.ServerException) {
    console.error(e)
    global.currentResponse.render('500', {error: e})
    throw new Error(e)
  } else if (e.HttpRequestException) {
    console.error(e)
    let res = e.HttpRequestException
    global.currentResponse.render('error', {type: 'HttpRequestException', error: res})
    throw new Error(res)
  } else {
    return e
  }
}

function get (path, data) {
  let url = getUrl(path)
  console.log(url);
  return HttpClient.get(url, data).catch(exceptionCatch)
}
function post (path, data) {
  let url = getUrl(path)
  return HttpClient.post(url, data).catch(exceptionCatch)
}
function page (path, currentPage = 1, pageCount = 10, data = {}){
  data.currentPage = currentPage
  data.pageCount = pageCount
  return get(path, data)
}

export default { get, post, page }
