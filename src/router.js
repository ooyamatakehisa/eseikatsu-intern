import Vue from "vue";
import Router from "vue-router";
import Test from "./components/Test.vue";
import Hello from "./components/HelloWorld.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
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
