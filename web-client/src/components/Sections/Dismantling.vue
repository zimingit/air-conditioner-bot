<template>
  <section class="dismantling-section">
    <FieldHeader label="Нужен демонтаж" @click="change">
      <Switcher :value="value"></Switcher>
    </FieldHeader>
    
  </section>
</template>

<script>
import FieldHeader from '../UI/FieldHeader.vue'
import Switcher from '../UI/Switcher.vue'
export default {
  emits: ['change'],
  props: {
    value: Boolean
  },
  methods: {
    change () {
      this.$emit('change', !this.value)
    }
  },
  components: {
    FieldHeader,
    Switcher
  }
}
</script>
