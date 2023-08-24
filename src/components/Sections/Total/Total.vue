<template>
  <section class="total-section">
    <div class="total-button">Итого {{ total }}</div>

    <FieldHeader v-if="conditioner" label="Детально" @click="toggleDetail">
      <Chevron :opened="showDetail"/>
    </FieldHeader>

    <Accordion>
      <div class="total-details" v-show="showDetail">
        <TotalInstallation :conditioner="conditioner" :useDismantling="useDismantling"/>
        <TotalAdditionalServices :additionalServices="additionalServices" @change="setTotalServices"/>
        <TotalWallChasing :wallChasing="wallChasing"  @change="setTotalWallChasing"/>
        <TotalCustomFields :customFields="customFields" @change="setTotalCustomFields"/>
      </div>
    </Accordion>
  </section>
</template>

<script>
import Chevron from '../../UI/Chevron.vue'
import FieldHeader from '../../UI/FieldHeader.vue'
import TotalInstallation from './TotalInstallation.vue'
import TotalCustomFields from './TotalCustomFields.vue'
import TotalAdditionalServices from './TotalAdditionalServices.vue'
import TotalWallChasing from './TotalWallChasing.vue'
export default {
  props: {
    conditioner: Object,
    customFields: Array,
    additionalServices: Array,
    wallChasing: Array,
    useDismantling: Boolean
  },
  data () {
    return {
      showDetail: false,
      totalWallChasing: 0,
      totalServicesPrice: 0,
      totalCustomFieldsPrice: 0
    }
  },
  methods: {
    getValueSumm (data = []) {
      return data.reduce((acc, { value }) => acc + value, 0)
    },
    setTotalWallChasing (chasing) {
      this.totalWallChasing = this.getValueSumm(chasing)
    },
    setTotalServices (services) {
      this.totalServicesPrice = this.getValueSumm(services)
    },
    setTotalCustomFields (fields) {
      this.totalCustomFieldsPrice = this.getValueSumm(fields)
    },
    toggleDetail () {
      this.showDetail = !this.showDetail
    }
  },
  computed: {
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
      const dismantlingPrice = this.useDismantling ? dismantling : 0
      const otherServices = this.totalCustomFieldsPrice + this.totalServicesPrice + this.totalWallChasing

      const totalPrice = price + base + pipeLayingOrInstallation + indoorUnit + dismantlingPrice + otherServices
      return `${totalPrice.toLocaleString()} ₽`
    }
  },
  components: {
    Chevron,
    FieldHeader,
    TotalInstallation,
    TotalCustomFields,
    TotalAdditionalServices,
    TotalWallChasing
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

</style>
