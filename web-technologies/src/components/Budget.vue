<template>
   <div class="budget">
      <div class="name">
         {{ budget.name }}
      </div>
      <div class="amount">
         <InlineInput type="text" v-model="amount" @input="budgetChange"
      /></div>
      <div class="spent">
         {{ spent.toLocaleString('it-IT', { minimumFractionDigits: 2 }) }} €
      </div>
      <div
         class="remaining"
         :style="{ color: remaining >= 0 ? '#4FD889' : '#FF5B57' }"
      >
         {{
            remaining.toLocaleString('it-IT', {
               minimumFractionDigits: 2
            })
         }}
         €
      </div>
      <font-awesome-icon
         icon="trash"
         class="action"
         color="#FF5B57"
         @click="deleteBudget"
      />
   </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapActions } from 'vuex'
import InlineInput from '@/components/inline_components/InlineInput.vue'

export default {
   components: {
      InlineInput
   },
   props: {
      budget: Object
   },
   data () {
      return {
         spent: 0,
         amount: '' + this.budget.budget
      }
   },
   computed: {
      ...mapGetters('transactions', ['transactions_list']),
      remaining () {
         return this.amount - this.spent
      }
   },
   methods: {
      ...mapActions('categories', ['updateBudget']),
      budgetChange (value) {
         if (value != '' && value != 0) {
            this.updateBudget({ id: this.budget.id, budget: value })
         }
      },

      deleteBudget () {
         this.budget.budget = 0
         this.updateBudget(this.budget)
      },

      retrieveTransactions () {
         this.transactions_list.forEach(transaction => {
            transaction.items.forEach(item => {
               // debugger // eslint-disable-line
               if (
                  dayjs().format('YYYYMM') ===
                     transaction.date.format('YYYYMM') &&
                  this.budget.id === item.category_id
               ) {
                  this.spent -= item.amount
               }
            })
         })
      }
   },
   created () {
      this.retrieveTransactions()
   }
}
</script>

<style lang="sass" scoped>
.budget
   position: relative
   display: flex
   justify-content: space-between
   padding: 8px 24px
   font-size: 18px
   background: white
   border-bottom: 1px solid #ccc
   text-align: center

   .name,.spent, .amount, .remaining,.action
      align-self: center

   .action
      cursor: pointer

   .name
      font-weight: 600
      text-align: left
      width: calc(40% - 16px)

   .remaining
      font-weight: 600

   .spent, .amount, .remaining
      width: 20%
</style>
