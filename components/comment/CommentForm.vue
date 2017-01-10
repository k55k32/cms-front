<template lang="pug">
.comment-form
  .row.flex
    .width-100
      .input-group
        label.required 昵称:
        input(v-model="value.nickname" placeholder="公开" required)
    .width-100
      .input-group
        label.required 邮箱:
        input(v-model="value.email" type="email" placeholder="请输入邮箱（博主可能会跟你联系）不公开" required)
  .row
    .width-100
      .input-group.top
        label.required 内容:
        textarea.flex-1(v-model="value.content" placeholder="请输入评论 Markdown Support 最多512字" required maxlength="512")
        .form-actions
          button.btn.primary(type="submit") 提交
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
  border: 0;
  border-bottom: 1px solid @color-input;
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
