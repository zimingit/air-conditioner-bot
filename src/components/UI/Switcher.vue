<template>
  <div :class="['button-switcher', {'on': on, 'disabled': disabled}]" @click="toggle()">
    <div :class="{'on': on}"></div>
  </div>
</template>

<script>

export default {
  emits: ['switch'],
  props: {
    value: Boolean,
    disabled: Boolean
  },
  data () {
    return {
      on: this.value || false
    }
  },
  watch: {
    value (to) {
      this.on = to
    }
  },
  methods: {
    toggle () {
      if (this.disabled) return
      this.$emit('switch', !this.on)
    }
  }
}
</script>

<style lang="stylus" scoped>
.button-switcher
  display flex
  align-items center
  padding 2px
  width 35px
  height 20px
  background-color $grey
  border-radius 10px
  transition background-color .2s
  &.on
    background $green
  &.disabled
    background-color $background10
    div
      background-color $background10

  div
    width 16px
    height 16px
    border-radius 50%
    background-color $white
    transform translate3d(0, 0, 0) scale(1, 1)
    transition transform .3s
    &.on
      transform translate3d(15px, 0, 0) scale(1, 1)
</style>
