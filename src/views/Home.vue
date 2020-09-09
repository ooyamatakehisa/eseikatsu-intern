<template>
  <v-container fluid>
    <v-row justify="center" class="text-center">
      <v-col>
        <v-text-field v-model="priceDown" placeholder="例）30000（円以上）" />
        <v-text-field v-model="priceUp" placeholder="例）50000（円以下）" />
        <v-btn v-on:click="onSearch()">検索</v-btn>
        <v-btn v-on:click="reset()">リセット</v-btn>

        <!-- 駅周辺指定のラジオボタン -->
        <label v-for="(station, index) in stationNameList" :key="`station-${index}`">
          <input v-model="stationCode" :value="station.code" type="radio" />
          {{ station.name }}
        </label>

        <!-- エリア指定のラジオボタン -->
        <label v-for="(area, index) in queryAreas.results" :key="`area-${index}`">
          <input v-model="areaCode" :value="area.city_code" type="radio" />
          {{ area.city }}
        </label>

        <!-- 検索時の物件ヒット数 -->
        <div v-if="queryResults !== ''">
          <p v-if="queryResults.total_counts !== 0">{{ queryResults.total_counts }}件</p>
          <p v-else>検索に一致する物件はありませんでした。</p>
        </div>

        <div class="container" v-if="queryResults !== null">
          <div v-for="(building, index) in queryResults.results" :key="building.id">
            <router-link
              :to="{ name : 'detail', params : { id: queryResults.results[index].property[0].property_full_key }}"
            >
              <bukken-property-card :key="building.buildingGuid" :value="building"></bukken-property-card>
            </router-link>
          </div>
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
    queryStations: "", // 駅の情報
    queryAreas: "", // cityの情報
    priceDown: "",  // 家賃下限
    priceUp: "",  // 家賃上限
    stationCode: "",  // 駅コード
    areaCode: "", // エリア(市区群)のコード
    stationNameList: "", // queryStationsから重複をなくした駅の情報
  }),

  methods: {
    reset: function() {
      this.priceDown = "";
      this.priceUp = "";
      this.stationCode = "";
      this.areaCode = "";
    },
    onSearch: async function(){
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByBuilding({
        priceFrom: this.priceDown,
        priceTo: this.priceUp,
        stationCode: [this.stationCode],
        cityCode: [this.areaCode],
      });

      this.saveSearchQuery(this.priceDown);
      this.saveSearchQuery(this.priceUp);
      this.saveSearchQuery(this.stationCode);
      this.saveSearchQuery(this.areaCode);
    },
    saveSearchQuery: async function() {
      await this.$store.state.apiServices.firebaseService.database
        .ref("users/username")
        .set({ query: [this.priceDown, this.priceUp, this.stationCode, this.areaCode] });
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
    this.areaCode = getQuery[3];  // 市区郡コード
  },

  created: async function() {
    const apiClient = this.$store.state.apiServices.dejimaApiClient;
    const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
    this.queryStations = await rentPropertyQueryAPIApi.aggregateRentPropertyByLine("station");
    this.queryAreas = await rentPropertyQueryAPIApi.aggregateRentPropertyByArea("city");

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
