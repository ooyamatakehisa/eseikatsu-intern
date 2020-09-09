<template>
  <v-container>
    <h4 v-if="longitude">longitude: {{longitude}}</h4>
    <h4 v-if="latitude">latitude: {{latitude}}</h4>

    <v-card v-for="item in sea" :key="item.name">
      <p>{{item.name}}</p>
      <p>経度：{{item.longitude}}</p>
      <p>緯度：{{item.latitude}}</p>
      <p>距離：{{item.distance}} km</p>
    </v-card>

  </v-container>
</template>

<script>
import jsonSea from "../assets/sea.json";
export default {
  data() {
    return {
      longitude: null,
      latitude: null,
      sea: jsonSea,
    }
  },
  computed: {
    getProperty() {
      return this.$store.getters["propertyDetails/getProperty"];
    },
  },
  watch: {
    getProperty(val) {
      const data = val.results[0].building_preview;
      this.longitude = data.longitude / 3600000;
      this.latitude = data.latitude / 3600000;

      this.sea.forEach(element => {
        const distance = this.calculateDistance(this.latitude, this.longitude, element.latitude, element.longitude);
        element["distance"] = distance;
      });

      this.sea.sort((a,b) => {
        if (a.distance < b.distance) return -1
        else return 1;
      })
    }
  },
  methods: {
    calculateDistance(lat1, lng1, lat2, lng2) {
      lat1 *= Math.PI / 180;
      lng1 *= Math.PI / 180;
      lat2 *= Math.PI / 180;
      lng2 *= Math.PI / 180;
      return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
    }
  },
}
</script>



