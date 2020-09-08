<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col>
        <h2>受け取ったpropertyFullKey: {{propertyFullKey}}</h2>
        <br>
        <v-btn @click="runQuery">クエリ実行</v-btn>
      </v-col>

      <v-col>{{queryResults}}</v-col>

    </v-row>
  </v-container>
</template>


<script>
import { RentPropertyQueryAPIApi } from "../dejima/dejima-client/src/index.js";
import BuildingPropertyCardComponent from "../components/BukkenPropertyCard";

export default {
  data() {
    return {
      text: "",
      queryResults: "",
      propertyFullKey: null,
    }
  },

  components: {
    "bukken-property-card": BuildingPropertyCardComponent,
  },

  created() {
    this.propertyFullKey = this.$route.params.id.toString();
  },

  methods: {
    async runQuery() {
      console.log("実行します");
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
      this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByDwellingUnit({"propertyFullKey": [this.propertyFullKey]});
      this.$store.commit("propertyDetails/updateProperty", this.queryResults);
    },
  },

  async mounted() {
    this.text = await this.loadSearchQuery();
  },
}
</script>






