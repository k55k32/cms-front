<template lang="pug">
footer(v-html="$store.state.setting['footer']")
</template>

<script>
export default {
  created () {
    this.$store.dispatch('loadSetting')
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
