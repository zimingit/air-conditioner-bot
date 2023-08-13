<template>
  <div class="climate-model">
    <h4> Площадь помещения (м<sup>2</sup>): </h4>
    
    <ul>
      <li v-for="area in data"
        :key="area.area"
        :class="{ selected: area === selectedArea }"
        @click="setArea(area)">
        <p>{{area.area}}</p>
      </li>
    </ul>

    <div class="climate-dismantling">
      Нужен демонтаж
      <Switcher :value="useDismantling" @switch="(status) => useDismantling = status"/>
    </div>
  </div>
</template>

<script>
import Switcher from './UI/Switcher.vue'
// X – стоимость монтажа (base)
// Y – Закладка труб/монтаж на заложенную трассу (pipeLayingOrInstallation)
// W – Монтаж/демонтаж внутреннего блока (indoorUnit)
// Z – Демонтаж кондиционера (useDismantling)
// ЕСЛИ (S>O) ТО (X+Y+W) + ЕСЛИ (Z = true) ТО (dismantling) ИНАЧЕ (0)
export default {
  props: {
    data: Array
  },
  data () {
    return {
      useDismantling: false,
      dismantling: 3000,
      selectedArea: this.data[0]
    }
  },
  created () {
  },
  methods: {
    setArea (area) {
      this.selectedArea = area
    }
  },
  components: {
    Switcher
  }
}
</script>

<style lang="stylus" scoped>
.climate-model
  display flex
  flex-direction column
  overflow hidden
  h4
    margin 15px 15px 5px 15px
    sup
      font-size .5em
  ul
    display flex
    flex 1
    overflow-x auto
    gap 10px
    padding 10px 15px
    &::-webkit-scrollbar
      display none
    li
      display flex
      align-items center
      justify-content center
      width 70px
      height 50px
      font-weight 500
      font-size .8em
      flex-shrink 0
      border-radius 20px
      background-color $grey
      &.selected
        background-color $black-light
        color $white
  .climate-dismantling
    display flex
    align-items center
    justify-content space-between
    margin 5px 15px
</style>
