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
        transition-group(name="list" tag="div")
          timeline-step(v-for="c in comments", :key="c")
            .comment-date(slot="left") {{c.createTime | date('yyyy-mm-dd')}}
              .comment-time {{c.createTime | date('hh:mm:ss')}}
            .comment-info(slot="content")
              .comment-name {{c.nickname}}
              .comment-content {{c.content}}
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
    let comments = await commentService.listRender(article.id)
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
      commentService.save(form).then(async () => {
        this.form.content = ''
        let comments = this.comments
        let newComments = await commentService.listRender(this.article.id, {
          lastTime: comments[0] && comments[0].createTime
        })
        this.comments.unshift(...newComments)
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
@import "~assets/css/github.css";
@import "~assets/less/global.less";
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateX(100%);
}
@border-color: @tree-line;
.comments{
  .comment-time{
    text-align: right;
    font-size: .8em;
  }
  .comment-info{
    @padding-top: 5px;
    @padding-left: @padding-top * 2;
    .border();
    .comment-name {
      padding:@padding-top @padding-left;
      background: @border-color;
      color: #fff;
    }
    .comment-content{
      padding: @padding-top @padding-left;
    }
  }
}
</style>
