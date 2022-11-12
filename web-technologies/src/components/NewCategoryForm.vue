<template>
   <div class="new-category-form">
      <BaseInput placeholder="Name" class="item" v-model="new_category.name" />
      <BaseSelect
         v-if="new_category.is_expense"
         class="item"
         style="width: 300px;"
         placeholder="Cat. Padre"
         :options="this.expense_options"
         v-model.number="new_category.parent_id"
      />
      <BaseSelect
         v-else
         class="item"
         style="width: 300px;"
         placeholder="Cat. Padre"
         :options="this.income_options"
         v-model.number="new_category.parent_id"
      />
      <BaseToggleSwitch
         :default_option="0"
         class="item"
         @selected="changeType"
      />
      <div @click="submit" class="item" style="cursor: pointer">
         <BaseIcon width="35" height="35" color="#44D7B6">
            <IconCheckCircle />
         </BaseIcon>
      </div>
   </div>
</template>

<script>
import IconCheckCircle from '@/assets/icons/IconCheckCircle.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
   components: {
      IconCheckCircle
   },
   data () {
      return {
         income_options: [],
         expense_options: [],
         new_category: {
            name: 'Name',
            is_expense: 1,
            parent_id: null
         }
      }
   },
   computed: {
      ...mapGetters('categories', [
         'income_parent_categories',
         'expense_parent_categories'
      ])
   },
   methods: {
      ...mapActions('categories', ['newCategory']),
      changeType (value) {
         if (value == 0) {
            this.new_category.is_expense = 1
         } else {
            this.new_category.is_expense = 0
         }
      },
      async submit () {
         if (this.new_category.parent_id === '') {
            this.new_category.parent_id = null
         }
         this.newCategory(this.new_category)
      },
      close () {
         this.$emit('close')
      }
   },
   created () {
      let income_cats = [].concat(this.income_parent_categories)
      let to_remove = income_cats.findIndex(a => a.name === 'Non categorizzato')
      console.log(to_remove)
      if (to_remove !== -1) income_cats.splice(to_remove, 1)

      let expense_cats = [].concat(this.expense_parent_categories)
      to_remove = expense_cats.findIndex(a => a.name === 'Non categorizzato')
      if (to_remove !== -1) expense_cats.splice(to_remove, 1)

      this.income_options = [{ name: 'Nessuna', id: null }].concat(income_cats)
      this.expense_options = [{ name: 'Nessuna', id: null }].concat(
         expense_cats
      )
   }
}
</script>

<style lang="sass" scoped>
.new-category-form
   align-items: center
   display: flex
   flex-direction: row
   font-size: 18px
   justify-content: space-between
   margin: 0
   padding: 0
   width: 100%
   .item
      margin: 0px 10px 0px 10px
</style>
