<template>
  <div class="configurator">
    <Conditioner :selected="conditioner" @change="setConditioner"/>
    <Dismantling :value="useDismantling" @change="setUseDismantling"/>
    <AdditionalServices :conditioner="conditioner" @change="setAdditionalServices"/>
    <CustomFields @change="setCustom"/>
    <Total v-if="conditioner"
      :conditioner="conditioner"
      :useDismantling="useDismantling"
      :additionalServices="additionalServices"
      :customFields="customFields"/>
  </div>
</template>

<script>
import Conditioner from './Sections/Conditioner.vue'
import Dismantling from './Sections/Dismantling.vue'
import AdditionalServices from './Sections/AdditionalServices.vue'
import CustomFields from './Sections/CustomFields.vue'
import Total from './Sections/Total/Total.vue'

export default {
  props: {
    data: Array
  },
  data () {
    return {
      additionalServices: [],
      conditioner: null,
      useDismantling: false,
      customFields: []
    }
  },
  created () {
  },
  methods: {
    setAdditionalServices (additionalServices) {
      this.additionalServices = additionalServices
    },
    setCustom (data) {
      this.customFields = data
    },
    setConditioner (conditioner) {
      this.conditioner = conditioner
    },
    setUseDismantling (dismantling) {
      this.useDismantling = dismantling
    }
  },
  components: {
    Conditioner,
    Total,
    Dismantling,
    CustomFields,
    AdditionalServices
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
