import apiClient from '@/api/apiClient'

export default {
   getAccounts(payload) {
      // console.log('Getting accounts...', payload)
      return apiClient.post('/accounts', payload)
   },
   createAccount(payload) {
      // console.log('Creating transaction...', payload)
      return apiClient.post('/accounts/new', payload)
   }
}
