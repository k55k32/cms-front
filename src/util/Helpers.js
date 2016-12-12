import dateformat from 'dateformat'
import markdownIt from 'markdown-it'
import hljs from 'highlightjs'

exports.date = (date, format = 'yyyy-mm-dd HH:ss') => {
  return dateformat(new Date(date), format)
}
const markdownOption = {
  html: true,
  breaks: true,
  highlight (str, lang = 'javascript') {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value
    }
    return ''
  }
}
const md = markdownIt(markdownOption)
exports.markdown = (text) => {
  let result = md.render(text)
  return result
}
