<template>
  <div class="configurator">
    <Conditioner :selected="conditioner" @change="setConditioner"/>
    <Dismantling :value="useDismantling" @change="setUseDismantling"/>
    <AdditionalServices :conditioner="conditioner" @change="setAdditionalServices"/>
    <WallChasing :freonCableChannel="freonCableChannel" @change="setWallChasing"/>
    <AdditionalHoles @change="setAdditionalHoles"/>
    <CustomFields @change="setCustom"/>

    <Total v-if="conditioner"
      :conditioner="conditioner"
      :useDismantling="useDismantling"
      :additionalServices="additionalServices"
      :wallChasingSections="wallChasingSections"
      :additionalHoles="additionalHoles"
      :customFields="customFields"
      @preview="preview"/>
  </div>
</template>

<script>
import Conditioner from '../components/Sections/Conditioner.vue'
import Dismantling from '../components/Sections/Dismantling.vue'
import AdditionalServices from '../components/Sections/AdditionalServices.vue'
import WallChasing from '../components/Sections/WallChasing.vue'
import AdditionalHoles from '../components/Sections/AdditionalHoles.vue'
import CustomFields from '../components/Sections/CustomFields.vue'
import Total from '../components/Sections/Total/Total.vue'

export default {
  emits: ['preview'],
  props: {
    data: Array
  },
  data () {
    return {
      additionalHoles: [],
      additionalServices: [],
      wallChasingSections: [],
      conditioner: null,
      useDismantling: false,
      customFields: []
    }
  },
  methods: {
    preview () {
      const { additionalHoles, additionalServices, wallChasingSections, conditioner, useDismantling, customFields} = this
      const data = { additionalHoles, additionalServices, wallChasingSections, conditioner, useDismantling, customFields }
      this.$emit('preview', data)
    },
    setWallChasing (wallChasingSections) {
      this.wallChasingSections = wallChasingSections
    },
    setAdditionalServices (additionalServices) {
      this.additionalServices = additionalServices
    },
    setAdditionalHoles (additionalHoles) {
      this.additionalHoles = additionalHoles
    },
    setCustom (data) {
      this.customFields = data
    },
    setConditioner (conditioner) {
      this.conditioner = conditioner
      // const buttonConfig = {
      //   color: '#303030',
      //   textColor: '#ffffff'
      // }
      // Telegram.WebApp.MainButton.setParams(buttonConfig)
      // Telegram.WebApp.MainButton.show()
    },
    setUseDismantling (dismantling) {
      this.useDismantling = dismantling
    }
  },
  computed: {
    freonCableChannel () {
      const serviceKey = 'freonCableChannel'
      const { prices = [] } = this.additionalServices.find(({ name }) => name === serviceKey) || {}
      const optionSelected = prices.find(( {selected }) => selected) || prices[0]
      return optionSelected
    }
  },
  components: {
    Conditioner,
    Total,
    Dismantling,
    CustomFields,
    AdditionalServices,
    AdditionalHoles,
    WallChasing
  }
}
</script>

<style lang="stylus" scoped>
.configurator
  display flex
  flex-direction column
  padding 20px 0 50px 0
  gap 15px

</style>
