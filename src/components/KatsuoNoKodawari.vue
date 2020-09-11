<template>
  <v-container>

    <v-snackbar v-model="snackbar" top vertical color="info">
      <h2><v-icon x-large>mdi-alert-circle</v-icon> {{message}}</h2>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

    <v-hover>
      <template v-slot="{ hover }">
        <v-card color="#FFCDD2" :elevation="hover ? 24 : 6">
          <v-row v-if="katsuoNoKodawari.length !== 0" justify="center">
            <v-col cols="12"><h3><v-icon x-large color="red">mdi-head-heart-outline</v-icon> あなたのこだわり条件にマッチしています！！！<v-icon color="red" large>mdi-thumb-up</v-icon></h3><hr></v-col>
          </v-row>
            <template v-for="kodawari in katsuoNoKodawari">
              <h3 :key="kodawari">{{kodawari}}</h3>
              <br>
            </template>
        </v-card>
      </template>
    </v-hover>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      katsuoNoKodawari: [],
      snackbar: null,
      message: "あなたのこだわり条件にマッチする物件です！",
    }
  },
  computed: {
    getProperty() {
      return this.$store.getters["propertyDetails/getProperty"];
    },
  },

  watch: {
    getProperty(val) {
      const feature = val.results[0].pickup_feature;
      if (feature.is_net_free) {
        this.katsuoNoKodawari.push("インターネット無料！");
      }
      if (feature.has_appliances) {
        this.katsuoNoKodawari.push("家電付き物件！");
      }
      if (feature.is_furnished) {
        this.katsuoNoKodawari.push("家具付き物件！");
      }
      if (feature.has_aircon) {
        this.katsuoNoKodawari.push("エアコン付き物件！");
      }
      if (feature.is_bath_toilet_separate) {
        this.katsuoNoKodawari.push("お風呂とトイレはセパレート！！");
      }
      if (feature.has_washroom) {
        this.katsuoNoKodawari.push("洗面所独立！！");
      }
      if (feature.has_closet) {
        this.katsuoNoKodawari.push("クローゼット有り！");
      }
      if (feature.has_floor_heating) {
        this.katsuoNoKodawari.push("床暖房有り！");
      }

      // 重複を削除
      this.katsuoNoKodawari = Array.from(new Set(this.katsuoNoKodawari));
      if (this.katsuoNoKodawari.length != 0) {
        this.snackbar = true;
      }
    }
  },
}
</script>



