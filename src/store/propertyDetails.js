import { RentPropertyQueryAPIApi } from "../dejima/dejima-client/src/index.js";

const state = {
  property: null,
};

const getters = {
  ... {
    getProperty: state => state.property,
  }
};

const mutations = {
  updateProperty(state, property) {
    state.property = property;
  },
};

const actions = {
  async searchRentPropertyByDwellingUnit() {
    const apiClient = this.$store.state.apiServices.dejimaApiClient;
    const rentPropertyQueryAPIApi = new RentPropertyQueryAPIApi(apiClient);
    this.queryResults = await rentPropertyQueryAPIApi.searchRentPropertyByDwellingUnit({"propertyFullKey": [this.propertyFullKey]});
    this.$store.commit("propertyDetails/updateProperty", this.queryResults);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};


