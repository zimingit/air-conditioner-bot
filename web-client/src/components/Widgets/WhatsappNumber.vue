<template>
  <div class="widget-whatsapp-number">

    <input v-model="telephone"
      type="tel"
      name="phone"
      placeholder="Телефон - 7 999 333 22 11"
      autofocus
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
    <button type="button" @click="send">Отправить</button>
    <button type="button" @click="close">Закрыть</button>

  </div>
</template>

<script>

export default {
  emits: ['send', 'close'],
  data () {
    return {
      telephone: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    send () {
      this.$emit('send', this.telephone)
      this.close()
    }
  }
}
</script>

<style lang="stylus" scoped>
.widget-whatsapp-number
  position fixed
  z-index 20
  top 0
  left 0
  right 0 
  bottom 0
  background-color $white
  color $black-light
  display flex
  flex-direction column
  align-items center
  gap 20px
  padding 20px 0 50px 0
  input
    border 3px solid $grey-dark
    border-radius 15px
    padding 0 20px
    height 80px
    font-size 1.5em
    width calc(100% - 30px)
    &:focus
      border-color $green
  button
    border-radius 30px
    padding 10px 20px
    width calc(100% - 30px)

</style>
