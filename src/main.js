import Vue from "vue";
import App from "./App.vue";
import Toastr from "./components/Toastr/Toastr";
import utilities from "./common/utilities/utilities";
import app from "./common/constants/app";

Object.defineProperty(Vue.prototype, "$Toastr", { value: Toastr });
Object.defineProperty(Vue.prototype, "$utilities", { value: utilities });
Object.defineProperty(Vue.prototype, "$app", { value: app });
require("./styles/main.css");
require("./components/Toastr/toastr.css");
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
