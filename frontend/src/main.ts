import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faCircleInfo, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faCircleInfo, faGear)

const app = createApp(App)

app.use(createPinia())
app.component('fa', FontAwesomeIcon)

app.mount('#app')
