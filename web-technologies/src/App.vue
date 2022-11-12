<template>
   <div id="app">
      <router-view :key="$route.fullPath" />
   </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
   name: 'app',
   methods: {
      ...mapActions([
         'getDataFromLocalStorage',
         'checkTokenValidity',
         'getUserInfo'
      ]),
      ...mapActions('accounts', ['getAccounts']),
      ...mapActions('categories', ['getCategories']),
      ...mapActions('transactions', ['getTransactionsByAccount']),
      async initialDataFetch() {
         this.accounts.forEach(async account => {
            await this.getTransactionsByAccount(account.id)
         })
      }
   },
   watch: {
      async transactions_tree() {
         await this.initialDataFetch()
      },
      logged_in(newVal) {
         if (newVal) {
            this.getCategories()
            this.getAccounts()
         }
      }
   },
   computed: {
      ...mapGetters(['logged_in']),
      ...mapState('transactions', ['transactions_tree']),
      ...mapState('accounts', ['accounts'])
   },
   async created() {
      if (localStorage.getItem('access_token') != null) {
         if (this.checkTokenValidity()) {
            this.getDataFromLocalStorage()
            this.getUserInfo()
            if (this.logged_in) {
               this.getCategories()
               this.getAccounts()
            }
         }
      }
   }
}
</script>

<style lang="sass">
@import '/assets/global.sass'
</style>
