<template>
   <div class="container fullscreen">
      <BaseIcon name="404" viewBox="0 0 1100 600" height="400" width="700">
         <Icon404 />
      </BaseIcon>
      <div class="title">
         <h1>Ooops!</h1>
         <h3>You will not find any money here</h3>
      </div>
   </div>
</template>

<script>
import Icon404 from '@/assets/icons/Icon404'

export default {
   components: {
      Icon404
   }
}
</script>

<style lang="sass" scoped>
.container
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    .icon
        padding: 24px
    .title
        text-align: center
</style>
