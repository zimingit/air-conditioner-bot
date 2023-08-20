<template>
  <div class="configurator">
    <Area :selected="selectedArea" @change="setArea"/>
    <Dismantling :value="useDismantling" @change="setUseDismantling"/>
  </div>
</template>

<script>
import Area from './Sections/Area.vue'
import Dismantling from './Sections/Dismantling.vue'

export default {
  props: {
    data: Array
  },
  data () {
    return {
      selectedArea: null,
      useDismantling: false
    }
  },
  created () {
  },
  methods: {
    setArea (area) {
      this.selectedArea = area
    },
    setUseDismantling (dismantling) {
      this.useDismantling = dismantling
    }
  },
  components: {
    Area,
    Dismantling
  }
}
</script>

<style lang="stylus" scoped>
</style>
