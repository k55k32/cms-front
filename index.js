import express from 'express'
import path from 'path'
import morgan from 'morgan'
import AutoReload from 'views-auto-reload'
import './src/config.js'
import Helpers from './src/util/Helpers'
import routers from './src/routers'

const isDev = process.env.NODE_ENV === 'dev'
const isBuild = process.env.NODE_ENV === 'build'

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
app.use(express.static('static/styles/css'))
if (isDev) {
  app.use(AutoReload(app, {suffix: ['.css', '.pug']}))
}

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

module.exports = app
