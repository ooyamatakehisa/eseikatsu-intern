<template>
  <div>
    {{ agentData.agentShopName }}
    TEL: {{ agentData.agentTelNumber }}
    Email: {{ agentData.agentEmail }}
    住所: {{ agentData.agentShopAddress}}
  
  </div>
</template>

<script lang="js">
import { AgentQueryAPIApi } from "../../dejima/dejima-client/src/index";

export default {
  name: "Agent",

  components: {},

  data: () => ({
    agentData: {},
  }),

  methods: {
    getCustomerKey() {
      const apiClient = this.$store.state.apiServices.dejimaApiClient;
      const AgentQueryAPIApi = new AgentQueryAPIApi(apiClient);
      const propertyDetals = this.$store.getters.getProperty;
      return propertyDetals.customerKey;
    },
    fetchAgentData: async function() {
      this.agentData = await AgentQueryAPIApi.getAgentByCustomerKey(this.getCustomerKey());
    }

  },

  mounted() {
    this.fetchAgentData();
  } 
}
</script>
