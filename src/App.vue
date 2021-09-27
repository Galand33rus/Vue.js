<template>
  <div id="app">
    <h2>My personal costs</h2>
    <button class="new-cost" @click="showForm=!showForm">add new cost <span v-if="!showForm">&#8595;</span><span v-if="showForm">&#8593;</span></button>
    <CostsAdd v-if="showForm" @addCostsItem="addCostsItem"/>
    <CostsList :items="paymentsList"/>
  </div>
</template>

<script>
import CostsList from './components/CostsList.vue'
import CostsAdd from './components/CostsAdd.vue'

export default {
  name: 'App',
  components: {
    CostsList,
    CostsAdd
  },
  data () {
    return {
      paymentsList: [],
      showForm: false
    }
  },
  methods: {
    fetchData () {
      return [
        {
          id: 1,
          date: '28.03.2020',
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
        },
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
        },
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
    },
    addCostsItem (data) {
      this.paymentsList.map(i => { i.id += 1 })
      this.paymentsList = [data, ...this.paymentsList]
    }
  },
  created () {
    this.paymentsList = this.fetchData()
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
