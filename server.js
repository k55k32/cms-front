import Nuxt from 'nuxt'
import express from 'express'
import service from  './service/ArticleService'
import utils from './utils'
import serverConfig from './server-config'
import nuxtConfig from './nuxt.config'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import store from './store'
const app = express()

const isProd = serverConfig.isProd
if (isProd) {
  app.use(compression())
  nuxtConfig.dev = false
  app.use(morgan())
} else {
  app.use(morgan('dev', {
    skip (req, res) {
      return res.statusCode > 300 && res.statusCode < 400
    }
  }))
}

app.use(cors())

app.get('/article-render/:id', (req, res) => {
  service.get(req.params.id).then(data => {
    data.content = utils.markdown(data.content)
    res.send({
      success: true,
      data: data
    })
  }).catch(e => e)
})

const nuxt = new Nuxt(nuxtConfig)
const promise = (isProd ? Promise.resolve() : nuxt.build())
promise.then(() => {
  app.use(nuxt.render)
  app.listen(serverConfig.proxy.port)
  console.log(`Server is listening on http://${serverConfig.proxy.host}:${serverConfig.proxy.port}`)
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})
