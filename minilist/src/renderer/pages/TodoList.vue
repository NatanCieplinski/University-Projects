<template>
   <div class="todo-list">
      <div class="title">
         Your to-dos
      </div>
      <div class="todo">
         <Todo v-for="todo in todos_to_complete" :key="todo.id" :todo="todo" />
      </div>
      <div class="done">
         <span class="title">
            Completed
         </span>
         <Todo v-for="todo in completed_todos" :key="todo.id" :todo="todo" />
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Todo from '@/components/Todo.vue'

export default {
   components: {
      Todo
   },
   computed: {
      ...mapGetters('todo', ['completed_todos', 'todos_to_complete'])
   }
}
</script>

<style lang="sass" scoped>
.todo-list
   >.title
      font-weight: 800
      font-size: 28px
   >.done
      display: flex
      flex-direction: column
      opacity: 0.5
      >.title
         font-size: 20px
         margin: 16px 0px 0px 0px
</style>
