<template>
  <v-card class="text-left pa-8">
    <v-select v-model="category" label="Category" :items="selectList" />
    <v-text-field v-model="value" label="Value" type="number"/>
<!--    <v-text-field v-model="date" label="Date"/>-->
    <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        @input="menu2 = false"
      ></v-date-picker>
    </v-menu>
    <v-btn @click="onSaveClick">add</v-btn>
    <v-btn>close</v-btn>
  </v-card>
<!--  <div class="form">-->
<!--    <input list="category" v-model="category" placeholder="Category">-->
<!--    <datalist id="category">-->
<!--      <option-->
<!--        v-for="(option, idx) in selectList"-->
<!--        :key="idx"-->
<!--        :value="option">-->
<!--        {{ option }}-->
<!--      </option>-->
<!--    </datalist>-->
<!--    <input placeholder="Value" v-model="value" type="number"/>-->
<!--    <input placeholder="Date" v-model="date" type="date"/>-->
<!--    <button @click="onSaveClick">add +</button>-->
<!--    <span class="error" v-if="check">Choose category and enter value</span>-->
<!--  </div>-->
</template>

<script>

export default {
  name: 'CostsAdd',
  props: {
    selectList: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      id: 1,
      category: '',
      value: '',
      date: '',
      // check: false,
      menu: false,
      modal: false,
      menu2: false
    }
  },
  computed: {
    // selectList () {
    //   return this.$store.getters.getCategoryList
    // },
    getCurrentDate () {
      return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date())
    }
  },
  methods: {
    onSaveClick () {
      const data = {
        id: this.id,
        category: this.category,
        value: Number(this.value),
        date: this.date || this.getCurrentDate
      }
      this.$store.commit('addDataToPaymentsList', data)
      // if (this.category && this.value) {
      //   this.check = false
      //   const data = {
      //     id: this.id,
      //     category: this.category,
      //     value: Number(this.value),
      //     date: this.date || this.getCurrentDate
      //   }
      //   this.$store.commit('addDataToPaymentsList', data)
      //   // this.$emit('addCostsItem', data)
      //   this.category = ''
      //   this.value = ''
      //   this.date = ''
      // } else {
      //   this.check = true
      // }
    }
  }
  // created () {
  //   this.category = this.propsCategory
  //   this.value = this.propsValue
  // }
}
</script>

<style scoped lang="scss">

select {
  margin-top: 10px;
  width: 173px;
  padding: 5px 10px;

  &:focus {
    outline: none;
  }
}

input {
  display: block;
  width: 150px;
  margin-top: 10px;
  padding: 5px 10px;

  &:focus {
    outline: none;
  }
}

button {
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 10px;
  padding: 5px 10px;
  color: #fff;
  background-color: #0D98BA;
  border: none;
}

.error {
  color: red;
}
</style>
