<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>My personal costs</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="orange darken-1" dark v-on="on" @click="dialog = !dialog">
              Add new cost <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <CostsAdd :selectList="categoryList"/>
          </v-card>
        </v-dialog>
<!--        <button class="new-cost" @click="showForm=!showForm">add new cost <span v-if="!showForm">&#8595;</span><span-->
<!--          v-if="showForm">&#8593;</span></button>-->
<!--        <CostsAdd v-if="showForm" @addCostsItem="addCostsItem" :selectList="categoryList" :props-category="category"-->
<!--                  :props-value="value"/>-->
        <CostsList :items="currentElements"/>
<!--        <Pagination :current="page" :quantity="quantity" :length="getPaymentsList.length" @paginate="changePage"/>-->
        <v-pagination
          v-model="page"
          :length="Math.ceil(getPaymentsList.length/quantity)"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          color="orange darken-1"
        ></v-pagination>
      </v-col>
      <v-col>
        <canvas ref="canvas"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import CostsAdd from '@/components/CostsAdd'
import CostsList from '@/components/CostsList'
// import Pagination from '@/components/Pagination'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { Doughnut } from 'vue-chartjs'
// const { reactiveProp } = mixins

export default {
  name: 'PersonalCosts',
  extends: Doughnut,
  // mixins: [reactiveProp],
  components: {
    // Pagination,
    CostsList,
    CostsAdd
  },
  data () {
    return {
      showForm: false,
      page: 1,
      quantity: 5,
      category: '',
      value: '',
      dialog: false
    }
  },
  methods: {
    ...mapMutations([
      'setPaymentsListData',
      'addDataToPaymentsList'
    ]),
    ...mapActions([
      'fetchData',
      'loadCategories'
    ])
    // addCostsItem (data) {
    //   this.addDataToPaymentsList(data)
    // },
    // changePage (p) {
    //   this.page = p
    // }
  },
  computed: {
    ...mapGetters([
      'getPaymentsList',
      'getFullPaymentValue',
      'getCategoryList',
      'getChart'
    ]),
    paymentsList () {
      return this.getPaymentsList
    },
    length () {
      return this.getPaymentsList
    },
    totalPrice () {
      console.log(this.getFullPaymentValue)
      return this.getFullPaymentValue
    },
    categoryList () {
      return this.getCategoryList
    },
    currentElements () {
      const {
        quantity,
        page
      } = this
      return this.paymentsList.slice(quantity * (page - 1), quantity * (page - 1) + quantity)
    },
    chartValue () {
      console.log(this.getChart)
      return this.getChart
    }
  },
  created () {
    this.fetchData()
    this.loadCategories()
    // this.page = +this.$route.params.page || 1
    // this.category = this.$route.params.category
    // this.value = this.$route.query.value
    // this.showForm = this.$route.name === 'addLink'
  },
  mounted () {
    this.renderChart({
      labels: this.getCategoryList,
      datasets: [{
        label: '# of Votes',
        data: this.chartValue,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(156, 39, 176, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(0, 150, 136, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(156, 39, 176, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 150, 136, 1)'
        ],
        borderWidth: 1
      }]
    })
  }
}
</script>

<style scoped>
/*.new-cost {*/
/*  width: 136px;*/
/*  font-weight: bold;*/
/*  text-transform: uppercase;*/
/*  cursor: pointer;*/
/*  padding: 5px 10px;*/
/*  color: #fff;*/
/*  background-color: #0D98BA;*/
/*  border: none;*/
/*}*/

/*a {*/
/*  display: block;*/
/*}*/
</style>
