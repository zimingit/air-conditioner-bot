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
// X – стоимость монтажа (base)
// Y – Закладка труб/монтаж на заложенную трассу (pipeLayingOrInstallation)
// W – Монтаж/демонтаж внутреннего блока (indoorUnit)
// Z – Демонтаж кондиционера (useDismantling)
// ЕСЛИ (S>O) ТО (X+Y+W) + ЕСЛИ (Z = true) ТО (dismantling) ИНАЧЕ (0)
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
