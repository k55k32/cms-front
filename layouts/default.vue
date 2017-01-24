<template lang="pug">
  .app
    header.header.container
      nav.nav
        router-link(v-for="m in menus", :to="{path: m.path}", :class="{'active-link': $route.name === m.routerName}") {{m.name}}
      form.search(@submit.prevent="searchSubmit")
        input(v-model="keyword" placeholder="请输入你要搜索的内容")
        button(type="submit")
          i.icono-search
    nuxt
    my-footer.container
    scroll-to-top
</template>

<script>
import MyFooter from '~components/Footer.vue'
import ScrollToTop from '~components/ScrollToTop.vue'
import menus from './menus'
export default {
  components: {
    MyFooter, ScrollToTop
  },
  data () {
    return {
      keyword: this.$route.query.keyword,
      menus: menus
    }
  },
  methods: {
    searchSubmit () {
      this.$router.push({path: '/search', query: {keyword: this.keyword}})
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/global.less";
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search{
  button{
    background: none;
    border: none;
  }
  input{
    color: #fff;
    width: 150px;
    padding: 2px 0;
  }
  i{
    margin-left: 10px;
    transform: scale(.6);
  }
}
.nav{
  padding: 15px 0;
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
