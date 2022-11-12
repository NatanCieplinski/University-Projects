<template>
   <div class="base-input">
      <input
         :type="type"
         @input="updateValue"
         :placeholder="placeholder"
         v-on="listeners"
         step="0.01"
         :style="custom_style"
      />
   </div>
</template>

<script>
import { formListener } from '@/mixins/formListener.mixin.js'
export default {
   mixins: [formListener],
   props: {
      placeholder: String,
      type: String,
      custom_style: {
         type: Object,
         required: false
      }
   }
}
</script>

<style lang="sass" scoped>

@import '../../assets/global.sass'
.base-input
   width: 100%
   input
      background-color: map-get($colors, 'input')
      border-radius: 18px
      border: none
      box-sizing: border-box
      height: 3em
      margin: 0 0 0 0
      padding: 8px 16px 8px 16px
      width: 100%
      &:hover
         outline: none
      &:focus
         background-color: map-get($colors, 'active-input')
         outline: none
   input[type=number]::-webkit-inner-spin-button,
   input[type=number]::-webkit-outer-spin-button
   -webkit-appearance: none
   margin: 0
</style>
