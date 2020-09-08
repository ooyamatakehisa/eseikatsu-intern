<template>
  <div>
    {{ agentData.agent_shop_name }}
    TEL: {{ agentData.agent_tel_number }}
    Email: {{ agentData.agent_email }}
    住所: {{ agentData.agent_shop_address }}
  
  </div>
</template>

<script lang="js">
// import { AgentQueryAPIApi } from "../dejima/dejima-client/src/index";
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
      console.log(this.agentData.agent_shop_name);
      this.agentShopName = this.agentData.agentShopName;
    }
  },


  methods: {
  },

  
}
</script>
