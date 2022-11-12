<template>
   <div class="base-date-picker">
      <v-date-picker
         :popover="{ placement: 'bottom', visibility: 'hover' }"
         :mode="mode"
         :value="date"
         @input="onInput"
         locale="it"
      >
         <div class="base-input">
            {{ date_view }}
         </div>
      </v-date-picker>
   </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
   props: {
      mode: String,
      value: Object
   },
   data () {
      return {
         date: this.value.toDate()
      }
   },
   computed: {
      date_view () {
         return dayjs(this.date).format('DD/MM/YYYY')
      }
   },
   methods: {
      onInput (date) {
         this.date = date
         this.$emit('input', dayjs(date))
      }
   }
}
</script>

<style lang="sass" scoped>

@import '../../assets/global.sass'
.base-date-picker
   height: 3em
.base-input
   align-items: center
   background-color: map-get($colors, 'input')
   border-radius: 18px
   border: none
   box-sizing: border-box
   display: flex
   height: 100%
   justify-content: flex-start
   margin: 0 0 0 0
   padding: 8px 16px 8px 16px
   width: 100%
   width: 100%
</style>
