<template>
  <v-container>
    <v-card color="#FBE9E7">
      <v-row justify="center">
        <v-col cols="6"><h3>営業所<v-icon large color="#FFA000">mdi-store</v-icon></h3><hr></v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <p v-if="agentData.agent_shop_name">{{ agentData.agent_shop_name }}</p>
          <p v-if="agentData.agent_tel_number">TEL: {{ agentData.agent_tel_number }}</p>
          <p v-if="agentData.agent_email">Email: {{ agentData.agent_email }}</p>
          <p v-if="agentData.agent_shop_address">住所: {{ agentData.agent_shop_address }}</p>
          <h6 v-if="agentData.agent_license_number">{{ agentData.agent_license_number }}</h6>
        </v-col>
      </v-row>
    </v-card>

  </v-container>
</template>

<script lang="js">
import AgentQueryAPIApi from "../dejima/dejima-client/src/api/AgentQueryAPIApi";

export default {
  name: "Agent",

  components: {},

  data: () => ({
    agentShopName: "",
    agentData: {},
  }),

  computed: {
    propertyDetails: function() { return this.$store.getters["propertyDetails/getProperty"] }
  },

  watch: {
    propertyDetails: async function (newVal, oldVal) {
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const agentQueryAPIApi = new AgentQueryAPIApi(apiClient);
      const propertyDetails = this.$store.getters["propertyDetails/getProperty"];
      const customerKey = propertyDetails.results[0].customer_key;
      this.agentData = await agentQueryAPIApi.getAgentByCustomerKey(customerKey);
      this.agentShopName = this.agentData.agentShopName;
    }
  },


  methods: {
  },


}
</script>
