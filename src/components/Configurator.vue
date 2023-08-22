<template>
  <div class="configurator">
    <Conditioner :selected="conditioner" @change="setConditioner"/>
    <Dismantling :value="useDismantling" @change="setUseDismantling"/>
    <Total v-if="conditioner" :conditioner="conditioner" :useDismantling="useDismantling"/>
  </div>
</template>

<script>
import Conditioner from './Sections/Conditioner.vue'
import Dismantling from './Sections/Dismantling.vue'
import Total from './Sections/Total.vue'

export default {
  props: {
    data: Array
  },
  data () {
    return {
      conditioner: null,
      useDismantling: false
    }
  },
  created () {
  },
  methods: {
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
    Dismantling
  }
}
</script>

<style lang="stylus" scoped>
.configurator
  display flex
  flex-direction column
  padding 20px 0 50px 0

</style>
