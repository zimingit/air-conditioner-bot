<template>
  <section class="dismantling-section">
    <SwitcherField
      :value="value"
      @switch="change">
        Нужен демонтаж
    </SwitcherField>
  </section>
</template>

<script>
import SwitcherField from '../Widgets/SwitcherField.vue'
export default {
  emits: ['change'],
  props: {
    value: Boolean
  },
  methods: {
    change (value) {
      this.$emit('change', value)
    }
  },
  components: {
    SwitcherField
  }
}
</script>

<style lang="stylus" scoped>
.dismantling-section
  padding 5px 15px
  margin 5px 0
</style>
