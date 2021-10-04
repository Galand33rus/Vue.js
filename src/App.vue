<template>
  <div id="app">
    <h2>My personal costs</h2>
    <p>Total price of all categories: {{ totalPrice }}</p>
    <button class="new-cost" @click="showForm=!showForm">add new cost <span v-if="!showForm">&#8595;</span><span v-if="showForm">&#8593;</span></button>
    <CostsAdd v-if="showForm" @addCostsItem="addCostsItem" :selectList="categoryList" />
    <CostsList show-items :items="paymentsList" :pageNumber="currentElements"/>
    <Pagination :current="page" :quantity="quantity" :length="PaymentsListLength" @paginate="changePage"/>
  </div>

</template>

<script>
import CostsList from './components/CostsList.vue'
import CostsAdd from './components/CostsAdd.vue'
import Pagination from '@/components/Pagination.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Pagination,
    CostsList,
    CostsAdd
  },
  data () {
    return {
      showForm: false,
      page: 1,
      quantity: 3,
      count: 1
    }
  },
  methods: {
    ...mapMutations([
      'setPaymentsListData',
      'addDataToPaymentsList',
      'setCurrentList'
    ]),
    ...mapActions([
      'fetchData',
      'loadCategories'
    ]),
    addCostsItem (data) {
      this.addDataToPaymentsList(data)
    },
    changePage (p) {
      this.page = p
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentsList',
      'getFullPaymentValue',
      'getCategoryList',
      'getPage',
      'getPaymentsListLength'
    ]),
    paymentsList () {
      return this.getPage(this.page)
    },
    PaymentsListLength () {
      return this.getPaymentsListLength
    },
    totalPrice () {
      return this.getFullPaymentValue
    },
    categoryList () {
      return this.getCategoryList
    },
    currentElements () {
      return this.page
    }
  },
  created () {
    this.fetchData()
    this.loadCategories()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
  margin-left: 15px;
}
.new-cost {
  width: 136px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  padding: 5px 10px;
  color: #fff;
  background-color: #0D98BA;
  border: none;
}
</style>
