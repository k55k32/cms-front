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
    .content.comments(v-if="comments && comments.length")
      .timeline
        timeline-step(v-for="c in comments")
          .comment-date(slot="left") {{c.createTime | date('yyyy-mm-dd')}}
            .comment-time {{c.createTime | date('hh:mm')}}
          .comment-info(slot="content")
            h5 {{c.nickname}}
            p {{c.content}}
</template>

<script>
import service from '../../service/ArticleService'
import commentService from '../../service/CommentService'
import ArticleLink from '~components/article/ArticleLink'
import CommentForm from '~components/comment/CommentForm'
import PostContent from '~components/article/PostContent'
import TimelineStep from '~components/TimelineStep'
const CACHE_KEY = 'comment-user'
export default {
  components: { ArticleLink, PostContent, CommentForm, TimelineStep },
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
@import "~assets/less/global.less";
.comments{
  .comment-time{
    text-align: right;
    font-size: .8em;
  }
  .comment-info{
    h5 {
      margin-bottom: 1em;
    }
  }
}
</style>
