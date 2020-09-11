<template>
  <v-container fluid v-if="imageMetadatas && isMobile">
    <v-carousel hide-delimiters cycle height="200">
      <template v-for="(imageMetadata, index) in imageMetadatas">
        <v-carousel-item :key="index">
          <v-img :src="imageMetadata.url" :key="index" contain></v-img>
        </v-carousel-item>
      </template>
    </v-carousel>
  </v-container>

  <v-container fluid v-else-if="imageMetadatas">
    <v-carousel hide-delimiters cycle>
      <template v-for="(imageMetadata, index) in imageMetadatas">
        <v-carousel-item :key="index">
          <v-img :src="imageMetadata.url" :key="index" contain aspect-ratio="2.5"></v-img>
        </v-carousel-item>
      </template>
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
    imageMetadatas: null
  }),

  computed: {
    propertyDetails: function() { return this.$store.getters["propertyDetails/getProperty"] },
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs" ? true : false;
    }
  },

  watch: {
    propertyDetails: async function (newVal, oldVal) {
      try {
        const imageApiClient = this.$store.state.apiServices.dejimaImageApiClient
        const imageQueryAPIApi = new ImageQueryAPIApi(imageApiClient);
        const propertyFullKey = newVal.results[0].property_full_key;
        this.imageMetadatas = await imageQueryAPIApi.getMetadataRentRentPropertyKeyGet(propertyFullKey);
      } catch (error) {
        console.log(error)
        this.imageMetadatas = null;
      }
    }
  },

};
</script>
