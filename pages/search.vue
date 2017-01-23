<template lang="pug">
.search-result.container
  span {{pageData}}
</template>

<script>
import articleService from '../service/ArticleService'
export default {
  async data ({route}) {
    let keyword = route.query.keyword
    let currentPage = 1
    let pageSize = 10
    let pageData = await articleService.list(currentPage, pageSize, {keyword: keyword})
    return {
      pageData: pageData,
      currentPage: currentPage,
      pageSize: pageSize,
      keyword: keyword
    }
  }
}
</script>

<style lang="css">
</style>
