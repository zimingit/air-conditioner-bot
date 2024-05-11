<template>
  <ul class="grid-field">
    <li v-for="item in data"
      :key="item.key || item.label"
      :class="{ selected: item === selected }"
      @click="change(item)">
      <p>{{item.label}}</p>
      <p>{{item.price}}</p>
    </li>
  </ul>
</template>

<script>
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
.grid-field
  display flex
  flex-wrap wrap
  gap 10px
  padding 10px
  overflow-x auto
  &::-webkit-scrollbar
    display none
  li
    display flex
    flex-direction column
    align-items center
    justify-content center
    width calc(50% - 5px)
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
