import apiClient from '@/api/apiClient'

apiClient.interceptors.request.use(
   config => {
      const token = localStorage.getItem('access_token')
      if (token) {
         config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
   },
   error => {
      return Promise.reject(error)
   }
)

export default {
   checkTokenValidity() {
      // console.log('Validating token...')
      return apiClient.get('/users/token')
   }
}
