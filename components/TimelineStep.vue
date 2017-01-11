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
@line: #eee;
@bg: #000;
@size: 5px;
@line-size: 2px;
@border-size: 5px;
@date-size: 90px;
@allow-size: 10px;
@border-line: 1px solid @line;
@dColor:#fff;
.square(@size){
  width: @size;
  height: @size;
}
.timeline{
  padding-left: @date-size;
  .timeline-step{
    border-left: @line-size solid @line;
    position: relative;
    padding-bottom: @size * 2;
  }
  .timeline-lfet{
    left: -@date-size;
    margin-top: -@size;
    font-size: 0.9em;
    position: absolute;
  }
  @raduis:  @size / 2 + @border-size;
  @line-width: @raduis * 4;
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
