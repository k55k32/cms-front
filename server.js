import Nuxt from 'nuxt'
import express from 'express'
import service from './service/ArticleService'
import settingService from './service/SettingService'
import commentService from './service/CommentService'
import utils from './utils'
import serverConfig from './server-config'
import nuxtConfig from './nuxt.config'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import sm from 'sitemap'
import RSS from 'rss'
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

const host = serverConfig.proxy.protocol + serverConfig.proxy.host
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

const domain = 'https://diamondfsd.com/'
app.get('/rss', async (req, res) => {
  try {
    let beginTime = new Date().getTime()
    let articleList = await service.listAll()
    let settings = await settingService.list()
    let email = settings['email']
    let pubDate
    if (articleList.length > 0) {
      let newArticle = articleList[0]
      pubDate = new Date(newArticle.updateTime)
    }
    let feed = new RSS({
      title: settings['blog-name'],
      description: settings['meta-description'],
      generator: 'Diamond Blog Front Render',
      site_url: domain,
      feed_url: domain + 'rss',
      managingEditor: email,
      webMaster: email,
      language: 'zh-ch',
      pubDate: pubDate,
      ttl: 60
    })
    let feedFormat = articleList.map(art => {
      return {
        title: art.title,
        description: art.summary,
        url: `${domain}article/${art.id}`,
        categories: [art.catalogName],
        author: settings['author'],
        date: new Date(art.createTime)
      }
    })
    feedFormat.forEach(feed.item.bind(feed))
    res.header('Content-type', 'application/xml')
    let xml = feed.xml({indent: false})
    let useTime = new Date().getTime() - beginTime
    res.send(xml + `<!-- Dynamic generation use time ${useTime} ms -->`)
  } catch (e) {
    console.error(e)
    res.send(e)
  }
})

const nuxt = new Nuxt(nuxtConfig)
const promise = (isProd ? Promise.resolve() : nuxt.build())
promise.then(() => {
  app.use(nuxt.render)
  app.listen(serverConfig.serverPort)
  console.log(`Server is listening on :::${serverConfig.serverPort} `)
  console.log('Server config is', serverConfig)
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})
