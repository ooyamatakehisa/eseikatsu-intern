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

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};


