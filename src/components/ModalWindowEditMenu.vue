<template>
  <div class="tools">
      <span class="tool" @click="showInput=!showInput">
        <span class="material-icons-outlined">edit</span>Edit
      </span>
      <input class="newCategory" type="text" v-if="showInput" v-model="newCategory" placeholder="Edit category">
      <input class="newValue" type="number" v-if="showInput" v-model="newValue" placeholder="Edit value">
      <button @click="editItem(item.id)" v-if="showInput">save</button>
      <span class="tool" @click="removeItem(item.id)"><span class="material-icons-outlined">delete</span>Delete</span>
  </div>
</template>

<script>
export default {
  name: 'ModalWindowEditMenu',
  data () {
    return {
      showInput: false,
      newCategory: '',
      newValue: ''
    }
  },
  methods: {
    editItem (id) {
      const data = {
        id: id,
        category: this.newCategory,
        value: Number(this.newValue)
      }
      this.$store.commit('editDataToPaymentsList', data)
      this.newCategory = ''
      this.newValue = ''
      this.showInput = false
    },
    removeItem (id) {
      this.$store.commit('delDataToPaymentsList', id)
    }
  }
}
</script>

<style scoped lang="scss">
.material-icons-outlined {
  cursor: pointer;
}

.tools {
  position: absolute;
  top: 22px;
  left: -58px;
  display: none;
  flex-direction: column;
  z-index: 2;
  background: white;
  -webkit-box-shadow: 0 0 15px 4px #A3A3A3;
  box-shadow: 0 0 15px 4px #A3A3A3;

  &:before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: -5px;
    left: 75px;
  }
}

.tool {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  padding: 5px 20px 5px 10px;

  &:hover {
    color: #0D98BA;
  }
}

.material-icons-outlined {
  font-size: 16px;
  margin-right: 7px;
}

</style>
