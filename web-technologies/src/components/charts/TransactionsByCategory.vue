<template>
   <div class="transactions-by-category">
      <div class="chart">
         <v-chart :options="options" autoresize />
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
   computed: {
      options () {
         return {
            tooltip: {
               trigger: 'item',
               formatter: '{b}: {c} ({d}%)'
            },
            grid: {
               left: 0,
               top: 0,
               right: 0,
               bottom: 0
            },
            series: [
               {
                  type: 'pie',
                  radius: ['30%', '70%'],
                  avoidLabelOverlap: false,
                  emphasis: {
                     label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                     }
                  },
                  labelLine: {
                     show: false
                  },
                  data: this.chartdata
               }
            ],
            color: [
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
      }
   },
   data () {
      return {}
   },
   created () {}
}
</script>

<style lang="sass" scoped>
/**
 * MUST INCLUDE FOR ECHART
 */
.echarts
   width: 100%
   height: 100%
.transactions-by-category
   width: 100%
   height: 100%
.chart
   width: 100%
   height: 100%
</style>
