<template>
  <section v-if="hasData">
    <h5>Дополнительные услуги</h5>
    <ul>
      <li v-for="{ label, value } in servicesPrice" :key="label">
        <p>{{label}}</p>
        <span>{{value.toLocaleString()}} ₽</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  emits: ['change'],
  props: {
    additionalServices: Array
  },
  watch: {
    servicesPrice (to) {
      this.$emit('change', to)
    }
  },
  methods: {
    getSelectedOption ({ prices }) {
      return prices.find(option => option.selected)
    },
    getServiceByName (name)  {
      return this.additionalServices.find(serv => serv.name === name)
    },
    // Стоимость удлинения трассы фреон
    getFreonRouteExtensionPrice (service) {
      const { label: serviceLabel } = service
      const routeLength = service.value
      const selectedOption = this.getSelectedOption(service)
      const label = `${serviceLabel} (${selectedOption.label})`

      let value = null
      if (routeLength > 0) {
        value = routeLength * selectedOption.price
      }
      
      return { label, value }
    },
    // Эл. кабель (свыше 5 м)
    getElectricalCablePrice (service) {
      const { label, price } = service
      const cableLength = service.value

      let value = null
      if (cableLength > 5) {
        value = cableLength * price
      }
      return { label, value }
    },
    // Кабель-канал под эл. кабель
    getElectricCableChannelPrice (service) {
      const { price } = service
      const label = `${service.label} (электрический)`
      const cableLength = service.value
      
      let value = null
      if (cableLength > 0) {
        value = cableLength * price
      }
      return { label, value }
    },
    // Кабель-канал под трассу фреон: Стандартный(simple) / Арктика(arctic)
    getFreonCableChannelPrice (service) {
      const cableLength = service.value
      const { price, name, label: cableLabel } = this.getSelectedOption(service)
      const label = `${service.label} (под фреон "${cableLabel}")`

      let value = null
      if (cableLength > 0.5 && name === 'simple') {
        value = (cableLength - 0.5) * price
      } else if (cableLength && name === 'arctic') {
        value = cableLength * price
      }
      return { label, value }
    },
    // Дренаж (свыше 5 м)
    getDrainagePrice (service) {
      const { label, price } = service
      const drainageLength = service.value
      
      let value = null
      if (drainageLength > 5) {
        value = drainageLength * price
      }
      return { label, value }
    },
    // Дозаправка фреоном при длине трассы более 7 м - работа
    getFreonRefuelingPrice (service) {
      const { price } = service
      const label = `${service.label} (работа)`
      // const useRefueling = service.value
      const routeLength = this.getServiceByName('freonRouteExtension').value

      let value = null
      // if (routeLength > 7 && useRefueling) {
      if (routeLength > 7) {
        value = price
      }
      return { label, value }
    },
    // Фреон (1 кг./100 гр., при дозаправке считаем по 100 гр.)
    getFreonPrice (service) {
      const freonGram = service.value
      const { price, label: freonLabel } = this.getSelectedOption(service)
      const label = `${service.label} (${freonLabel})`

      let value = null
      if (freonGram > 0) {
        value = freonGram * price / 100
      }
      return { label, value }
    },
  },
  computed: {
    hasData () {
      return this.servicesPrice.length > 0
    },
    servicesPrice () {
      const calculateFunctionsByFieldName = {
        freonRouteExtension: this.getFreonRouteExtensionPrice,
        electricalCable: this.getElectricalCablePrice,
        electricCableChannel: this.getElectricCableChannelPrice,
        freonCableChannel: this.getFreonCableChannelPrice,
        drainage: this.getDrainagePrice,
        freonRefueling: this.getFreonRefuelingPrice,
        freon: this.getFreonPrice
      }
      return this.additionalServices
        .map(service => {
          const key = service.name
          const calculate = calculateFunctionsByFieldName[key]
          return calculate(service)
        })
        .filter(({ value }) => value !== null)
    }
  }
}
</script>

<style lang="stylus" scoped>
h5
  padding 20px 20px 5px 20px
  color $black-light
ul
  display flex
  flex-direction column
  color $black-light
  font-size .8em
  li
    display flex
    align-items center
    justify-content space-between
    gap 20px
    padding 8px 20px
    span
      font-weight 500
      flex-shrink 0
    &:nth-child(odd)
      background-color $grey-light

</style>
