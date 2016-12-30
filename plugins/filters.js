import Vue from 'vue'
import dateformat from 'dateformat'
// import markdownIt from 'markdown-it'
// import hljs from 'highlightjs'

Vue.filter('date', (time, format = 'yyyy-mm-dd HH:ss') => {
  return dateformat(new Date(time), format)
})

// const markdownOption = {
//   html: true,
//   breaks: true,
//   highlight (str, lang = 'javascript') {
//     if (hljs.getLanguage(lang)) {
//       return hljs.highlight(lang, str).value
//     }
//     return ''
//   }
// }
//
// Vue.filter('markdown', content => {
//   let md = markdownIt(markdownOption)
//   let result = md.render(content)
//   return result
// })
