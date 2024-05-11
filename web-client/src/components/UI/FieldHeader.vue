<template>
  <div class="field-header" v-bind="$attrs" v-if="label">
    <h4 v-html="label"></h4>
    <div class="field-header-extends">
      <slot/>
    </div>
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
  margin 15px 15px 10px 15px
  color $black-light
  display flex
  // align-items center
  justify-content space-between
  gap 20px
  sup
    font-size .5em
  .field-header-extends
    display flex
    flex 1
    margin-left -15px
</style>
