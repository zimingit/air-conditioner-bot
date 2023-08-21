<template>
  <div class="configurator">
    <Conditioner :selected="conditioner" @change="setConditioner"/>
    <Area :selected="selectedArea" @change="setArea"/>
    <Dismantling :value="useDismantling" @change="setUseDismantling"/>
  </div>
</template>

<script>
import Conditioner from './Sections/Conditioner.vue'
import Area from './Sections/Area.vue'
import Dismantling from './Sections/Dismantling.vue'

export default {
  props: {
    data: Array
  },
  data () {
    return {
      conditioner: null,
      selectedArea: null,
      useDismantling: false
    }
  },
  created () {
  },
  methods: {
    setConditioner (conditioner) {
      this.conditioner = conditioner
    },
    setArea (area) {
      this.selectedArea = area
    },
    setUseDismantling (dismantling) {
      this.useDismantling = dismantling
    }
  },
  components: {
    Conditioner,
    Area,
    Dismantling
  }
}
</script>

<style lang="stylus" scoped>
.configurator
  display flex
  flex-direction column
  overflow-x auto
  &::-webkit-scrollbar
    display none

</style>
