import './assets/main.css'

import BootstrapVue3 from 'bootstrap-vue-3'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

// Since every component imports their Bootstrap functionality,
// the following line is not necessary:
// import 'bootstrap'

import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)
app.use(BootstrapVue3)
app.use(createPinia())

app.mount('#app')
