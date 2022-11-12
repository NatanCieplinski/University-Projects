<template>
   <div class="select-container">
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
   data () {
      return {
         value: Number
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'
.select-container
   height: fit-content
   align-self: center
   padding: 8px 8px 4px
   margin: 0 8px 2px
   border-bottom: 2px solid #44D7B6
   select
      background-color: inherit
      cursor: pointer
      color: inherit
      border: none
      height: inherit
      outline: none
      width: inherit

      option
         color: #222
</style>
