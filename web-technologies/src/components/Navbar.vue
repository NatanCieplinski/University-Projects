<template>
   <nav>
      <div class="hamburger" @click="toggleNavbar">
         <font-awesome-icon :icon="icon" />
      </div>
      <div class="desktop-navbar" ref="desktop-navbar">
         <div class="left-navbar">
            <div id="logo">
               <img src="/logo.png" />
            </div>
            <ul class="nav-links">
               <li>
                  <router-link :to="{ name: 'dashboard' }"
                     >Dashboard</router-link
                  >
               </li>
               <li>
                  <router-link :to="{ name: 'accounts' }">Conti</router-link>
               </li>
               <li>
                  <router-link :to="{ name: 'budget' }">
                     Budget
                  </router-link>
               </li>
               <li>
                  <router-link :to="{ name: 'reports' }">
                     Reports
                  </router-link>
               </li>
               <li>
                  <router-link :to="{ name: 'categories' }">
                     Categorie
                  </router-link>
               </li>
            </ul>
         </div>
         <div id="logout" @click="logout">
            <BaseIcon width="24" height="24" color="#44D7B6">
               <IconLogout />
            </BaseIcon>
         </div>
      </div>
   </nav>
</template>

<script>
import IconLogout from '@/assets/icons/IconLogout'
import { mapActions } from 'vuex'

export default {
   components: {
      IconLogout
   },
   data () {
      return {
         icon: 'bars'
      }
   },
   methods: {
      ...mapActions(['logout']),
      toggleNavbar () {
         const nav = this.$refs['desktop-navbar'].classList
         if (nav.contains('open')) {
            //chiusura
            clearTimeout()
            nav.remove('open')
            this.icon = 'bars'
            setTimeout(() => {
               nav.add('closed') //add the display: none to remove the expanded navbar
            }, 400)
         } else {
            //apertura
            clearTimeout()
            this.icon = 'times'
            nav.remove('closed')
            setTimeout(() => {
               nav.add('open')
            }, 100)
         }
      }
   }
}
</script>

<style lang="sass" scoped>
@import '../assets/global.sass'
#logo
   height: 45px
   align-self: center
   margin-right: 16px

   img
      max-height: 100%
      max-width: 100%

#logout
   cursor: pointer
   align-self: center

.left-navbar
   display: flex

nav
   position: relative
   z-index: 999
   background: map-get($colors, 'navbar')
   box-sizing: border-box
   color: white
   font-size: $header-font-size
   font-weight: 700
   height: $navbar-height
   list-style: none
   padding: 0px 0px
   text-decoration: none

   .hamburger
      display: none

   .desktop-navbar
      display: flex
      height: 100%
      justify-content: space-between
      padding: 0px 32px
      color: inherit

      .nav-links
         color: inherit
         align-items: center
         display: flex
         height: 100%
         justify-content: flex-start
         list-style: none
         margin: 0px
         padding: 0px 0px
         text-decoration: none
         li
            padding: 0px 16px

@media (max-width: 600px)
   nav
      .hamburger
         align-items: center
         cursor: pointer
         display: flex
         height: 100%
         justify-content: flex-end
         padding: 0px 24px
      .desktop-navbar
         background: inherit
         display: flex
         flex-direction: column
         height: 0px
         transition: height 0.4s linear
         //mantain the structure of the navigation element
         .nav-links
            flex-direction: column
            li
               padding: 32px 0px
         .settings
            flex-direction: column
            padding: 32px 0px
      .closed
         //remove navigation elements from the DOM after the animation
         display: none
      .open
         background: map-get($colors, 'navbar')
         display: flex
         flex-direction: column
         height: calc(100vh - #{$navbar-height})
         transition: height 0.4s linear
         .nav-links
            flex-direction: column
            li
               padding: 32px 0px
         .settings
            flex-direction: column
            padding: 32px 0px
</style>
