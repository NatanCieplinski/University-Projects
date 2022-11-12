<template>
   <div id="app" class="fullscreen">
      <router-view />
   </div>
</template>

<script>
export default {
   name: 'Minilist'
}
</script>

<style lang="sass">
@import '~@/assets/variables'

#app
   font-family: 'Poppins', sans-serif;
   box-sizing: border-box
   height: calc(100% - #{$titlebar-height})
   min-height: calc(100% - #{$titlebar-height})
   min-width: 100%
   padding: 0px 16px 16px 16px
   width: 100%
</style>
