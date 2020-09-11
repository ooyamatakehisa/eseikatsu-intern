<template>
  <v-container center-text>
    <v-card color="#80D8FF" outlined>
      <h2>この物件から近い浜<v-icon color="#FF8F00" large>mdi-beach</v-icon></h2><hr>
      <v-simple-table >
        <template v-slot:default>
          <tbody>
            <tr v-for="(sea, index) in seas" :key="sea.name">
              <td>{{index + 1}}</td>
              <td>{{sea.name}}</td>
              <td>{{Math.floor(sea.distance)}} km</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
      seas: jsonSea,
    }
  },
  computed: {
    getProperty() {
      return this.$store.getters["propertyDetails/getProperty"];
    },
  },
  watch: {
    getProperty(val) {
      const propertyData = val.results[0].building_preview;
      this.longitude = propertyData.longitude / 3600000;
      this.latitude = propertyData.latitude / 3600000;

      this.seas.forEach(sea => {
        const distance = this.calculateDistance(this.latitude, this.longitude, sea.latitude, sea.longitude);
        sea["distance"] = distance;
      });

      this.seas.sort((a,b) => {
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

<style scoped>
.center-text {
  text-align: center;
  word-break: keep-all;
}
</style>



