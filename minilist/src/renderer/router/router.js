import Vue from "vue";
import Router from "vue-router";
import TodoList from "@/pages/TodoList.vue";

Vue.use(Router);

export default new Router({
   routes: [
      {
         path: "/",
         name: "home",
         component: TodoList,
      },
   ],
});
