<template>
  <v-container fluid>
    <!-- 機能紹介・お知らせ -->
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="12" md="6">
        <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
          dismissible
        >
          <div>
            このコンポーネントではマップ用ライブラリのLeafletをVue.js用にラッピングしたVue2Leafletを使えます。
          </div>
          <div>
            Vue2Leafletの詳細については
            <a href="https://vue2-leaflet.netlify.app/" target="_blank">
              こちら
              <v-icon small color="primary">mdi-open-in-new</v-icon>
            </a>
          </div>
          <div>
            地図タイルとして地理院タイルを利用しています。他のタイルも組み込み可能ですが規約の関係上使用不可能な場合が多いので注意してください。
          </div>
          <div>
            地理院タイルの詳細については
            <a
              href="https://maps.gsi.go.jp/development/ichiran.html"
              target="_blank"
            >
              こちら
              <v-icon small color="primary">mdi-open-in-new</v-icon>
            </a>
          </div>
        </v-alert>
      </v-col>
    </v-row>
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
          いい生活
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
    return {
      center: [35.654721, 139.723194],
      marker: [35.654721, 139.723194],
      zoom: 15,
      options: {
        onEachFeature: function(feature, layer) {
          layer.options.smoothFactor = 2;
        },
      },
      geojson: null,
    };
  },
  methods: {},
};
</script>
