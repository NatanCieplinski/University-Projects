<template>
   <div class="budget-container">
      <Navbar />
      <div class="selector">
         <div class="text"> I tuoi budget </div>
         <div class="params">
            <div class="params-button add-categories" @click="showBudgetForm">
               <font-awesome-icon icon="plus" />
               <div class="button-text">{{
                  !can_show_form ? 'Aggiungi' : 'Annulla'
               }}</div>
            </div>
         </div>
      </div>

      <div v-if="can_show_form" class="over-container">
         <h3 class="title">Aggiungi un budget</h3>
         <div class="budget-form">
            <NewBudgetForm @close="showBudgetForm" />
         </div>
      </div>

      <div class="over-container">
         <div class="title">
            <div class="hbig">Categoria</div>
            <div class="hsmall">Budget</div>
            <div class="hsmall">Spesa</div>
            <div class="hsmall">Rimanente</div>
         </div>
         <Budget v-for="budget in budgets" :key="budget.id" :budget="budget" />
      </div>
   </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Budget from '@/components/Budget.vue'
import NewBudgetForm from '@/components/NewBudgetForm.vue'
import { mapGetters } from 'vuex'

export default {
   components: {
      Navbar,
      Budget,
      NewBudgetForm
   },
   data () {
      return {
         can_show_form: false
      }
   },
   computed: {
      ...mapGetters('categories', ['budgets'])
   },
   methods: {
      showBudgetForm () {
         this.can_show_form = !this.can_show_form
      }
   },
   created () {}
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'

.budget-container
   background: #fafafa
   min-height: 100vh

.category-settings
   background: #fafafa
   min-height: 100vh

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

      .params-button
         display: flex
         align-self: center
         margin-left: 24px
         cursor: pointer

         *
            align-self: center

         .button-text
            font-size: 18px
            margin-left: 6px

.over-container
   margin: 0 32px
   margin-top: 32px
   background: white
   -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1)
   -webkit-border-radius: 16px
   -moz-border-radius: 16px
   border-radius: 16px

   .title
      background: #44D7B6
      -webkit-border-radius: 16px 16px 0 0
      -moz-border-radius: 16px 16px 0 0
      border-radius: 16px 16px 0 0
      color: white
      text-align: center
      padding: 15px 24px
      font-size: 24px
      display: flex

      .hbig,.hsmall
         align-self: center

      .hbig
         text-align: left
         width: calc(40% - 16px)

      .hsmall
         width: 20%

   .budget-form
      padding: 16px
</style>
