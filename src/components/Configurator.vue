<template>
  <div class="configurator">
    <Conditioner :selected="conditioner" @change="setConditioner"/>
    <Dismantling :value="useDismantling" @change="setUseDismantling"/>
    <CustomFields @change="setCustom"/>
    <Total v-if="conditioner"
      :conditioner="conditioner"
      :useDismantling="useDismantling"
      :customFields="customFields"/>
  </div>
</template>

<script>
import Conditioner from './Sections/Conditioner.vue'
import Dismantling from './Sections/Dismantling.vue'
import CustomFields from './Sections/CustomFields.vue'
import Total from './Sections/Total.vue'

export default {
  props: {
    data: Array
  },
  data () {
    return {
      conditioner: null,
      useDismantling: false,
      customFields: null
    }
  },
  created () {
  },
  methods: {
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
    CustomFields
  }
}
</script>

<style lang="stylus" scoped>
.configurator
  display flex
  flex-direction column
  padding 20px 0 50px 0

</style>
