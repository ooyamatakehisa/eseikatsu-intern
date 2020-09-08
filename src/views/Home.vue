<template>
  <v-container fluid>
    <v-row justify="center" class="text-center">
      <v-col>
        <v-text-field v-model="priceDown" placeholder="例）30000（円以上）" />
        <v-text-field v-model="priceUp" placeholder="例）50000（円以下）" />
        <v-btn v-on:click="onSearch()">検索</v-btn>
        <v-btn v-on:click="reset()">リセット</v-btn>
        <!-- <p>{{ queryResults }}</p> -->
        <div class="container" v-if="queryResults !== null">
          <bukken-property-card
            v-for="result in queryResults.results"
            :key="result.buildingGuid"
            :value="result"
          ></bukken-property-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">
import { RentPropertyQueryAPIApi } from "../dejima/dejima-client/src/index";
import BukkenPropertyCardComponent from "../components/BukkenPropertyCard.vue";

export default {
  name: "Home",

  components: {
    "bukken-property-card": BukkenPropertyCardComponent,
  },

  data: () => ({
    queryResults: "",
    priceDown: "",
    priceUp: "",
  }),

  methods: {
    reset: function() {
      this.priceDown = "";
      this.priceUp = "";
    },
    onSearch: async function(){
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByBuilding({
        priceFrom: this.priceDown,
        priceTo: this.priceUp,
      });
      this.saveSearchQuery(this.priceDown);
      this.saveSearchQuery(this.priceUp);
    },
    saveSearchQuery: async function() {
      await this.$store.state.apiServices.firebaseService.database
        .ref("users/username")
        .set({ query: [this.priceDown, this.priceUp] });
    },
    loadSearchQuery: async function() {
      const firebaseService = this.$store.state.apiServices.firebaseService;
      const result = await firebaseService.database
        .ref(`users/username`)
        .once("value");
      return result.val() ? result.val().query : "";
    },
  },
  mounted: async function(){
    const getQuery = await this.loadSearchQuery();
    this.priceDown = getQuery[0];
    this.priceUp = getQuery[1];
  },
};
</script>
