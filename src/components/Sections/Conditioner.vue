<template>
  <section class="conditioner-section">
    <FieldHeader :label="title" @click="toggleList">
      <Chevron :opened="showList"/>
    </FieldHeader>

    <Accordion>
      <div v-if="showList">
        <div class="filter-block">
          <p class="label">BTU</p>
          <ul class="conditioner-filter">
            <li v-for="label in filters"
              :key="label"
              :class="{ selected: filter === label }"
              @click="setFilter(label)">
              {{label}}
            </li>
          </ul>
        </div>

        <ul class="conditioners-grid">
          <li v-for="conditioner in conditionersList"
            :key="conditioner.model"
            :class="{ selected: conditioner === selected }"
            @click="change(conditioner)">
            <p class="model">
              <span class="manufacturer">{{conditioner.manufacturer}}</span>
              {{conditioner.model}}
            </p>
            <p class="area">{{conditioner.area.label}} м<sup>2</sup></p>
            <div class="footer">
              <div class="price">{{conditioner.price.toLocaleString()}} ₽</div>
              <div class="btu">{{conditioner.type.toUpperCase()}}</div>
            </div>
          </li>
        </ul>
      </div>
    </Accordion>
  </section>
</template>

<script>
import GridField from '../Widgets/GridField.vue'
import FieldHeader from '../UI/FieldHeader.vue'
import Chevron from '../UI/Chevron.vue'
import { CONDITIONERSEXTENDED, TYPES } from '../../dataset/data.js'
export default {
  emits: ['change'],
  props: {
    selected: Object
  },
  data () {
    return {
      filters: ['07', '09', '12', '18', '24', '30', '36'],
      filter: null,
      conditioners: CONDITIONERSEXTENDED,
      showList: true
    }
  },
  methods: {
    change (data) {
      this.$emit('change', data)
      this.toggleList()
    },
    setFilter (filter) {
      if (filter === this.filter) {
        this.filter = null
        return
      }
      this.filter = filter
    },
    toggleList () {
      this.showList = !this.showList
    }
  },
  computed: {
    filterFunction () {
      if (!this.filter) {
        return () => true
      }
      const type = Object.values(TYPES).find(({ btu }) => btu.includes(this.filter))
      return (conditioner) => conditioner.type === type.label
    },
    conditionersList () {
      if (!this.filter) {
        return this.conditioners
      }
      return this.conditioners.filter(this.filterFunction)
    },
    title () {
      const prefix = 'Кондиционер:'
      if (this.selected) {
        return `${prefix} <b>${this.selected.manufacturer}</b> ${this.selected.model} (<b>${this.selected.price.toLocaleString()}</b> ₽)`
      }
      return `${prefix} <b>Не выбрано</b>`
    }
  },
  components: {
    FieldHeader,
    GridField,
    Chevron
  }
}
</script>
<style lang="stylus" scoped>
.conditioner-section
  display flex
  flex-direction column
  .filter-block
    display flex
    flex-direction column
    color $black-light
    .label
      padding 5px 15px 0 15px
      font-weight 500
    
    .conditioner-filter
      display flex
      gap 10px
      padding 0 15px
      overflow-x auto
      &::-webkit-scrollbar
        display none
      li
        display flex
        align-items center
        justify-content center
        padding 3px 15px
        font-weight 500
        font-size .8em
        flex-shrink 0
        border-radius 20px
        border 2px solid $grey
        &.selected
          background-color $black-light
          border 2px solid $black-light
          color $white

  .conditioners-grid
    display flex
    flex-wrap wrap
    gap 10px
    padding 10px 15px
    overflow-y auto
    max-height 100%
    &::-webkit-scrollbar
      display none
    li
      display flex
      flex-direction column
      padding 10px 15px
      width calc(50% - 5px)
      font-weight 500
      font-size .8em
      flex-shrink 0
      border-radius 15px
      background-color $grey
      color $black-light
      &.selected
        background-color $black-light
        color $white
        .price, .btu
          color $black-light
      .model
        .manufacturer
          font-weight bold
      .area
        font-size .8em
      .footer
        display flex
        justify-content space-between
        margin auto -5px 0 -5px
        padding-top 10px
        .price, .btu
          padding 3px 10px
          border-radius 10px
          background $white
          font-size .8em
          font-weight bold

</style>
