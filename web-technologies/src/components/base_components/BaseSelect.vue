<template>
   <div class="container">
      <select v-on="listeners" @change="updateValue">
         <option v-if="placeholder != null" value="" disabled selected hidden>{{
            placeholder
         }}</option>
         <option
            v-for="(option, index) in options"
            :value="option.id"
            :key="index"
            >{{ option.name }}</option
         >
      </select>
   </div>
</template>

<script>
import { formListener } from '@/mixins/formListener.mixin.js'
export default {
   mixins: [formListener],
   props: {
      options: {
         type: Array,
         required: true
      },
      placeholder: null
   },
   data() {
      return {
         value: Number
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'
.container
   background-color: map-get($colors, 'input')
   border-radius: 18px
   display: inline-block
   height: 3em
   overflow: hidden
   width: 100%
   select
      background-color: inherit
      border: none
      height: inherit
      outline: none
      width: inherit
</style>
