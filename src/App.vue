<template>
  <ModelSelector :data="roomArea"/>
</template>

<script>

import ModelSelector from './components/AirConditionerModel.vue'
export default {
  data () {
    return {
      roomArea: [
        { area: '20-25', base: 11000, pipeLayingOrInstallation: 6500, indoorUnit: 3000 },
        { area: '30-35', base: 12000, pipeLayingOrInstallation: 7000, indoorUnit: 3300 },
        { area: '40-55', base: 13000, pipeLayingOrInstallation: 7500, indoorUnit: 3550 },
        { area: '60-70', base: 14000, pipeLayingOrInstallation: 8000, indoorUnit: 3800 },
        { area: '75-85', base: 14500, pipeLayingOrInstallation: 8250, indoorUnit: 3900 },
        { area: '90-100', base: 15000, pipeLayingOrInstallation: 8500, indoorUnit: 4100 }
      ],
    }
  },
  created () {
  },
  methods: {
  },
  components: {
    ModelSelector
  }
}
</script>

<style lang="stylus" scoped>

</style>
