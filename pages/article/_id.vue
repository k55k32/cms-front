<template lang="pug">
section.article-container
  .article-detail
    header.detail-banner(:class="{banner: article.banner}", :style="{backgroundImage: article.banner && `url(${article.banner})`}")
      h1.title.text-shadow {{article.title}}
      .remark
        .time {{article.createTime | date}}
        .tag(v-for="tag in article.tags") {{tag.name}}
      p {{article.catalogName}}
    article.content.markdown-body(id='article-body')
      post-content(:content="article.content", @build="buildTitles")
      footer.update-by LAST UPDATE BY: {{article.updateTime | date}}
      .more-article
        article-link(:id="article.beforeId", :text="article.beforeTitle", name="上一篇", style="text-right")
        .line
        article-link(:id="article.nextId", :text="article.nextTitle", name="下一篇", style="text-left")
    .content(id='send-comment')
      form(type="post", @submit.prevent="submitComment")
        comment-form(v-model="form")
    .content.comments(v-if="comments && comments.length")
      .timeline
        transition-group(name="list" tag="div")
          timeline-step(v-for="c in comments", :key="c")
            comment-item(slot="content",:comment="c")
  article-nav(:titles = "titles")
</template>

<script>
import service from '../../service/ArticleService'
import commentService from '../../service/CommentService'
import ArticleLink from '~components/article/ArticleLink'
import CommentForm from '~components/comment/CommentForm'
import CommentItem from '~components/comment/CommentItem'
import PostContent from '~components/article/PostContent'
import ArticleNav from '~components/article/ArticleNav'
import TimelineStep from '~components/TimelineStep'
const CACHE_KEY = 'comment-user'
export default {
  components: { ArticleLink, PostContent, CommentForm, TimelineStep, CommentItem, ArticleNav },
  async data ({params}) {
    let article = await service.getRender(params.id)
    let comments = await commentService.listRender(article.id)
    return {
      titles: [],
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
    buildTitles (titles) {
      titles.unshift({
        target: 'article-body',
        text: '文章导航'
      })
      titles.push({
        target: 'send-comment',
        text: '发表讨论'
      })
      this.titles = titles
    },
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
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}
.article-detail{
  width: 100%;
  max-width: 1024;
}
.article-container{
  display: flex;
  .article-nav{
    flex: 1;
    margin-top: @banner-heigth;
  }
}
@media (min-width: 1500px) {
  .article-detail{
    max-width: 1200px;
  }
}
@media (max-width: 1280px){
  .article-detail{
    margin: auto;
  }
  .article-nav{
    display: none;
  }
}
</style>
