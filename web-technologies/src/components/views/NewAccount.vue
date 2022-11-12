<template>
   <div class="new-transaction">
      <ModalHeader back_to="accounts" style="border-radius: 16px 16px 0 0">
         Nuovo Account
      </ModalHeader>
      <div class="body">
         <div class="form">
            <BaseInput
               class="name"
               placeholder="Nome Account"
               v-model="account.name"
            />
            <BaseInput
               class="balance"
               placeholder="Bilancio Iniziale"
               v-model="account.initial_balance"
            />
            <BaseSelect
               class="type"
               placeholder="Tipo"
               :options="account_types"
            />
         </div>
         <div class="confirmation-buttons">
            <BaseButton class="button" button_class="cancel"
               ><router-link :to="{ name: 'accounts' }"
                  >Annulla</router-link
               ></BaseButton
            >
            <BaseButton class="button" button_class="tertiary" @click="submit"
               >Conferma</BaseButton
            >
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex'
import ModalHeader from '@/components/ModalHeader.vue'
export default {
   components: {
      ModalHeader
   },
   data () {
      return {
         account_types: [
            {
               name: 'Contanti',
               id: 1
            },
            {
               name: 'Credito',
               id: 2
            }
         ],
         account: {
            name: '',
            initial_balance: null
         }
      }
   },
   methods: {
      ...mapActions('accounts', ['newAccount']),
      submit () {
         this.newAccount(this.account)
         this.$router.back()
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/global.sass'

.new-transaction
   width: calc( 100% - 64px )
   height: min-content
   margin: 0 32px
   margin-top: 32px
   background: white
   -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1)
   box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1)
   -webkit-border-radius: 16px
   -moz-border-radius: 16px
   border-radius: 16px
   // overflow: hidden

   .body
      padding: 16px
      .form
         column-gap: 10px
         display: grid
         grid-template-areas: "name name" "balance type"
         grid-template-columns: auto auto
         grid-template-rows: auto auto
         margin: 10px 10px 10px 10px
         row-gap: 10px
         .name
            grid-area: name
         .balance
            grid-area: balance
         .type
            grid-area: type
      .confirmation-buttons
         align-items: center
         display: flex
         justify-content: flex-end
         .button
            margin: 0px 10px 0px 0px
</style>
