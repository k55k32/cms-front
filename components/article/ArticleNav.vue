<template lang="pug">
aside.article-nav.is-link
  ul(ref="ul" @click="scrollToElement")
    li(v-for="t in navs", :data-target='t.target', :class="{activity: t.target === activity}") {{t.text}}
</template>

<script>

function offsetTop (el) {
  if (!el) return 0
  if (el.offsetParent) {
    return el.offsetTop + offsetTop(el.offsetParent)
  }
  return el.offsetTop
}

export default {
  props: ['titles'],
  data () {
    return {
      activity: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.$el.clientHeight) return
      let body  = window.document.body
      let ul = this.$refs.ul
      let ulTop = offsetTop(ul)
      window.document.addEventListener('scroll', (e) => {
        let fixedTop = body.scrollTop - ulTop
        this.activityTarget(body.scrollTop)
        if (fixedTop > 0) {
          ul.setAttribute('style', `position: absolute;top:${fixedTop}px`)
        } else {
          ul.setAttribute('style', '')
        }
      })
    })
  },
  computed: {
    navs () {
      return this.titles.map(t => {
        return {
          target: t.target || t,
          text: t.text || t
        }
      })
    },
    elOffsetTopMap () {
      let obj = {}
      this.navs.forEach(n => {
        let targetId = n.target
        let offsetEl = window.document.getElementById(targetId)
        let elTop = offsetTop(offsetEl)
        obj[elTop] = targetId
      })
      return obj
    }
  },
  methods: {
    activityTarget (top) {
      let keys = Object.keys(this.elOffsetTopMap)
      keys.every((oTop, index) => {
        if (oTop >= top) {
          this.activity = this.elOffsetTopMap[oTop]
          return false
        }
        return true
      })
    },
    scrollToElement (e) {
      let targetId = e.target.dataset.target
      let targetEl = window.document.getElementById(targetId)
      let tgTop = offsetTop(targetEl)
      document.body.scrollTop = tgTop
    }
  }
}
</script>

<style lang="less">
@background: rgba(0, 0, 0, 0);
.article-nav{
  position: relative;
  ul{
    width: 100%;
  }
  li{
    background: @background;
    padding: 20px;
    color: #fff;
    &.activity{
      color: #000;
      background: #fff;
    }
  }
  li + li{
    border-top: 1px solid lighten(@background, 5%);
  }
}
</style>
