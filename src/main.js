import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

// UI Components
import BSImage from "@/components/BSImage.vue";
import BSImageWithBigCaption from "@/components/BSImageWithBigCaption.vue";
Vue.component("BSImage", BSImage);
Vue.component("BSImageWithBigCaption", BSImageWithBigCaption);

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
