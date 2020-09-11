<template>
  <v-container>
    <v-card outlined>
      <v-row justify="center">
        <v-col v-if="buildingName" cols="10"><h3>{{buildingName}}</h3><hr></v-col>
        <v-col v-if="address" cols="12"><h4>住所：{{address}} </h4></v-col>
        <v-col v-if="layout" cols="12"><h4>間取り：{{layout}} </h4></v-col>
        <v-col v-if="rent" cols="12"><h4>家賃：{{rent}}円</h4></v-col>
        <v-col v-if="completionDatejun" cols="12"><h4>竣工年：{{completionDatejun}} </h4></v-col>
        <v-col v-if="stationAccess" cols="12"><h4>{{stationName}}駅 徒歩{{stationAccess}}分</h4></v-col>
      </v-row>
    </v-card>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      completionDatejun: null,
      buildingName: null,
      address: null,
      rent: null,
      stationAccess: null,
      stationName: null,
      layout: null,
    }
  },
  computed: {
    getProperty() {
      return this.$store.getters["propertyDetails/getProperty"];
    },
  },

  watch: {
    getProperty(val) {
      const propertyData = val.results[0];
      this.completionDatejun = propertyData.building_preview.completion_datejun.text;
      this.address = propertyData.building_preview.address_text;
      this.buildingName = propertyData.building_preview.building_name;
      this.rent = propertyData.price.amount;
      this.stationAccess = propertyData.transportation[0].station_access.value;
      this.stationName = propertyData.transportation[0].station.station_name;
      this.layout = propertyData.layout_text;
    }
  },
}
</script>



