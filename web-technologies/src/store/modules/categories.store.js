import CategoriesApi from '@/api/modules/categories.api.js'

function fillParentCategoryWithChildren (category_tree, categories) {
   //per ogni categoria padre crea un campo children vuoto
   category_tree.forEach(item => (item['children'] = []))
   categories.forEach(item => {
      if (item.parent_id != null) {
         const parent_category = category_tree.find(
            //cerca la categoria padre che ha come id il parent_id della figlia
            parent => parent.id == item.parent_id
         )
         //se non trova alcun elemento padre non aggiunge nulla ai figli
         if (parent_category) {
            parent_category.children.push(item)
         }
      }
   })
   return category_tree
}

export default {
   namespaced: true,
   state: {
      categories: [] //category without tree structure. To use in case of form selection
   },
   mutations: {
      SET_CATEGORY_TREE (state, category_tree) {
         state.category_tree = category_tree
      },
      SET_CATEGORIES (state, categories) {
         state.categories = categories
      }
   },
   actions: {
      async getCategories ({ commit, rootState }) {
         const payload = {
            user_id: rootState.user_id
         }
         await CategoriesApi.getCategories(payload).then(response => {
            commit('SET_CATEGORIES', response.data.categories)
         })
      },

      async deleteCategory ({ rootState }, category_id) {
         const payload = {
            id: category_id,
            user_id: rootState.user_id
         }

         await CategoriesApi.deleteCategory(payload)
         window.location.reload()
      },

      async newCategory ({ dispatch, rootState }, category) {
         const payload = {
            user_id: rootState.user_id,
            budget: 0,
            is_expense: category.is_expense,
            name: category.name
         }
         if (category.parent_id != null) {
            payload['parent_id'] = category.parent_id
         }
         await CategoriesApi.createCategory(payload)
         await dispatch('getCategories')
         window.location.reload()
      },

      async updateBudget ({ dispatch, getters, rootState }, budget) {
         var cat = getters.expense_categories.find(cat => cat.id === budget.id)
         var payload = {
            id: budget.id,
            name: cat.name,
            budget: 0,
            budget_start: null,
            is_expense: 1,
            user_id: rootState.user_id
         }

         if (budget.budget > 0) {
            payload.budget = parseFloat(budget.budget)
            payload.budget_start = '1996-07-17 17:17:17'
            payload.renewal_type_id = 3
         }

         CategoriesApi.updateCategory(payload).then(() => {
            dispatch('getCategories')
         })
      }
   },
   getters: {
      budgets (state) {
         return state.categories.filter(category => category.budget > 0)
      },
      expense_categories (state) {
         return state.categories.filter(category => category.is_expense == 1)
      },
      income_categories (state) {
         return state.categories.filter(category => category.is_expense == 0)
      },
      income_parent_categories (state) {
         return state.categories
            .filter(category => category.is_expense == 0)
            .filter(category => category.parent_id == null)
      },
      expense_parent_categories (state) {
         return state.categories
            .filter(category => category.is_expense == 1)
            .filter(category => category.parent_id == null)
      },
      expense_category_tree (state) {
         //riempie il category tree con categorie parent
         var category_tree = state.categories.filter(
            //Le categorie parent hanno il parent_id nullo e sono di spesa
            category => category.parent_id == null && category.is_expense == 1
         )
         return fillParentCategoryWithChildren(category_tree, state.categories)
      },
      income_category_tree (state) {
         //riempie il category tree con categorie parent
         var category_tree = state.categories.filter(
            //Le categorie parent hanno il parent_id nullo e sono di spesa
            category => category.parent_id == null && category.is_expense == 0
         )
         return fillParentCategoryWithChildren(category_tree, state.categories)
      },
      categories_is_empty (state) {
         return state.categories.length == 0
      },
      category_is_expense: state => id => {
         return (
            state.categories.find(category => category.id == id).is_expense == 1
         )
      },
      category_name_by_id: state => id => {
         return state.categories.find(category => category.id == id)
      }
   }
}
