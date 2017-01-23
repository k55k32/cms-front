<template lang="pug">
section.article-item
  .title-wrapper(:class="{banner: article.banner}", :style="article.banner && {backgroundImage: `url(${article.banner})`}")
    //- .tag-group
    //-   span.tag(v-for="tag in article.tags") {{tag.name}}
    header
      h2.title.text-shadow
        router-link(:to="articleLink" target="_blank") {{article.title}}
  .summary-wrapper
    article.summary
      router-link(:to="articleLink") {{article.summary}}
    footer.footer-wrapper
      time.update-by CREATE: {{article.createTime | date}}
      time.update-by UPDATE: {{article.updateTime | date}}
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
