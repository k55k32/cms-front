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
  .comments
      form(type="post", @submit.prevent="submitComment")
        comment-form(v-model="form")
</template>

<script>
import service from '../../service/ArticleService'
import ArticleLink from '~components/article/ArticleLink'
import CommentForm from '~components/comment/CommentForm'
import PostContent from '~components/article/PostContent'
export default {
  components: { ArticleLink, PostContent, CommentForm },
  async data ({params}) {
    let article = await service.getRender(params.id)
    return {
      article: article,
      form: {}
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
  methods: {
    submitComment () {
      console.log(this.form)
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/article-detail.less";
@import "~assets/css/github-markdown.css";
.comments{
  padding:15px 100px;
  background: #fff;
  margin-top: 1.4em;
}
</style>
