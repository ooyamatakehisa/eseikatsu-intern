<template>
  <v-container>
    <v-app-bar app fixed color="#E3F2FD" style="z-index:9999;">
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

      <v-toolbar-items>
        <v-btn color="#7B1FA2" depressed to="/">検索</v-btn>
        <v-btn color="#7B1FA2" depressed to="/detail/1107373796920000006226">詳細画面</v-btn>
      </v-toolbar-items>
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

