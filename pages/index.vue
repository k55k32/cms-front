<template lang="pug">
.container
  article-list(:page="page")
</template>

<script>
import service from '../service/ArticleService'
import ArticleList from '~components/article/ArticleList'
export default{
  components: {ArticleList},
  async data({route: {query: {pageSize, currentPage}}}) {
    let page = await service.list(currentPage, pageSize)
    if (page.data.length === 0) {
      throw new Error('page number error: ' + currentPage)
    }
    return {
      page: page
    }
  },
  head () {
    return {
      title: this.$setting('blog-name'),
      meta: [
        {name: 'description', content: this.$setting('meta-description')}
      ]
    }
  }
}
</script>
<style lang="less">
@import "~assets/less/article.less";
</style>
