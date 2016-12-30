<template lang="pug">
div(v-html="content" ref="content")
</template>

<script>
export default {
  props: ['content'],
  watch: {
    content () {
      this.linkTarget()
    }
  },
  methods: {
    linkTarget () {
      this.$nextTick(() => {
        this.$refs.content.querySelectorAll('a[href^="http://"],a[href^="https://"]').forEach((a) => {
          a.setAttribute('target', '_blank')
        })
      })
    }
  },
  mounted() {
    this.linkTarget()
  }
}
</script>

<style lang="css">
</style>
