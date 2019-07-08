import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import es from 'vuetify/es5/locale/es'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { es },
    current: 'es'
  },
})
