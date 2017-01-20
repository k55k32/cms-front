<template lang="pug">
div(v-html="content" ref="content")
</template>

<script>
export default {
  props: ['content'],
  watch: {
    content () {
      this.buildContent()
    }
  },
  methods: {
    buildContent () {
      this.$nextTick(() => {
        this.linkTarget()
        this.hTagLink()
      })
    },
    hTagLink () {
      let titles = []
      this.$refs.content.querySelectorAll('h2,h1').forEach(h => {
        let item = h.innerText
        h.setAttribute('id', item)
        titles.push(item)
      })
      this.$emit('build', titles)
    },
    linkTarget () {
      this.$refs.content.querySelectorAll('a[href^="http://"],a[href^="https://"]').forEach((a) => {
        a.setAttribute('target', '_blank')
      })
    }
  },
  mounted () {
    this.buildContent()
  }
}
</script>
