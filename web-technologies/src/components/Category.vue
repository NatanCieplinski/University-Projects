<template>
   <div class="category">
      <div class="category-name">
         <div class="title">
            <input
               type="checkbox"
               v-model="parent_checked"
               v-if="category.name !== 'Non categorizzato'"
               @input="addToDelete(-1, $event.target.checked)"
            />
            {{ category.name }}
         </div>

         <div class="edit-options">
            <div
               class="dropdown-button"
               v-if="category.children.length != 0"
               @click="showSubCategories"
            >
               <BaseIcon
                  height="20"
                  width="20"
                  :class="{
                     'dropdown-reverse':
                        category.children.length != 0 && show_sub_categories,
                     dropdown: !show_sub_categories
                  }"
               >
                  <IconChervonCircleDown /> </BaseIcon
            ></div>
         </div>
      </div>

      <transition name="height-expansion" mode="out-in">
         <div
            class="children"
            :style="{ height: children_height + 'px' }"
            v-if="show_sub_categories && category.children.length != 0"
         >
            <div
               class="child-category"
               v-for="(child, index) in category.children"
               :key="index"
            >
               <div class="title">
                  <input
                     type="checkbox"
                     @input="addToDelete(index, $event.target.checked)"
                     :checked="parent_checked"
                     :disabled="parent_checked"
                  />
                  {{ child.name }}
               </div>
            </div>
         </div>
      </transition>
   </div>
</template>

<script>
import IconChervonCircleDown from '@/assets/icons/IconChevronCircleDown'

export default {
   components: {
      IconChervonCircleDown
   },
   props: {
      category: Object
   },
   data () {
      return {
         parent_checked: false,
         show_sub_categories: true,
         children_height: parseInt(this.category.children.length) * 45,
         to_delete: []
      }
   },
   methods: {
      addToDelete (index, checked) {
         var cat_id = this.category.id
         if (index === -1) {
            this.to_delete = []
         } else {
            cat_id = this.category.children[index].id
         }

         if (checked) {
            this.to_delete.push(cat_id)
         } else {
            this.to_delete.splice(this.to_delete.indexOf(cat_id), 1)
         }

         this.$emit('input', this.to_delete)
      },
      showSubCategories () {
         this.show_sub_categories = !this.show_sub_categories
      }
   }
}
</script>

<style lang="sass" scoped>
.category-name
   position: relative
   display: flex
   justify-content: space-between
   padding: 12px 16px
   font-size: 16px
   background: white
   font-weight: 600
   border-bottom: 1px solid #ccc

   .color-indicator
      position: absolute
      top: 0
      left: 0
      content: ' '
      width: 10px
      height: 100%

   .dropdown-button
      cursor: pointer

.children
   overflow: hidden
   text-align: left
   border-bottom: 1px solid #ccc

   .child-category
      border-bottom: 1px solid #eee
      padding: 10px 36px

      &:last-child
         border: 0


.dropdown-reverse
   transform: rotate(-180deg)
   transition: .4s linear all
.dropdown
   transition: .4s linear all
</style>
