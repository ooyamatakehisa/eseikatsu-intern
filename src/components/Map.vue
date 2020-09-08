<template>
  <div>
    <leaflet-sample/>
    hello
  </div>
</template>

<script lang="js">
import LeafletSample from "../components/samples/LeafletSample"

export default {
  name: "Map",

  components: {},

  data: () => ({
    agentData: {},
  }),

  methods: {

  },

  mounted() {
    this.fetchAgentData();
  },

  components: {
    "leaflet-sample": LeafletSample
  },

}
</script>
