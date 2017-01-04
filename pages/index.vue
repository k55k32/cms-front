<template lang="pug">
div
  article-item(v-for="article in page.data", :article="article")
</template>

<script>
import service from '../service/ArticleService'
import ArticleItem from '~components/article/ArticleItem'
export default{
  components: {ArticleItem},
  async data(context) {
    let page = await service.list()
    let setting = await context.store.dispatch('loadSetting')
    return {
      setting: setting,
      page: page
    }
  },
  head () {
    return {
      title: this.$store.state.setting['blog-name']
    }
  }
}
</script>
<style lang="less">
@import "~assets/less/article.less";
</style>
