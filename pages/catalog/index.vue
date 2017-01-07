<template lang="pug">
div
  .flex
    .catalog-menus
      i.icono-hamburger(@click="menuClick")
    .catalog-items(@click="menuClick", :class="{'mobile-show': toggleMenu}")
      router-link.catalog-item(:class="{'active-item': catalogId === (c.id || '-1')}",:to="{name: 'catalog', query: {id: c.id || '-1'}}" v-for="c in catalogs")
        span{{c.name || '无类别'}}
        span{{c.articleCount}}
    .flex-1
      .article-content
        article-item.mini(v-for="item in articlesPage.data", :article="item")
</template>

<script>
import service from '../../service/CatalogService'
import articleService from '../../service/ArticleService'
import ArticleItem from '~components/article/ArticleItem'
export default {
  components: {ArticleItem},
  async data ({query: {id, currentpage = 1, pagesize = 10}, store}) {
    let catalogs = await store.dispatch('loadCatalogs')
    let firstCatalog = catalogs[0]
    if (!id) {
      id = firstCatalog && (firstCatalog.id || '-1')
    }
    let articlesPage = await articleService.list(currentpage, pagesize, {catalogId: id})
    return {
      catalogId: id,
      articlesPage: articlesPage,
      catalogs: catalogs,
      toggleMenu: false
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
@import "../../assets/less/article.less";
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
    position: absolute;
    top: 10px;
    left: 10px;
    display: block;
    z-index: 2;
  }
  .catalog-items{
    display: none;
    padding-top: 60px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: @background;
    z-index: 1;
    .catalog-item{
      width: 100%;
    }
    &.mobile-show{
      display: block;
    }
  }
}
</style>
