<template>
  <section class="additional-services-section">
    <FieldHeader label="Дополнительные услуги" @click="toggleList">
      <Badge v-if="filledValuesCount">{{filledValuesCount}}</Badge>
      <Chevron :opened="showList"/>
    </FieldHeader>

    <Accordion>
      <ul v-if="showList" class="services-list">
        <li v-for="service in services" :key="service.name">
          <div class="services-widget">
            <div class="service-info">
              <p>{{service.label}} <b v-if="service?.widget?.unit">({{service?.widget?.unit}})</b></p>
              <span>{{service.description}}</span>
            </div>

            <NumberField v-if="service?.widget?.name === 'number'"
              :name="service.name"
              v-bind="service?.widget?.params"
              :value="values[service.name]"
              @change="(value) => setFieldValue(service, value)"/>
            <SwitcherField v-else-if="service?.widget?.name === 'switcher'"
              v-bind="service?.widget?.params"
              :value="values[service.name]"
              @switch="(value) => setFieldValue(service, value)"/>
          </div>
          <ListField v-if="service.prices.length"
            :data="service.prices"
            :selected="getSelectedOption(service.prices)"
            @change="(selected) => setSelectedOption(service.prices, selected)"/>
        </li>
      </ul>
    
    </Accordion>
  </section>
</template>

<script>
import ListField from '../Widgets/ListField.vue'
import FieldHeader from '../UI/FieldHeader.vue'
import Chevron from '../UI/Chevron.vue'
import Badge from '../UI/Badge.vue'
import SwitcherField from '../UI/Switcher.vue'
import NumberField from '../Widgets/NumberField.vue'
import { ADDITIONALSERVICESEXTENDED } from '../../dataset/data.js'
export default {
  props: {
    conditioner: Object
  },
  data () {
    return {
      showList: false,
      services: [],
      values: {}
    }
  },
  created () {
    this.init()
    this.change()
  },
  methods: {
    init () {
      const initialValuesMatrix = { 'number': 0, 'switcher': false }
      this.services = ADDITIONALSERVICESEXTENDED
        .map(service => {
          // Инициализируем значения полей
          const key = service.name
          const widgetName = service?.widget?.name
          this.values[key] = initialValuesMatrix[widgetName]

          service.prices = service.prices.map((option, index) => {
            return { ...option, selected: index === 0 }
          })
          return service
        })
    },
    getSelectedOption (options) {
      return options.find(option => option.selected)
    },
    setSelectedOption (options, selected) {
      options.forEach(option => {
        option.selected = option.name === selected.name
      })
      this.change()
    },
    setFieldValue (service, value) {
      const key = service.name
      this.values[key] = value
      this.change()
    },
    toggleList () {
      this.showList = !this.showList
    },
    change () {
      const data = this.services.map(service => {
        const value = this.values[service.name]
        return { ...service, value }
      })
      this.$emit('change', data)
    }
  },
  computed: {
    filledValuesCount () {
      return Object.values(this.values).filter(value => value).length
    }
  },
  components: {
    FieldHeader,
    ListField,
    Chevron,
    Badge,
    SwitcherField,
    NumberField
  }
}
</script>

<style lang="stylus" scoped>
.additional-services-section
  display flex
  flex-direction column
  color $black-light
  overflow hidden
  .services-list
    display flex
    flex-direction column
    gap 5px
    padding 10px 0
    li
      display flex
      flex-direction column
      padding 5px 10px 5px 15px
      .services-widget
        display flex
        align-items center
        justify-content space-between
        gap 10px
      .service-info
        display flex
        flex-direction column
        gap 2px
        font-size .9em
        line-height .9em
        b
          font-weight 600
        span
          font-size .8em
          color $grey-dark
</style>
