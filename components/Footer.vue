<template lang="pug">
footer
  span Email:
    a(href="mailto:diamondfsd@gmail.com") diamondfsd@gmail.com
  span Github Repositories:
    a(href="https://github.com/k55k32/cms-front" target="_blank") k55k32/cms-front
    a(href="https://github.com/k55k32/cms-admin-front" target="_blank") k55k32/cms-admin-front
    a(href="https://github.com/k55k32/cms-admin-end" target="_blank") k55k32/cms-admin-end
</template>

<script>
import PageViewService from '../service/PageViewService'
export default {
  methods: {
    logPageView () {
      let r = this.$route
      PageViewService.save({
        name: r.name,
        path: r.path,
        fullPath: r.fullPath,
        params: r.params && JSON.stringify(r.params),
        query: r.query && JSON.stringify(r.query)
      }).then((result, data) => {
        console.warn('pageview save')
      })
    }
  },
  created () {
    this.logPageView()
    this.$router.afterEach((r) => {
      this.logPageView()
    })
  }
}
</script>

<style lang="less">
footer{
  padding: 15px 0;
  color: #ccc;
  font-size: .8em;
  a {
    margin-right: 10px;
  }
}
</style>
