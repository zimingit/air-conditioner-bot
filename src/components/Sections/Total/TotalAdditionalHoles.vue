<template>
  <section v-if="hasData">
    <h5>Проход стен</h5>
    <ul>
      <li v-for="{ label, value, type, useDiamondDrill } in additionalHolesPrices" :key="label">
        <div class="row-header">
          <p>{{label}}</p>
          <span>{{value.toLocaleString()}} ₽</span>
        </div>
        <div class="row-details">
          <p>
            {{type}}
            <template v-if="useDiamondDrill">
              + Алмазное бурение
            </template>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  emits: ['change'],
  props: {
    additionalHoles: Array
  },
  watch: {
    additionalHolesPrices (to) {
      this.$emit('change', to)
    }
  },
  methods: {
    getHoleInfo (hole, index) {
      const { holeType, material, useDiamondDrill, price } = hole
        
      return {
        label: `Отверстие ${index + 1} (${material.label})`,
        type: holeType.label,
        value: price,
        useDiamondDrill
      }
    }
  },
  computed: {
    additionalHolesPrices () {
      return this.additionalHoles.map(this.getHoleInfo)
    },
    hasData () {
      return this.additionalHolesPrices.filter(({ value }) => value).length > 0
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
