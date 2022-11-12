<template>
   <div class="income-expense">
      <div class="chart">
         <v-chart :options="options" autoresize />
      </div>
      <div class="chart-label">{{ chartdata.label }}</div>
   </div>
</template>

<script>
export default {
   props: {
      chartdata: {
         type: Object,
         required: true
      },
      max: Number
   },
   computed: {
      options () {
         return {
            grid: {
               left: 0,
               top: 0,
               right: 0,
               bottom: 0
            },
            xAxis: {
               show: false,
               type: 'category'
            },
            yAxis: {
               min: 0,
               max: this.max,
               show: false,
               type: 'value'
            },
            series: [
               {
                  type: 'bar',
                  name: 'Income',
                  smooth: true,
                  color: '#4FD889',
                  data: [this.chartdata.data[0]], // DATA HERE
                  barWidth: 8
               },
               {
                  type: 'bar',
                  name: 'Expense',
                  smooth: true,
                  data: [this.chartdata.data[1]], // DATA HERE
                  color: '#FF5B57',
                  barWidth: 8,
                  barGap: 0.5
               }
            ]
         }
      }
   }
}
</script>

<style lang="sass" scoped>
/**
 * MUST INCLUDE FOR ECHART
 */
.echarts
   width: 100%
   height: 100%

.income-expense
   height: 100%
   width: 100%
   display: grid
   grid-template: "chart" 0.8fr "laber" 0.2fr / 100%
   justify-items: stretch
   align-items: stretch
   *
      cursor: pointer

.chart-label
   text-transform: uppercase
   font-size: 12px
   align-self: center
</style>
