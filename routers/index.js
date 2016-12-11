import pug from 'pug'

export default (app) => {
  app.get('/', (req, res) => {
    $page('article/list').then(result => {
      res.render('index', result.data)
    })
  })
  app.get('/article/:id', (req, res) => {
    $get('article/detail/' + req.params.id).then(({data}) => {
      res.render('article/index', data)
    })
  })
}
