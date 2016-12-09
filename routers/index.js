import format from 'dateformat'
import pug from 'pug'
pug.filters = {
    date (text, options) {
      console.log(text, options)
      return text
      // return format(new Date(time), options)
    }
}
export default (app) => {
  app.get('/', (req, res) => {
    $page('article/list').then(result => {
      let items = result.data.data
      result.data.data = items.map(art => {
        art.createTime = format(new Date(art.createTime), 'yyyy-mm-dd HH:ss')
        return art
      })
      res.render('index', result.data)
    })
  })

}
