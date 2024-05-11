<template>
  <div class="preview">
    <div class="back" @click="close">
      <Chevron/>
      Назад
    </div>
    <div class="actions">
      <div class="save" @click="print">Скачать</div>
      <div class="send" @click="send">Отправить</div>
    </div>
    <div class="print-section" ref="print">
      <TotalInstallation :conditioner="conditioner" :useDismantling="useDismantling"/>
      <TotalAdditionalServices :additionalServices="additionalServices" @change="setTotalServices"/>
      <TotalWallChasing :wallChasingSections="wallChasingSections" @change="setTotalWallChasing"/>
      <TotalAdditionalHoles :additionalHoles="additionalHoles" @change="setTotalHoles"/>
      <TotalCustomFields :customFields="customFields" @change="setTotalCustomFields"/>
      <TotalPrice :price="total"/>
    </div>
  </div>
  
</template>

<script>
import html2pdf from 'html-to-pdf-js'
import Chevron from './UI/Chevron.vue'
import TotalInstallation from './Sections/Total/TotalInstallation.vue'
import TotalCustomFields from './Sections/Total/TotalCustomFields.vue'
import TotalAdditionalServices from './Sections/Total/TotalAdditionalServices.vue'
import TotalWallChasing from './Sections/Total/TotalWallChasing.vue'
import TotalAdditionalHoles from './Sections/Total/TotalAdditionalHoles.vue'
import TotalPrice from './Sections/Total/TotalPrice.vue'
export default {
  emits: ['close'],
  props: {
    conditioner: Object,
    customFields: Array,
    additionalServices: Array,
    wallChasingSections: Array,
    additionalHoles: Array,
    useDismantling: Boolean
  },
  data () {
    return {
      totalHoles: 0,
      totalWallChasing: 0,
      totalServicesPrice: 0,
      totalCustomFieldsPrice: 0
      // Для посчитанной детальной информации
      // services: [],
      // wallChasing: []
    }
  },
  methods: {
    send () {
      const node = this.$refs.print
      const options = {
        margin:       10,
        filename:     'offer.pdf',
        html2canvas:  { scale: 2 }
      }
      html2pdf().set(options).from(node).toPdf().output('datauristring')
        .then(pdfAsString => {
          const [type, base64Data] = pdfAsString.split(',')
          const url = 'api/addoffer'
          const data = JSON.stringify({
            user: Telegram.WebApp.initDataUnsafe.user || {},
            type,
            filename: 'offer.pdf',
            base64: base64Data
          })
          const config = {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: data
          }
          fetch(url, config)
          .then(response => response.json())
          .then(response => {
            console.log('Result data:', data)
            console.log(response)
          })
        })
    },
    print () {
      const node = this.$refs.print
      const options = {
        margin:       10,
        filename:     'offer.pdf',
        html2canvas:  { scale: 2 }
      }
      html2pdf().set(options).from(node).save()
    },
    getValueSumm (data = []) {
      return data.reduce((acc, { value }) => acc + value, 0)
    },
    setTotalHoles (holes) {
      this.totalHoles = this.getValueSumm(holes)
    },
    setTotalWallChasing (chasing) {
      // this.wallChasing = chasing
      this.totalWallChasing = this.getValueSumm(chasing)
    },
    setTotalServices (services) {
      // this.services = services
      this.totalServicesPrice = this.getValueSumm(services)
    },
    setTotalCustomFields (fields) {
      this.totalCustomFieldsPrice = this.getValueSumm(fields)
    },
    close () {
      this.$emit('close')
    }
  },
  computed: {
    total () {
      const { price, area } = this.conditioner
      const { base, pipeLayingOrInstallation, indoorUnit, dismantling } = area
      const dismantlingPrice = this.useDismantling ? dismantling : 0
      const otherServices = this.totalCustomFieldsPrice + this.totalServicesPrice + this.totalWallChasing + this.totalHoles

      const totalPrice = price + base + pipeLayingOrInstallation + indoorUnit + dismantlingPrice + otherServices
      return `${totalPrice.toLocaleString()} ₽`
    }
  },
  components: {
    Chevron,
    TotalInstallation,
    TotalCustomFields,
    TotalAdditionalServices,
    TotalWallChasing,
    TotalAdditionalHoles,
    TotalPrice
  }
}
</script>

<style lang="stylus" scoped>
.preview
  position fixed
  z-index 10
  top 0
  left 0
  right 0 
  bottom 0
  background-color $white
  color $black-light
  display flex
  flex-direction column
  gap 10px
  padding 20px 0 50px 0
  overflow-y auto
  .back
    display flex
    align-items center
    margin 0 15px
    gap 10px
    background-color $grey-light
    padding 10px 20px
    border-radius 30px
    svg
      transform scale(-1, 1)
  .actions
    display flex
    gap 15px
    margin 0 20px
    .save,
    .send
      display flex
      justify-content center
      flex 1
      padding 5px 20px 5px 20px
      background-color $black-light
      color $white
      border-radius 30px
      font-weight 600
  .print-section
    display flex
    flex-direction column
    gap 5px
</style>
