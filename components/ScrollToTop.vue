<template lang="pug">
.scroll-to-top
  i.icono-caretUpSquare(@click.stop="scrollTop")
</template>

<script>
export default {
  data () {
    return {
      scrollTimer: '',
      start: false
    }
  },
  created () {
    if (process.BROWSER_BUILD) {
      document.body.addEventListener('click', this.stopScroll)
      document.body.addEventListener('touchstart', this.stopScroll)
    }
  },
  methods: {
    stopScroll () {
      if (this.start) {
        this.start = false
        window.clearTimeout(this.scrollTimer)
      }
    },
    startScroll () {
      if (document.body.scrollTop > 0 && this.start) {
        document.body.scrollTop -= document.body.scrollTop / 60 + 10
        this.scrollTimer = setTimeout(() => {
          this.startScroll()
        }, 5)
      }
    },
    scrollTop () {
      this.start = true
      this.startScroll()
    }
  }
}
</script>

<style lang="less">
.scroll-to-top{
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
