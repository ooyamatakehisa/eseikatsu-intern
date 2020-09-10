<template>
  <v-container>
    <v-card>
      <v-card-title>{{ value.building_name }}</v-card-title>
      <v-card-subtitle class="text-left">{{ value.property[0].room_number_text }}号室</v-card-subtitle>
      <v-card-text>
        <p class="text-left">住所 : {{ value.address_text }}</p>
        <p class="text-left">ポイント！ : {{ value.property[0].sales_point }}</p>
        <p class="text-left">家賃 : {{ value.property[0].price.amount }} 円</p>
        <p class="text-left">最寄り駅 : {{ value.property[0].transportation[0].station.station_name }} 駅</p>
        <p class="text-left">エリア : {{ value.city }}</p>
        <p class="text-left">最寄りの浜 : {{ nearestSea.name }}</p>
        <p class="text-left">最寄りの浜までの距離 : {{ Math.floor(nearestSea.distance) }} km</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="js">
import { BuildingPropertyPreview } from "../dejima/dejima-client/src";
import seaJson from "../assets/sea.json";

export default {
  name: "BukkenPropertyCardComponent",

  components: {},

  data: () => ({
    nearestSea: { name: "", distance: 0 },
    seas: seaJson,
  }),

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
    value: function() {
      this.getNearestSea();
    }
  }
};
</script>

<style scoped>
.card {
  margin: 1rem;
}
</style>
