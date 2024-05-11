<template>
  <svg class="chevron-icon" :class="{ opened }" width="20" height="20" viewBox="0 0 40 40" stroke="#303030" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 35.5L25.3787 22.6213C26.5503 21.4497 26.5503 19.5503 25.3787 18.3787L12.5 5.5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script>
export default {
  props: {
    opened: Boolean
  }
}
</script>

<style lang="stylus" scoped>
.chevron-icon
  transition transform .1s ease
  flex-shrink 0
  &.opened
    transform rotate(90deg)

.field-header-extends
  .chevron-icon
    margin-left auto
</style>
