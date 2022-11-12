<template>
   <div
      class="transaction"
      @click="showItems"
      v-if="this.transaction != null"
      @mouseover="showEdit"
      @mouseout="showEdit"
   >
      <div class="color-indicator" v-show="show_edit"></div>
      <div class="main-info">
         <div class="transaction-info">
            <div class="note">
               {{ transaction.description }}
            </div>
            <div class="date">
               {{ transaction.date.format('DD MMM YYYY') }}
            </div>
         </div>
         <div style="display:flex">
            <div class="action-button" v-show="show_edit">
               <router-link
                  :to="{
                     name: 'editTransaction',
                     params: {
                        transaction_id: transaction.id,
                        transaction: this.transaction
                     }
                  }"
               >
                  Modifica
               </router-link>
            </div>
            <div
               class="action-button"
               v-show="show_edit"
               @click="deleteTransaction(transaction.id)"
            >
               Elimina
            </div>
            <div :class="priceStyle(transaction.amount)">
               {{
                  transaction.amount.toLocaleString('it-IT', {
                     minimumFractionDigits: 2
                  })
               }}
            </div>
         </div>
      </div>

      <transition name="height-expansion">
         <div
            :class="{
               'items-info': true,
               'transaction-open': show_items
            }"
            v-show="show_items"
            :style="{ height: this.items_height + 'px' }"
         >
            <div class="item-header">
               <div class="hmedium">Nome</div>
               <div class="hmedium">Categoria</div>
               <div class="hsmall">Prezzo</div>
            </div>
            <div v-for="item in transaction.items" :key="item.id" class="item">
               <div class="hmedium name">
                  {{ item.name }}
               </div>
               <div class="hmedium category">
                  {{ categoryName(item.category_id) }}
               </div>
               <div :class="priceStyle(item.amount) + ' hsmall'">
                  <span>
                     {{
                        item.amount.toLocaleString('it-IT', {
                           minimumFractionDigits: 2
                        })
                     }}</span
                  >
               </div>
            </div>
         </div>
      </transition>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { amountFormatter } from '@/mixins/amountFormatter.mixin.js'
export default {
   mixins: [amountFormatter],
   props: {
      transaction: Object
   },
   data () {
      return {
         show_items: false,
         show_edit: false,
         items_height: this.transaction.items.length * 35 + 28 + 8
      }
   },
   computed: {
      ...mapState('categories', ['categories']),
      is_amount_negative () {
         return this.transaction.amount < 0
      }
   },
   methods: {
      ...mapActions('transactions', ['deleteTransaction']),
      priceStyle (amount) {
         var result = 'transaction-amount'
         if (amount < 0) {
            result += ' amount-negative'
         } else {
            result += ' amount-positive'
         }
         return result
      },
      showItems () {
         this.show_items = !this.show_items
      },
      showEdit () {
         this.show_edit = !this.show_edit
      },
      categoryName (id) {
         let cat = this.categories.find(category => category.id == id)
         if (cat) return cat.name
         else return 'Non categorizzato'
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'
.transaction
   box-sizing: border-box
   position: relative

   .main-info
      border-bottom: 1px solid #eee
      display: flex
      align-items: center
      width: 100%
      padding: 12px 24px

   .color-indicator
      position: absolute
      top: 0
      left: 0
      content: ' '
      width: 10px
      height: 100%
      background: #44D7B6

   .action-button
      cursor: pointer
      font-size: 18px
      padding: 0 6px
      border-radius: 8px
      background: #efefef
      margin-right: 10px

   .transaction-amount
      font-size: 18px
      font-weight: bolder
      padding: 0 6px
      border-radius: 8px

      &::after
         content: '€'
         font-size: 14px

   .amount-positive
      color: map-get($colors, 'positive-transaction')
      background: #e4f2ef

   .amount-negative
      color: map-get($colors, 'negative-transaction')
      background: #fae7e6

   .transaction-info
      flex-grow: 1
      text-align: left
      padding:

      .note
         color: #555
         font-size: 18px
         font-weight: 600

      .date
         font-size: 16px
         font-weight: 500

   .transaction-open
      background: #fafafa

   .items-info
      box-sizing: border-box
      width: 100%
      border-bottom: 1px solid #eee
      text-align: left
      overflow: hidden
      >*
         width: 100%

      .item-header
         display: flex
         padding: 8px 26px 0 36px
         .hsmall, .hmedium
            font-weight: bolder

      .hsmall, .hmedium
         width: 40%
      .hsmall
         width: 20%
         text-align: right
         padding: 0

      .item
         display: flex
         padding: 4px 26px 4px 36px
         justify-content: space-between

         .transaction-amount
            font-weight: initial

         .amount-positive
            background: transparent

         .amount-negative
            background: transparent
</style>
