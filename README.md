## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3999
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

```
# plain
add Authorization header in store init


# Change Log
2017-01-24
1. add search view #7
2. add pagination component #4
3. fixed the article-detail navs

2017-01-23 update article-detail style great for the banner
2017-01-22 replace all `http` resource to `https`
> UPDATE c_article SET content = REPLACE(content, 'http://42.96.203.79:22222/file', 'https://file.diamondfsd.com/img')
> UPDATE c_article SET banner = REPLACE(banner, 'http://42.96.203.79:22222/file', 'https://file.diamondfsd.com/img')

2017-01-20 update
  1. add title-nav in article-detail #5
  2. semantization html tag
2017-01-16 update
  1. change comments style.  fixed #2
  2. comment support `markdown`.
  3. mobile scale set in 1
  4. change the catalog-router to `Nested Router`
  5. add scroll to top button
  6. add `fastclick` in mobile

2017-01-11  add comment function, now you can do comment in the article detail
2017-01-10  change `banner` style, the title has shadow now
2017-01-06  add `catalog` page, make the mobile style good
2017-01-04  add `nuxtServerInit` to `store action`. load setting before page render
2016-12-30  change the ssr to `nuxtjs`
2016-12-29  add article-tags
2016-12-11  the blog version 0.1, use express,pug render
