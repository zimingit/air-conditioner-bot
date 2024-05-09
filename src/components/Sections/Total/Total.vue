<template>
  <section class="total-section">
    <div class="total-button" @click="sendData">Итого {{ total }}</div>

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
  emits: ['preview'],
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
      showDetail: true,
      totalHoles: 0,
      totalWallChasing: 0,
      totalServicesPrice: 0,
      totalCustomFieldsPrice: 0,
      // Для посчитанной детальной информации
      services: [],
      wallChasing: []
    }
  },
  // watch: {
  //   total (to) {
  //     const text = `Итого ${to}`
  //     Telegram.WebApp.MainButton.text = text
  //   }
  // },
  // created () {
  //   const text = `Итого ${this.total}`
  //   Telegram.WebApp.MainButton.text = text

  //   const vm = this
  //   Telegram.WebApp.MainButton.onClick(function() {
  //     Telegram.WebApp.sendData(vm.total)
  //     Telegram.WebApp.close()
  //   })
  // },
  methods: {
    async sendData () {
      this.$emit('preview')
      // const data = JSON.stringify(this.getTotal())
      // const url = 'add_offer'
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   method: 'POST',
      //   body: data
      // }
      // fetch(url, config)
      //   .then(response => response.json())
      //   .then(response => {
      //     console.log('Result data:', data)
      //     console.log(response)
      //   })
    },
    getTotal () {
      const { 
        conditioner,
        services,
        additionalServices: servicesDetails,
        wallChasingSections: wallChasingDetails,
        wallChasing,
        additionalHoles,
        useDismantling,
        customFields
      } = this

      const result = {
        details: {
          servicesDetails,
          wallChasingDetails
        },
        conditioner,
        services,
        wallChasing,
        additionalHoles,
        useDismantling,
        customFields
      }
      return result
    },
    getValueSumm (data = []) {
      return data.reduce((acc, { value }) => acc + value, 0)
    },
    setTotalHoles (holes) {
      this.totalHoles = this.getValueSumm(holes)
    },
    setTotalWallChasing (chasing) {
      this.wallChasing =chasing
      this.totalWallChasing = this.getValueSumm(chasing)
    },
    setTotalServices (services) {
      this.services = services
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
  margin-bottom 50px

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
