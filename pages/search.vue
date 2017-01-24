<template lang="pug">
.search-result.container
  article-list(:page="page")
  .no-data(v-if="!page.data.length") 没有找到关于 {{keyword}} 的内容
</template>

<script>
import ArticleList from '~components/article/ArticleList'
import articleService from '../service/ArticleService'
export default {
  components: {ArticleList},
  async data ({route}) {
    let keyword = route.query.keyword
    let currentPage = 1
    let pageSize = 10
    let pageData = await articleService.list(currentPage, pageSize, {keyword})
    return {
      page: pageData,
      currentPage: currentPage,
      pageSize: pageSize,
      keyword: keyword
    }
  },
  head () {
    return {
      title: `"${this.keyword}" 的搜索结果`
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/article.less";
.no-data{
  color: #fff;
}
</style>
