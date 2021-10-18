<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>My personal costs</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="6">
        <v-dialog v-model="dialog" width="500" persistent>
          <template v-slot:activator="{ on }">
            <v-btn color="orange darken-1" dark v-on="on">
              Add new cost <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <CostsAdd :selectList="categoryList" @closeAdd="closeWindow" @addCostsItem="addCostsItem"/>
          </v-card>
        </v-dialog>
        <CostsList :items="currentElements" :category="categoryList"/>
        <v-pagination
          v-model="page"
          :length="paginationLength"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          color="orange darken-1"
          class="mt-5">
        </v-pagination>
      </v-col>
      <v-col :cols="2"></v-col>
      <v-col :cols="4">
        <Chart :options="options" :chartData="chartData"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import CostsAdd from '@/components/CostsAdd'
import CostsList from '@/components/CostsList'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Chart from '@/components/Chart'

export default {
  name: 'PersonalCosts',
  components: {
    Chart,
    CostsList,
    CostsAdd
  },
  data () {
    return {
      page: 1,
      quantity: 5,
      category: '',
      value: '',
      dialog: false,
      options: {
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Costs by categories',
          fontSize: 20
        }
      }
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
    ]),
    addCostsItem (data) {
      this.addDataToPaymentsList(data)
    },
    closeWindow () {
      this.dialog = false
    }
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
      return this.getPaymentsList.length
    },
    totalPrice () {
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
      return this.getChart
    },
    paginationLength () {
      return Math.ceil(this.length / this.quantity)
    },
    chartData () {
      return {
        labels: this.categoryList,
        datasets: [{
          label: '# of costs',
          data: this.chartValue,
          backgroundColor: [
            '#F44336',
            '#2196F3',
            '#FFEB3B',
            '#4CAF50',
            '#FF5722',
            '#9C27B0'
          ],
          borderWidth: 3
        }]
      }
    }
  },
  created () {
    this.fetchData()
    this.loadCategories()
  }
}
</script>

<style scoped>
</style>
