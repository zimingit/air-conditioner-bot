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
        <TotalWallChasing :wallChasingSections="wallChasingSections" @change="setTotalWallChasing"/>
        <TotalAdditionalHoles :additionalHoles="additionalHoles" @change="setTotalHoles"/>
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
import TotalAdditionalHoles from './TotalAdditionalHoles.vue'
export default {
  props: {
    conditioner: Object,
    customFields: Array,
    additionalServices: Array,
    wallChasingSections: Array,
    additionalHoles: Array,
    useDismantling: Boolean
  },
  data () {
    return {
      showDetail: false,
      totalHoles: 0,
      totalWallChasing: 0,
      totalServicesPrice: 0,
      totalCustomFieldsPrice: 0
    }
  },
  methods: {
    getValueSumm (data = []) {
      return data.reduce((acc, { value }) => acc + value, 0)
    },
    setTotalHoles (holes) {
      this.totalHoles = this.getValueSumm(holes)
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
    total () {
      const { price, area } = this.conditioner
      const { base, pipeLayingOrInstallation, indoorUnit, dismantling } = area
      const dismantlingPrice = this.useDismantling ? dismantling : 0
      const otherServices = this.totalCustomFieldsPrice + this.totalServicesPrice + this.totalWallChasing + this.totalHoles

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
    TotalWallChasing,
    TotalAdditionalHoles
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
