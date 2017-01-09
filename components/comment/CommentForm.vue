<template lang="pug">
.comment-form
  .row.flex
    .width-100
      .input-group
        label.required 昵称:
        input(v-model="value.nickname")
    .width-100
      .input-group
        label.required 邮箱:
        input(v-model="value.email")
  .row
    .width-100
      .input-group.top
        label.required 内容:
        textarea.flex-1(v-model="value.content")
  .form-actions
    input.btn(type="button" value="重置")
    input.btn(type="submit" value="提交")
</template>

<script>
export default {
  props: ['value'],
  watch: {
    value (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/global.less";
.comment-form{
  label{
    color: rgba(0, 0, 0, 0.8);
  }
  textarea{
    height: 10em;
    resize: none;
    outline: none;
  }
}

label.required{
  &:after{
    content: "*";
    color: @color-import;
    margin-left: 8px;
  }
}

.row{
  margin: 0 -@row-padding;
  &+&{
    margin-top: @margin-size;
  }
}
.width-100{
  width: 100%;
  padding: 0px @row-padding;
}
input, textarea{
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  color: rgba(0, 0, 0, 0.8);
  padding: 10px;
}
.input-group{
  display: flex;
  align-items: center;
  &.top{
    align-items: flex-start;
  }
  &>label{
    width: 80px;
    padding-left: 15px;
  }
  &>input{
    flex: 1;
  }
}
</style>
