<template lang="pug">
  .app
    .container
      .header
        router-link(v-for="m in menus", :to="{name: m.routerName}", :class="{'active-link': $route.name === m.routerName}") {{m.name}}
      nuxt
      my-footer
</template>

<script>
import MyFooter from '~components/Footer.vue'
import menus from './menus'
export default {
  components: {
    MyFooter
  },
  data () {
    return {
      menus: menus
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/global.less";
.header{
  text-align: right;
  padding: 15px 50px;
  margin-bottom: 1em;
  & > a{
    position: relative;
    font-size: @title;
    color: @color-header;
    & + a{
      margin-left: 1em;
    }
    &:before{
      content: " ";
      position: absolute;
      left: 50%;
      bottom: -10px;
      width: 0;
      height: 2px;
      background: @color-first;
      transition: all .3s;
    }
    &.active-link, &:hover{
      color: @color-first
    }
    &.active-link:before, &:hover:before{
      width: 100%;
      left: 0;
      right: 0;
    }
  }
}
</style>
