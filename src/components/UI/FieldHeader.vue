<template>
  <h4 class="field-header" v-if="label" v-html="label"></h4>
  <slot/>
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
  sup
    font-size .5em
</style>
