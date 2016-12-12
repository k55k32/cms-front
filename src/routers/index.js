import pug from 'pug'
import service from '../service/ArticleService'

export default (app) => {

  app.get('/', (req, res) => {
    service.list().then(result => {
      res.render('index', result.data)
    })
  })

  app.get('/article/:id', (req, res) => {
    service.get(req.params.id).then(({data}) => {
      res.render('article/index', data)
    })
  })
}
