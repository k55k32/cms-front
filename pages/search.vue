<template lang="pug">
.search-result.container
  article-item(v-for="article in page.data", :article="article")
</template>

<script>
import ArticleItem from '~components/article/ArticleItem'
import articleService from '../service/ArticleService'
export default {
  components: {ArticleItem},
  async data ({route}) {
    let keyword = route.query.keyword
    let currentPage = 1
    let pageSize = 10
    let pageData = await articleService.list(currentPage, pageSize, {keyword: keyword})
    return {
      page: pageData,
      currentPage: currentPage,
      pageSize: pageSize,
      keyword: keyword
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/article.less";
</style>
