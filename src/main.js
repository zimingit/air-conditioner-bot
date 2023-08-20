import { createApp } from 'vue'
import App from './App.vue'
import Accordion from './components/UI/Accordion.vue'

import './styles/style.styl'

const main = createApp(App)
main.component('Accordion', Accordion)
main.mount('#app')