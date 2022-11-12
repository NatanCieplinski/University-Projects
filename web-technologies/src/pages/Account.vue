<template>
   <div>
      <Navbar />
      <div class="body">
         <aside class="sidebar">
            <div class="sidebar-elements">
               <div>
                  <div class="sidebar-element" style="cursor:initial">
                     <div class="container">
                        <div class="account-name"><b>Totale conti:</b></div>
                        <div
                           :class="{
                              amount: true,
                              positive: totalAmount > 0,
                              negative: totalAmount < 0
                           }"
                        >
                           {{
                              totalAmount.toLocaleString('it-IT', {
                                 minimumFractionDigits: 2
                              })
                           }}
                        </div>
                     </div>
                  </div>
                  <div
                     :class="{
                        'sidebar-element': true,
                        active: account_id == account.id
                     }"
                     class="sidebar-element"
                     v-for="account in accounts"
                     :key="account.id"
                  >
                     <router-link
                        :to="{
                           name: 'account',
                           params: { account_id: account.id }
                        }"
                        class="container"
                     >
                        <div class="account-name">{{ account.name }}</div>
                        <div
                           :class="{
                              amount: true,
                              positive: account.amount > 0,
                              negative: account.amount < 0
                           }"
                        >
                           {{
                              account.amount.toLocaleString('it-IT', {
                                 minimumFractionDigits: 2
                              })
                           }}
                        </div>
                     </router-link>
                  </div>
               </div>
               <div class="add-account">
                  <router-link :to="{ name: 'newAccount' }">
                     <font-awesome-icon icon="plus" />
                     <span>Aggiungi conto</span>
                  </router-link>
               </div>
            </div>
         </aside>
         <div class="transactions-wrapper">
            <div class="title" v-if="this.showTransactions">
               <div class="text">Transazioni</div>
               <router-link
                  class="icon-button add-transaction"
                  :to="{
                     name: 'newTransaction',
                     params: { id: this.account_id }
                  }"
               >
                  <font-awesome-icon icon="plus" />
                  <div class="text">Aggiungi</div>
               </router-link>
            </div>
            <div class="transaction-list" v-if="this.showTransactions">
               <Transaction
                  v-for="transaction in transaction_list"
                  :transaction="transaction"
                  :key="transaction.id"
               />
            </div>
            <router-view class="overlay" />
         </div>
      </div>
   </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Transaction from '@/components/Transaction.vue'
import { mapGetters, mapState } from 'vuex'

export default {
   components: {
      Navbar,
      Transaction
   },
   props: {
      account_id: null //passato dal router
   },
   data () {
      return {
         showTransactions: true
      }
   },
   computed: {
      ...mapState('accounts', ['accounts']),
      ...mapGetters('transactions', ['transactions_by_account']),
      transaction_list () {
         return this.transactions_by_account(this.account_id)
      },
      totalAmount () {
         var sum = 0
         this.accounts.forEach(acc => (sum += acc.amount))
         return sum
      }
   },
   created () {
      if (this.$router.currentRoute.name != 'account') {
         this.showTransactions = false
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'

.modal
   background: black

.body
   display: flex
   background: #fafafa

   .sidebar
      background: map-get($colors, 'sidebar')
      height: calc(100vh - 64px)
      width: $sidebar-width

      .sidebar-elements
         width: $sidebar-width
         display: flex
         flex-direction: column
         height: 100%
         justify-content: space-between

         .sidebar-element
            color: white
            cursor: pointer
            font-size: 20px
            font-weight: 500
            height: 3.2em
            width: 100%

            .account-name
               margin-right: 30px

            .container
               align-items: center
               display: flex
               flex-direction: row
               height: 100%
               justify-content: space-between
               padding: 0 16px
               width: 100%

            .amount
               font-size: 18px
               font-weight: bolder
               padding: 0 6px
               border-radius: 8px
               text-align: right

               &::after
                  content: '€'
                  font-size: 14px


            .positive
               color: map-get($colors, 'positive-transaction')
               // background: #e4f2ef

            .negative
               color: map-get($colors, 'negative-transaction')
               // background: #fae7e6

         .active
            font-weight: 700
            background-color: #fafafa
            color: #222

            .positive
               background: #e4f2ef
            .negative
               background: #fae7e6

.transactions-wrapper
   position: relative
   width: 100%
   overflow-y: scroll
   height: calc(100vh - 64px)

   .title
      display: flex
      align-items: center
      justify-content: space-between
      margin: 0 32px
      margin-top: 32px
      margin-bottom: 14px
      font-weight: bold

      .text,.icon-button
         color: #333
         font-size: 20px

      .icon-button
         display: flex
         align-items: center
         .text
            margin-left: 10px


.transaction-list
   width: calc(100% - 64px)
   margin: 0 32px
   margin-bottom: 32px
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
</style>
