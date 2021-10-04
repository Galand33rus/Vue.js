import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
    currentList: []
  },
  mutations: {
    setPaymentsListData (state, payload) {
      state.paymentsList = payload
    },
    addDataToPaymentsList (state, payload) {
      Object.values(state.paymentsList).map(page => {
        return page.map(el => {
          el.id += 1
        })
      })
      state.currentList.unshift(payload)
    },
    setCategoriesList (state, payload) {
      state.categoryList = payload
    }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getFullPaymentValue: state => {
      return Object.values(state.paymentsList).map(page => {
        return page.reduce((res, cur) => res + cur.value, 0)
      }).reduce((res, cur) => res + cur)
    },
    getCategoryList: state => state.categoryList,
    getPaymentsListLength: state => {
      return Object.keys(state.paymentsList).length
    },
    getPage: state => (n) => {
      state.currentList = state.paymentsList['page' + n]
      return state.currentList
    },
    getId: state => {
      return state.currentList.find(item => item).id
    }
  },
  actions: {
    fetchData ({ commit }) {
      return commit('setPaymentsListData',
        {
          page1: [
            {
              id: 1,
              date: '20.03.2020',
              category: 'Food',
              value: 169
            },
            {
              id: 2,
              date: '24.03.2020',
              category: 'Transport',
              value: 360
            },
            {
              id: 3,
              date: '24.03.2020',
              category: 'Food',
              value: 532
            }
          ],
          page2: [
            {
              id: 4,
              date: '21.03.2020',
              category: 'Housing',
              value: 273
            },
            {
              id: 5,
              date: '21.03.2020',
              category: 'Healthcare',
              value: 545
            },
            {
              id: 6,
              date: '16.03.2020',
              category: 'Housing',
              value: 502
            }
          ],
          page3: [
            {
              id: 7,
              date: '14.03.2020',
              category: 'Clothing',
              value: 692
            },
            {
              id: 8,
              date: '02.03.2020',
              category: 'Food',
              value: 143
            },
            {
              id: 9,
              date: '01.03.2020',
              category: 'Housing',
              value: 339
            }
          ]
        })
    },
    loadCategories ({ commit }) {
      return commit('setCategoriesList', ['Food', 'Transport', 'Housing', 'Clothing', 'Healthcare', 'Other'])
    }
  }
})
