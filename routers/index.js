import pug from 'pug'

export default (app) => {
  app.get('/', (req, res) => {
    $page('article/list').then(result => {
      res.render('index', result.data)
    })
  })
}
