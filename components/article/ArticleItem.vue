<template lang="pug">
.article-item
  .title-wrapper(:class="{banner: article.banner}", :style="article.banner && {backgroundImage: `url(${article.banner})`}")
    .tag-group
      b.tag(v-for="tag in article.tags") {{tag.name}}
    h2.title
      router-link(:to="articleLink" target="_blank") {{article.title}}
  .summary-wrapper
    .summary
      router-link(:to="articleLink") {{article.summary}}
    .footer-wrapper
      .update-by CREATE: {{article.createTime | date}}
      .update-by UPDATE: {{article.updateTime | date}}
</template>

<script>
export default {
  props: ['article'],
  computed: {
    articleLink () {
      return {name: 'article-id', params: {id: this.article.id}}
    }
  }
}
</script>
