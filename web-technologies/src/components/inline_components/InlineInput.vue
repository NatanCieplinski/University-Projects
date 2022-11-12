<template>
   <div class="base-input">
      <input
         :type="type"
         @input="updateValue"
         :placeholder="placeholder"
         v-on="listeners"
         step="0.01"
         :style="custom_style"
         :value="value"
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
      value: String,
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
   position: relative

   &::after
      right: 0
      top: 10px
      content: '€'
      position: absolute

   input
      border: none
      box-sizing: border-box
      padding: 8px 8px 4px
      margin: 0 8px 2px
      border-bottom: 2px solid #44D7B6
      width: 100%
      text-align: center


      &:hover
         outline: none
      &:focus
         outline: none
   input[type=number]::-webkit-inner-spin-button,
   input[type=number]::-webkit-outer-spin-button
   -webkit-appearance: none
   margin: 0
</style>
