<template lang="pug">
.article-content
  article-item.mini(v-for="item in articlesPage.data", :article="item")
</template>

<script>
import articleService from '../../service/ArticleService'
import ArticleItem from '~components/article/ArticleItem'

export default {
  components: {ArticleItem},
  async data({query: {currentpage = 1, pagesize = 10}, params, store}) {
    let catalogId = params.id
    if (!catalogId) {
      let catalogs = await store.dispatch('loadCatalogs')
      catalogId = catalogs[0].id || '-1'
    }
    let articlesPage = await articleService.list(currentpage, pagesize, {catalogId: catalogId})
    return {
      articlesPage: articlesPage
    }
  }
}
</script>

<style lang="css">
</style>
