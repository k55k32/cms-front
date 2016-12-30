<template lang="pug">
  .app
    .container
      .header
        router-link(v-for="m in menus", :to="{name: m.routerName}") {{m.name}}
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
  padding: 15px 0;
  & > a{
    position: relative;
    font-size: @title;
    color: @color-first;
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
    &:hover:before{
      width: 100%;
      left: 0;
      right: 0;
    }
  }
}
</style>
