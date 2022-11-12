<template>
   <div class="container fullscreen">
      <RegisterForm />
   </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'

export default {
   components: {
      RegisterForm
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
