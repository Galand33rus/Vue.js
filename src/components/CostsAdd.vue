<template>
  <div class="form">
    <input placeholder="Category" v-model="category" />
    <input placeholder="Value" v-model="value" />
    <input placeholder="Date" v-model="date" />
    <button @click="onSaveClick">add +</button>
  </div>
</template>

<script>
export default {
  name: 'CostsAdd',
  data () {
    return {
      id: 1,
      category: '',
      value: '',
      date: ''
    }
  },
  computed: {
    getCurrentDate () {
      const today = new Date()
      const d = today.getDate()
      const m = today.getMonth() + 1
      const y = today.getFullYear()
      return `${d}.${m}.${y}`
    }
  },
  methods: {
    onSaveClick () {
      const data = {
        id: this.id,
        category: this.category,
        value: this.value,
        date: this.date || this.getCurrentDate
      }
      this.$emit('addCostsItem', data)
      this.category = ''
      this.value = ''
      this.date = ''
    }
  }
}
</script>

<style scoped>
input {
  display: block;
  width: 150px;
  margin-top: 10px;
  padding: 5px 10px;
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
</style>
