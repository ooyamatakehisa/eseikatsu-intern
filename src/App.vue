<template>
  <v-app>
    <header-component />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {
  ApiClient,
  AgentQueryAPIApi,
  RentPropertyQueryAPIApi,
} from "./dejima/dejima-client/src/index";
import { FirebaseAuthenticationService } from "./firebase/FirebaseAuthenticationService.js";
import { FirebaseService } from "./firebase/FirebaseService.js";
import Header from "./components/Header.vue";

export default {
  name: "App",

  components: {
    "header-component": Header,
  },

  data: () => ({
  }),
  methods: {},
  created: function() {
    this.$store.commit("apiServices/initialize");
  },
};
</script>
