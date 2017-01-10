<template lang="pug">
div
  .article-detail
    .detail-banner(:class="{banner: article.banner}", :style="{backgroundImage: article.banner && `url(${article.banner})`}")
      h1.title.text-shadow {{article.title}}
      .remark
        .time {{article.createTime | date}}
        .tag(v-for="tag in article.tags") {{tag.name}}
      p {{article.catalogName}}
    .content.markdown-body
      post-content(:content="article.content")
      .update-by LAST UPDATE BY: {{article.updateTime | date}}
      .more-article
        article-link(:id="article.beforeId", :text="article.beforeTitle", name="上一篇", style="text-right")
        .line
        article-link(:id="article.nextId", :text="article.nextTitle", name="下一篇", style="text-left")
    .content
      form(type="post", @submit.prevent="submitComment")
        comment-form(v-model="form")
    .content(v-if="comments && comments.length")
      ul.timeline
        li.timeline-step(v-for="c in comments")
          .timeline-info
            .date.comment-time {{c.createTime | date}}
            .circle
            //- .comment-nickname
          .timeline-content
            p {{c.content}}
</template>

<script>
import service from '../../service/ArticleService'
import commentService from '../../service/CommentService'
import ArticleLink from '~components/article/ArticleLink'
import CommentForm from '~components/comment/CommentForm'
import PostContent from '~components/article/PostContent'
const CACHE_KEY = 'comment-user'
export default {
  components: { ArticleLink, PostContent, CommentForm },
  async data ({params}) {
    let article = await service.getRender(params.id)
    let comments = await commentService.list(article.id)
    return {
      comments: comments,
      article: article,
      form: {
        nickname: '',
        email: '',
        content: ''
      }
    }
  },
  head () {
    return {
      title: this.article.title,
      meta: [
        { name: 'description', content: this.article.summary.substr(0, 200) },
        { name: 'keywords', content: this.article.tags.map(t => t.name).join(' ') }
      ]
    }
  },
  mounted () {
    if (process.BROWSER_BUILD) {
      this.form = {...this.form, ...this.$cacheGet(CACHE_KEY)}
    }
  },
  methods: {
    submitComment () {
      let form = this.form
      form.articleId = this.article.id
      commentService.save(form).then(() => {
        console.log('add success')
        this.form.content = ''
      })
      this.$cacheSet(CACHE_KEY, {
        nickname: form.nickname,
        email: form.email
      })
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/article-detail.less";
@import "~assets/css/github-markdown.css";
@line: #eee;
@bg: #000;
// temp http://codepen.io/P233/pen/lGewF/?editors=1100
.timeline{
  padding-left: 30px;
  border-left: 8px solid @line;
  .timeline-step{
    margin: 40px 0;
    position: relative;
  }
  .date{
    margin-top: -10px;
    top: 50%;
    left: -158px;
    font-size: 0.95em;
    line-height: 20px;
    position: absolute;
  }
  .circle{
    box-sizing: content-box;
    margin-top: -10px;
    top: 50%;
    left: -44px;
    width: 10px;
    height: 10px;
    background: @color-import;
    border: 5px solid @line;
    border-radius: 50%;
    display: block;
    position: absolute;
  }
  .timeline-content{
    max-height: 20px;
    padding: 50px 20px 0;
    border-color: transparent;
    border-width: 2px;
    border-style: solid;
    border-radius: 0.5em;
    position: relative;
    &:before, &:after{
      content: "";
      width: 0;
      height: 0;
      border: solid transparent;
      position: absolute;
      pointer-events: none;
      right: 100%;
    }
    &:before{
      border-right-color: inherit;
      border-width: 20px;
      top: 50%;
      margin-top: -20px;
    }
    &:after{
      border-right-color: @bg;
      border-width: 17px;
      top: 50%;
      margin-top: -17px;
    }
  }
}
</style>
