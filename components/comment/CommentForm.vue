<template lang="pug">
.comment-form
  .row.flex
    .width-100
      .input-group
        label.required 昵称:
        input(v-model="value.nickname" placeholder="公开 ( 免注册 ) " name="nickname" required maxlength="40")
    .width-100
      .input-group
        label.required 邮箱:
        input(v-model="value.email" type="email" name="email" placeholder="请输入邮箱（博主可能会跟你联系）不公开" required maxlength="40")
  .row
    .width-100
      .input-group.top
        label.required 内容:
        textarea.flex-1(v-model="value.content" placeholder="请输入讨论, 最多512字 ( 支持 Markdown 格式 )" required maxlength="512")
        .form-actions
          button.btn.primary(type="submit") 提交讨论
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
.form-actions{
  text-align: right;
  margin-left: @margin-size;
  align-self: flex-end;
}
.btn{
  .border(1px, @color-input);
  padding: 15px;
  background: none;
  cursor: pointer;
  &.primary{
    border-color: @color-import;
    background: @color-import;
    color: #fff;
  }
}
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
</style>
