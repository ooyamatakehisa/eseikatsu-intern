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
          
            <div v-for="(building, index) in queryResults.results" :key="building.id">
              <router-link 
                :to="{ name : 'detail', params : { id: queryResults.results[index].property[0].property_full_key }}"
              >
                <bukken-property-card
                  :key="building.buildingGuid"
                  :value="building"
                ></bukken-property-card>
              </router-link>
            </div>
        
          
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
      const searchObeject = {};
      if (this.priceDown) { searchObeject.priceFrom = this.priceDown; }
      if (this.priceUp) { searchObeject.priceTo = this.priceUp; }
      if (this.stationCode) { searchObeject.stationCode = this.stationCode; }
      if (this.areaCode) { searchObeject.cityCode = this.areaCode; }
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByBuilding(searchObeject);

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
