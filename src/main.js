import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueGeolocation)
Vue.config.productionTip = false

Vue.use(VueToast)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBSML3PkHJX2Ao7_UE_dWQ3gQX9kxwX4aI',
    libraries: 'places'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
