<template lang="pug">
div
  article-item(v-for="article in page.data", :article="article")
  pagination(:page="page")
</template>

<script>
import ArticleItem from './ArticleItem'
import Pagination from '../Pagination'
export default {
  components: {Pagination, ArticleItem},
  props: ['page', 'params']
}
</script>
