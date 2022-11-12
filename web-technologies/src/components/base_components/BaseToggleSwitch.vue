<template>
   <div>
      <div class="toggle-switch">
         <div
            v-for="(option, index) in options"
            class="toggle-option"
            :key="index"
            :class="optionStyle(index)"
            @click="selectOption(index)"
         >
            <span>{{ option.label }}</span>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      options: {
         type: Array,
         required: false,
         default: () => {
            return [{ label: 'spesa' }, { label: 'entrata' }]
         }
      },
      default_option: {
         type: Number,
         required: false
      },
      inverted_colors: {
         type: Boolean,
         required: false,
         default: false
      }
   },
   data() {
      return {
         selected_option_index: null
      }
   },
   methods: {
      selectOption(option_index) {
         this.selected_option_index = option_index
         this.$emit('selected', option_index)
      },
      optionStyle(option_index) {
         var result = 'toggle-option'
         if (this.inverted_colors) {
            result += ' inverted'
         }
         switch (option_index) {
            case this.selected_option_index:
               if (this.inverted_colors) {
                  result += ' selected-option-inverted'
               } else {
                  result += ' selected-option'
               }
               break
            case 0:
               result += ' first-option'
               break
            case this.options.length - 1:
               result += ' last-option'
         }
         return result
      }
   },
   created() {
      this.selected_option_index = this.default_option
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'
.toggle-switch
   align-items: center
   cursor: pointer
   display: flex
   flex-direction: row
   font-size: 16px
   font-weight: 800
   justify-content: stretch
   .toggle-option
      align-items: center
      background-color: white
      border-color: map-get($colors, "primary")
      border-style: solid
      border-width: 4px 2px 4px 2px
      color: map-get($colors, "primary")
      display: flex
      font-size: inherit
      height: 2.5em
      justify-content: center
      padding: 0px
      width: 5em
   .inverted
      background-color: map-get($colors, "primary")
      border-color: white
      color: white
   .first-option
      border-left-width: 4px !important
      border-radius: 10px 0px 0px 10px
   .last-option
      border-radius: 0px 10px 10px 0px
      border-right-width: 4px !important
   .selected-option
      background: map-get($colors, "primary") !important
      border-radius: 10px
      color: white !important
      font-size: inherit
      height: 3.5em
   .selected-option-inverted
      background: white !important
      border-radius: 10px
      color: map-get($colors, "primary") !important
      font-size: inherit
      height: 3.5em
</style>
