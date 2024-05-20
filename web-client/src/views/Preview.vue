<template>
  <div class="preview">
    <div class="back" @click="close">
      <Chevron/>
      Назад
    </div>

    <div class="actions">
      <button v-if="showDownloadButton" type="button" class="action-button" @click="print">
        Скачать
      </button>
      <button v-if="showTelegramButton" type="button" class="action-button" @click="send">
        Отправить в Telegram
        <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.90806 15.999C2.73806 16.4904 2.01087 17.367 2.00007 18.6054C1.99287 19.4694 2.57606 20.634 3.74786 21.1074C4.23026 21.3054 11.0018 22.2162 11.0018 22.2162C11.0018 22.2162 12.7928 27.8807 13.439 29.8715C13.6262 30.4475 13.7324 30.7301 14.141 31.1063C14.8394 31.7435 16.0166 31.5437 16.5242 31.0325C17.8724 29.6825 20 27.5999 20 27.5999L20.8964 28.3289C20.8964 28.3289 24.8744 31.5023 27.0488 32.9963C28.3286 33.8765 29.2178 34.7945 30.6596 34.7999C31.394 34.8035 32.5712 34.4381 33.3488 33.5471C33.8636 32.9585 34.193 32.0171 34.3208 31.1711C34.6106 29.2559 38.0144 8.52719 38 7.79999C37.9939 7.32357 37.8015 6.86845 37.4641 6.53204C37.1267 6.19564 36.671 6.00466 36.1946 6C35.687 6.0036 35.2676 6.1512 34.3352 6.4356C27.1262 8.63699 4.38686 15.7992 3.90806 15.999ZM17.5034 23.4743C21.2996 19.6692 30.8 11.3982 30.8 11.3982L14.24 20.5062L16.202 26.7827C16.202 26.7827 16.2866 24.6911 17.5034 23.4743Z"/>
        </svg>
      </button>

      <!-- <button type="button" class="action-button" @click="toggleWhatsapp(true)">
        WhatsApp
        <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
          <path d="M20.004 4H19.996C11.174 4 4 11.176 4 20C4 23.5 5.128 26.744 7.046 29.378L5.052 35.322L11.202 33.356C13.732 35.032 16.75 36 20.004 36C28.826 36 36 28.822 36 20C36 11.178 28.826 4 20.004 4ZM29.314 26.594C28.928 27.684 27.396 28.588 26.174 28.852C25.338 29.03 24.246 29.172 20.57 27.648C15.868 25.7 12.84 20.922 12.604 20.612C12.378 20.302 10.704 18.082 10.704 15.786C10.704 13.49 11.87 12.372 12.34 11.892C12.726 11.498 13.364 11.318 13.976 11.318C14.174 11.318 14.352 11.328 14.512 11.336C14.982 11.356 15.218 11.384 15.528 12.126C15.914 13.056 16.854 15.352 16.966 15.588C17.08 15.824 17.194 16.144 17.034 16.454C16.884 16.774 16.752 16.916 16.516 17.188C16.28 17.46 16.056 17.668 15.82 17.96C15.604 18.214 15.36 18.486 15.632 18.956C15.904 19.416 16.844 20.95 18.228 22.182C20.014 23.772 21.462 24.28 21.98 24.496C22.366 24.656 22.826 24.618 23.108 24.318C23.466 23.932 23.908 23.292 24.358 22.662C24.678 22.21 25.082 22.154 25.506 22.314C25.938 22.464 28.224 23.594 28.694 23.828C29.164 24.064 29.474 24.176 29.588 24.374C29.7 24.572 29.7 25.502 29.314 26.594Z"/>
        </svg>
      </button> -->
    </div>

    <div class="print-section" ref="print">
      <TotalInstallation :conditioner="conditioner" :useDismantling="useDismantling"/>
      <TotalAdditionalServices :additionalServices="additionalServices" @change="setTotalServices"/>
      <TotalWallChasing :wallChasingSections="wallChasingSections" @change="setTotalWallChasing"/>
      <TotalAdditionalHoles :additionalHoles="additionalHoles" @change="setTotalHoles"/>
      <TotalCustomFields :customFields="customFields" @change="setTotalCustomFields"/>
      <TotalPrice :price="total"/>
    </div>
    <WhatsappNumber v-if="showWhatsappNumber" @send="send" @close="toggleWhatsapp"/>
  </div>
  
</template>

<script>
import html2pdf from 'html-to-pdf-js'
import Chevron from '../components/UI/Chevron.vue'
import TotalInstallation from '../components/Sections/Total/TotalInstallation.vue'
import TotalCustomFields from '../components/Sections/Total/TotalCustomFields.vue'
import TotalAdditionalServices from '../components/Sections/Total/TotalAdditionalServices.vue'
import TotalWallChasing from '../components/Sections/Total/TotalWallChasing.vue'
import TotalAdditionalHoles from '../components/Sections/Total/TotalAdditionalHoles.vue'
import TotalPrice from '../components/Sections/Total/TotalPrice.vue'
import WhatsappNumber from '../components/Widgets/WhatsappNumber.vue'

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
      totalCustomFieldsPrice: 0,
      showWhatsappNumber: false
    }
  },
  methods: {
    send (phone) {
      const messengerName = phone ? 'whatsapp' : 'telegram'
      const node = this.$refs.print
      const options = {
        margin: 10,
        filename:'offer.pdf',
        html2canvas: { scale: 2 }
      }
      html2pdf().set(options).from(node).toPdf().output('datauristring')
        .then(pdfAsString => {
          const [type, base64Data] = pdfAsString.split(',')
          const url = 'api/addoffer'
          const data = JSON.stringify({
            user: Telegram.WebApp.initDataUnsafe.user || {},
            type,
            messenger: {
              name: messengerName,
              phone
            },
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
            if (this.showTelegramButton) {
              Telegram.WebApp.close()
            }
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
    toggleWhatsapp (show = false) {
      this.showWhatsappNumber = show
    },
    getValueSumm (data = []) {
      return data.reduce((acc, { value }) => acc + value, 0)
    },
    setTotalHoles (holes) {
      this.totalHoles = this.getValueSumm(holes)
    },
    setTotalWallChasing (chasing) {
      this.totalWallChasing = this.getValueSumm(chasing)
    },
    setTotalServices (services) {
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
    showTelegramButton () {
      return Boolean(Telegram.WebApp.initData)
    },
    showDownloadButton () {
      return !this.showTelegramButton
    },
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
    TotalPrice,
    WhatsappNumber
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
    margin 0 15px
    .action-button
      display flex
      justify-content center
      align-items center
      gap 20px
      flex 1
      padding 5px 5px 5px 20px
      min-height 50px
      background-color $black-light
      color $white
      border-radius 30px
      font-weight 600
      font-size 1.3em
      line-height 1px
  .print-section
    display flex
    flex-direction column
    gap 5px
</style>
