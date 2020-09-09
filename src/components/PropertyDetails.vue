<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="6">
        <h2>受け取ったpropertyFullKey: {{propertyFullKey}}</h2>
        <br>
        <SeaDistance />
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { RentPropertyQueryAPIApi } from "../dejima/dejima-client/src/index.js";
import BuildingPropertyCardComponent from "../components/BukkenPropertyCard";
import SeaDistance from "./SeaDistance";

export default {
  components: {
    SeaDistance,
  },
  data() {
    return {
      queryResults: "",
      propertyFullKey: null,
    }
  },

  created() {
    this.propertyFullKey = this.$route.params.id.toString();
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

}
</script>






