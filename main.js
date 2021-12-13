import Vue from 'vue'
import App from './App'

import animated from "@/static/css/animate.min.css"
import music from "@/common/music.js"

Vue.use(animated)

Vue.config.productionTip = false

App.mpType = 'app'

// #ifdef H5
const vconsole = require('vconsole')
Vue.prototype.$vconsole = new vconsole()
// #endif

Vue.prototype.$music = music

const app = new Vue({
    ...App
})
app.$mount()
