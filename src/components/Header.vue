<template>
  <v-container>
    <v-app-bar app color="#E3F2FD" dark>
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
        <v-btn color="black" depressed to="/">検索</v-btn>
        <v-btn color="black" depressed to="/detail/1107373796920000006226">詳細画面</v-btn>
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

