<template>
  <div class="field-header" v-bind="$attrs" v-if="label">
    <h4 v-html="label"></h4>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    label: String
  }
}
</script>

<style lang="stylus" scoped>
.field-header
  margin 15px 15px 5px 15px
  color $black-light
  display flex
  align-items center
  justify-content space-between
  gap 20px
  sup
    font-size .5em
</style>
