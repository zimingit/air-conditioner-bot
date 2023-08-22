<template>
  <section class="area-section">
    <FieldHeader label="Площадь помещения (м<sup>2</sup>):"/>

    <ListField
      class="area-list"
      :data="areas"
      :selected="selected"
      @change="change"/>
  </section>
</template>

<script>
import ListField from '../Widgets/ListField.vue'
import FieldHeader from '../UI/FieldHeader.vue'
import { AREAS } from '../../dataset/data.js'
export default {
  props: {
    selected: Object
  },
  data () {
    return {
      areas: AREAS
    }
  },
  methods: {
    change (data) {
      this.$emit('change', data)
    }
  },
  components: {
    FieldHeader,
    ListField
  }
}
</script>

<style lang="stylus" scoped>
.area-section
  display flex
  flex-direction column
  overflow hidden
  .area-list
    padding 10px 15px
</style>
