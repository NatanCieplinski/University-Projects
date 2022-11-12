export const amountFormatter = {
   methods: {
      format(amount) {
         var result = amount.toString()
         if (result[0] == '-') {
            result = result.slice(1)
            result = '- ' + result
         }
         if (
            result.indexOf('.') != -1 &&
            result[result.indexOf('.') + 2] == undefined
         ) {
            result = result.concat('0')
         }
         return result
      },
      formatWithoutMinus(amount) {
         var result = amount.toString()
         if (result[0] == '-') {
            result = result.slice(1)
         }
         if (
            result.indexOf('.') != -1 &&
            result[result.indexOf('.') + 2] == undefined
         ) {
            result = result.concat('0')
         }
         return result
      }
   }
}
