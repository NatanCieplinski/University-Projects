<template>
   <div class="fullscreen">
      <Navbar />
      <div class="body">
         <div class="no-accounts">
            <h1>You have not an account</h1>
            <h4>
               To enter any transaction you first need to create an account
            </h4>
         </div>
         <router-link :to="{ name: 'firstAccount' }">
            <BaseButton button_class="secondary">
               Create account
            </BaseButton>
         </router-link>
         <router-view class="overlay" />
      </div>
   </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
   components: {
      Navbar
   },
   data() {
      return {
         account_to_show: null
      }
   },
   methods: {
      ...mapActions('accounts', ['getAccounts']),
      ...mapActions('categories', ['getCategories']),
      redirect() {
         if (!this.accounts_is_empty && !this.categories_is_empty) {
            this.$router.push({
               name: 'account',
               params: { account_id: this.account_to_show }
            })
         }
      }
   },
   computed: {
      ...mapState('accounts', ['accounts']),
      ...mapGetters('accounts', ['accounts_is_empty']),
      ...mapGetters('categories', ['categories_is_empty'])
   },
   created() {
      if (this.categories_is_empty) {
         this.getCategories()
      }
      if (this.accounts_is_empty) {
         this.getAccounts().then(() => {
            if (!this.accounts_is_empty) {
               this.account_to_show = this.accounts[0].id
               this.redirect()
            }
         })
      } else {
         this.account_to_show = this.accounts[0].id
         this.redirect()
      }
   },
   updated() {
      this.redirect()
   }
}
</script>

<style lang="sass" scoped>
.body
   display: flex
   flex-direction: column
   align-items: center
   justify-content: center
   position: relative
   .no-accounts
      margin: 50px
</style>
