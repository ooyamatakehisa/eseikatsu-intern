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
      <router-view />
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
import { FirebaseAuthenticationService } from "./firebase/FirebaseAuthenticationService.js";
import { FirebaseService } from "./firebase/FirebaseService.js";

export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  methods: {
    // vueのmethods内でアロー関数を使うとthisなどの参照がおかしくなるので注意
    window: (onload = async function() {
      await dejima_test();
      await firebase_test();
      await firebase_auth_test();
    }),
    transitTest: function() {
      this.$router.push({
        path: "test",
      });
    },
  },
};

const dejima_test = async () => {
  const apiClient = new ApiClient();
  apiClient.basePath = process.env.VUE_APP_DEJIMA_API_ROOT;
  apiClient.authentications["APIKeyHeader"].apiKey =
    process.env.VUE_APP_DEJIMA_API_KEY;

  const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
  const opt = {
    startIndex: 1,
    itemsPerPage: 20,
  };
  const result = await rentPropertyQueryAPIApi.searchRentPropertyByBuilding(
    opt
  );
  console.log("API called successfully. Returned data: ");
  console.log(result);
};

const firebase_test = async () => {
  console.log(process.env.VUE_APP_FIREBASE_API_KEY);
  const firebaseService = new FirebaseService();
  await firebaseService.database
    .ref(`users/usertest`)
    .set({ query: "query set test" });
  const result = await firebaseService.database
    .ref(`users/usertest`)
    .once("value");
  console.log(result.val().query);
};

const firebase_auth_test = async () => {
  const firebaseService = new FirebaseService();
  const authenticationService = new FirebaseAuthenticationService(
    firebaseService
  );

  const address = "logintest@example.com";
  const password = "logintest";
  try {
    await authenticationService.signInWithEMailAndPassword(address, password);
    console.log(`success to login (${address})`);
  } catch (error) {
    console.log(`fail to login (${address})`);
  }
};
</script>
