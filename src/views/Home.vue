<template>
  <v-container fluid>
    <v-row justify="center" class="text-center">
      <v-col>
        <img v-if="logoVisible" src="../assets/logo.png" />
        <v-container>Hello World</v-container>
        <v-btn @click="onClicked">V-ON テスト</v-btn>
        <v-text-field v-model="text" placeholder="edit me"></v-text-field>
        <v-text-field v-model="text" placeholder="edit me"></v-text-field>
        <v-btn @click="resetText">リセットボタン</v-btn>
        <HopButton :understand="text"></HopButton>

        <v-btn @click="onSearch">検索</v-btn>
      </v-col>

      <v-col>
        <div>
          <bukken-property-card
            v-for="result in queryResults.results"
            :key="result.buildingGuid"
            :value="result"
          >
          </bukken-property-card>
        </div>
      </v-col>
    </v-row>
      <v-btn @click="toImgAPI">imageAPI</v-btn>

  </v-container>
</template>

<script lang="js">
import HopButton from "../components/HopButton.vue";
import { RentPropertyQueryAPIApi } from "../dejima/dejima-client/src/index.js";
import BuildingPropertyCardComponent from "../components/BukkenPropertyCard";

export default {
  name: "Home",

  components: {
    HopButton,
    "bukken-property-card": BuildingPropertyCardComponent,
  },

  data: () => ({
    logoVisible: true,
    text: "",
    queryResults: "",
  }),

  methods: {
    onClicked() {
      this.logoVisible = !this.logoVisible;
    },
    resetText() {
      this.text = "";
    },
    async onSearch() {
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByBuilding({
        buildingName: this.text,
      });
      this.saveSearchQuery(this.text);
    },

    async saveSearchQuery() {
      await this.$store.state.apiServices.firebaseService.database.ref("users/sugimoto").set({query: this.text});
    },

    async loadSearchQuery() {
      const firebaseService = this.$store.state.apiServices.firebaseService;
      const result = await firebaseService.database.ref("user/username").once("value");
      return result.val() ? result.val().query : "";
    },
    toImgAPI() {
      this.$router.push("/dejimaImageAPISample")
    }
  },

  async mounted() {
    this.text = await this.loadSearchQuery();
  },

  // created() {
  //   this.$store.commit("apiServices/initialize");
  // }

};
</script>
