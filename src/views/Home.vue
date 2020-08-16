<template>
  <v-container fluid>
    <v-row justify="center" class="text-center">
      <v-col>
        <img src="../assets/logo.png" />
        <v-container>Hello World</v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">


export default {
  name: "Home",

  components: {
  },

  data: () => ({
  }),

  methods: {
  },
  created : function() {
    this.$store.commit("apiServices/initialize");
  }
};
</script>
