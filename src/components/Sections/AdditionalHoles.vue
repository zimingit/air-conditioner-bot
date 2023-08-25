<template>
  <section class="additional-holes-section">
    <FieldHeader label="Проход стен" @click="toggleList">
      <Badge v-if="holesCount">{{holesCount}}</Badge>
      <Chevron :opened="showList"/>
    </FieldHeader>

    <Accordion>
      <div class="additional-holes-content" v-if="showList">

        <Accordion>
          <ul v-if="holesPreview.length" class="additional-holes-list">
            <li v-for="(hole, index) in holesPreview" :key="index">

              <h5>{{hole.label}} 
                <div class="delete-hole" @click="deleteHole(index)">
                  <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.25 11.75L11.75 29.25M11.75 11.75L29.25 29.25" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </h5>
              <span>{{hole.material}}</span>
              <p>{{hole.type}}</p>
              <p v-if="hole.useDiamondDrill">Алмазное бурение</p>

            </li>
          </ul>
        </Accordion>

        <div class="additional-holes-config">
          <div class="additional-holes-config-item">
            <h5>Толщина</h5>
            <ListField class="wall-types"
                  :data="wallTypes"
                  :selected="selectedWallType"
                  @change="setWallType"/>
          </div>
          
          <div class="additional-holes-config-item">
            <h5>Материал</h5>
            <ListField class="material-types"
                  :data="materials"
                  :selected="selectedMaterial"
                  @change="setMaterial"/>
          </div>

          <div class="additional-holes-config-item">
            <h5>Назначение</h5>
            <ListField class="hole-types"
                  :data="holeTypes"
                  :selected="selectedHoleType"
                  @change="setHoleType"/>
          </div>

          <Accordion>
            <div v-if="showDiamonsDrill" class="additional-holes-use-diamond" @click="toggleDiamonsDrill">
              <h5>Алмазное бурение</h5>
              <SwitcherField :value="useDiamondDrill"/>
            </div>
          </Accordion>
        </div>
        
        <div class="additional-holes-buttons">
          <div class="additional-holes-button" @click="addHole">
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
import SwitcherField from '../UI/Switcher.vue'
import { WALLHOLEMATERIALS, WALLTYPES, HOLETYPES, DIAMONDDRILLINGBYMATERIAL } from '../../dataset/data.js'
export default {
  data () {
    return {
      showList: false,
      useDiamondDrill: false,
      selectedWallType: null,
      selectedMaterial: null,
      selectedHoleType: null,
      materials: WALLHOLEMATERIALS,
      wallTypes: WALLTYPES,
      holeTypes: HOLETYPES,
      holes: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const [material] = WALLHOLEMATERIALS
      const [wall] = WALLTYPES
      const [hole] = HOLETYPES
      this.setMaterial(material)
      this.setWallType(wall)
      this.setHoleType(hole)
    },
    addHole () {
      const { prices } = this.selectedHoleType
      const wall = this.selectedWallType.name
      const material = this.selectedWallType.name
      const diamondDrillPrice = DIAMONDDRILLINGBYMATERIAL[material]
      const holePrice = prices[wall][material]

      const data = {
        material: { ...this.selectedMaterial },
        wallType: { ...this.selectedWallType },
        holeType: { ...this.selectedHoleType },
        useDiamondDrill: this.useDiamondDrill,
        price: this.useDiamondDrill ? diamondDrillPrice + holePrice : holePrice
      }
      this.holes.push(data)
      this.change()
      this.init()
    },
    deleteHole (index) {
      this.holes.splice(index, 1)
      this.change()
    },
    change () {
      this.$emit('change', this.holes)
    },

    // Выбор конфигурационных параметров
    setMaterial (material) {
      this.selectedMaterial = material
    },
    setWallType (wallType) {
      this.selectedWallType = wallType
    },
    setHoleType (holeType) {
      this.selectedHoleType = holeType
    },
    toggleDiamonsDrill () {
      return this.useDiamondDrill = !this.useDiamondDrill
    },

    toggleList () {
      this.showList = !this.showList
    },
    getHoleInfo (hole, index) {
      const { holeType, material, useDiamondDrill } = hole
        
      return {
        label: `Отверстие ${index + 1}`,
        material: material.label,
        type: holeType.label,
        useDiamondDrill
      }
    },
  },
  computed: {
    holesPreview () {
      return this.holes.map(this.getHoleInfo)
    },
    buttonAddTitle () {
      return 'Добавить отверстие'
    },
    showDiamonsDrill () {
      return this.selectedWallType?.name === 'large'
    },
    holesCount () {
      return Object.values(this.holes).length
    }
  },
  components: {
    FieldHeader,
    ListField,
    Chevron,
    Badge,
    SwitcherField
  }
}
</script>

<style lang="stylus" scoped>
.additional-holes-section
  display flex
  flex-direction column
  color $black-light
  overflow hidden
  .additional-holes-config
    display flex
    flex-direction column
    .additional-holes-config-item
      display flex
      flex-direction column
      gap 5px
      margin-bottom 15px
      h5
        font-weight 500
      h5, ul
        padding 0 15px
    .additional-holes-use-diamond
      display flex
      justify-content space-between
      align-items center
      background-color $grey-light
      border-radius 20px
      padding 10px 10px 10px 15px
      margin 5px 10px

  .additional-holes-buttons
    display flex
    align-items center
    justify-content center
    gap 5px
    margin 15px
    .additional-holes-button
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
      svg
        margin-bottom -2px
        stroke currentColor

  .additional-holes-list
    display flex
    gap 10px
    padding 0 15px 15px 15px
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
      .delete-hole
        position absolute
        top 0
        right 0
        display flex
        padding 10px
        svg
          stroke currentColor
      h5
        font-size .8em
        padding 5px 25px 6px 10px
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
</style>
