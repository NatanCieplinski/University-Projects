import { v4 as uuidv4 } from 'uuid'

export default {
   namespaced: true,
   state: {
      todos: [
         {
            id: '366d8fc0-62eb-4ff1-bc26-ee632d7785fd',
            completed: false,
            title: 'Fare la spesa',
            description:
               'Fare la spesa per la festa che voglio dare a casa mia',
            important: false
         },
         {
            id: '8c6a471e-52df-4ed2-b02e-d26bc712d653',
            completed: false,
            title: 'Pulire casa',
            description:
               'Pulire casa per gli ospiti che devono venire a trovarmi',
            important: true
         },
         {
            id: '16354322-9b75-40a0-a388-7bc32ab7041c',
            completed: false,
            title: 'Formattare il pc',
            description:
               'Pulire casa per gli ospiti che devono venire a trovarmi',
            important: false
         },
         {
            id: '88898905-8117-4cfe-8eac-41e45cd6ed7a',
            completed: false,
            title: 'Studiare il secondo capitolo di reti',
            description:
               'Pulire casa per gli ospiti che devono venire a trovarmi',
            important: false
         },
         {
            id: 'a911cab7-b8c2-480e-8ab1-00fd13c93097',
            completed: false,
            title: 'Ritirare il pacco amazon alle poste',
            description:
               'Pulire casa per gli ospiti che devono venire a trovarmi',
            important: true
         }
      ]
   },
   mutations: {},
   actions: {
      newTodo() {
         const id = uuidv4()
      }
   },
   getters: {
      completed_todos(state) {
         return state.todos.filter(todo => todo.completed)
      },
      todos_to_complete(state) {
         return state.todos.filter(todo => !todo.completed)
      }
   }
}
