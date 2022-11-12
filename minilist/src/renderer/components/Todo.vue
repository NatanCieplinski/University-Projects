<template>
   <div class="todo">
      <BaseCheckbox :checked="single_todo.completed" @check="complete" />
      <span :class="{ completed: single_todo.completed }">
         {{ single_todo.title }}
      </span>
      <BaseIcon v-if="single_todo.important">
         <ExclamationIcon height="12" width="12" color="#fc6a6a" />
      </BaseIcon>
   </div>
</template>

<script>
export default {
   props: {
      todo: {
         type: Object,
         default: null
      }
   },
   computed: {
      single_todo() {
         return this.todo
      }
   },
   methods: {
      complete() {
         this.todo.completed = !this.todo.completed
      }
   }
}
</script>
<style lang="sass" scoped>
.todo
   height: 40px
   border-bottom: 1px solid #dfdfdf
   display: grid
   align-items: center
   grid-template-rows: 1fr
   grid-template-columns: 24px auto 24px
   column-gap: 8px
.completed
   text-decoration: line-through
</style>
