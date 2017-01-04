<template lang="pug">
footer(v-html="$setting('footer')")
</template>

<script>
export default {
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
