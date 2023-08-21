<template>
  <section class="conditioner-section">
    <FieldHeader :label="title" @click="toggleList"/>

    <Accordion>
      <div v-if="showList">
        <ul class="conditioner-filter">
          <li v-for="label in filters"
            :key="label"
            :class="{ selected: filter === label }"
            @click="setFilter(label)">
            {{label}}
          </li>
        </ul>

        <ul class="conditioners-grid">
          <li v-for="conditioner in conditionersList"
            :key="conditioner.model"
            :class="{ selected: conditioner === selected }"
            @click="change(conditioner)">
            <p class="model">
              <span class="manufacturer">{{conditioner.manufacturer}}</span>
              {{conditioner.model}}
            </p>
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
import { conditioners, types } from '../../dataset/data.js'
export default {
  emits: ['change'],
  props: {
    selected: Object
  },
  data () {
    return {
      filters: ['07', '09', '12', '18', '24', '30', '36'],
      filter: null,
      conditioners: conditioners,
      showList: true
    }
  },
  methods: {
    change (data) {
      this.$emit('change', data)
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
      const type = Object.values(types).find(({ btu }) => btu.includes(this.filter))
      return (conditioner) => conditioner.type === type.label
    },
    conditionersList () {
      if (!this.filter) {
        return this.conditioners
      }
      return this.conditioners.filter(this.filterFunction)
    },
    title () {
      const prefix = 'Модель кондиционера:'
      return this.selected ? `${prefix} <b>${this.selected.manufacturer}</b> ${this.selected.model}` : `${prefix} <b>Не выбрано</b>`
    }
  },
  components: {
    FieldHeader,
    GridField
  }
}
</script>
<style lang="stylus" scoped>
.conditioner-section
  display flex
  flex-direction column
  .conditioner-filter
    display flex
    overflow-x auto
    padding 20px 15px 10px 15px
    gap 10px
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
    padding 10px
    overflow-y auto
    max-height 100%
    &::-webkit-scrollbar
      display none
    li
      display flex
      flex-direction column
      gap 10px
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
      .footer
        display flex
        justify-content space-between
        margin auto -5px 0 -5px
        .price, .btu
          padding 3px 10px
          border-radius 10px
          background $white
          font-size .8em
          font-weight bold

</style>
