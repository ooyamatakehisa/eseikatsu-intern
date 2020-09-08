<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col>
        <h2>受け取ったpropertyFullKey: {{propertyFullKey}}</h2>
        <br>
        <!-- <v-btn @click="searchRentPropertyByDwellingUnit">クエリ実行</v-btn> -->
      </v-col>

      <v-col>{{queryResults}}</v-col>

    </v-row>
    <agent customerKey=""/>
  </v-container>
</template>


<script>
import { RentPropertyQueryAPIApi } from "../dejima/dejima-client/src/index.js";
import BuildingPropertyCardComponent from "../components/BukkenPropertyCard";
import Agent from "./Agent.vue";


export default {
  data() {
    return {
      text: "",
      queryResults: "",
      propertyFullKey: null,
    }
  },

  components: {
    "agent": Agent
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

}
</script>






