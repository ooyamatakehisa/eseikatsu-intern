<template>
  <v-container fluid>

    <v-row justify="center">

      <!-- 絞り込み条件の選択画面 -->
      <v-col cols="12" lg="5">
        <v-card>
          <v-row justify="center">
            <v-col cols="10" class="center-text"><h3>検索：絞り込み条件</h3><hr></v-col>
            <!-- 家賃の範囲 -->
            <v-col cols="10">
              <v-expansion-panels hover>
                <v-expansion-panel>
                  <v-expansion-panel-header><h3>家賃の範囲</h3></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card elevation="0">
                      <v-row justify="center">
                        <v-col cols="11">
                          <v-row>
                            <v-col cols="6">
                              <h4>下限</h4>
                              <v-text-field v-model="priceFrom" placeholder="例）30000（円以上）" />
                            </v-col>
                            <v-col cols="6">
                              <h4>上限</h4>
                              <v-text-field v-model="priceTo" placeholder="例）50000（円以下）" />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

            </v-col>
            <!-- 駅の指定 -->
            <v-col cols="10">
              <v-expansion-panels hover>
                <v-expansion-panel>
                  <v-expansion-panel-header><h3>駅の指定</h3></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card elevation="0">
                      <v-row>
                        <template v-for="(station,index) in stationNameList">
                          <v-col cols="6" md="3" lg="4" :key="index">
                            <v-checkbox v-model="stationCode" :label="station.name" :value="station.code"></v-checkbox>
                          </v-col>
                        </template>
                      </v-row>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- エリアの指定 -->
            <v-col cols="10">
              <v-expansion-panels hover>
                <v-expansion-panel>
                  <v-expansion-panel-header><h3>エリア指定</h3></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card elevation="0">
                      <v-row justify="center">
                        <template v-for="(area, index) in queryAreas.results">
                          <v-col cols="6" md="3" lg="4" :key="index">
                            <v-checkbox v-model="areaCode" :label="area.city" :value="area.city_code"></v-checkbox>
                          </v-col>
                        </template>
                      </v-row>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- 選択された絞り込み条件と検索ボタン -->
      <v-col cols="12" lg="5">
        <v-card class="center-text">
          <v-row justify="center">
            <template>
              <v-col cols="10"><h3>選択されている絞り込み条件</h3><hr></v-col>
              <!-- 選択した絞り込み条件の表示 -->
              <v-col cols="10">
                <v-card elevation="0">
                  <v-row>
                    <!-- 家賃の範囲 -->
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="10">
                          <h3>家賃の範囲<v-icon color="#FFD600">mdi-home-currency-usd</v-icon> </h3>
                          <v-card outlined :color="selectedRentColor">
                            <h4 v-if="rentRange === '指定なし'"> {{rentRange}}</h4>
                            <h3 v-else> {{rentRange}}</h3>
                          </v-card>
                        </v-col>
                        <v-col cols="2">
                          <v-btn v-on:click="rentReset()" icon elevation="1" color="red"><v-icon>mdi-close</v-icon></v-btn>
                        </v-col>
                      </v-row>
                    </v-col>

                    <!-- 駅の指定 -->
                    <v-col cols="12">
                      <v-row>
                        <v-col>
                          <h3>駅指定<v-icon color="#F06292">mdi-train</v-icon> </h3>
                          <v-card outlined :color="selectedStationsColor">
                            <template v-for="name in selectedStationsNames">
                              <b :key="name">{{name}}{{space}}</b>
                            </template>
                          </v-card>
                        </v-col>
                        <v-col cols="2">
                          <v-btn v-on:click="stationReset()" icon elevation="1" color="red"><v-icon>mdi-close</v-icon></v-btn>
                        </v-col>
                      </v-row>
                    </v-col>

                    <!-- エリアの指定 -->
                    <v-col cols="12">
                      <v-row>
                        <v-col>
                          <h3>エリア指定<v-icon color="#A1887F">mdi-home-city-outline</v-icon></h3>
                          <v-card :color="selectedAreasColor" outlined>
                            <template v-for="area in selectedAreas">
                              <b :key="area">{{area}}{{space}}</b>
                            </template>
                          </v-card>
                        </v-col>
                        <v-col cols="2">
                          <v-btn v-on:click="areaReset()" icon elevation="1" color="red"><v-icon>mdi-close</v-icon></v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <!-- 検索ボタン -->
              <v-col cols="12">
                <v-btn id="search_button" v-on:click="searchProperties()" width="30%"><h2>検索</h2><v-icon>mdi-magnify</v-icon> </v-btn>
              </v-col>
            </template>
            <br>
          </v-row>
        </v-card>
      </v-col>

    </v-row>

    <!-- 検索結果表示部分 -->
    <v-row v-if="page" justify="center">
      <!-- 検索結果表示 -->
      <template v-if="queryResults" class="container">
        <v-col lg="10" class="center-text" id="result"><h2>検索結果</h2><hr><br></v-col>
        <!-- 並び替え条件選択部分 -->
        <v-col cols="8">
          <v-card class="center-text" outlined>
            <h3>並び替え条件</h3>
            <v-radio-group v-model="sortKey" row>
              <v-row justify="center">
                <v-col cols="2"><v-radio label="家賃(安い順)" value="price.asc"></v-radio></v-col>
                <v-col cols="2"><v-radio label="帖数" value="exclusive_area.desc"></v-radio></v-col>
                <v-col cols="2"><v-radio label="築年月" value="building_age.desc"></v-radio></v-col>
                <v-col cols="2"><v-radio label="駅徒歩時間" value="walk_from_station_minutes.asc"></v-radio></v-col>
              </v-row>
            </v-radio-group>
          </v-card>
        </v-col>

        <!-- 検索結果（物件カード） -->
        <v-col cols="10">
          <div v-for="(building, index) in queryResults.results" :key="building.buildingGuid">
            <router-link
              :to="{ name: 'detail', params: { id: queryResults.results[index].property[0].property_full_key } }"
            >
              <bukken-property-card
                :key="building.buildingGuid"
                :value="building"
              ></bukken-property-card>
            </router-link>
          </div>
        </v-col>

        <!-- ページネーション -->
        <v-col cols="8">
          <v-pagination
            v-model="page"
            :length="this.pageLength"
            @input="pageChange(page)"
          ></v-pagination>
        </v-col>
      </template>

      <!-- 検索中 -->
      <template v-else>
        <v-col lg="10">
          <hr><br>
          <h1 class="center-text">
            検索中
            <v-progress-circular
              :width="3"
              :size="32"
              color="#3F51B5"
              indeterminate
            />
          </h1>

        </v-col>
      </template>
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
    queryResults: null,
    queryStations: "", // 駅の情報
    queryAreas: "", // cityの情報
    priceFrom: null,  // 家賃下限
    priceTo: null,  // 家賃上限
    stationCode: [],  // 駅コード
    areaCode: [], // エリア(市区群)のコード
    stationNameList: [], // queryStationsから重複をなくした駅の情報
    sortKey: "price.asc",
    space: "　",
    areaNameList: null,  // queryAreasから重複をなくした駅の情報
    page: null,
    pageLength: null,
    selectedRentColor: "#ECEFF1",
    selectedStationsColor: "#ECEFF1",
    selectedAreasColor: "#ECEFF1",
  }),

  methods: {
    rentReset: function() {
      this.priceFrom = "";
      this.priceTo = "";
    },
    stationReset: function() {
      this.stationCode = [];
    },
    areaReset: function() {
      this.areaCode = [];
    },
    createSearchObject: function() {
      const searchObject = { startIndex: (this.page - 1) * 10 + 1 };
      if (this.priceFrom) {
        searchObject.priceFrom = this.priceFrom;
        this.saveSearchQuery(this.priceFrom);
      }
      if (this.priceTo) {
        searchObject.priceTo = this.priceTo;
        this.saveSearchQuery(this.priceTo);
      }
      if (this.stationCode[0]) {
        searchObject.stationCode = this.stationCode;
        this.saveSearchQuery(this.stationCode);
      }
      if (this.areaCode[0]) {
        searchObject.cityCode = this.areaCode;
        this.saveSearchQuery(this.areaCode);
      }
      searchObject.order = this.sortKey;
      return searchObject;
    },
    fetchProperties: async function() {
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      const searchObject = this.createSearchObject();
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByBuilding(searchObject);
      this.pageLength = Math.ceil(this.queryResults.total_counts / this.queryResults.items_per_page);
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
    },
    searchProperties() {
      this.page = 1;
      this.pageChange(this.page);
    },
    async pageChange(page) {
      this.queryResults = null;
      await this.fetchProperties();
      this.$router.push({
        path: "/",
          hash: "#result",
          query: { page }
      }).catch(err => console.log(err));
    }
  },

  watch: {
    sortKey: async function() {
      this.queryResults = null;
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      const searchObject = this.createSearchObject();
      searchObject.order = this.sortKey;
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByBuilding(searchObject);
    },
  },

  mounted: async function(){
    const getQuery = await this.loadSearchQuery();
    this.priceFrom = getQuery[0]; // 家賃の下限
    this.priceTo = getQuery[1];   // 家賃の上限
    this.stationCode = getQuery[2] ? getQuery[2] : []; // 駅コード
    this.areaCode = getQuery[3] ? getQuery[3] : [];  // 市区郡コード
    if (this.$route.query.page) { this.pageChange(this.$route.query.page)}
  },

  created: async function() {
    this.page = this.$route.query.page ? Number(this.$route.query.page) : null;
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

    values = [];
    this.areaNameList = this.queryAreas.results.filter(area => {
      if (values.indexOf(area["city"]) === -1) {
        values.push(area["city"]);
        return area;
      }
    });
  },

  computed: {
    selectedStationsNames() {
      const selectedStationsCodes = this.stationCode;
      if (selectedStationsCodes.length == 0) {
        this.selectedStationsColor = "#ECEFF1";
        return ["全ての駅"];
      }
      else {
        let stationNames = [];
        selectedStationsCodes.forEach(code => {
          const stationName = this.stationNameList.filter(codeObj => {
            return codeObj.code === code
          });
          stationNames.push(stationName[0].name);
        });
        this.selectedStationsColor = "#FFAB91";
        return stationNames;
      }
    },
    selectedAreas() {
      const selectedAreasCodes = this.areaCode;
      if (selectedAreasCodes.length == 0) {
        this.selectedAreasColor = "#ECEFF1"
        return ["全てのエリア"];
      }
      else {
        let areaNames = [];
        selectedAreasCodes.forEach(areaCode => {
          const areaName = this.areaNameList.filter(areaObj => {
            return areaObj.city_code === areaCode;
          });
          areaNames.push(areaName[0].city);
        });
        this.selectedAreasColor = "#FFAB91";
        return areaNames;
      }
    },
    rentRange() {
      if (this.priceFrom === "" && this.priceTo === "") {
        this.selectedRentColor = "#ECEFF1";
        return "指定なし";
      } else {
        this.selectedRentColor = "#FFAB91";
        return String(this.priceFrom) + "円　〜　"+ String(this.priceTo) + "円"
      }
    }

  },
};
</script>


<style scoped>
.center-text {
  text-align: center;
  word-break: keep-all;
}
</style>
