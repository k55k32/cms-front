import jade from 'jade'
export default (app) => {

  app.get('/', (req, res) => {
    res.render('index')
  })

}
