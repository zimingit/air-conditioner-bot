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
    padding 5px 20px
    font-weight 500
    font-size .8em
    flex-shrink 0
    border-radius 20px
    background-color $grey-light
    transition all .1s ease
    &.selected
      background-color $black-light
      color $white
</style>
