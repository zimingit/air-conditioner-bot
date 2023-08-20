<template>
  <div class="switcher-field" @click="toggle">
    {{label}} <slot/>
    <Switcher :value="value"/>
  </div>
</template>

<script>
import Switcher from '../UI/Switcher.vue'
export default {
  emits: ['switch'],
  props: {
    label: String,
    value: Boolean
  },
  methods: {
    toggle () {
      this.$emit('switch', !this.value)
    }
  },
  components: {
    Switcher
  }
}
</script>

<style lang="stylus" scoped>
.switcher-field
  display flex
  align-items center
  justify-content space-between
</style>
