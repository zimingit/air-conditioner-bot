<template>
  <section class="additional-services-section">
    <FieldHeader label="Дополнительные услуги"  @click="toggleServices">
      <Chevron :opened="showServices"/>
    </FieldHeader>

    <Accordion>
      <ul v-if="showServices">
        <li v-for="service in services" :key="service.name">
          <div class="service-info">
            <p>{{service.label}} <b v-if="service?.widget?.unit">({{service?.widget?.unit}})</b></p>
            <span>{{service.description}}</span>
          </div>

          <NumberField v-if="service?.widget?.name === 'number'"
            v-bind="service?.widget?.params"
            :value="values[service.name]"
            @change="(value) => setFieldValue(service.name, value)"/>
          <SwitcherField v-else-if="service?.widget?.name === 'switcher'"
            v-bind="service?.widget?.params"
            :value="values[service.name]"
            @switch="(value) => setFieldValue(service.name, value)"/>
        </li>
      </ul>
    <!-- <ListField
      class="area-list"
      :data="areas"
      :selected="selected"
      @change="change"/> -->
    </Accordion>
  </section>
</template>

<script>
import ListField from '../Widgets/ListField.vue'
import FieldHeader from '../UI/FieldHeader.vue'
import Chevron from '../UI/Chevron.vue'
import SwitcherField from '../UI/Switcher.vue'
import NumberField from '../Widgets/NumberField.vue'
import { ADDITIONALSERVICESEXTENDED } from '../../dataset/data.js'
export default {
  props: {
    conditioner: Object
  },
  data () {
    return {
      showServices: false,
      services: [],
      values: {}
    }
  },
  created () {
    this.init()
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
    setFieldValue (key, value) {
      this.values[key] = value
    },
    toggleServices () {
      this.showServices = !this.showServices
    },
    change (data) {
      this.$emit('change', data)
    }
  },
  components: {
    FieldHeader,
    ListField,
    Chevron,
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
  ul
    display flex
    flex-direction column
    gap 5px
    li
      display flex
      align-items center
      justify-content space-between
      padding 5px 15px
      gap 20px
      
      .service-info
        display flex
        flex-direction column
        font-size .9em
        line-height .9em
        b
          font-weight 600
        span
          font-size .8em
          color $grey-dark
</style>
