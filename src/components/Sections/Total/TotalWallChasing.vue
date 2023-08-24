<template>
  <section v-if="hasData">
    <h5>Штробление стен ({{ material.label }})</h5>
    <ul>
      <li v-for="{ label, value } in wallChasingPrices" :key="label">
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
    wallChasing: Array
  },
  watch: {
    wallChasingPrices (to) {
      this.$emit('change', to)
    }
  },
  computed: {
    material () {
      const { material } = this.wallChasing[0]
      return material
    },
    wallChasingPrices () {
      return this.wallChasing.map(chasing => {
        const { prices, material, label, value } = chasing
        const materialKey = material.name
        
        let { price } = chasing
        let postfix = ''
        // Если присутствует опциональный выбор (ПВХ/Арктика)
        if (prices) {
          const selectedOption = prices.find(({ selected }) => selected) || prices[0]
          postfix = ` (${selectedOption.label})`
          price = selectedOption.price
        }

        return {
          label: label + postfix,
          value: value * price[materialKey] }
      })
      .filter(({ value }) => value)
    },
    hasData () {
      return this.wallChasing.filter(({ value }) => value).length > 0
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
