<template lang="pug">
  .article-link(class="style")
    template(v-if="id")
      p.text-ellipsis {{text}}
      router-link(:to="{name: 'article-id', params: {id: id}}") {{name}}
    p(v-else) 没有了
</template>

<script>
export default {
  props: ['style', 'text', 'id', 'name']
}
</script>

<style lang="css">
</style>
