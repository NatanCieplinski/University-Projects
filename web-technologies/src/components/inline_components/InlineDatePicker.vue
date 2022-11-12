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
.base-input
   cursor: pointer
   padding: 8px 8px 4px
   margin: 0 8px 2px
   border-bottom: 2px solid #44D7B6
</style>
