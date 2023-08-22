<template>
  <section class="custom-fields-section">
    <FieldHeader :label="title" @click="toggleCustomList">
      <Chevron :opened="showCustomList"/>
    </FieldHeader>

    <Accordion>
      <div v-if="showCustomList" class="custom-fields-container">
        <ul class="custom-fields-list">
          <li v-for="[key, field] in fields" :key="key">
            <input type="text" v-model="field.label" placeholder="Номенклатура" @input="setFilled(key)" @change="change"/>
            <input type="number" v-model.number="field.value" placeholder="Цена" @input="setFilled(key)" @change="change"/>
            <span>₽</span>

            <div class="delete-field" @click="deleteField(key)">
              <svg width="16" height="16" viewBox="0 0 40 40" stroke-width="3" stroke="#48494E" stroke-linecap="round" stroke-linejoin="round" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10H8.33333H35"/>
                <path d="M13.3333 9.99998V6.66665C13.3333 5.78259 13.6845 4.93474 14.3096 4.30962C14.9347 3.6845 15.7826 3.33331 16.6666 3.33331H23.3333C24.2174 3.33331 25.0652 3.6845 25.6903 4.30962C26.3155 4.93474 26.6666 5.78259 26.6666 6.66665V9.99998M31.6666 9.99998V33.3333C31.6666 34.2174 31.3155 35.0652 30.6903 35.6903C30.0652 36.3155 29.2174 36.6666 28.3333 36.6666H11.6666C10.7826 36.6666 9.93474 36.3155 9.30962 35.6903C8.6845 35.0652 8.33331 34.2174 8.33331 33.3333V9.99998H31.6666Z"/>
                <path d="M16.6667 18.3333V28.3333"/>
                <path d="M23.3333 18.3333V28.3333"/>
              </svg>
            </div>

          </li>
        </ul>
        <div class="custom-fields-add" @click="addField">
          {{buttonTitle}}
          <svg width="18" height="18" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 8.33331V31.6666M8.33337 20H31.6667" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </Accordion>
  </section>
</template>

<script>
import FieldHeader from '../UI/FieldHeader.vue'
import Chevron from '../UI/Chevron.vue'
export default {
  emits: ['change'],
  props: {
    selected: Object
  },
  data () {
    return {
      showCustomList: false,
      fields: new Map()
    }
  },
  methods: {
    toggleCustomList () {
      this.showCustomList = !this.showCustomList
    },
    setFilled (key) {
      const data = this.fields.get(key)
      const { label, value } = data
      const valueIsNumber = !isNaN(value)
      const labelValid = label && `${label}`.length > 3
      const isValid = labelValid && valueIsNumber
      data.filled = isValid
    },
    deleteField (key) {
      this.fields.delete(key)
      this.change()
    },
    addField () {
      const key = +new Date()
      const value = {
        label: '',
        value: undefined,
        filled: false
      }
      this.fields.set(key, value)
    },
    change () {
      const filled = this.filledData.map(([, value]) => value)
      this.$emit('change', filled)
    }
  },
  computed: {
    filledData () {
      return [...this.fields].filter(([, value]) => value.filled)
    },
    title () {
      const filledCount = this.filledData.length
      return Boolean(filledCount) ? `Дополнительно (<b>${filledCount}</b>)` : `Дополнительно`
    },
    buttonTitle () {
      return this.fields.size === 0 ? `Создать номенклатуру` : `Добавить`
    }
  },
  components: {
    FieldHeader,
    Chevron
  }
}
</script>

<style lang="stylus" scoped>
.custom-fields-section
  display flex
  flex-direction column
  overflow hidden
  color $black-light
  .custom-fields-container
    display flex
    flex-direction column
    .custom-fields-list
      display flex
      flex-direction column
      gap 5px
      li
        display flex
        align-items center
        padding 5px 10px 5px 15px
        gap 5px
        background-color $grey-light
        input
          border-radius 10px
          width 100%
          height 30px
          padding 0 20px 0 10px
          &:first-child
            padding 0 10px
            width 150%
        span
          margin-left -20px
          margin-right 10px
        .delete-field
          display flex
          flex-shrink 0
          width 30px
          height 30px
          border-radius 10px
          svg
            margin auto

    .custom-fields-add
      display flex
      align-items center
      justify-content center
      gap 10px
      border-radius 30px
      padding 5px 30px 8px 30px
      margin 5px 15px
      font-size .8em
      font-weight 500
      background-color $grey-light
      svg
        margin-bottom -2px
        stroke currentColor

</style>
