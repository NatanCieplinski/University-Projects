import apiClient from '@/api/apiClient.js'

export default {
   getUserInfo(user_id) {
      const url = '/users/'+user_id
      return apiClient.get(url)
   }
}
