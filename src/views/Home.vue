<template>
  <v-container fluid>
    <v-row justify="center" class="text-center">
      <v-col>
        <img src="../assets/logo.png" />
        <v-container>Hello World</v-container>
      </v-col>
    </v-row>
    <map/>
  </v-container>
</template>

<script lang="js">
import Map from "../components/Map.vue"

export default {
  name: "Home",

  components: {
    "map": Map
  },

  data: () => ({
  }),

  methods: {
  },
};
</script>
