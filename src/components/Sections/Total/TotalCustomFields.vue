<template>
  <section v-if="hasData">
    <h5>Дополнительная номенклатура</h5>
    <ul>
      <li v-for="{ label, value } in customFields" :key="label">
        {{label}}
        <span>{{value.toLocaleString()}} ₽</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  emits: ['change'],
  props: {
    customFields: Array
  },
  watch: {
    customFields (to) {
      this.$emit('change', to)
    }
  },
  computed: {
    hasData () {
      return this.customFields.length > 0
    }
  }
}
</script>

<style lang="stylus" scoped>
h5
  padding 20px 20px 5px 20px
  color $black-light
ul
  display flex
  flex-direction column
  color $black-light
  font-size .8em
  li
    display flex
    align-items center
    justify-content space-between
    gap 20px
    padding 8px 20px
    span
      font-weight 500
      flex-shrink 0
    &:nth-child(odd)
      background-color $grey-light

</style>
