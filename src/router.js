import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import PropertyDetails from "./components/PropertyDetails.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: PropertyDetails,
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 20 }
      }
    }
  }
});
