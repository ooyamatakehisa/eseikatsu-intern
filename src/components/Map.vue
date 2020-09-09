<template>
  <v-container fluid>
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
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LControlScale,
    LMarker,
    LTooltip,
  },

  data() {
    return {
      center: [35.6812405, 139.7649361],
      marker: [35.6812405, 139.7649361],
      zoom: 15,
      options: {
        onEachFeature: function(feature, layer) {
          layer.options.smoothFactor = 2;
        },
      },
      geojson: null,
      propertyName: null,
    };
  },

  computed: {
    propertyDetails: function() { return this.$store.getters["propertyDetails/getProperty"] }
  },

  watch: {
    propertyDetails: function (newVal, oldVal) {
      const latitude = newVal.results[0].building_preview.latitude / 36e5 ;
      const longitude = newVal.results[0].building_preview.longitude / 36e5;
      this.propertyName = newVal.results[0].building_preview.building_name;
      this.center = [latitude, longitude];
      this.marker = [latitude, longitude];
    }
  },

  methods: {},
};
</script>
