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
  data () {
    return {
      titles: []
    }
  },
  methods: {
    buildContent () {
      this.linkTarget()
      this.hTagLink()
    },
    hTagLink () {
      let titles = []
      this.$refs.content.querySelectorAll('h2,h1').forEach(h => {
        let item = h.innerHTML
        h.setAttribute('id', item)
        titles.push(item)
      })
      this.titles = titles
    },
    linkTarget () {
      this.$refs.content.querySelectorAll('a[href^="http://"],a[href^="https://"]').forEach((a) => {
        a.setAttribute('target', '_blank')
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.document.querySelectorAll('base')[0].remove()
      this.buildContent()
    })
  }
}
</script>
