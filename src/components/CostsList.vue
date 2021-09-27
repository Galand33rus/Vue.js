<template>
  <div>
    <ul>
      <li class="title">
        <span class="number">#</span>
        <span class="date">Data</span>
        <span class="category">Category</span>
        <span class="value">Value</span>
      </li>
      <li v-for="(item, idx) in items.slice(start, end)" :key="idx">
        <span class="number">{{ item.id }}</span>
        <span class="date">{{ item.date }} </span>
        <span class="category">{{ item.category }}</span>
        <span class="value">{{ item.value }}</span>
      </li>
    </ul>
    <Pagination :itemsCount="items.length" @distance="distance"/>
  </div>

</template>

<script>

import Pagination from './Pagination'
export default {
  name: 'CostsList',
  components: {
    Pagination
  },
  data () {
    return {
      start: 0,
      end: 5
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    distance (data) {
      this.start = data.start
      this.end = data.end
    }
  }
}

</script>

<style scoped>
ul {
  width: 420px;
  min-height: 285px;
  list-style-type: none;
  padding-left: 15px;
}
li {
  margin-bottom: 15px;
  padding-bottom: 15px;
  display: flex;
  border-bottom: 1px solid black;
}

.number, .date, .category {
  display: block;
  margin-right: 25px;
}
.date {
  width: 100px;
}
.category {
  width: 140px;
}
.value {
  display: block;
  width: 75px;
}
.number {
  width: 20px;
}

</style>
