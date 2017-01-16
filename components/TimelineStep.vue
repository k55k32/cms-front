<template lang="pug">
.timeline-step
  .timeline-info
    .timeline-lfet
      slot(name="left")
  .timeline-content
    slot(name="content")
</template>

<script>
export default {
}
</script>

<style lang="less">
@import "~assets/less/global.less";
@line: @tree-line;
@size: 10px;
@line-size: 1px;
@border-size: 1px;
@date-size: 0px;
@allow-size: 10px;
@border-line: 1px solid @line;
@dColor:#fff;
@raduis:  @size / 2 + @border-size;
@line-width: @raduis * 8;

.square(@size){
  width: @size;
  height: @size;
}
.timeline{
  padding-left: @date-size;
  .timeline-step{
    border-left: @line-size solid @line;
    position: relative;
    padding-bottom: 2em;
  }
  .timeline-lfet{
    left: -@date-size;
    margin-top: -@size;
    font-size: 0.9em;
    position: absolute;
  }
  .timeline-info:after{
    content: " ";
    display: block;
    border-bottom: @border-line;
    position: absolute;
    top: @raduis - 1px;
    @left: @size / 2;
    left: @left;
    width: @line-width - @left;
  }
  .timeline-info:before{
    content: " ";
    display: block;
    left: -@line-size / 2 - @raduis;
    .square(@size);
    background: @dColor;
    border:  @border-size solid @line;
    border-radius: 50%;
    position: absolute;
    box-sizing: content-box;
  }
  .timeline-content{
    margin-left: @line-width;
    position: relative;
  }
}
</style>
