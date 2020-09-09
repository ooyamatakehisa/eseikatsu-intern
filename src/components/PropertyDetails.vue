<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <property-map/>
      </v-col>
      <v-col cols="6">
        <property-image/>
      </v-col>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="6">
        <SeaDistance />
      </v-col>
      <v-col>
        <v-card><PropertyInfo /></v-card>
        <br>
        <v-card><agent customerKey=""/></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { RentPropertyQueryAPIApi } from "../dejima/dejima-client/src/index.js";
import BuildingPropertyCardComponent from "../components/BukkenPropertyCard";
import SeaDistance from "./SeaDistance";
import Agent from "./Agent.vue";
import propertyMap from "./Map.vue";
import propertyImage from "./Image.vue";
import PropertyInfo from "./PropertyInfo";


export default {
  data() {
    return {
      queryResults: "",
      propertyFullKey: null,
    }
  },

  components: {
    "agent": Agent,
    "property-map": propertyMap,
    "property-image": propertyImage,
    SeaDistance,
    PropertyInfo,
  },

  async created() {
    this.propertyFullKey = this.$route.params.id.toString();
    await this.searchRentPropertyByDwellingUnit();
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






