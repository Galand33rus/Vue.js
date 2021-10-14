<template>
  <v-container>
    <v-row>
      <v-col :cols="1">#</v-col>
      <v-col :cols="3">Data</v-col>
      <v-col :cols="4">Category</v-col>
      <v-col :cols="2">Value</v-col>
      <v-col :cols="2"></v-col>
    </v-row>
    <v-row v-for="(item, idx) in items" :key="idx">
      <v-col :cols="1">{{ item.id }}</v-col>
      <v-col :cols="3">{{ item.date }}</v-col>
      <v-col :cols="4">{{ item.category }}</v-col>
      <v-col :cols="2">{{ item.value }}</v-col>
      <v-col :cols="2">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-icon small class="mr-2" v-on="on" @click="dialog = !dialog">mdi-pencil</v-icon>
          </template>
          <v-card>
            <v-text-field v-model="newCategory" label="Category"/>
            <v-text-field v-model="newValue" label="Value" type="number"/>
            <v-btn @click="editItem(item.id)">Save</v-btn>
<!--            <CostsAdd :selectList="categoryList"/>-->
          </v-card>
        </v-dialog>
        <v-icon small @click="removeItem(item.id)">mdi-delete</v-icon>
      </v-col>
    </v-row>
  </v-container>

  <!--  <ul>-->
  <!--    <li class="title">-->
  <!--      <span class="number">#</span>-->
  <!--      <span class="date">Data</span>-->
  <!--      <span class="category">Category</span>-->
  <!--      <span class="value">Value</span>-->
  <!--    </li>-->
  <!--    <li v-for="(item, idx) in items" :key="idx">-->
  <!--      <span class="number">{{ item.id }}</span>-->
  <!--      <span class="date">{{ item.date }} </span>-->
  <!--      <span class="category">{{ item.category }}</span>-->
  <!--      <span class="value">{{ item.value }}</span>-->
  <!--      <span class="material-icons-outlined tools-open">-->
  <!--            more_vert-->
  <!--            <span class="tools">-->
  <!--                <span class="tool"><span class="material-icons-outlined">edit</span>Edit</span>-->
  <!--                <span class="tool" @click="removeItem(item.id)"><span class="material-icons-outlined">delete</span>Delete</span>-->
  <!--            </span>-->
  <!--          </span>-->

  <!--    </li>-->
  <!--  </ul>-->
</template>

<script>

// import CostsAdd from '@/components/CostsAdd'
export default {
  name: 'CostsList',
  // components: { CostsAdd },
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
      const data = {
        id: id,
        category: this.newCategory,
        value: Number(this.newValue)
      }
      this.$store.commit('editDataToPaymentsList', data)
      this.newCategory = ''
      this.newValue = ''
    },
    removeItem (id) {
      this.$store.commit('delDataToPaymentsList', id)
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
