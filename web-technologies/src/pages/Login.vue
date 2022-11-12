<template>
   <div class="container fullscreen">
      <LoginForm />
   </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import { mapGetters } from 'vuex'

export default {
   components: {
      LoginForm
   },
   computed: {
      ...mapGetters(['logged_in'])
   },
   created() {
      if (this.logged_in) {
         this.$router.push({ name: 'dashboard' })
      }
   }
}
</script>

<style lang="sass" scoped>

@import '../assets/global.sass'
.container
    align-items: center
    background-color: map-get($colors, "background")
    display: flex
    justify-content: center
</style>
