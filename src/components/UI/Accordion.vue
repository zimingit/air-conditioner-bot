<template>
  <Transition name="expand"
    @enter="enter"
    @afterEnter="afterEnter"
    @leave="leave">
    <slot/>
  </Transition>
</template>

<script>
export default {
  methods: {
    enter (element) {
      const { width } = getComputedStyle(element)
      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const { height, marginTop, marginBottom, paddingTop, paddingBottom } = getComputedStyle(element)
      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0
      element.style.marginBottom = 0
      element.style.marginTop = 0
      element.style.paddingTop = 0
      element.style.paddingBottom = 0

      // eslint-disable-next-line
      getComputedStyle(element).height
      requestAnimationFrame(_ => {
        element.style.height = height
        element.style.marginBottom = marginBottom
        element.style.marginTop = marginTop
        element.style.paddingTop = paddingTop
        element.style.paddingBottom = paddingBottom
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    },
    leave (element) {
      const { height, marginTop, marginBottom, paddingTop, paddingBottom } = getComputedStyle(element)
      element.style.height = height
      element.style.marginBottom = marginBottom
      element.style.marginTop = marginTop
      element.style.paddingTop = paddingTop
      element.style.paddingBottom = paddingBottom

      // debugger
      // eslint-disable-next-line
      getComputedStyle(element).height
      requestAnimationFrame(_ => {
        element.style.height = 0
        element.style.marginBottom = 0
        element.style.marginTop = 0
        element.style.paddingTop = 0
        element.style.paddingBottom = 0
        setTimeout(() => {
          element.style.marginBottom = marginBottom
          element.style.marginTop = marginTop
          element.style.paddingTop = paddingTop
          element.style.paddingBottom = paddingBottom
        }, 199)
      })
    }
  }
}
</script>

<style lang="stylus">
.expand-enter-active,
.expand-leave-active
  transition height .2s ease, opacity .2s ease, margin .2s ease, padding .2s ease
  overflow hidden

.expand-enter-from,
.expand-leave-to
  height 0
  opacity 0
</style>
