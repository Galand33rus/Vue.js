<template>
  <div>
    <span class="pagination" @click="left">&lt;</span>
    <span class="pagination" v-for="p in pagesCount" :key="p" @click="switcher(p)">
    {{ p }}
  </span>
    <span class="pagination" @click="right">&gt;</span>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {
      start: 0,
      end: 5,
      newStart: 0,
      newEnd: 5
    }
  },
  props: {
    itemsCount: {
      type: Number
    }
  },
  methods: {
    switcher (n) {
      if (n === 1) {
        const data = {
          end: this.end,
          start: this.start
        }
        this.$emit('distance', data)
        this.newEnd = this.end
        this.newStart = this.start
      } else {
        const data = {
          end: this.end * n,
          start: this.end * n - this.end
        }
        this.$emit('distance', data)
        this.newEnd = this.end * n
        this.newStart = this.end * n - this.end
      }
    },
    left () {
      if (this.newStart === 0) {
        const data = {
          end: this.end,
          start: this.start
        }
        this.$emit('distance', data)
      } else {
        const data = {
          end: this.newEnd -= this.end,
          start: this.newStart -= this.end
        }
        this.$emit('distance', data)
      }
    },
    right () {
      if (this.newEnd === this.end * this.pagesCount) {
        const data = {
          end: this.newEnd,
          start: this.newStart
        }
        this.$emit('distance', data)
      } else {
        const data = {
          end: this.newEnd += this.end,
          start: this.newStart += this.end
        }
        this.$emit('distance', data)
      }
    }
  },
  computed: {
    pagesCount () {
      if (this.itemsCount % this.end === 0) {
        return ((this.itemsCount - this.itemsCount % this.end) / this.end)
      } else {
        return ((this.itemsCount - this.itemsCount % this.end) / this.end) + 1
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  cursor: pointer;

  &:hover {
    color: #0D98BA;
  }
}
</style>
