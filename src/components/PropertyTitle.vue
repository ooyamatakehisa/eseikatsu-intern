<template>
  <v-container>
    <v-card outlined>
      <v-row justify="center">
        <v-col cols="8"><h2>{{buildingName}} </h2><hr></v-col>
        <v-col cols="8"><p>{{salesPoint}} </p></v-col>
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
      salesPoint: null,

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
      this.completionDatejun = propertyData.completion_datejun.text;
      this.salesPoint = val.results[0].sales_point;
      this.buildingName = propertyData.building_name;
    }
  },
}
</script>



