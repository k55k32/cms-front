import express from 'express'
import routers from './routers'
import path from 'path'
import morgan from 'morgan'
import lessMiddleware from 'less-middleware'
import AutoReload from 'views-auto-reload'
import request from './api/request.js'
import Helpers from './util/Helpers'

// request('http://localhost:8889/')

request('http://42.96.203.79:8080/')

const app = express()

/*
* 注册一些方法 可以直接在模板里面使用
*/
Object.keys(Helpers).forEach(k => {
  if(app.locals[k]) throw new Error(`helper key: ${k} exists`)
  app.locals[k] = Helpers[k]
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(morgan('dev'))
app.use(lessMiddleware(path.join(__dirname, 'styles'), {
  dest: path.join(__dirname, 'styles/css'),
  force: true
}))
app.use(express.static('styles'))
app.use(express.static('styles/css'))
app.use(express.static('scripts'))
app.use(AutoReload(app, {suffix: ['.less', '.pug']}))

routers(app)

const port = 3001

app.listen(port, () => console.log('start listen in http://localhost:', port))
