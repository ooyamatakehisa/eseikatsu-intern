<template>
  <v-container>
    <v-card>
      <v-card-title>{{ value.building_name }}</v-card-title>
      <v-card-subtitle class="text-left">{{ value.property[0].room_number_text }}号室</v-card-subtitle>
      <v-card-text>
        <p class="text-left">住所 : {{ value.address_text }}</p>
        <p class="text-left">ポイント！ : {{ value.property[0].sales_point }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { BuildingPropertyPreview } from "../dejima/dejima-client/src";

export default {
  name: "BukkenPropertyCardComponent",

  components: {},

  data: () => ({}),

  props: {
    value: BuildingPropertyPreview,
  },

  methods: {},
};
</script>

<style scoped>
.card {
  margin: 1rem;
}
</style>