<template>
   <div class="new-transaction">
      <ModalHeader
         back_to="account"
         style="border-radius: 16px 16px 0 0"
         :params="{ account_id: this.edited_transaction.account_id }"
      >
         Modifica Transazione
      </ModalHeader>
      <div class="body">
         <div class="transaction-info">
            <div class="description">
               <BaseInput
                  :placeholder="edited_transaction.description"
                  @input="updateDescription"
               />
            </div>
            <BaseDatePicker :value="transaction.date" @input="assignDate" />
            <div class="type">
               <BaseToggleSwitch
                  :default_option="is_expense ? 0 : 1"
                  @selected="changeType"
               />
            </div>
         </div>
         <div class="item-title">
            Articoli:
         </div>
         <div v-for="(item, index) in edited_transaction.items" :key="index">
            <div v-if="item.amount != null" class="item">
               <BaseInput
                  class="name"
                  :placeholder="item.name"
                  v-model="item.name"
               />
               <BaseSelect
                  v-if="is_expense"
                  class="category"
                  :options="expense_categories"
                  v-model.number="item.category_id"
               />
               <BaseSelect
                  v-else
                  class="category"
                  placeholder="Categoria"
                  :options="income_categories"
                  v-model.number="item.category_id"
               />
               <BaseInput
                  class="price"
                  :placeholder="formatWithoutMinus(item.amount)"
                  v-model.number="item.amount"
                  type="number"
               />
               <div class="delete" @click="deleteItem(index)">
                  <font-awesome-icon
                     icon="trash"
                     :style="{ color: '#FF5B57' }"
                     size="lg"
                  />
               </div>
            </div>
            <div v-else class="item">
               <BaseInput
                  class="name"
                  :placeholder="item.name"
                  v-model="item.name"
               />
               <BaseSelect
                  v-if="is_expense"
                  class="category"
                  placeholder="Categoria"
                  :options="expense_categories"
                  v-model.number="item.category_id"
               />
               <BaseSelect
                  v-else
                  class="category"
                  placeholder="Categoria"
                  :options="income_categories"
                  v-model.number="item.category_id"
               />
               <BaseInput
                  class="price"
                  placeholder="Prezzo"
                  v-model.number="item.amount"
                  type="number"
               />
               <div class="delete" @click="deleteItem(index)">
                  <font-awesome-icon
                     icon="trash"
                     :style="{ color: '#FF5B57' }"
                     size="lg"
                  />
               </div>
            </div>
         </div>
         <div class="new-item-button">
            <font-awesome-icon
               icon="plus-circle"
               :style="{ color: '#A7AEB7' }"
            />
            <div class="new-item-text" @click="addItem">
               Nuovo articolo
            </div>
         </div>
         <div class="confirmation-buttons">
            <BaseButton class="button" button_class="cancel">
               <router-link
                  :to="{
                     name: 'account',
                     params: { account_id: this.edited_transaction.account_id }
                  }"
               >
                  Annulla
               </router-link>
            </BaseButton>
            <BaseButton class="button" button_class="tertiary" @click="submit">
               Conferma
            </BaseButton>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModalHeader from '@/components/ModalHeader.vue'
import { amountFormatter } from '@/mixins/amountFormatter.mixin.js'
// import dayjs from 'dayjs'

export default {
   mixins: [amountFormatter],
   components: {
      ModalHeader
   },
   props: {
      transaction: null //received from router-link params
   },
   data () {
      return {
         edited_transaction: {},
         edited_amount: 0
      }
   },
   computed: {
      ...mapGetters('categories', [
         'expense_categories',
         'income_categories',
         'categories_is_empty',
         'category_is_expense'
      ]),
      is_expense () {
         return this.category_is_expense(this.transaction.items[0].category_id)
      }
   },
   methods: {
      ...mapActions('categories', ['getCategories']),
      ...mapActions('transactions', ['updateTransaction']),
      addItem () {
         const item = {
            name: 'Nome',
            amount: null,
            category_id: null
         }
         this.edited_transaction.items.push(item)
      },
      deleteItem (index) {
         this.edited_transaction.items.splice(index, 1)
      },
      submit () {
         if (this.is_expense == true) {
            this.edited_transaction.items.forEach(item => {
               item.amount = -Math.abs(item.amount)
            })
         }
         this.transaction.description = this.edited_transaction.description
         this.transaction.agent = this.edited_transaction.agent
         this.transaction.date = this.edited_transaction.date
         this.transaction.items = this.edited_transaction.items
         this.transaction.items.forEach(item => {
            this.edited_amount += item.amount
         })
         this.transaction.amount = this.edited_amount
         this.updateTransaction(this.transaction)
         this.$router.back()
      },
      changeType (selected_option) {
         if (selected_option === 0) {
            this.is_expense = true
         } else {
            this.is_expense = false
         }
      },
      updateDescription (description) {
         this.edited_transaction.description = description
         if (this.edited_transaction.items[0] == 'nome') {
            this.edited_transaction.items[0].name = description
         }
      },
      assignDate (date) {
         this.edited_transaction.date = date
      }
   },
   created () {
      if (this.categories_is_empty) {
         this.getCategories()
      }
      this.edited_transaction = JSON.parse(JSON.stringify(this.transaction))
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'

.new-transaction
   width: calc( 100% - 64px )
   height: min-content
   margin: 0 32px
   margin-top: 32px
   background: white
   -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1)
   -webkit-border-radius: 16px
   -moz-border-radius: 16px
   border-radius: 16px
   // overflow: hidden

   .body
      padding: 16px
      .transaction-info
         display: grid
         width: calc(100% - 52px)
         margin: 10px 10px 10px 10px
         grid-template: "description datepicker type" auto / 60% 20% 20%
         column-gap: 10px
         align-items: center
         .description
            grid-area: description
         .datepicker
            grid-area: datepicker
         .type
            grid-area: type
      .item-title
         display: flex
         font-size: 22px
         font-weight: 600
         justify-content: flex-start
         padding: 0px 15px 0px 15px
      .item
         align-items: center
         column-gap: 10px
         display: grid
         grid-template-areas: "name price category delete"
         grid-template-columns: auto 150px 100px 50px
         grid-template-rows: auto
         margin: 0px 10px 10px 10px
         width: inherit
         .name
            grid-area: name
         .category
            cursor: pointer
            grid-area: price
         .price
            grid-area: category
         .delete
            cursor: pointer
            grid-area: delete
      .new-item-button
         align-items: center
         color: map-get($colors, 'new-line')
         cursor: pointer
         display: flex
         font-size: 18px
         font-weight: 500
         justify-content: center
         margin: 10px 10px 0px 10px
         .new-item-text
            padding: 0px 10px 0px 10px
      .confirmation-buttons
         align-items: center
         display: flex
         justify-content: flex-end
         .button
            margin: 0px 10px 0px 0px
</style>
