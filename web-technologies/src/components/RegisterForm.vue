<template>
   <div class="card">
      <div class="header">
         Registrati
      </div>
      <div class="body">
         <form @submit.prevent="signUp">
            <BaseInputWithIcon
               placeholder="Name"
               v-model="credentials.name"
               icon="user-circle"
            ></BaseInputWithIcon>
            <BaseInputWithIcon
               type="text"
               placeholder="Email"
               v-model="credentials.email"
               icon="envelope"
            ></BaseInputWithIcon>
            <BaseInputWithIcon
               type="password"
               placeholder="Password"
               v-model="credentials.password"
               icon="lock"
            ></BaseInputWithIcon>
            <BaseButton button_class="secondary" type="submit">
               Registrati
            </BaseButton>
         </form>
         <div>
            Hai già un account?
            <router-link :to="{ name: 'login' }">Accedi</router-link>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   data() {
      return {
         credentials: {
            name: '',
            email: '',
            password: ''
         }
      }
   },
   methods: {
      ...mapActions(['register']),
      signUp() {
         this.register(this.credentials).then(() => {
            this.$router.push({ name: 'dashboard' })
         })
         // .catch(error => {
         //    console.log(error)
         // })
      }
   }
}
</script>

<style lang="sass" scoped>
@import '../assets/global.sass'
.card
    border-radius: 20px
    border: none
    height: 440px
    margin: 0px auto
    width: 440px
    .header
        background-color: map-get($colors, 'primary')
        border-radius: 20px 20px 0px 0px
        color: white
        font-size: 24px
        font-weight: 500
        height: 2.5em
        line-height: 2.5em
    span
        height: 100%
        vertical-align: middle
    .body
        display: flex
        flex-direction: column
        height: 100%
        justify-content: center
        padding: 48px 40px 40px 40px
</style>
