import Vue from "vue";
import Vuelidate from "vuelidate";
import PortalVue from 'portal-vue';
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./registerServiceWorker";

// UI Components
import BSImage from "@/components/BSImage.vue";
import BSImageWithBigCaption from "@/components/BSImageWithBigCaption.vue";
Vue.component("BSImage", BSImage);
Vue.component("BSImageWithBigCaption", BSImageWithBigCaption);

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(PortalVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
