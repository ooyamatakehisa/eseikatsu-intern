import Vue from "vue";
import Router from "vue-router";
import Test from "./components/Test.vue";
import Hello from "./components/HelloWorld.vue";
import Home from "./views/Home.vue";

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
      path: "/root",
      name: "root",
      component: Hello,
    },
    {
      path: "/test",
      name: "test",
      component: Test,
    },
  ],
});
