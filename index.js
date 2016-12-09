import express from 'express'
import routers from './routers'
import path from 'path'
import morgan from 'morgan'
import lessMiddleware from 'less-middleware'
import AutoReload from 'views-auto-reload'
import request from './core/request.js'

request('http://localhost:8889/')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(morgan('dev'))
app.use(lessMiddleware(path.join(__dirname, 'styles'), {
  dest: path.join(__dirname, 'styles/css'),
  force: true
}))
app.use(express.static('styles/css'))
app.use(express.static('scripts'))
app.use(AutoReload(app, {suffix: ['.less', '.pug']}))

routers(app)


const port = 3001

app.listen(port, () => console.log('start listen in http://localhost:', port))

// const wsServer = ws.Server({ port: 9001 })
// console.log(`ws start on ${wsServer.options.port}`)
// let i = 0
// wsServer.on('connection', ws => {
//   if (i === 0) {
//     i++
//     ws.send('reload')
//   }
// })
