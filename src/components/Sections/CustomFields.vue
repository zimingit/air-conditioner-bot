<template>
  <section class="custom-fields-section">
    <FieldHeader label="Своя номенклатура" @click="toggleCustomList">
      <div class="field-header-extends">
        <span v-if="filledFieldsCount">{{filledFieldsCount}}</span>
        <Chevron :opened="showCustomList"/>
      </div>
    </FieldHeader>

    <Accordion>
      <div v-if="showCustomList" class="custom-fields-container">
        <ul class="custom-fields-list">
          <li v-for="[key, field] in fields" :key="key">
            <div class="custom-field-row">

              <input v-model="field.label"
                :name="key + '_label'"
                :class="{ error: !field.labelValid }"
                type="text"
                placeholder="Номенклатура"
                @input="setFilled(key)"
                @change="setError(key)"/>

              <input v-model.number="field.value"
                :name="key + '_value'"
                :class="{ error: !field.valueValid }"
                type="number"
                placeholder="Стоимость"
                @input="setFilled(key)"
                @change="setError(key)"/>

              <span>₽</span>

              <div class="delete-field" @click="deleteField(key)">
                <svg width="16" height="16" viewBox="0 0 40 40" stroke-width="4" stroke="#48494E" stroke-linecap="round" stroke-linejoin="round" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10H8.33333H35"/>
                  <path d="M13.3333 9.99998V6.66665C13.3333 5.78259 13.6845 4.93474 14.3096 4.30962C14.9347 3.6845 15.7826 3.33331 16.6666 3.33331H23.3333C24.2174 3.33331 25.0652 3.6845 25.6903 4.30962C26.3155 4.93474 26.6666 5.78259 26.6666 6.66665V9.99998M31.6666 9.99998V33.3333C31.6666 34.2174 31.3155 35.0652 30.6903 35.6903C30.0652 36.3155 29.2174 36.6666 28.3333 36.6666H11.6666C10.7826 36.6666 9.93474 36.3155 9.30962 35.6903C8.6845 35.0652 8.33331 34.2174 8.33331 33.3333V9.99998H31.6666Z"/>
                  <path d="M16.6667 18.3333V28.3333"/>
                  <path d="M23.3333 18.3333V28.3333"/>
                </svg>
              </div>
            </div>
            <Accordion>
              <div v-if="field.error" class="custom-field-validator">{{field.error}}</div>
            </Accordion>
          </li>
        </ul>
        <div class="custom-fields-buttons">
          <div class="custom-fields-button add" @click="addField">
            {{buttonAddTitle}}
            <svg width="18" height="18" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8.33331V31.6666M8.33337 20H31.6667" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div v-if="filledData.length" class="custom-fields-button apply" @click="change">
            Применить
          </div>
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
      filledFieldsCount: 0,
      fields: new Map()
    }
  },
  methods: {
    toggleCustomList () {
      this.showCustomList = !this.showCustomList
    },
    valueValidator (value) {
      const valueIsValid = !isNaN(value) && value !== ''
      return valueIsValid
    },
    labelValidator (label) {
      const labelValid = label && `${label}`.length > 3
      return labelValid
    },
    setFilled (key) {
      const data = this.fields.get(key)
      const { label, value } = data
      const isValid = this.labelValidator(label) && this.valueValidator(value)
      data.filled = isValid
    },
    setError (key) {
      const data = this.fields.get(key)
      const { label, value } = data
      const labelValid = this.labelValidator(label)
      const valueValid = this.valueValidator(value)

      if (!labelValid && value !== '') {
        data.error = 'Номенклатура должна содержать более 3 символов. '
        data.labelValid = false
      } else if (!valueValid && labelValid) {
        data.error = 'Укажите стоимость.'
        data.valueValid = false
      } else {
        data.labelValid = true
        data.valueValid = true
        data.error = ''
      }
    },
    setFilledCount () {
      this.filledFieldsCount = this.filledData.length
    },
    deleteField (key) {
      this.fields.delete(key)
      this.change()
    },
    addField () {
      const key = +new Date()
      const value = {
        label: '',
        value: '',
        filled: false,
        error: '',
        labelValid: true,
        valueValid: true
      }
      this.fields.set(key, value)
    },
    change () {
      const filled = this.filledData.map(([, value]) => ({ ...value }))
      const fields = [...this.fields]
      fields.forEach(([key, value]) => {
        if (!value.filled) {
          this.deleteField(key)
        }
      })
      this.$emit('change', filled)
      this.setFilledCount()
    }
  },
  computed: {
    filledData () {
      return [...this.fields].filter(([, value]) => value.filled)
    },
    buttonAddTitle () {
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
  .field-header-extends
    display flex
    flex 1
    margin-left -15px
    svg
      margin-left auto
    span
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
  .custom-fields-container
    display flex
    flex-direction column
    .custom-fields-list
      display flex
      flex-direction column
      gap 5px
      padding 5px
      li
        display flex
        flex-direction column
        background-color $grey-light
        padding 5px
        border-radius 20px
        .custom-field-validator
          font-size .7em
          margin-left 10px
          color $grey-dark
        .custom-field-row
          display flex
          align-items center
          gap 5px
          input
            border-radius 50px
            width 100%
            height 30px
            padding 2px 25px 0 10px
            border-bottom 2px solid transparent
            transition border-bottom .2s ease
            &.error
              border-bottom 2px solid $red
            &:focus
              border-bottom 2px solid $green
            &:first-child
              padding 2px 10px 0 10px
              width 200%
          span
            margin-left -25px
            margin-right 10px
          .delete-field
            display flex
            flex-shrink 0
            width 30px
            height 30px
            border-radius 10px
            svg
              margin auto

    .custom-fields-buttons
      display flex
      align-items center
      justify-content center
      gap 5px
      margin 0 5px
      .custom-fields-button
        display flex
        align-items center
        justify-content center
        flex 1
        border-radius 30px
        padding 6px 30px 7px 30px
        font-size .7em
        font-weight 500
        
        &.apply
          background-color $black-light
          color $white
        &.add
          gap 10px
          background-color $grey-light
          svg
            margin-bottom -2px
            stroke currentColor

</style>
