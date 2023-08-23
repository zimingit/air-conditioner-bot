<template>
  <section>
    <h5>Монтаж</h5>
    <ul>
      <li>{{conditionerDetail.label}} <span>{{conditionerDetail.value}}</span></li>
      <li>{{installation.label}} <span>{{installation.value}}</span></li>
      <li>{{pipeLayingOrInstallation.label}} <span>{{pipeLayingOrInstallation.value}}</span></li>
      <li>{{indoorUnit.label}} <span>{{indoorUnit.value}}</span></li>
      <li v-if="useDismantling">{{dismantling.label}} <span>{{dismantling.value}}</span></li>
    </ul>
  </section>
</template>

<script>
// X – стоимость монтажа (base)
// Y – Закладка труб/монтаж на заложенную трассу (pipeLayingOrInstallation)
// W – Монтаж/демонтаж внутреннего блока (indoorUnit)
// Z – Демонтаж кондиционера (useDismantling)
// ЕСЛИ (S>O) ТО (X+Y+W) + ЕСЛИ (Z = true) ТО (dismantling) ИНАЧЕ (0)
export default {
  props: {
    conditioner: Object,
    useDismantling: Boolean
  },
  computed: {
    hasCustomFields () {
      return this.customFields && this.customFields.length > 0
    },
    dismantling () {
      const { dismantling } = this.conditioner.area
      const label = 'Демонтаж кондиционера'
      const value = `${dismantling.toLocaleString()} ₽`
      return { label, value }
    },
    indoorUnit () {
      const { indoorUnit } = this.conditioner.area
      const label = 'Монтаж/демонтаж внутреннего блока'
      const value = `${indoorUnit.toLocaleString()} ₽`
      return { label, value }
    },
    pipeLayingOrInstallation () {
      const { pipeLayingOrInstallation } = this.conditioner.area
      const label = 'Закладка труб/монтаж на заложенную трассу'
      const value = `${pipeLayingOrInstallation.toLocaleString()} ₽`
      return { label, value }
    },
    installation () {
      const { base } = this.conditioner.area
      const label = 'Монтаж'
      const value = `${base.toLocaleString()} ₽`
      return { label, value }
    },
    conditionerDetail () {
      const { model, manufacturer, price } = this.conditioner
      const label = `Кондиционер ${manufacturer} ${model}`
      const value = `${price.toLocaleString()} ₽`
      return { label, value }
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
