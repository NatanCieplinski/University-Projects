import Vue from 'vue'
import VueRouter from 'vue-router'

import Landing from '@/pages/Landing.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import NotFound from '@/pages/NotFound.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Budget from '@/pages/Budget.vue'
import Account from '@/pages/Account.vue'
import Reports from '@/pages/Reports.vue'
import SettingsCategories from '@/pages/SettingsCategories.vue'

import AccountsLoader from '@/pages/AccountsLoader.vue'

import NewTransaction from '@/components/views/NewTransaction.vue'
import NewAccount from '@/components/views/NewAccount.vue'
import EditTransaction from '@/components/views/EditTransaction.vue'

Vue.use(VueRouter)

const router = new VueRouter({
   mode: 'history',
   routes: [
      {
         path: '*',
         redirect: { name: '404' }
      },
      {
         path: '/',
         name: 'landing',
         component: Landing
      },
      {
         path: '/login',
         name: 'login',
         component: Login
      },
      {
         path: '/register',
         name: 'register',
         component: Register
      },
      {
         path: '/404',
         name: '404',
         component: NotFound
      },
      {
         path: '/categories',
         name: 'categories',
         component: SettingsCategories,
         meta: { requireAuth: true }
      },
      {
         path: '/reports',
         name: 'reports',
         component: Reports,
         meta: { requireAuth: true }
      },
      {
         path: '/budget',
         name: 'budget',
         component: Budget,
         meta: { requireAuth: true }
      },
      {
         path: '/dashboard',
         name: 'dashboard',
         component: Dashboard,
         meta: { requireAuth: true }
      },
      {
         path: '/accounts',
         name: 'accounts',
         component: AccountsLoader,
         children: [
            {
               path: 'new',
               name: 'firstAccount',
               component: NewAccount
            }
         ]
      },
      {
         path: '/accounts/:account_id/',
         name: 'account',
         component: Account,
         props: true,
         children: [
            {
               path: 'transaction/:transaction_id/edit',
               name: 'editTransaction',
               component: EditTransaction,
               props: route => ({
                  transaction: null,
                  ...route.params
               })
            },
            {
               path: ':id/transaction/new',
               name: 'newTransaction',
               component: NewTransaction,
               props: true
            },
            {
               path: 'new',
               name: 'newAccount',
               component: NewAccount
            }
         ],
         meta: { requireAuth: true }
      }
   ]
})

router.beforeEach((to, from, next) => {
   const logged_in = localStorage.getItem('access_token')
   if (to.matched.some(record => record.meta.requireAuth) && !logged_in) {
      next('/')
   }
   next()
})

export default router
