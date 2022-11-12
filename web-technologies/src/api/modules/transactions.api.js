import apiClient from '@/api/apiClient.js'

export default {
   getTransactionsByAccount(account_id, payload) {
      console.log('Getting transactions...', payload)
      const base_url = '/transactions/account/' + account_id
      return apiClient.post(base_url, payload)
   },
   createTransaction(payload) {
      console.log('Creating transaction...', payload)
      return apiClient.post('/transactions/new', payload)
   },
   deleteTransaction(transaction_id, payload) {
      console.log('Deleting transaction...', payload)
      const base_url = '/transactions/' + transaction_id
      return apiClient.delete(base_url, { data: payload })
   },
   updateTransaction(transaction_id, payload) {
      console.log('Updating transaction..', payload)
      const base_url = '/transactions/' + transaction_id + '/update'
      return apiClient.post(base_url, payload)
   }
}
