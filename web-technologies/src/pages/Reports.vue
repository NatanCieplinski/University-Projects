<template>
   <div class="report-container">
      <Navbar />
      <div class="selector">
         <div class="text"> Seleziona un periodo </div>
         <div class="params">
            <div class="inline-text">Dal</div>
            <InlineDatePicker
               :value="period.start"
               @input="assignStart"
               @change="changed"
            />
            <div class="inline-text">al</div>
            <InlineDatePicker
               :value="period.end"
               @input="assignEnd"
               @change="changed"
            />
            <div class="inline-text">suddiviso in</div>
            <InlineSelect
               :options="period.len_options"
               v-model.number="period.len"
               @change="changed"
            />
         </div>
      </div>
      <div class="body">
         <div class="graph-container">
            <div class="title title-with-stats">
               <h3>Net Worth</h3>
               <div
                  class="stats"
                  :style="{
                     color: networthPercentage < 0 ? '#FF5B57' : '#4FD889'
                  }"
               >
                  {{
                     networthAmount.toLocaleString('it-IT', {
                        minimumFractionDigits: 2
                     })
                  }}
                  € ({{ networthPercentage > 0 ? '+' : ''
                  }}{{ networthPercentage }}%)
               </div>
            </div>

            <div class="graph">
               <NetWorth :chartdata="networth" />
            </div>
         </div>
         <div class="graph-container">
            <h3 class="title">Cash Flow</h3>
            <div class="graph">
               <CashFlow :chartdata="cashflow" />
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import NetWorth from '@/components/charts/NetWorth.vue'
import CashFlow from '@/components/charts/CashFlow.vue'
import InlineSelect from '@/components/inline_components/InlineSelect.vue'
import InlineDatePicker from '@/components/inline_components/InlineDatePicker.vue'
import { mapActions, mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
   components: {
      Navbar,
      NetWorth,
      CashFlow,
      InlineSelect,
      InlineDatePicker
   },
   data () {
      return {
         period: {
            start: dayjs().subtract(28 * 12, 'day'),
            end: dayjs(),
            len: 30,
            len_options: [
               { id: 30, name: '30 giorni' },
               { id: 14, name: '14 giorni' },
               { id: 7, name: '7 giorni' },
               { id: 1, name: 'un giorno' }
            ]
         },
         n_changed: 0
      }
   },
   computed: {
      ...mapState('reports', ['networth', 'cashflow']),
      networthAmount () {
         return this.networth.values[this.networth.values.length - 1]
      },
      networthPercentage () {
         return (
            Math.floor(
               (100 -
                  (this.networth.values[0] /
                     this.networth.values[this.networth.values.length - 1]) *
                     100) *
                  100
            ) / 100
         )
      }
   },
   methods: {
      ...mapActions('reports', ['generateAdvanceReports']),
      assignStart (date) {
         this.past_period = this.period
         this.period.start = date
         this.changed()
      },
      assignEnd (date) {
         this.past_period = this.period
         this.period.end = date
         this.changed()
      },
      changed () {
         this.n_changed++
         // Per non fare il calcolo 3 volte a caricamento pagina
         if (this.n_changed > 3) this.generateAdvanceReports(this.period)

         this.past_period = this.period
      }
   },
   created () {
      this.generateAdvanceReports(this.period)
      this.n_changed++
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'

.selector
   display: flex
   background: #343B44
   padding: 10px 32px
   justify-content: space-between
   color: white

   .text
      font-size: 20px
      align-self: center

   .params
      display: flex
      .inline-text
         align-self: center


.report-container
   background: #fafafa

.body
   margin-top: 32px
   padding-bottom: 0.1px

.graph-container
   // width: 66%
   background: white
   margin: 0 32px
   margin-bottom: 30px
   border-bottom: 2px solid #eee
   -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1)
   -webkit-border-radius: 16px
   -moz-border-radius: 16px
   border-radius: 16px

   .title
      border-bottom: 2px solid #eee
      text-align: left
      padding: 15px 24px
      margin: 0

   .title-with-stats
      display: flex
      justify-content: space-between

      h3
         margin: 0

      .stats
         align-self: center
         font-size: 20px



   .graph
      height: 50vh
      // padding: 30px
</style>
