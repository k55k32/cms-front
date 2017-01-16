module.exports = {
  build: {
    vendor: ['axios']
  },
  plugins: [
    '~plugins/filters',
    '~plugins/pv',
    '~plugins/globalMix'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1,minimum-scale=1' },
      { name: 'robots', content: 'all' },
      { hid: 'description', content: "前端技术博客，前后端技术博客，全桟技术博客，Java，Vue，Nuxt，Html，CSS，Javascript等技术分享 " },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/less/index.less', lang: 'less'},
    { src: 'icono', lang: 'css'}
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000' }
}
