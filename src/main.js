import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Axios from "axios";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  created() {
    // automatic login with local storage
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    // log out fake key attempts
    Axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  render: (h) => h(App),
}).$mount("#app");
