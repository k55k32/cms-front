<template lang="pug">
.div {{ error.statusCode }}  {{ error.message }}
  div something errr
</template>
<script>
export default {
  props: ['error']
}
</script>
