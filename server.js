import Nuxt from 'nuxt'
import express from 'express'
import service from  './service/ArticleService'
import commentService from  './service/CommentService'
import utils from './utils'
import serverConfig from './server-config'
import nuxtConfig from './nuxt.config'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import store from './store'
import sm from 'sitemap'
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
  }).catch(e => {
    res.send(e)
  })
})

app.get('/comments/:articleId', (req, res) => {
  commentService.list(req.params.articleId, req.query).then(list => {
    list.forEach(comment => {
      comment.content = utils.markdownSafe(comment.content)
    })
    res.send({
      success: true,
      data: list
    })
  }).catch(e => res.send(e))
})

const host = 'http://diamondfsd.com'
app.get('/sitemap.xml', (req, res) => {
  service.allNames().then(data => {
    let smOption = {
      hostname: host,
      cacheTime: 600000,
      urls: [host]
    }
    data.forEach(art => {
      smOption.urls.push({
        url: `/article/${art.id}`,
        changefreq: 'daily',
        lastmod: new Date(art.updateTime)
      })
    })
    let xml = sm.createSitemap(smOption).toString()
    res.header('Content-Type', 'application/xml')
    res.send(xml)
  }).catch(e => {
    res.send(e)
  })
})

const nuxt = new Nuxt(nuxtConfig)
const promise = (isProd ? Promise.resolve() : nuxt.build())
promise.then(() => {
  app.use(nuxt.render)
  app.listen(serverConfig.serverPort)
  console.log(`Server is listening on :::${serverConfig.serverPort} `)
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})
