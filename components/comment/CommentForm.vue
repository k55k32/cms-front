<template lang="pug">
.comment-form(:class="{'not-login': !isLogin}")
  .row.flex
    .width-100
      .input-group
        label 昵称:
        input(:value="guestInfo.nickname", readonly)
    .width-100
      .input-group
        label 邮箱:
        input(:value="guestInfo.email", readonly)
  .row
    .width-100
      .input-group.top
        label.required 内容:
        textarea.flex-1(v-model="value.content" placeholder="请输入讨论, 最多512字 ( 支持 Markdown 格式 )" required maxlength="512" ref="content")
        .form-actions
          button.btn.primary(type="submit") 提交讨论
  .not-login-mask(v-if="!isLogin")
    p 登陆后可发表评论
    p
      a.login-by-github(href="javascript:;" @click="openLoginGithub")
        img(src="../../assets/img/github-login.jpg")
        span  Github Login
</template>

<script>
export default {
  props: ['value'],
  watch: {
    value (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    },
    guestInfo () {
      return this.$store.getters.guestInfo
    }
  },
  methods: {
    foucsInput() {
      this.$refs.content.focus()
    },
    openLoginGithub () {
      location.href = `https://github.com/login/oauth/authorize?client_id=c10fd104be25fa95bcc4&scope=user:email`
      localStorage.setItem('redirect_uri', `${this.$route.path}?comment=1`)
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
  position: relative;
  .login-by-github{
    height: 45px;
    &>img{
      height: 100%;
      margin-right: .5em;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    color: #fff;
    padding: 5px 10px;
  }
  .not-login-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: 0;
    left: 0;
    background: #fff;
    line-height: 2;
  }
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
