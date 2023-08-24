<template>
  <section class="wall-chasing-section">
    <FieldHeader label="Штробление стен" @click="toggleList">
      <Badge v-if="filledValuesCount">{{filledValuesCount}}</Badge>
      <Chevron :opened="showList"/>
    </FieldHeader>

    <Accordion>
      <div class="wall-chasing-content" v-if="showList">
        <ListField class="wall-chasing-materials"
              :data="wallMaterials"
              :selected="selectedMaterial"
              @change="setMaterial"/>

        <ul class="wall-chasing-list">
          <li v-for="chasing in wallChasings" :key="chasing.name">
            <div class="wall-chasing-widget">
              <div class="wall-chasing-info">
                <p>{{chasing.label}} <b>(м)</b></p>
              </div>

              <NumberField 
                :name="chasing.name"
                :value="values[chasing.name]"
                @change="(value) => setFieldValue(chasing, value)"/>
            </div>
            <ListField v-if="chasing.prices"
              :data="chasing.prices"
              :selected="getSelectedOption(chasing.prices)"
              @change="(selected) => setSelectedOption(chasing.prices, selected)"/>
          </li>
        </ul>
      </div>
    </Accordion>
  </section>
</template>

<script>
import ListField from '../Widgets/ListField.vue'
import FieldHeader from '../UI/FieldHeader.vue'
import Chevron from '../UI/Chevron.vue'
import Badge from '../UI/Badge.vue'
import NumberField from '../Widgets/NumberField.vue'
import { WALLMATERIALS, WALLCHASINGS } from '../../dataset/data.js'
export default {
  data () {
    return {
      selectedMaterial: WALLMATERIALS[0],
      wallMaterials: WALLMATERIALS,
      wallChasings: WALLCHASINGS,
      showList: false,
      values: {}
    }
  },
  created () {
    this.initValues()
    this.change()
  },
  methods: {
    // setPrices () {
    //   const materialKey = this.selectedMaterial.name
    //   this.wallChasings.forEach(chasing => {
    //     const key = chasing.name
    //     let { price, prices } = chasing
    //     if (prices) {
    //       price = this.getSelectedOption(prices).price
    //     }
    //     this.values[key] = price[materialKey]
    //   })
    // },
    initValues () {
      this.wallChasings.forEach(chasing => {
        const key = chasing.name
        this.values[key] = 0
      })
    },
    setMaterial (material) {
      this.selectedMaterial = material
      this.change()
    },
    getSelectedOption (options) {
      const [firstOption] = options
      return options.find(option => option.selected) || firstOption
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
      const material = this.selectedMaterial
      const data = this.wallChasings.map(chasing => {
        const value = this.values[chasing.name]
        return { ...chasing, value, material }
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
    NumberField
  }
}
</script>

<style lang="stylus" scoped>
.wall-chasing-section
  display flex
  flex-direction column
  color $black-light
  overflow hidden
  .wall-chasing-materials
    padding 10px 15px
  .wall-chasing-list
    display flex
    flex-direction column
    padding-bottom 10px
    li
      display flex
      flex-direction column
      padding 5px 10px 5px 15px
      .wall-chasing-widget
        display flex
        align-items center
        justify-content space-between
        gap 10px
      .wall-chasing-info
        display flex
        flex-direction column
        gap 2px
        font-size .9em
        line-height .9em
        b
          font-weight 600
</style>
