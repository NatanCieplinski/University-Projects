export const formListener = {
   methods: {
      updateValue(event) {
         this.$emit('input', event.target.value)
      }
   },
   computed: {
      listeners() {
         return {
            ...this.$listeners,
            input: this.updateValue
         }
      }
   }
}
