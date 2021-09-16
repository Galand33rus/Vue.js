<template>
  <div class="calc">
    <div class="input">
      <input v-model="op1" />
      <input v-model="op2" />
      = {{ result }}
    </div>
    <div class="key">
      <button @click="sum(op1, op2)">+</button>
      <button @click="sub(op1, op2)">-</button>
      <button @click="mul(op1, op2)">*</button>
      <button @click="div(op1, op2)" :disabled="+op2 === 0">/</button>
      <button @click="exp(op1, op2)" :disabled="+op1 === 0 && +op2 <= 0">^</button>
      <button @click="intDiv(op1, op2)" :disabled="+op2 === 0">÷</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "calc",
  data() {
    return {
      op1: '',
      op2: '',
      result: ''
    }
  },
  methods: {
    sum(op1, op2) {
      this.result = +op1 + +op2
    },
    sub(op1, op2) {
      this.result = op1 - op2
    },
    mul(op1, op2) {
      this.result = op1 * op2
    },
    div(op1, op2) {
      this.result = op1 / op2
    },
    exp(op1, op2) {
      this.result = op1 ** op2
    },
    intDiv(op1, op2) {
      this.result = (op1 - op1%op2)/op2
    }
  }
}
</script>

<style scoped>

.input {
  margin-bottom: 15px;
}

input {
  padding: 5px;
  margin-right: 10px;
}

input:focus {
  outline: none;
}

button {
  font-size: 20px;
  display: inline-block;
  width: 35px;
  height: 35px;
  padding: 5px;
  margin-right: 5px;
}
</style>