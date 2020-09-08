<template>
  <v-container fluid>
    <!-- 地図の表示 -->
    <l-map
      :zoom="zoom"
      :center="center"
      :preferCanvas="true"
      style="height: 600px;"
    >
      <l-control-scale
        position="bottomleft"
        :imperial="false"
        :metric="true"
      ></l-control-scale>

      <l-tile-layer
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
        attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html'>国土地理院</a>"
      ></l-tile-layer>
      <l-marker :lat-lng="marker">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          {{ propertyName }}
        </l-tooltip>
      </l-marker>
    </l-map>
  </v-container>
</template>
<script>
import {
  LMap,
  LTileLayer,
  LControlScale,
  LMarker,
  LTooltip,
} from "vue2-leaflet";

export default {
  name: "MapPane",
  components: {
    LMap,
    LTileLayer,
    LControlScale,
    LMarker,
    LTooltip,
  },
  data() {
    const latitude = (this.$store.getters.getProperty.latitudeFrom + this.$store.getters.getProperty.latitudeTo) / 2;
    const longitude = (this.$store.getters.getProperty.longitudeFrom + this.$store.getters.getProperty.longitudeTo) / 2;
    return {
      center: [latitude, longitude],
      marker: [0, 0],
      zoom: 15,
      options: {
        onEachFeature: function(feature, layer) {
          layer.options.smoothFactor = 2;
        },
      },
      geojson: null,
      propertyName: this.$store.getters.getProperty.buildingName
    };
  },
  methods: {},
};
</script>
