<template>
  <div class="badge">
    <slot/>
  </div>
</template>

<style lang="stylus" scoped>
.badge
  font-weight bold
  font-size .7em
  display flex
  align-items center
  justify-content center
  padding 0 6px 1px 6px
  min-width 20px
  height 20px
  border-radius 20px
  background-color $black-light
  color $white
</style>
