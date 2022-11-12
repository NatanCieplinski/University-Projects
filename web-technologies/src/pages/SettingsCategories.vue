<template>
   <div class="category-settings">
      <Navbar />
      <div class="body">
         <div class="setting">
            <div class="settings-categories">
               <div class="selector">
                  <div class="text"> Le tue categorie </div>
                  <div class="params">
                     <div
                        class="params-button delete-categories"
                        @click="deleteCategories"
                     >
                        <font-awesome-icon icon="trash" />
                        <div class="button-text">Elimina selezionate</div>
                     </div>
                  </div>
               </div>

               <div class="new-category-container">
                  <h3 class="title">Aggiungi una categoria</h3>
                  <div class="category-form">
                     <NewCategoryForm />
                  </div>
               </div>

               <div class="row-container">
                  <div class="categories-container">
                     <h3 class="title title-income">Categorie di entrata</h3>
                     <Category
                        v-for="category in income_category_tree"
                        :category="category"
                        :key="category.id"
                        @input="mergeToDelete(category.id, $event)"
                     />
                  </div>

                  <div class="categories-container">
                     <h3 class="title title-expense">Categorie di Spesa</h3>
                     <Category
                        v-for="category in expense_category_tree"
                        :category="category"
                        :key="category.id"
                        @input="mergeToDelete(category.id, $event)"
                     />
                  </div>
               </div>

               <transition name="pop" mode="out-in"> </transition>
               <router-view class="overlay" />
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Category from '@/components/Category.vue'
import NewCategoryForm from '@/components/NewCategoryForm.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
   components: {
      NewCategoryForm,
      Category,
      Navbar
   },
   data () {
      return {
         to_delete: new Map()
      }
   },
   computed: {
      ...mapGetters('categories', [
         'expense_category_tree',
         'income_category_tree',
         'categories_is_empty'
      ])
   },
   methods: {
      ...mapActions('categories', [
         'getCategories',
         'newCategory',
         'deleteCategory'
      ]),
      deleteCategories () {
         this.to_delete.forEach(element =>
            element.forEach(to_delete_id => this.deleteCategory(to_delete_id))
         )
      },
      mergeToDelete (cat_id, val) {
         this.to_delete.set(cat_id, val)
      }
   },
   created () {
      if (this.categories_is_empty) {
         this.getCategories()
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'

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

.row-container
   display: flex
   justify-content: space-evenly
   padding-bottom: 50px
   padding-top: 32px

.new-category-container
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
      text-align: left
      padding: 15px 24px
      font-size: 24px

   .category-form
      padding: 16px


.categories-container
   width: calc(50% - 48px)
   background: white
   -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1)
   -webkit-border-radius: 16px
   -moz-border-radius: 16px
   border-radius: 16px
   height: min-content
   overflow: hidden

   .title
      // border-bottom: 2px solid #eee
      text-align: left
      padding: 15px 24px
      color: white
      -webkit-border-radius: 16px 16px 0 0
      -moz-border-radius: 16px 16px 0 0
      border-radius: 16px 16px 0 0
      margin: 0
      font-size: 24px

   .title-expense
      background-color: map-get($colors, "negative-transaction")
   .title-income
      background-color: map-get($colors, "positive-transaction")
</style>
