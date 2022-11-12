import Vue from 'vue'
import Vuex from 'vuex'
import AuthApi from '@/api/modules/auth.api.js'
import TokenValidator from '@/api/modules/tokenValidator.api.js'
import UserApi from '@/api/modules/user.api.js'

//import the auto importer
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
   modules: modules, // all your modules automatically imported
   state: {
      access_token: '',
      user_id: null,
      user: null
   },
   mutations: {
      SET_TOKEN(state, token) {
         state.access_token = token
         localStorage.setItem('access_token', token)
      },
      CLEAR_LOCAL_STORAGE() {
         localStorage.clear()
         location.reload()
      },
      GET_TOKEN(state) {
         state.access_token = localStorage.getItem('access_token')
      },
      GET_USER_ID(state) {
         state.user_id = parseInt(localStorage.getItem('user_id'))
      },
      SET_USER_ID(state, user_id) {
         state.user_id = user_id
         localStorage.setItem('user_id', user_id)
      },
      SET_USER(state, user) {
         state.user = user
      }
   },
   actions: {
      async register({ commit }, credentials) {
         await AuthApi.register(credentials)
            .then(response => {
               commit('SET_TOKEN', response.data.access_token)
               commit('SET_USER_ID', response.data.user.id),
                  commit('SET_USER', response.data.user)
            })
            // .catch(error => {
            //    console.log(error)
            // })
      },
      async login({ commit }, credentials) {
         await AuthApi.login(credentials)
            .then(response => {
               commit('SET_TOKEN', response.data.access_token)
               commit('SET_USER_ID', response.data.user.id)
               commit('SET_USER', response.data.user)
            })
            // .catch(error => {
            //    console.log(error)
            // })
      },
      async logout({ commit }) {
         await AuthApi.logout()
            .then(() => {
               commit('CLEAR_LOCAL_STORAGE')
            })
            // .catch(error => {
            //    console.log(error)
            // })
      },
      getDataFromLocalStorage({ commit }) {
         commit('GET_TOKEN')
         commit('GET_USER_ID')
      },
      async checkTokenValidity() {
         await TokenValidator.checkTokenValidity()
            .then(response => {
               if (response.status == 204) {
                  return true
               }
            })
            .catch(() => {
               localStorage.removeItem('access_token')
               return false
            })
      },
      async getUserInfo({ commit, state }) {
         const user_id = state.user_id
         await UserApi.getUserInfo(user_id)
            .then(response => {
               commit('SET_USER', response.data)
            })
            // .catch(error => {
            //    console.log(
            //       'There was a problem getting you user info: ' + error
            //    )
            // })
      }
   },
   getters: {
      logged_in(state) {
         return !!state.access_token
      }
   }
})
