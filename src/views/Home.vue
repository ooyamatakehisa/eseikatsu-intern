<template>
  <v-container fluid>
    <v-text-field v-model="priceFrom" placeholder="例）30000（円以上）" />
    <v-text-field v-model="priceTo" placeholder="例）50000（円以下）" />

    <h5>駅指定</h5>
    <v-row>
      <template v-for="(station,index) in stationNameList">
          <v-col cols="12" sm="3" md="3" lg="3" :key="index">
            <v-checkbox v-model="stationCode" :label="station.name" :value="station.code"></v-checkbox>
          </v-col>
      </template>
    </v-row>  

    <h5>エリア指定</h5>
    <v-row>
      <template v-for="(area, index) in queryAreas.results">
        <v-col cols="12" sm="3" md="3" lg="3" :key="index">
          <v-checkbox v-model="areaCode" :label="area.city" :value="area.city_code"></v-checkbox>
        </v-col>
      </template>
    </v-row>

    <v-btn v-on:click="onSearch()">検索</v-btn>
    <v-btn v-on:click="reset()">リセット</v-btn>

    <div class="container" v-if="queryResults">
      並び替え
      <v-radio-group v-model="sortKey" row>
        <v-radio label="家賃" value="price"></v-radio>
        <v-radio label="帖数" value="size"></v-radio>
      </v-radio-group>
      <div v-for="(building, index) in queryResults.results" :key="building.id">
        <router-link 
          :to="{ name: 'detail', params: { id: queryResults.results[index].property[0].property_full_key } }"
        >
          <bukken-property-card
            :key="building.buildingGuid"
            :value="building"
          ></bukken-property-card>
        </router-link>
      </div>
    </div>
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
    queryResults: null,
    queryStations: "", // 駅の情報
    queryAreas: "", // cityの情報
    priceFrom: "",  // 家賃下限
    priceTo: "",  // 家賃上限
    stationCode: [],  // 駅コード
    areaCode: [], // エリア(市区群)のコード
    stationNameList: "", // queryStationsから重複をなくした駅の情報
    sortKey: null
  }),

  methods: {
    reset: function() {
      this.priceFrom = "";
      this.priceTo = "";
      this.stationCode = [];
      this.areaCode = [];
    },
    onSearch: async function(){
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      const searchObeject = {};
      if (this.priceFrom) { 
        searchObeject.priceFrom = this.priceFrom;
        this.saveSearchQuery(this.priceFrom);
      }
      if (this.priceTo) { 
        searchObeject.priceTo = this.priceTo;
        this.saveSearchQuery(this.priceTo);
      }
      if (this.stationCode[0]) {
        searchObeject.stationCode = this.stationCode;
        this.saveSearchQuery(this.stationCode);
      }
      if (this.areaCode[0]) {
        searchObeject.cityCode = this.areaCode;
        this.saveSearchQuery(this.areaCode);
      }
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByBuilding(searchObeject);
      console.log(this.queryResults.results)
    },
    saveSearchQuery: async function() {
      await this.$store.state.apiServices.firebaseService.database
        .ref("users/username")
        .set({ query: [this.priceFrom, this.priceTo, this.stationCode, this.areaCode] });
    },
    loadSearchQuery: async function() {
      const firebaseService = this.$store.state.apiServices.firebaseService;
      const result = await firebaseService.database
        .ref(`users/username`)
        .once("value");
      return result.val() ? result.val().query : "";
    }
  },
  
  watch: {
    sortKey: function() {
      const func = this.sortKey === "price"
        ? ((o, next_o) => { return o.property[0].price.amount < next_o.property[0].price.amount ? -1 : 1})
        : ((o, next_o) => { return o.property[0].exclusive_area.area > next_o.property[0].exclusive_area.area ? -1 : 1});
      this.queryResults.results.sort(func);
    }
  },

  mounted: async function(){
    const getQuery = await this.loadSearchQuery();
    this.priceFrom = getQuery[0]; // 家賃の下限
    this.priceTo = getQuery[1];   // 家賃の上限
    this.stationCode = getQuery[2] ? getQuery[2] : []; // 駅コード
    this.areaCode = getQuery[3] ? getQuery[3] : [];  // 市区郡コード
  },

  created: async function() {
    const apiClient = this.$store.state.apiServices.dejimaApiClient;
    const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
    this.queryStations = await rentPropertyQueryAPIApi.aggregateRentPropertyByLine("station");
    this.queryAreas = await rentPropertyQueryAPIApi.aggregateRentPropertyByArea("city");

    let values = [];
    this.stationNameList = this.queryStations.results.filter(station => {
      if (values.indexOf(station["name"]) === -1) {
        // values に値が存在しない要素のみをフィルタリング
        values.push(station["name"]);
        return station;
      }
    });
  }
};
</script>
