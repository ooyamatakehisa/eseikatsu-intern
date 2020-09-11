<template>
  <v-container v-if="isMobile">
    <v-row justify="center" align="center">
      <!-- 物件タイトル -->
      <v-col cols="11" class="center-text">
        <property-title />
      </v-col>

      <!-- 物件画像 -->
      <v-col cols="11">
        <property-image/>
      </v-col>

      <!-- カツオのこだわり（あれば表示） -->
      <v-col cols="11" class="center-text">
        <kodawari />
      </v-col>

      <!-- 浜までの距離　&　基本情報 -->
      <v-col cols="11">
        <property-info class="center-text" />
        <sea-distance />
      </v-col>

      <!-- 地図 -->
      <v-col cols="11">
        <property-map/>
      </v-col>

    </v-row>
    <v-row justify="center" class="text-center">

      <v-col>
        <br>
        <agent customerKey=""/>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else>
    <v-row justify="center" align="center">
      <!-- 物件タイトル -->
      <v-col cols="12" class="center-text">
        <property-title />
      </v-col>

      <!-- 物件画像 -->
      <v-col cols="10">
        <property-image/>
      </v-col>

      <!-- カツオのこだわり（あれば表示） -->
      <v-col cols="12" class="center-text">
        <kodawari />
      </v-col>

      <!-- 浜までの距離　&　基本情報 -->
      <v-col cols="6">
        <property-info class="center-text" />
        <sea-distance />
      </v-col>

      <!-- 地図 -->
      <v-col cols="6">
        <property-map/>
      </v-col>

    </v-row>
    <v-row justify="center" class="text-center">

      <v-col>
        <br>
        <agent customerKey=""/>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { RentPropertyQueryAPIApi } from "../dejima/dejima-client/src/index.js";
import BuildingPropertyCardComponent from "../components/BukkenPropertyCard";
import SeaDistance from "./SeaDistance";
import Agent from "./Agent.vue";
import propertyMap from "./Map.vue";
import propertyImage from "./Image.vue";
import PropertyInfo from "./PropertyInfo";
import PropertyTitle from "./PropertyTitle";
import KatsuoNoKodawari from "./KatsuoNoKodawari";


export default {
  data() {
    return {
      queryResults: "",
      propertyFullKey: null,
    }
  },

  components: {
    "agent": Agent,
    "property-map": propertyMap,
    "property-image": propertyImage,
    "sea-distance": SeaDistance,
    "property-info": PropertyInfo,
    "property-title": PropertyTitle,
    "kodawari": KatsuoNoKodawari,
  },

  async created() {
    this.propertyFullKey = this.$route.params.id.toString();
    await this.searchRentPropertyByDwellingUnit();
  },

  methods: {
    async searchRentPropertyByDwellingUnit() {
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByDwellingUnit({"propertyFullKey": [this.propertyFullKey]});
      this.$store.commit("propertyDetails/updateProperty", this.queryResults);
    },
  },

  mounted() {
    this.searchRentPropertyByDwellingUnit();
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs" ? true : false;
    }
  }

}
</script>

<style scoped>
.center-text {
  text-align: center;
  word-break: keep-all;
}
</style>





