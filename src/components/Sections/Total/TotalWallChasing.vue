<template>
  <section v-if="hasData">
    <h5>Штробление стен</h5>
    <ul>
      <li v-for="{ label, value, details } in wallChasingPricesBySection" :key="label">
        <div class="row-header">
          {{label}}
          <span>{{value.toLocaleString()}} ₽</span>
        </div>
        <div class="row-details" v-for="detail in details" :key="detail.label">
          <p>{{detail.label}}</p>
          <span>{{detail.value.toLocaleString()}} ₽</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  emits: ['change'],
  props: {
    wallChasingSections: Array
  },
  watch: {
    wallChasingPricesBySection (to) {
      this.$emit('change', to)
    }
  },
  methods: {
    getSectionInfo (section, index) {
      const { chasings, material } = section
      let total = 0
      const details = chasings
        .filter(({ value }) => value)
        .map(chasing => {
          const { prices, label, value } = chasing
          const materialKey = material.name
          const routeLength = `: ${value} м`
          
          let { price } = chasing
          let postfix = ''
          // Если присутствует опциональный выбор (ПВХ/Арктика)
          if (prices) {
            const selectedOption = prices.find(({ selected }) => selected) || prices[0]
            postfix = ` (${selectedOption.label})`
            price = selectedOption.price
          }
          const valueCalculated = value * price[materialKey]
          total += valueCalculated
          return {
            label: label + postfix + routeLength,
            value: valueCalculated
          }
        })
      return {
        label: `Секция ${index + 1} (${material.label})`,
        value: total,
        details
      }
    }
  },
  computed: {
    wallChasingPricesBySection () {
      return this.wallChasingSections.map(this.getSectionInfo)
    },
    hasData () {
      return this.wallChasingPricesBySection.filter(({ value }) => value).length > 0
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
    flex-direction column
    padding 8px 20px
    .row-header,
    .row-details
      display flex
      align-items center
      justify-content space-between
      gap 20px
    span
      font-weight 500
      flex-shrink 0
    &:nth-child(odd)
      background-color $grey-light
    .row-details
      font-size .7em
      p
        color $grey-dark
</style>
