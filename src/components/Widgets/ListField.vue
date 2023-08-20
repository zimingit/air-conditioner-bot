<template>
  <ul class="list-field">
    <li v-for="item in data"
      :key="item.key || item.label"
      :class="{ selected: item === selected }"
      @click="change(item)">
      <p>{{item.label}}</p>
    </li>
  </ul>
</template>

<script>
// X – стоимость монтажа (base)
// Y – Закладка труб/монтаж на заложенную трассу (pipeLayingOrInstallation)
// W – Монтаж/демонтаж внутреннего блока (indoorUnit)
// Z – Демонтаж кондиционера (useDismantling)
// ЕСЛИ (S>O) ТО (X+Y+W) + ЕСЛИ (Z = true) ТО (dismantling) ИНАЧЕ (0)
export default {
  emits: ['change'],
  props: {
    data: Array,
    selected: Object
  },
  methods: {
    change (data) {
      this.$emit('change', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-field
  display flex
  flex 1
  overflow-x auto
  gap 10px
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
</style>
