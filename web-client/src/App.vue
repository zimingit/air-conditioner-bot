<template>
  <Preview v-if="showPreview" v-bind="showPreview" @close="togglePreview"/>
  <Configurator @preview="togglePreview"/>
</template>

<script>

import Configurator from './components/Configurator.vue'
import Preview from './components/Preview.vue'
export default {
  data () {
    return {
      showPreview: null
    }
  },
  created () {
  },
  methods: {
    togglePreview (data = null) {
      this.showPreview = data
    }
  },
  components: {
    Configurator,
    Preview
  }
}
</script>

<style lang="stylus" scoped>

</style>
