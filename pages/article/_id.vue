<template lang="pug">
.article-detail
  .detail-banner(:class="{banner: banner}")
    p.title {{title}}
    .remark
      .time {{createTime | date}}
      //- .tag(v-for="tag in tags") {{tag.name}}
      .tag(v-for="tag in tags") {{tag.name}}
    p {{catalogName}}
  .content.markdown-body
    div(v-html="content")
    .more-article
      article-link(:id="beforeId", :text="beforeTitle", name="上一篇", style="text-right")
      .line
      article-link(:id="nextId", :text="nextTitle", name="下一篇", style="text-left")
</template>

<script>
import service from '../../service/ArticleService'
import ArticleLink from '~components/article/ArticleLink'
export default {
  components: { ArticleLink },
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
