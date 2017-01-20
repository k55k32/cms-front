<template lang="pug">
.container
  article-item(v-for="article in page.data", :article="article")
</template>

<script>
import service from '../service/ArticleService'
import ArticleItem from '~components/article/ArticleItem'
export default{
  components: {ArticleItem},
  async data(context) {
    let page = await service.list()
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
