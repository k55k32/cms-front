import http from '../util/HttpClient'

http.get('http://localhost:8889/article/list', {
  pageSize: 10,
  currentPage: 1
}).then(data => {
  console.log(data)
})
