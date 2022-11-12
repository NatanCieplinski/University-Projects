// import dayjs from 'dayjs'

export default {
   namespaced: true,
   state: {
      income_expense: {
         by_day: [],
         by_month: [],
         by_week: [],
         by_year: []
      },
      expense_by_category: {
         last_week: [],
         by_month: [],
         last_month: [],
         last_year: []
      },
      income_by_category: {
         last_week: [],
         by_month: [],
         last_month: [],
         last_year: []
      },
      networth: {},
      cashflow: {}
   },
   getters: {},
   mutations: {
      SET_NETWORTH (state, report) {
         state.networth = report
      },
      SET_CASHFLOW (state, report) {
         state.cashflow = report
      },
      SET_INCOME_EXPENSE_BY_MONTH (state, report) {
         state.income_expense.by_month = report
      },
      SET_EXPENSE_BY_CATEGORY_BY_MONTH (state, report) {
         state.expense_by_category.by_month = report
      },
      SET_INCOME_BY_CATEGORY_BY_MONTH (state, report) {
         state.income_by_category.by_month = report
      },
      SET_EXPENSE_BY_CATEGORY_LAST_YEAR (state, report) {
         state.expense_by_category.last_year = report
      },
      SET_INCOME_BY_CATEGORY_LAST_YEAR (state, report) {
         state.income_by_category.last_year = report
      }
   },
   actions: {
      generateAdvanceReports ({ commit, rootGetters }, period) {
         var pastdate = period.start

         var data = {
            dates: [pastdate.format('DD/MM/YYYY')],
            networth: [0],
            incomes: [0],
            expenses: [0],
            cashflow: [0]
         }
         var transactions = rootGetters['transactions/transactions_list']
         var accounts = rootGetters['accounts/account_list']

         accounts.forEach(account => {
            data.networth[0] += account.initial_balance
         })

         transactions.forEach(transaction => {
            if (
               transaction.date.format('YYYYMMDD') <=
               pastdate.format('YYYYMMDD')
            ) {
               data.networth[0] =
                  Math.floor((data.networth[0] + transaction.amount) * 100) /
                  100
            }
         })

         pastdate = pastdate.add(period.len, 'day')

         var pastweek = 0
         for (
            var i = period.len;
            pastdate.format('YYYYMMDD') < period.end.format('YYYYMMDD');
            i++
         ) {
            var week = Math.floor(i / period.len)

            data.dates[week] = pastdate.format('DD/MM/YYYY')
            if (week != pastweek) {
               data.networth[week] = data.networth[week - 1]
               data.incomes[week] = data.incomes[week - 1]
               data.expenses[week] = data.expenses[week - 1]
               data.cashflow[week] = 0
               pastweek = week
            }

            transactions.forEach(transaction => {
               if (
                  transaction.date.format('YYYYMMDD') ===
                  pastdate.format('YYYYMMDD')
               ) {
                  data.networth[week] =
                     Math.floor(
                        (data.networth[week] + transaction.amount) * 100
                     ) / 100
                  data.cashflow[week] =
                     Math.floor(
                        (data.cashflow[week] + transaction.amount) * 100
                     ) / 100
               }
            })

            pastdate = pastdate.add(1, 'day')
         }

         commit('SET_CASHFLOW', {
            dates: data.dates,
            values: data.cashflow
         })
         commit('SET_NETWORTH', {
            dates: data.dates,
            values: data.networth,
            incomes: data.incomes,
            expenses: data.expenses
         })
      },

      generateReportByMonth ({ commit, rootGetters }) {
         var data = []
         var max_value = -1
         var transactions = rootGetters['transactions/transactions_list']

         transactions.forEach(transaction => {
            var year = transaction.date.locale('it').format('YYYY')
            var year_data = data.find(year_data => year_data.label === year)
            var found = true
            if (!year_data) {
               year_data = {
                  label: year,
                  data: []
               }
               found = false
            }
            if (!found) {
               data.push(year_data)
            }

            var month = transaction.date.locale('it').format('MMM')
            var month_num = transaction.date.locale('it').format('M')
            var month_data = year_data.data.find(
               year_data => year_data.label === month
            )
            found = true
            if (!month_data) {
               month_data = {
                  label: month,
                  month_num: month_num,
                  data: [0, 0]
               }
               found = false
            }
            if (transaction.amount < 0) {
               month_data.data[1] += transaction.amount * -1
            } else {
               month_data.data[0] += transaction.amount
            }

            max_value = Math.max(max_value, ...month_data.data)

            if (!found) {
               year_data.data.push(month_data)
            }
         })

         data.sort(function (a, b) {
            if (a.label < b.label) return 1
            if (a.label > b.label) return -1
            return 0
         })

         data.forEach(year_data => {
            year_data.data.sort(function (a, b) {
               return b.month_num - a.month_num
            })
         })

         const params = {
            report: data,
            max_value: max_value
         }

         commit('SET_INCOME_EXPENSE_BY_MONTH', params)
      },

      generateIncomeOrExpenseReportByMonth ({ commit, rootGetters }, isIncome) {
         const transactions_list = rootGetters['transactions/transactions_list']
         const category_name_by_id =
            rootGetters['categories/category_name_by_id']

         let data = []

         transactions_list.forEach(transaction => {
            var year = transaction.date.locale('it').format('YYYY')
            var year_data = data.find(year_data => year_data.label === year)
            var found = true
            if (!year_data) {
               year_data = {
                  label: year,
                  data: []
               }
               found = false
            }
            if (!found) {
               data.push(year_data)
            }

            var month = transaction.date.locale('it').format('MMM')
            var month_data = year_data.data.find(
               month_data => month_data.label === month
            )

            found = true
            if (!month_data) {
               month_data = {
                  label: month,
                  data: []
               }
               found = false
            }

            transaction.items.forEach(item => {
               if (
                  (isIncome && item.amount > 0) ||
                  (!isIncome && item.amount < 0)
               ) {
                  const category_name = category_name_by_id(item.category_id)
                  var category_data = month_data.data.find(
                     report => report.name == category_name.name
                  )

                  if (category_data != undefined) {
                     category_data.value += Math.abs(item.amount)
                  } else {
                     const new_report = {
                        value: Math.abs(item.amount),
                        name: category_name.name
                     }
                     month_data.data.push(new_report)
                  }
               }
            })

            if (!found) {
               year_data.data.push(month_data)
            }
         })

         if (isIncome) {
            commit('SET_INCOME_BY_CATEGORY_BY_MONTH', data)
         } else {
            commit('SET_EXPENSE_BY_CATEGORY_BY_MONTH', data)
         }
      },

      generateExpenseReportByCategory ({ commit, rootGetters }) {
         const transactions_list = rootGetters['transactions/transactions_list']
         const category_name_by_id =
            rootGetters['categories/category_name_by_id']
         let expense_report = []
         transactions_list.forEach(transaction => {
            transaction.items.forEach(item => {
               if (item.amount <= 0) {
                  const category_name = category_name_by_id(item.category_id)
                  const category_is_in_report = expense_report.find(
                     report => report.name == category_name.name
                  )
                  if (category_is_in_report != undefined) {
                     category_is_in_report.value += Math.abs(item.amount)
                  } else {
                     const new_report = {
                        value: Math.abs(item.amount),
                        name: category_name.name
                     }
                     expense_report.push(new_report)
                  }
               }
            })
         })
         commit('SET_EXPENSE_BY_CATEGORY_LAST_YEAR', expense_report)
      },
      generateIncomeReportByCategory ({ commit, rootGetters }) {
         const transactions_list = rootGetters['transactions/transactions_list']
         const category_name_by_id =
            rootGetters['categories/category_name_by_id']
         let income_report = []
         transactions_list.forEach(transaction => {
            transaction.items.forEach(item => {
               if (item.amount >= 0) {
                  const category_name = category_name_by_id(item.category_id)
                  const category_is_in_report = income_report.find(
                     report => report.name == category_name.name
                  )
                  if (category_is_in_report != undefined) {
                     category_is_in_report.value += Math.abs(item.amount)
                  } else {
                     const new_report = {
                        value: Math.abs(item.amount),
                        name: category_name.name
                     }
                     income_report.push(new_report)
                  }
               }
            })
         })
         commit('SET_INCOME_BY_CATEGORY_LAST_YEAR', income_report)
      }
   }
}
