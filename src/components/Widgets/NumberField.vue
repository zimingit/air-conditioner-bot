<template>
  <div class="widget-number">
    <div class="minus" @click="decrease">-</div>

    <input type="number" :value="value" @input="input">

    <div class="plus" @click="increase">+</div>
  </div>
</template>

<script>

export default {
  emits: ['change'],
  props: {
    value: Number,
    step: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
    }
  },
  methods: {
    decrease () {
      this.$emit('change', this.decreaseValue)
    },
    increase () {
      this.$emit('change', this.increaseValue)
    },
    input (e) {
      const { value } = e.target
      this.$emit('change', parseInt(value))
    }
  },
  computed: {
    decreaseValue () {
      const nextValue = this.value - this.step
      return nextValue < 0 ? 0 : nextValue
    },
    increaseValue () {
      return this.value + this.step
    },
  }
}
</script>

<style lang="stylus" scoped>
.widget-number
  display flex
  gap 10px
  input
    width 35px
    text-align center
    font-size 1em
    font-weight 500
  .minus, .plus
    display flex
    justify-content center
    align-items center
    width 30px
    height 30px
    border-radius 10px
    background-color $grey-light
</style>
