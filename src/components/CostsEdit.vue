<template>
  <v-dialog v-model="dialog[item.id]" width="500" :retain-focus="false" persistent>
    <template v-slot:activator="{ on }">
      <v-icon small class="mr-2" v-on="on">mdi-pencil</v-icon>
    </template>
    <v-card class="text-left pa-8">
      <v-row class="flex-column">
        <v-select v-model="newCategory" label="Category" prepend-icon="mdi-select-place" :items="category"/>
        <v-text-field v-model="newValue" label="Value" type="number" prepend-icon="mdi-currency-usd"/>
      </v-row>
      <v-row justify="space-between">
        <v-btn @click="editItem(item)" color="orange darken-1" dark>Save</v-btn>
        <v-btn @click="dialog[item.id] = false" color="orange darken-1" dark>close</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CostsEdit',
  props: {
    item: {
      type: Object,
      require: true
    },
    category: {
      type: Array
    }
  },
  data () {
    return {
      dialog: { },
      newCategory: '',
      newValue: ''
    }
  },
  methods: {
    editItem (item) {
      const data = {
        id: item.id,
        category: this.newCategory,
        value: Number(this.newValue)
      }
      this.$store.commit('editDataToPaymentsList', data)
      this.newCategory = ''
      this.newValue = ''
      this.dialog[item.id] = false
    },
    closeWindow (item) {
      this.category = []
      this.value = ''
      this.date = ''
      this.$emit('closeAdd', item)
    }
  }
}
</script>

<style scoped>

</style>
