<template>
  <section class="total-price-section">
    <ul>
      <li>
        <h3>Итого</h3> <span>{{ price }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    price: String
  }
}
</script>

<style lang="stylus" scoped>
.total-price-section
  ul
    display flex
    flex-direction column
    color $black-light
    font-size 1.2em
    li
      display flex
      align-items center
      justify-content space-between
      gap 20px
      padding 8px 20px
      span
        font-weight 600
        flex-shrink 0
      h3
        font-size 1.2em
</style>
