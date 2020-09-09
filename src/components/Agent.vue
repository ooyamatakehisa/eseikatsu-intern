<template>
  <div>
    不動産情報<br>
    {{ agentData.agent_shop_name }}<br>
    TEL: {{ agentData.agent_tel_number }}<br>
    Email: {{ agentData.agent_email }}<br>
    住所: {{ agentData.agent_shop_address }}
  
  </div>
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
      console.log(propertyDetails)
    }
  },


  methods: {
  },

  
}
</script>
