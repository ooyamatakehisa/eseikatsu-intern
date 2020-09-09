<template>
  <v-container>
    <h4>{{buildingName}} </h4>
    <p>{{address}} </p>
    <p>竣工年: {{completionDatejun}} </p>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      completionDatejun: null,
      buildingName: null,
      address: null,
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
      this.address = propertyData.address_text;
      this.buildingName = propertyData.building_name;
    }
  },
}
</script>



