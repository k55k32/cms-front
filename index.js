import express from 'express'
import path from 'path'
import morgan from 'morgan'
import lessMiddleware from 'less-middleware'
import AutoReload from 'views-auto-reload'
import './src/config.js'
import Helpers from './src/util/Helpers'
import routers from './src/routers'

const app = express()
/*
* 注册一些方法 可以直接在模板里面使用
*/
Object.keys(Helpers).forEach(k => {
  if(app.locals[k]) throw new Error(`helper key: ${k} exists`)
  app.locals[k] = Helpers[k]
})

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'pug')
app.use(morgan('dev'))
// app.use(lessMiddleware(path.join(__dirname, 'static/styles'), {
//   dest: path.join(__dirname, 'static/styles/css'),
//   force: true
// }))
app.use(express.static('static'))
// app.use(express.static('static/styles/css'))
// app.use(express.static('static/scripts'))
app.use(AutoReload(app, {suffix: ['.less', '.pug']}))

app.use("*", (req, res, next) => {
  global.currentRequest = req
  global.currentResponse = res
  next()
})

routers(app)

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(config.port, () => console.log('start listen in http://localhost:', config.port))
