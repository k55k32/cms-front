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
@line: @color-input;
@bg: #000;
@size: 5px;
@line-size: 2px;
@border-size: 5px;
@date-size: 100px;
@allow-size: 10px;
@border-line: 1px solid @line;
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
    top: 0px;
    left: -@date-size;
    font-size: 0.9em;
    position: absolute;
  }
  .timeline-info:before{
    content: " ";
    display: block;
    top: @size;
    left: -@line-size - (@size + @border-size * 1.5) / 2;
    .square(@size);
    background: @color-import;
    border:  @border-size solid @line;
    border-radius: 50%;
    position: absolute;
    box-sizing: content-box;
  }
  .timeline-content{
    margin-left: (@size + @border-size) * 2;
    position: relative;
    border: @border-line;
    padding: 15px;
    &:before{
      .square(@allow-size);
      top: @size;
      content: " ";
      display: block;
      border-left: @border-line;
      border-bottom: @border-line;
      transform: rotate(45deg);
      margin-right: -@allow-size/2;
      position: absolute;
      background: #fff;
      right: 100%;
    }
  }
}
</style>
