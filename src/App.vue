<template>
  <div id="app" class="container-fluid">    
        <sms-dialog></sms-dialog>
  </div>
</template>

<script>

import smsDialog from './components/smsDialog.vue'

export default {
  name: 'app',
  components: {
    smsDialog
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
