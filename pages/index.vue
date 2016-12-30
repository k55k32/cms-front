<template lang="pug">
div
  article-item(v-for="article in page.data", :article="article")
</template>

<script>
import service from '../service/ArticleService'
import ArticleItem from '~components/article/ArticleItem'
export default{
  components: {ArticleItem},
  data() {
    return service.list().then(page => {
      return {page: page}
    })
  }
}
</script>
<style lang="less">
@import "~assets/less/article.less";
</style>
