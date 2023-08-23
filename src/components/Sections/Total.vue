<template>
  <section class="total-section">
    <div class="total-button">Итого {{ total }}</div>

    <FieldHeader v-if="conditioner" label="Детально" @click="toggleDetail">
      <Chevron :opened="showDetail"/>
    </FieldHeader>

    <Accordion>
      <div class="total-details" v-if="showDetail">
        <h5>Монтаж</h5>
        <ul>
          <li>{{conditionerDetail.label}} <span>{{conditionerDetail.value}}</span></li>
          <li>{{installation.label}} <span>{{installation.value}}</span></li>
          <li>{{pipeLayingOrInstallation.label}} <span>{{pipeLayingOrInstallation.value}}</span></li>
          <li>{{indoorUnit.label}} <span>{{indoorUnit.value}}</span></li>
          <li v-if="useDismantling">{{dismantling.label}} <span>{{dismantling.value}}</span></li>
        </ul>
        
        <template v-if="hasCustomFields">
          <h5>Дополнительная номенклатура</h5>
          <ul>
            <li v-for="{ label, value } in customFields" :key="label">{{label}} <span>{{value.toLocaleString()}} ₽</span></li>
          </ul>
        </template>
      </div>
    </Accordion>
  </section>
</template>

<script>
import Chevron from '../UI/Chevron.vue'
import FieldHeader from '../UI/FieldHeader.vue'
// X – стоимость монтажа (base)
// Y – Закладка труб/монтаж на заложенную трассу (pipeLayingOrInstallation)
// W – Монтаж/демонтаж внутреннего блока (indoorUnit)
// Z – Демонтаж кондиционера (useDismantling)
// ЕСЛИ (S>O) ТО (X+Y+W) + ЕСЛИ (Z = true) ТО (dismantling) ИНАЧЕ (0)
export default {
  props: {
    conditioner: Object,
    customFields: Array,
    additionalServices: Array,
    useDismantling: Boolean
  },
  data () {
    return {
      showDetail: false
    }
  },
  methods: {
    toggleDetail () {
      this.showDetail = !this.showDetail
    }
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
    },
    total () {
      const { price, area } = this.conditioner
      const { base, pipeLayingOrInstallation, indoorUnit, dismantling } = area
      const customPrice = (this.customFields || []).reduce((acc, { value }) => acc + value, 0)
      const dismantlingPrice = this.useDismantling ? dismantling : 0

      const totalPrice = price + base + pipeLayingOrInstallation + indoorUnit + dismantlingPrice + customPrice
      return `${totalPrice.toLocaleString()} ₽`
    }
  },
  components: {
    Chevron,
    FieldHeader
  }
}
</script>

<style lang="stylus" scoped>
.total-section
  display flex
  flex-direction column
  margin 50px 0

  .total-button
    margin 0 15px
    border-radius 50px
    padding 10px 30px
    display flex
    flex 1
    justify-content center
    background-color $black-light
    color $white
    font-weight 700
  h5
    margin 20px 20px 5px 20px
    color $grey-dark
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
