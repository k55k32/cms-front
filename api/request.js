import HttpClient from '../util/HttpClient'

export default (root) => {
  function getUrl(path) {
    if (path.startsWith('http:') || path.startsWith('https:')) {
      return path
    } else {
      return root + path
    }
  }
  const get = (path, data) => {
    let url = getUrl(path)
    return HttpClient.get(url, data)
  }
  const post = (path, data) => {
    let url = getUrl(path)
    return HttpClient.post(url, data)
  }

  const page = (path, currentPage = 1, pageCount = 10, data = {}) => {
    data.currentPage = currentPage
    data.pageCount = pageCount
    return get(path, data)
  }

  global.$get = get
  global.$post = post
  global.$page = page
}
