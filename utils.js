import markdownIt from 'markdown-it'
import hljs from 'highlightjs'

const markdownOption = {
  html: true,
  breaks: true,
  highlight (str, lang) {
    lang = lang || 'javascript'
    if (hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }
    return ''
  }
}
const md = markdownIt(markdownOption)
const safeMd = markdownIt({...markdownOption, html: false})

exports.markdownSafe = (text) => {
  return safeMd.render(text)
}

exports.markdown = (text) => {
  let result = md.render(text)
  return result
}
