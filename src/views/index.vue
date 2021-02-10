<template>
<div>
<router-view :socket ="socket" />
</div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'Main',
  data () {
    return {
      socket: io(process.env.VUE_APP_SOCKET_FRONTEND_URL, { query: 'data = 2' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
