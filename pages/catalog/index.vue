<template lang="pug">
div
  .flex
    .catalog-items
      router-link.catalog-item(:class="{'active-item': catalogId === (c.id || '-1')}",:to="{name: 'catalog', query: {id: c.id || '-1'}}" v-for="c in catalogs")  {{c.name || '无类别'}} {{c.articleCount}}
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
  async data ({query: {id, currentpage = 1, pagesize = 10}}) {
    let catalogs = await service.list()
    let firstCatalog = catalogs[0]
    if (!id) {
      id = firstCatalog && (firstCatalog.id || '-1')
    }
    let articlesPage = await articleService.list(currentpage, pagesize, {catalogId: id})
    return {
      catalogId: id,
      articlesPage: articlesPage,
      catalogs: catalogs
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
.catalog-item{
  display: block;
  padding: @item-pd;
  width: @item-pd * 14;
  background: @item-color;
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
</style>
