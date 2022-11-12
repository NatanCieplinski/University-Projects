<template>
   <div class="dashboard-container">
      <Navbar />

      <div class="monthly-data">
         <div class="monthly-chart">
            <div
               class="year-data"
               v-for="year in income_expense.by_month.report"
               :key="year.label"
            >
               <div class="year-descriptor">{{ year.label }}</div>
               <div
                  v-for="month in year.data"
                  :key="month.label"
                  @click="changeActiveMonth(year.label, month.label)"
               >
                  <IncomeExpense
                     :class="{
                        'active-chart':
                           month.label == active_month &&
                           year.label == active_year,
                        'month-chart': true
                     }"
                     :max="income_expense.by_month.max_value"
                     :chartdata="month"
                  />
               </div>
            </div>
         </div>
         <div class="monthly-stat" v-if="active_month_data">
            <div class="monthly-stat-card stat-card-green">
               <h4>Entrate</h4>
               <div>{{
                  active_month_data.data[0].toLocaleString('it-IT', {
                     minimumFractionDigits: 2
                  })
               }}</div>
            </div>
            <div class="monthly-stat-card stat-card-red">
               <h4>Uscite</h4>
               <div>{{
                  active_month_data.data[1].toLocaleString('it-IT', {
                     minimumFractionDigits: 2
                  })
               }}</div>
            </div>
            <div class="monthly-stat-card">
               <h4>Totale</h4>
               <div>{{
                  (
                     active_month_data.data[0] - active_month_data.data[1]
                  ).toLocaleString('it-IT', { minimumFractionDigits: 2 })
               }}</div>
            </div>
         </div>
      </div>

      <div class="category-data">
         <div
            class="graph-container income"
            v-if="
               active_month_income_data &&
                  active_month_income_data.data.length != 0
            "
         >
            <h3 class="title">Entrate per categoria</h3>
            <div class="graph">
               <TransactionsByCategory
                  class="pie"
                  :chartdata="active_month_income_data.data"
               />
            </div>
            <TransactionsByCategoryBar
               class="bar"
               :chartdata="active_month_income_data.data"
            />
         </div>
         <div
            class="graph-container expense"
            v-if="
               active_month_expense_data &&
                  active_month_expense_data.data.length != 0
            "
         >
            <h3 class="title">Spese per categoria</h3>
            <div class="graph">
               <TransactionsByCategory
                  class="pie"
                  :chartdata="active_month_expense_data.data"
               />
            </div>
            <TransactionsByCategoryBar
               class="bar"
               :chartdata="active_month_expense_data.data"
            />
         </div>
      </div>
   </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import IncomeExpense from '@/components/charts/IncomeExpense.vue'
import TransactionsByCategory from '@/components/charts/TransactionsByCategory.vue'
import TransactionsByCategoryBar from '@/components/charts/TransactionsByCategoryBar.vue'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
   components: {
      IncomeExpense,
      TransactionsByCategory,
      TransactionsByCategoryBar,
      Navbar
   },
   data () {
      return {
         active_year: -1,
         active_month: -1,
         active_year_data: null,
         active_month_data: null,
         active_month_expense_data: null,
         active_month_income_data: null
      }
   },
   computed: {
      ...mapGetters('transactions', [
         'transactions_by_account',
         'transactions_by_account_is_empty',
         'transactions_list'
      ]),
      ...mapState('reports', [
         'income_expense',
         'expense_by_category',
         'income_by_category'
      ])
   },
   watch: {
      transactions_list () {
         this.generateReports()
      }
   },
   methods: {
      ...mapActions('reports', [
         'generateReportByMonth',
         'generateIncomeOrExpenseReportByMonth'
      ]),
      async generateReports () {
         await this.generateReportByMonth()
         await this.generateIncomeOrExpenseReportByMonth(true)
         await this.generateIncomeOrExpenseReportByMonth(false)

         try {
            this.changeActiveMonth(
               this.income_expense.by_month.report[0].label,
               this.income_expense.by_month.report[0].data[0].label
            )
         } catch {
            null
         }
      },
      changeActiveMonth (year, month) {
         this.active_year = year
         this.active_month = month

         this.active_year_data = this.income_expense.by_month.report.find(
            obj => obj.label === this.active_year
         )

         this.active_month_data = this.active_year_data.data.find(
            obj => obj.label === this.active_month
         )

         this.active_month_expense_data = this.expense_by_category.by_month
            .find(obj => obj.label === this.active_year)
            .data.find(obj => obj.label === this.active_month)

         this.active_month_expense_data.data.sort(function (a, b) {
            return b.value - a.value
         })

         this.active_month_income_data = this.income_by_category.by_month
            .find(obj => obj.label === this.active_year)
            .data.find(obj => obj.label === this.active_month)

         this.active_month_income_data.data.sort(function (a, b) {
            return b.value - a.value
         })
      }
   },
   created () {
      this.generateReports()
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'
.dashboard-container
   background: #fafafa

.monthly-data
   display: grid
   grid-template: "monthly-chart" "monthly-stat"
   justify-items: stretch
   align-items: stretch
   margin-bottom: 40px

.monthly-chart
   width: 100%
   display: flex
   padding-left: 30px
   cursor: pointer

.year-data
   display: flex
   margin-right: 40px
   position: relative

.year-descriptor
   position: absolute
   width: 36px
   left: calc(50% - 18px)
   top: 10px
   font-weight: bold

.monthly-stat
   background-color: #232A33 // SAME COLOR
   display: flex
   padding: 0px 30px


.monthly-stat-card
   width: 100%
   display: flex
   box-sizing: border-box
   justify-content: space-between
   border-left: 2px solid white
   padding: 12px 24px
   margin: 24px 64px

   &:first-child
      margin-left: 0

   h4, div
      color: white

   h4
      margin: 0
      padding: 0
      font-weight: bold

   div
      align-self: center
      font-size: 18px

      &::after
         content: " €"
         font-size: 14px

.stat-card-green
   border-color: #4FD889
   h4, div
      color: #4FD889

.stat-card-red
   border-color: #FF5B57
   h4, div
      color: #FF5B57

.month-chart
   height: 150px
   width: 50px
   box-sizing: content-box
   padding-left: 5px
   padding-right: 5px
   padding-bottom: 10px
   padding-top: 50px

.active-chart
   background-color: #232A33 // SAME COLOR
   color: white

.category-data
   display: flex
   justify-content: space-evenly
   padding-bottom: 100px

.graph-container
   width: 45%
   background: white
   border-bottom: 2px solid #eee
   -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1)
   -webkit-border-radius: 16px
   -moz-border-radius: 16px
   border-radius: 16px
   height: min-content
   overflow: hidden

   .title
      border-bottom: 2px solid #eee
      text-align: left
      padding-left: 20px
      padding-top: 15px
      padding-bottom: 15px
      margin: 0

   .graph
      height: 35vh
</style>
