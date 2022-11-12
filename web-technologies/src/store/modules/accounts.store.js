import AccountsApi from '@/api/modules/accounts.api.js'

export default {
   namespaced: true,
   state: {
      /*
         List of account in the form of:
         account: {
            account_type: String
            account_id: Number
            amount: Number 
            initial_balance: Number
            name: String
            parent_id: Number
         }
      */
      accounts: []
   },
   mutations: {
      SET_ACCOUNTS (state, accounts) {
         state.accounts = accounts
      }
   },
   actions: {
      async getAccounts ({ commit, dispatch, getters, rootState }) {
         const payload = {
            user_id: rootState.user_id
         }
         await AccountsApi.getAccounts(payload).then(response => {
            commit('SET_ACCOUNTS', response.data.accounts)
            if (rootState.transactions.transactions_tree.length == 0) {
               dispatch('transactions/setAccounts', getters.accounts_ids, {
                  root: true
               })
            }
         })
         // .catch(error => {
         //    console.log(
         //       'There was a problem fetching your accounts: ' + error.message
         //    )
         // })
      },
      async newAccount ({ dispatch, rootState }, account) {
         const payload = {
            name: account.name,
            account_type_id: 1,
            initial_balance: account.initial_balance,
            user_id: rootState.user_id
         }
         await AccountsApi.createAccount(payload).then(() => {
            dispatch('getAccounts')
         })
         // .catch(error => {
         //    console.log('There was a problem creating your account: ', error)
         // })
      }
   },
   getters: {
      //Ritorna un array di con gli id degli account
      accounts_ids (state) {
         return state.accounts.map(account => account.id)
      },
      accounts_is_empty (state) {
         return state.accounts.length == 0
      },
      account_list (state) {
         return state.accounts
      }
   }
}
