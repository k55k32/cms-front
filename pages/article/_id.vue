<template lang="pug">
.article-detail
  .detail-banner(:class="{banner: banner}", :style="{backgroundImage: banner && `url(${banner})`}")
    h1.title {{title}}
    .remark
      .time {{createTime | date}}
      .tag(v-for="tag in tags") {{tag.name}}
    p {{catalogName}}
  .content.markdown-body
    post-content(:content="content")
    .update-by LAST UPDATE BY: {{updateTime | date}}
    .more-article
      article-link(:id="beforeId", :text="beforeTitle", name="上一篇", style="text-right")
      .line
      article-link(:id="nextId", :text="nextTitle", name="下一篇", style="text-left")
</template>

<script>
import service from '../../service/ArticleService'
import ArticleLink from '~components/article/ArticleLink'
import PostContent from '~components/article/PostContent'
export default {
  components: { ArticleLink, PostContent },
  data ({params}) {
    return service.getRender(params.id)
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/article-detail.less";
@import "~assets/css/github-markdown.css";
</style>
