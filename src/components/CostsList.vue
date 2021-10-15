<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Date</th>
          <th class="text-left">Category</th>
          <th class="text-left">Value</th>
          <th class="text-left"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, idx) in items" :key="idx">
          <td>{{ item.id }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.category}}</td>
          <td>{{ item.value }}</td>
          <td>
            <v-dialog v-model="dialog" width="500" :retain-focus="false">
              <template v-slot:activator="{ on }">
                <v-icon small class="mr-2" v-on="on" @click="dialog = !dialog">mdi-pencil</v-icon>
              </template>
              <v-card>
                <CostsEdit @closeAdd="closeWindow" :item="item"/>
              </v-card>
            </v-dialog>
            <v-icon small @click="removeItem(item.id)">mdi-delete</v-icon>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

<!--      <v-col :cols="2">-->
<!--        <v-dialog v-model="dialog" width="500">-->
<!--          <template v-slot:activator="{ on }">-->
<!--            <v-icon small class="mr-2" v-on="on" @click="dialog = !dialog">mdi-pencil</v-icon>-->
<!--          </template>-->
<!--          <v-card>-->
<!--            <CostsEdit/>-->
<!--            <v-text-field v-model="newCategory" label="Category"/>&ndash;&gt;-->
<!--            <v-text-field v-model="newValue" label="Value" type="number"/>&ndash;&gt;-->
<!--            <v-btn @click="editItem(item.id)">Save</v-btn>&ndash;&gt;-->
<!--            <CostsAdd :selectList="categoryList"/>&ndash;&gt;-->
<!--          </v-card>-->
<!--        </v-dialog>-->

  </v-container>
</template>

<script>

import CostsEdit from '@/components/CostsEdit'

export default {
  name: 'CostsList',
  components: { CostsEdit },
  props: {
    items: {
      type: Array
    },
    showItems: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      newCategory: '',
      newValue: ''
    }
  },
  methods: {
    editItem (id) {
      console.log(id)
      // const data = {
      //   id: id,
      //   category: this.newCategory,
      //   value: Number(this.newValue)
      // }
      // this.$store.commit('editDataToPaymentsList', data)
      // this.newCategory = ''
      // this.newValue = ''
    },
    removeItem (id) {
      console.log(id)
      this.$store.commit('delDataToPaymentsList', id)
    },
    closeWindow () {
      this.dialog = false
    }
  },
  computed: {
    categoryList () {
      return this.$store.getters.getCategoryList
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 286px;
}

//@import url("https://fonts.googleapis.com/css2?family=Material+Icons+Outlined");

//ul {
//  width: 420px;
//  min-height: 253px;
//  list-style-type: none;
//  padding-left: 15px;
//}
//
//li {
//  margin-bottom: 15px;
//  display: flex;
//  border-bottom: 1px solid black;
//}
//
//.number, .date, .category {
//  display: block;
//  margin-right: 25px;
//}
//
//.date {
//  width: 100px;
//}
//
//.category {
//  width: 140px;
//}
//
//.value {
//  display: block;
//  width: 75px;
//}
//
//.number {
//  width: 20px;
//}
//
//.material-icons-outlined {
//  cursor: pointer;
//}
//
//.tools-open {
//  position: relative;
//  padding-bottom: 15px;
//  padding-left: 15px;
//
//  &:hover .tools {
//    display: flex;
//  }
//}
//
//.tools {
//  position: absolute;
//  bottom: -45px;
//  left: -58px;
//  display: none;
//  flex-direction: column;
//  //align-items: center;
//  //justify-content: center;
//  z-index: 2;
//  background: white;
//  -webkit-box-shadow: 0 0 15px 4px #A3A3A3;
//  box-shadow: 0 0 15px 4px #A3A3A3;
//
//  &:before {
//    content: '';
//    display: block;
//    width: 12px;
//    height: 12px;
//    background-color: #fff;
//    -webkit-transform: rotate(45deg);
//    transform: rotate(45deg);
//    position: absolute;
//    top: -5px;
//    left: 75px;
//  }
//}
//
//.tool {
//  font-family: Avenir, Helvetica, Arial, sans-serif;
//  font-size: 16px;
//  padding: 5px 20px 5px 10px;
//
//  &:hover {
//    color: #0D98BA;
//  }
//}
//
//.material-icons-outlined {
//  font-size: 16px;
//  margin-right: 7px;
//}
</style>
