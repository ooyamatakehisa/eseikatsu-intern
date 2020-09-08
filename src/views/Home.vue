<template>
  <v-container fluid>
    <v-row justify="center" class="text-center">
      <v-col>
        <img src="../assets/logo.png" />
        <v-container>Hello World</v-container>
      </v-col>
    </v-row>
    <property-map/>
  </v-container>
</template>

<script lang="js">
import propertyMap from "../components/Map.vue"

export default {
  name: "Home",

  components: {
    "property-map": propertyMap
  },

  data: () => ({
  }),

  methods: {
  },
};
</script>
