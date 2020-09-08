const state = {
  property: null,
};

const getters = {
  getProperty: state => state.property,
};

const actions = {};

const mutations = {
  updateProperty(state, property) {
    state.property = property;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};


