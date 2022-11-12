<template>
   <div class="transactions-by-category-bar">
      <div class="category" v-for="(category, index) in data" :key="index">
         <div class="infos">
            <div
               class="color-indicator"
               :style="{ background: colors[index % colors.length] }"
            ></div>
            <div class="title">{{ category.name }}</div>
            <div class="amount"
               >{{
                  category.value.toLocaleString('it-IT', {
                     minimumFractionDigits: 2
                  })
               }}
               €</div
            >
         </div>
         <div class="percentage">
            <div
               class="max"
               :style="{
                  background: colors[index % colors.length],
                  width: (category.value / maxSum) * 100 + '%'
               }"
            ></div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      chartdata: {
         type: Array,
         required: true
      }
   },
   created () {},
   data () {
      return {
         colors: [
            '#56ED96',
            '#ffd447',
            '#5497A7',
            '#292f36',
            '#87ff65',
            '#81f499',
            '#a2d729',
            '#50858b',
            '#0a0908',
            '#caf7e2',
            '#aceb98'
         ]
      }
   },
   computed: {
      maxSum () {
         var sum = 0
         this.chartdata.forEach(category => {
            sum += category.value
         })
         return sum
      },
      data () {
         return this.chartdata
      }
   }
}
</script>

<style lang="sass" scoped>
.transactions-by-category-bar
   overflow: hidden

.category
   position: relative
   text-align: left
   padding: 12px 24px

   &:hover
      background: #fafafa


   .color-indicator
      position: absolute
      top: 0
      left: 0
      content: ' '
      width: 10px
      height: 100%

   .percentage
      position: relative
      height: 5px
      width: 100%
      background: #eee
      margin-top: 8px
      border-radius: 8px

      .max
         position: absolute
         top: 0
         left: 0
         height: 5px
         border-radius: 8px


   .infos
      display: flex
      justify-content: space-between

      .title
         font-size: 16px
</style>
