<template>
  <v-container v-if="isMobile">
    <v-card elevation="0">
      <v-card-title><b>{{ value.building_name }}</b></v-card-title>
      <v-card-subtitle v-if="value.property[0].room_number_text" class="text-left">{{ value.property[0].room_number_text }}号室</v-card-subtitle>
      <v-row justify="center">

        <!-- 物件の写真 -->
        <v-col>
          <v-img v-if="pictureUrl"
            :src="pictureUrl"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="300"
          ></v-img>
          <v-img v-else
            src="http://placehold.jp/500x300.png?text=No Image"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="300"
          ></v-img>
        </v-col>

        <!-- 物件の情報 -->
        <v-col cols="12">
          <v-card-text>
            <p class="text-left">エリア : {{ value.city }}</p>
            <hr><br>
            <p class="text-left"> {{ value.property[0].sales_point }}</p>
            <hr><br>
            <p class="text-left">住所 : {{ value.address_text }}</p>
            <p class="text-left">竣工年月: {{ value.completion_datejun.text }} </p>
            <p class="text-left">家賃 : {{ value.property[0].price.amount }} 円</p>
            <p class="text-left">最寄り駅 : {{ value.property[0].transportation[0].station.station_name }} 駅</p>
            <p class="text-left">最寄り駅まで徒歩: {{ value.property[0].transportation[0].station_access.value }} 分</p>
            <h4 class="text-left sea">最寄りの浜 : {{ nearestSea.name }}</h4>
            <h4 class="text-left sea">最寄りの浜までの距離 : {{ Math.floor(nearestSea.distance) }} km</h4>
          </v-card-text>
        </v-col>

      </v-row>
    </v-card>
  </v-container>

  <v-container v-else>
    <v-card elevation="0">
      <v-card-title><b>{{ value.building_name }}</b></v-card-title>
      <v-card-subtitle v-if="value.property[0].room_number_text" class="text-left">{{ value.property[0].room_number_text }}号室</v-card-subtitle>
      <v-row justify="center">
        <!-- 物件の情報 -->
        <v-col cols="12" sm=6 md=6>
          <v-card-text>
            <p class="text-left">エリア : {{ value.city }}</p>
            <hr><br>
            <p class="text-left"> {{ value.property[0].sales_point }}</p>
            <hr><br>
            <p class="text-left">住所 : {{ value.address_text }}</p>
            <p class="text-left">竣工年月: {{ value.completion_datejun.text }} </p>
            <p class="text-left">家賃 : {{ value.property[0].price.amount }} 円</p>
            <p class="text-left">最寄り駅 : {{ value.property[0].transportation[0].station.station_name }} 駅</p>
            <p class="text-left">最寄り駅まで徒歩: {{ value.property[0].transportation[0].station_access.value }} 分</p>
            <h4 class="text-left sea">最寄りの浜 : {{ nearestSea.name }}</h4>
            <h4 class="text-left sea">最寄りの浜までの距離 : {{ Math.floor(nearestSea.distance) }} km</h4>
          </v-card-text>
        </v-col>

        <!-- 物件の写真 -->
        <v-col>
          <v-img v-if="pictureUrl"
            :src="pictureUrl"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="300"
          ></v-img>
          <v-img v-else
            src="http://placehold.jp/500x300.png?text=No Image"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="300"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="js">
import { BuildingPropertyPreview } from "../dejima/dejima-client/src";
import seaJson from "../assets/sea.json";
import ImageApiClient from "../dejima/dejima-image-client/src/ApiClient";
import ImageQueryAPIApi from "../dejima/dejima-image-client/src/api/ImageQueryAPIApi";

export default {
  name: "BukkenPropertyCardComponent",

  components: {},

  data: function() {
    return {
      nearestSea: { name: "", distance: 0 },
      seas: seaJson,
      pictureUrl: ""
    }
  },

  props: {
    value: BuildingPropertyPreview,
  },

  methods: {
    calculateDistance(lat1, lng1, lat2, lng2) {
      lat1 *= Math.PI / 180;
      lng1 *= Math.PI / 180;
      lat2 *= Math.PI / 180;
      lng2 *= Math.PI / 180;
      return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
    },
    getNearestSea() {
      const lng = this.value.longitude / 3600000;
      const lat = this.value.latitude / 3600000;
      const nearestSea = {
        name: null,
        distance: null,
      };

      let tempDistance = 10000;
      let tempName = "";

      this.seas.forEach(sea => {
        const distance = this.calculateDistance(lat, lng, sea.latitude, sea.longitude);
        if (distance < tempDistance) {
          tempDistance = distance;
          tempName = sea.name;
        }
      });

      this.nearestSea.name = tempName;
      this.nearestSea.distance = tempDistance;
    }
  },

  watch: {
    value: async function() {
      this.getNearestSea();
      try {
        const imageApiClient = this.$store.state.apiServices.dejimaImageApiClient
        const imageQueryAPIApi = new ImageQueryAPIApi(imageApiClient);
        const propertyFullKey = this.value.property[0].property_full_key;
        const imageMetadatas = await imageQueryAPIApi.getMetadataRentRentPropertyKeyGet(propertyFullKey);
        this.pictureUrl = imageMetadatas[0].url;
      } catch (error) {
        this.pictureUrl = "";
      }
    }
  },


  mounted: async function() {
    this.getNearestSea();
    try {
      const imageApiClient = this.$store.state.apiServices.dejimaImageApiClient
      const imageQueryAPIApi = new ImageQueryAPIApi(imageApiClient);
      const propertyFullKey = this.value.property[0].property_full_key;
      const imageMetadatas = await imageQueryAPIApi.getMetadataRentRentPropertyKeyGet(propertyFullKey);
      this.pictureUrl = imageMetadatas[0].url;
    } catch (error) {
      this.pictureUrl = "";
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs" ? true : false;
    },
  }

}
</script>

<style scoped>
.card {
  margin: 1rem;
}
.sea {
  color: rgb(0, 119, 255);
}
</style>
