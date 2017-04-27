<template lang="pug">
.login {{msg}}
</template>

<script>
import GuestService from '../../service/GuestService'
export default {
  data ({route: {query: {code}}}) {
    return {code, msg: 'Login from Github...'}
  },
  layout: 'empty-page',
  async mounted () {
    try {
      let {token} = await GuestService.gitHubLogin(this.code)
      let guestInfo = await GuestService.getGuestInfo(token)
      guestInfo.token = token
      this.msg = 'Login Success! Close this windows'
      window.opener.loginGithub(guestInfo)
      window.close()
    } catch (e) {
      this.msg = e
    }
  }
}
</script>

<style lang="css">
</style>
