<template lang="pug">
.login
  p {{hasError ? 'Ops!!! the error msg:' : ''}}{{msg}}
  a(href="/" v-if="hasError")
    u 回到首页 (Home)
</template>

<script>
import GuestService from '../../service/GuestService'
export default {
  data ({route: {query: {code}}}) {
    return {code, msg: 'Please Waiting for a second, Login from Github now ...', hasError: false}
  },
  layout: 'empty-page',
  async mounted () {
    try {
      let {token} = await GuestService.gitHubLogin(this.code)
      let guestInfo = await GuestService.getGuestInfo(token)
      guestInfo.token = token
      this.$store.dispatch('loginGuest', guestInfo)
      this.msg = 'Login Success! Close this windows'
      let redirect = this.$cacheGet('redirect_uri')
      let location = window.location
      if (redirect) {
        this.$router.replace(redirect)
      } else {
        location.href = location.origin
      }
    } catch (e) {
      console.error(e)
      this.hasError = true
      this.msg = e
    }
  }
}
</script>

<style lang="css">
</style>
