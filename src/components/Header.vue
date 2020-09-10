<template>
  <v-container>
    <v-app-bar app fixed color="#E3F2FD" style="z-index:9999;">

      <v-spacer></v-spacer>
      <template class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down logo"
          contain
          src="../assets/katsuo_logo.png"
          @click="toHome"
        />
      </template>
      <v-spacer></v-spacer>
    </v-app-bar>
  </v-container>
</template>



<script>
export default {
  methods: {
    toHome() {
      if (this.$route.path !== "/") this.$router.push("/");
    },
  }
}
</script>


<style scoped>
  .logo {
    cursor: pointer;
  }
</style>

