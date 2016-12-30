<template lang="pug">
.article-item
  .title-wrapper(:class="{banner: article.banner}", :style="{backgroundImg: `url(${article.banner})`}")
    .tag-group
      b.tag(v-for="tag in article.tags") {{tag.name}}
    p.title
      router-link(:to="articleLink" target="_blank") {{article.title}}
  p.summary
    router-link(:to="articleLink") {{article.summary}}
  .footer-wrapper
    p.more
    p {{article.createTime | date}}
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

<style lang="css">
</style>
