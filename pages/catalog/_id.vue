<template lang="pug">
.article-content
  article-item.mini(v-for="item in articlesPage.data", :article="item")
  pagination(:page="articlesPage")
</template>

<script>
import articleService from '../../service/ArticleService'
import ArticleItem from '~components/article/ArticleItem'
import Pagination from '~components/Pagination'

export default {
  components: {ArticleItem, Pagination},
  async data ({query: {currentPage, pageSize}, params, store}) {
    let catalogId = params.id
    if (!catalogId) {
      let catalogs = await store.dispatch('loadCatalogs')
      catalogId = catalogs[0].id || '-1'
    }
    let articlesPage = await articleService.list(currentPage, pageSize, {catalogId: catalogId})
    return {
      articlesPage: articlesPage
    }
  }
}
</script>
