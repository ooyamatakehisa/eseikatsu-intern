<template>
  <v-container fluid>
    <v-row justify="center" class="text-center">
      <v-col>
        <v-text-field v-model="priceDown" placeholder="例）30000（円以上）" />
        <v-text-field v-model="priceUp" placeholder="例）50000（円以下）" />
        <v-btn v-on:click="onSearch()">検索</v-btn>
        <v-btn v-on:click="reset()">リセット</v-btn>

        <label v-for="(station, index) in stationNameList" :key="index">
          <input v-model="stationCode" :value="station.code" type="radio" />
          {{ station.name }}
        </label>

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
    <v-btn @click="toImgAPI">imageAPI</v-btn>
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
    queryStations: "",
    priceDown: "",
    priceUp: "",
    stationCode: "",
    stationNameList: "",
  }),

  methods: {
    reset: function() {
      this.priceDown = "";
      this.priceUp = "";
      this.stationCode = "";
    },
    onSearch: async function(){
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByBuilding({
        priceFrom: this.priceDown,
        priceTo: this.priceUp,
        stationCode: [this.stationCode]
      });

      this.saveSearchQuery(this.priceDown);
      this.saveSearchQuery(this.priceUp);
      this.saveSearchQuery(this.stationCode);
    },
    saveSearchQuery: async function() {
      await this.$store.state.apiServices.firebaseService.database
        .ref("users/username")
        .set({ query: [this.priceDown, this.priceUp, this.stationCode] });
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
    this.priceDown = getQuery[0]; // 家賃の下限
    this.priceUp = getQuery[1];   // 家賃の上限
    this.stationCode = getQuery[2]; // 駅コード
  },

  created: async function() {
    const apiClient = this.$store.state.apiServices.dejimaApiClient;
    const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
    this.queryStations = await rentPropertyQueryAPIApi.aggregateRentPropertyByLine("station");

    let values = [];
    this.stationNameList = this.queryStations.results.filter(e => {
      if (values.indexOf(e["name"]) === -1) {
        // values に値が存在しない要素のみをフィルタリング
        values.push(e["name"]);
        return e;
      }
    });
  }

};
</script>
