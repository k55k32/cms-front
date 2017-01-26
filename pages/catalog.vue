<template lang="pug">
.container
  .flex
    .catalog-menus(@click="menuClick")
      i.icono-hamburger
    nav.catalog-items(@click="menuClick", :class="{'mobile-show': toggleMenu}")
      router-link.catalog-item(:class="{'active-item': currentId === c.id}",:to="{name: 'catalog-id', params: {id: c.id}}" v-for="c in catalogs")
        span {{c.name || '未分类'}}
        span {{c.articleCount}}
    .flex-1
      nuxt-child
</template>

<script>
export default {
  async data ({params, store}) {
    let catalogs = await store.dispatch('loadCatalogs')
    return {
      catalogs: catalogs,
      toggleMenu: false
    }
  },
  head () {
    return {
      title: this.currentCatalog.name || '未分类'
    }
  },
  computed: {
    currentCatalog () {
      let catalog = {}
      this.catalogs.every(c => {
        if (c.id === this.currentId) {
          catalog = c
          return false
        }
        return true
      })
      return catalog
    },
    currentId () {
      let catalogId = this.$route.params.id
      let catalogs = this.catalogs
      if (!catalogId && catalogs.length) {
        catalogId = catalogs[0].id
      }
      return catalogId
    }
  },
  methods: {
    menuClick () {
      this.toggleMenu = !this.toggleMenu
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/global.less";
@item-color: #40464b;
@item-active: #363d43;
@item-pd: 22px;
.catalog-menus{
  display: none;
}
.catalog-item{
  display: block;
  padding: @item-pd;
  width: @item-pd * 14;
  background: @item-color;
  display: flex;
  justify-content: space-between;
  &+&{
    border-top: 2px solid @item-active;
  }
  & + &.active-item{
    border-top: 0px;
  }
  &.active-item + &{
    border-top: 0px;
  }
  &.active-item{
    background: @item-active;
    border-left: 4px solid @color-import;
  }
  color: lighten(@background, 20%);
}
@media (max-width: 768px) {
  .catalog-menus{
    position: fixed;
    bottom: 10px;
    left: 10px;
    display: block;
    z-index: 2;
  }
  .catalog-items{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: @background;
    z-index: 1;
    overflow-y: auto;
    .catalog-item{
      width: 100%;
    }
    &.mobile-show{
      display: block;
    }
  }
}
</style>
