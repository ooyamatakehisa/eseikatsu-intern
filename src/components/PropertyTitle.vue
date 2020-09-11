<template>
  <v-container>
    <v-card outlined>
      <v-row justify="center">
        <v-col cols="11" lg="8"><h2>{{buildingName}} </h2><hr></v-col>
        <v-col v-if="!isMobile" cols="8"><p>{{salesPoint}} </p></v-col>
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
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs" ? true : false;
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




