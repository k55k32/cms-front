<template lang="pug">
footer.index(v-html="$setting('footer')")
</template>

<script>
export default {
  mounted () {
    if (process.BROWSER_BUILD) {
      this.$nextTick(() => {
        if (this._isMobile()) {
          require.ensure(['fastclick'], () => {
            const Fastclick = require('fastclick')
            Fastclick.attach(document.body)
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
footer.index{
  padding: 15px 0;
  color: #ccc;
  font-size: .8em;
  a {
    margin-right: 10px;
  }
}
</style>
