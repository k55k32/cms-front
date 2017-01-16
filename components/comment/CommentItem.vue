<template lang="pug">
.comment-info
  .comment-header
    .comment-nickname {{comment.nickname}}
    .comment-date {{comment.createTime | date('yyyy-mm-dd hh:mm:ss')}}
  .comment-content.markdown-body(v-html="comment.content")
</template>

<script>
export default {
  props: ['comment']
}
</script>

<style lang="less">
@import "~assets/less/global.less";
@border-color: @tree-line;
.comments{
  .comment-time{
    text-align: right;
    font-size: .8em;
  }
  .comment-info{
    @padding-top: 5px;
    @padding-left: @padding-top * 2;
    .border();
    .comment-header {
      padding:@padding-top @padding-left;
      background: @border-color;
      color: #fff;
      display: flex;
      justify-content: space-between;
    }
    .comment-content{
      padding: @padding-top @padding-left;
    }
  }
}
</style>
