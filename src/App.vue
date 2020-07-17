<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <div>{{ dejima_test() }}</div>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import {
  ApiClient,
  AgentQueryAPIApi,
  RentPropertyQueryAPIApi,
} from "./dejima/dejima-client/src/index";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
  methods: {
    dejima_test: async () => {
      const apiClient = new ApiClient();
      apiClient.basePath = process.env.VUE_APP_DEJIMA_API_ROOT;
      apiClient.authentications["APIKeyHeader"].apiKey =
        process.env.VUE_APP_DEJIMA_API_KEY;
      console.log(apiClient.basePath);
      console.log(apiClient.authentications["APIKeyHeader"]);

      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      const callback = function(error, data, response) {
        if (error) {
          console.error(error);
        } else {
          console.log("API called successfully. Returned data: " + data);
          console.log(data);
        }
      };
      const opt = {
        startIndex: 1,
        itemsPerPage: 20,
      };
      rentPropertyQueryAPIApi.searchRentPropertyByBuilding(opt, callback);
    },
  },
};
</script>
