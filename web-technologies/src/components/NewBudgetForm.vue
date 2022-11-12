<template>
   <div class="new-category-form">
      <BaseSelect
         class="item"
         placeholder="Categoria"
         :options="expense_categories"
         v-model.number="budget.id"
      />
      <BaseInput
         placeholder="Budget"
         style="width: 500px;"
         class="item"
         v-model="budget.budget"
      />
      <div @click="close" class="item">
         <BaseIcon width="35" height="35" color="#FF5B57">
            <IconTimesCircle />
         </BaseIcon>
      </div>
      <div @click="submit" class="item">
         <BaseIcon width="35" height="35" color="#44D7B6">
            <IconCheckCircle />
         </BaseIcon>
      </div>
   </div>
</template>

<script>
import IconTimesCircle from '@/assets/icons/IconTimesCircle.vue'
import IconCheckCircle from '@/assets/icons/IconCheckCircle.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
   components: {
      IconCheckCircle,
      IconTimesCircle
   },
   data () {
      return {
         budget: {
            id: null,
            budget: 0
         }
      }
   },
   computed: {
      ...mapGetters('categories', ['expense_categories'])
   },
   methods: {
      ...mapActions('categories', ['updateBudget']),

      submit () {
         if (this.budget.id !== null) {
            this.updateBudget(this.budget).then(() => {
               this.budget.id = null
               this.budget.budget = 0
            })
            this.close('close')
         }
      },
      close () {
         this.$emit('close')
      }
   },
   created () {}
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
      cursor: pointer
</style>
