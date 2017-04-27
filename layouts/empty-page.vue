<template lang="pug">
  .app
    nuxt
</template>

<script>
import MyFooter from '~components/Footer.vue'
import ScrollToTop from '~components/ScrollToTop.vue'
import menus from './menus'
export default {
  components: {
    MyFooter, ScrollToTop
  },
  data () {
    return {
      keyword: this.$route.query.keyword,
      menus: menus
    }
  },
  methods: {
    searchSubmit () {
      this.$router.push({path: '/search', query: {keyword: this.keyword}})
    }
  }
}
</script>

<style lang="less">
</style>
