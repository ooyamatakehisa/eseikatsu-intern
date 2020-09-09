<template>
  <v-container fluid>
    <v-carousel :show-arrows="false">
      <v-carousel-item
        v-for="(imageMetadata, index) in imageMetadatas"
        :key="index"
        :src="imageMetadata.url"
      ></v-carousel-item>
    </v-carousel>
  </v-container>
</template>
<script>
import { ApiClient } from "../dejima/dejima-client/src";
import RentPropertyQueryAPIApi from "../dejima/dejima-client/src/api/RentPropertyQueryAPIApi";
import ImageApiClient from "../dejima/dejima-image-client/src/ApiClient";
import ImageQueryAPIApi from "../dejima/dejima-image-client/src/api/ImageQueryAPIApi";

export default {
  data: () => ({
    imageMetadatas: []
  }),
  
  computed: {
    propertyDetails: function() { return this.$store.getters["propertyDetails/getProperty"] }
  },

  watch: {
    propertyDetails: async function (newVal, oldVal) {
      const imageApiClient = this.$store.state.apiServices.dejimaImageApiClient
      const imageQueryAPIApi = new ImageQueryAPIApi(imageApiClient);
      const propertyFullKey = newVal.results[0].property_full_key;
      this.imageMetadatas = await imageQueryAPIApi.getMetadataRentRentPropertyKeyGet(propertyFullKey);
    }
  },
     
  
};
</script>
