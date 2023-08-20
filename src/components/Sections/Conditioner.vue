<template>
  <section class="conditioner-section">
    <FieldHeader :label="title" @click="toggleList"/>

    <Accordion>
      <div v-if="showList">
        <ul class="conditioner-filter">
          <li v-for="data in filters"
            :key="data.label"
            :class="{ selected: filter === data }"
            @click="setFilter(data)">
            {{data.label}}
          </li>
        </ul>

        <GridField 
          class="conditioner-list"
          :data="conditionersList"
          :selected="selected"
          @change="change"/>
      </div>
    </Accordion>
  </section>
</template>

<script>
import GridField from '../Widgets/GridField.vue'
import FieldHeader from '../UI/FieldHeader.vue'
import { conditioners } from '../../dataset/data.js'
export default {
  props: {
    selected: Object
  },
  data () {
    return {
      filters: [
        { label: 'Все', filterFunction: () => true },
        { label: '0-5 кВт', filterFunction: ({ power }) => power <= 5 },
        { label: '5-10 кВт', filterFunction: ({ power }) => power > 5 && power <= 10 },
        { label: '10+ кВт', filterFunction: ({ power }) => power > 10 }
      ],
      filter: null,
      conditioners: conditioners,
      showList: true
    }
  },
  methods: {
    setFilter (filter) {
      if (filter === this.filter) {
        this.filter = null
      }
      this.filter = filter
    },
    toggleList () {
      this.showList = !this.showList
    },
    change (data) {
      this.$emit('change', data)
    }
  },
  computed: {
    conditionersList () {
      if (!this.filter) {
        return this.conditioners
      }
      return this.conditioners.filter(this.filter.filterFunction)
    },
    title () {
      const prefix = 'Модель кондиционера: '
      return this.selected ? prefix + this.selected?.label : prefix + '<b>Не выбрано</b>'
    }
  },
  components: {
    FieldHeader,
    GridField
  }
}
</script>
,
    Accordion
<style lang="stylus" scoped>
.conditioner-section
  display flex
  flex-direction column
  overflow hidden
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
   
</style>
