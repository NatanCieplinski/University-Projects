<template>
   <div class="inputBox">
      <div class="icon">
         <font-awesome-icon :icon="icon" />
      </div>
      <input :type="type" :placeholder="placeholder" @input="updateValue" v-on="listeners"/>
   </div>
</template>

<script>
import { formListener } from '@/mixins/formListener.mixin.js'
export default {
   mixins: [formListener],
   props: {
      placeholder: String,
      icon: String,
      type: String
   }
}
</script>

<style lang="sass" scoped>
@import '../../assets/global.sass'

.inputBox
    align-items: center
    background-color: map-get($colors, 'input')
    border-radius: 18px
    box-sizing: border-box
    display: flex
    height: 3em
    margin: 0 0 16px 0
    &:hover
        background-color: map-get($colors, 'active-input')
    .icon
        padding: 0px 0px 0px 16px
        opacity: 30%
    input
        background-color: inherit
        border: none
        padding: 0px 16px 0px 16px
        width: 100%
        &:focus
            outline: none
</style>
