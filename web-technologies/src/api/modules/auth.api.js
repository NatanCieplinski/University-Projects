import apiClient from '@/api/apiClient'

export default {
   register(payload) {
      // console.log('Registering...', payload)
      return apiClient.post('/users/register', payload)
   },
   login(payload) {
      // console.log('Logging in...', payload)
      return apiClient.post('/users/login', payload)
   },
   logout(){
      // console.log('Logging out...')
      return apiClient.get('/users/logout')
   }
}
