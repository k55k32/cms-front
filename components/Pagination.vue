<template lang="pug">
.pagination
  router-link.is-link(:to="{query: pageChange(this.page.currentPage - 1)}", v-show="hasPre") 上一页
  router-link.is-link(v-for="index in totalPage", :to="{query: pageChange(index)}", :class="{current: index === page.currentPage}", v-show="totalPage > 1") {{index}}
  router-link.is-link(:to="{query: pageChange(this.page.currentPage + 1)}", v-show="hasNext") 下一页
</template>

<script>
export default {
  props: ['page'],
  computed: {
    hasPre () {
      return this.page.currentPage > 1
    },
    hasNext () {
      return this.page.total > this.page.currentPage * this.page.pageSize
    },
    totalPage () {
      return Math.ceil(this.page.total / this.page.pageSize)
    }
  },
  methods: {
    pageChange (page) {
      return {...this.$route.query, currentPage: page}
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/global.less";
.pagination{
  display: flex;
  .is-link{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .8em;
    width: 100%;
    height: 3em;
    margin-top: @margin-size;
    background: none;
    .border(#fff);
    color: #fff;
    &.current{
      background: #fff;
      color: #333;
    }
  }
  .is-link + .is-link{
    border-left: 0;
  }
}
</style>
