<template>
  <section class="wall-chasing-section">
    <FieldHeader label="Штробление стен" @click="toggleList">
      <Badge v-if="filledValuesCount">{{filledValuesCount}}</Badge>
      <Chevron :opened="showList"/>
    </FieldHeader>

    <Accordion>
      <div class="wall-chasing-content" v-if="showList">

        <Accordion>
          <ul v-if="sectionsPreview.length" class="wall-chasing-sections">
            <li v-for="(section, index) in sectionsPreview" :key="index">

              <h5>{{section.label}} 
                <div class="delete-section" @click="deleteSection(index)">
                  <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.25 11.75L11.75 29.25M11.75 11.75L29.25 29.25" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </h5>
              <span>{{section.material}}</span>
              <p v-for="detail in section.details" :key="detail">{{detail}}</p>

            </li>
          </ul>
        </Accordion>

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
          </li>
        </ul>
        <div class="wall-chasing-buttons">
          <div class="wall-chasing-button" :class="{ disabled: !hasValues }" @click="addSection">
            {{buttonAddTitle}}
            <svg width="18" height="18" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8.33331V31.6666M8.33337 20H31.6667" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
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
  props: {
    freonCableChannel: Object
  },
  data () {
    return {
      selectedMaterial: WALLMATERIALS[0],
      wallMaterials: WALLMATERIALS,
      wallChasings: WALLCHASINGS,
      showList: false,
      values: {},
      sections: []
    }
  },
  watch: {
    freonCableChannel () {
      this.setCableType()
    },
  },
  created () {
    this.init()
    this.setCableType()
  },
  methods: {
    init () {
      this.initValues()
      this.setMaterial(WALLMATERIALS[0])
    },
    initValues () {
      this.wallChasings.forEach(chasing => {
        const key = chasing.name
        this.values[key] = 0
      })
    },
    setCableType () {
      const { freonCableChannel } = this
      if (!freonCableChannel) return

      const chasingKey = 'freonRoute'
      const { prices } = this.wallChasings.find(({ name }) => name === chasingKey)

      const priceToSelect = prices.find(option => {
        const { name } = freonCableChannel
        return option.name === name
      })

      if (priceToSelect) {
        this.setSelectedOption(prices, priceToSelect)
      }
    },
    setMaterial (material) {
      this.selectedMaterial = material
      this.change()
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
    },
    getSectionInfo (section, index) {
      const material = section.material.label
      const details = section.chasings
        .filter(({ value }) => value)
        .map(({ label, value }) => `${label}: ${value} м`)
        
      return {
        label: `Секция ${index + 1}`,
        material,
        details
      }
    },

    toggleList () {
      this.showList = !this.showList
    },
    addSection () {
      if (!this.hasValues) return

      const material = this.selectedMaterial
      const chasings = this.wallChasings.map(chasing => {
        const value = this.values[chasing.name]
        return { ...chasing, value }
      })
      this.sections.push({ material, chasings })
      this.init()
      this.change()
    },
    deleteSection (index) {
      this.sections.splice(index, 1)
      this.change()
    },
    change () {
      this.$emit('change', this.sections)
    },
  },
  computed: {
    hasValues () {
      return Object.values(this.values).filter(value => value).length > 0
    },
    sectionsPreview () {
      return this.sections.map(this.getSectionInfo)
    },
    buttonAddTitle () {
      return 'Добавить секцию'
    },
    filledValuesCount () {
      return Object.values(this.sectionsPreview).length
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

  .wall-chasing-sections
    display flex
    gap 10px
    padding 0 15px
    overflow-x auto
    &::-webkit-scrollbar
      display none
    li
      position relative
      display flex
      flex-direction column
      flex-shrink 0
      background-color $grey-light
      padding 5px 5px 10px 5px
      border-radius 15px
      .delete-section
        position absolute
        top 0
        right 0
        display flex
        padding 10px
        svg
          stroke currentColor
      h5
        font-size .8em
        padding 5px 10px 6px 10px
        border-radius 20px
        background-color $grey
      span
        font-size .8em
        font-weight 600
        margin 5px 5px 0 5px
      p
        font-size .7em
        line-height 1em
        margin 0 5px
        color $grey-dark

  .wall-chasing-buttons
    display flex
    align-items center
    justify-content center
    gap 5px
    margin 0 15px
    .wall-chasing-button
      display flex
      align-items center
      justify-content center
      flex 1
      border-radius 30px
      padding 6px 30px 7px 30px
      font-size .7em
      font-weight 500
      gap 10px
      background-color $black-light
      color $white
      transition all .2s ease
      &.disabled
        background-color $grey
        color $black-light
      svg
        margin-bottom -2px
        stroke currentColor
</style>
