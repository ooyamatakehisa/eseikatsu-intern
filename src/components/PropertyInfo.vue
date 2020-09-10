<template>
  <v-container>
    <v-card outlined>
      <v-row justify="center">
        <v-col v-if="buildingName" cols="10"><h3>{{buildingName}}</h3><hr></v-col>
        <v-col v-if="address" cols="12"><h4>住所：{{address}} </h4></v-col>
        <v-col v-if="completionDatejun" cols="12"><h4>竣工年：{{completionDatejun}} </h4></v-col>
        <v-col v-if="rent" cols="12"><h4>家賃：{{rent}}円</h4></v-col>
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
      katsuoNoKodawari: [],
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
      const feature = propertyData.pickup_feature;
      if (feature.is_net_free) {
        this.katsuoNoKodawari.push("インターネット無料！");
      }
      if (feature.has_appliances) {
        this.katsuoNoKodawari.push("家電付き物件！");
      }
      if (feature.is_furnished) {
        this.katsuoNoKodawari.push("家具付き物件！");
      }
      if (feature.has_aircon) {
        this.katsuoNoKodawari.push("エアコン付き物件！");
      }
    }
  },
}
</script>



