<template>
  <div class="widget-number">
    <div class="minus" @click="decrease">
      <svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.33337 20H31.6667" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <input
      :name="name"
      type="number"
      :value="value"
      @input="input">

    <div class="plus" @click="increase">
      <svg width="18" height="18" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8.33331V31.6666M8.33337 20H31.6667" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  emits: ['change'],
  props: {
    value: Number,
    name: String,
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
    svg
      stroke currentColor
</style>
