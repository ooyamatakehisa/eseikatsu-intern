import DejimaApiClient from "../dejima/dejima-client/src/ApiClient";
import ImageApiClient from "../dejima/dejima-image-client/src/ApiClient";
import { FirebaseService } from "../firebase/FirebaseService";
import { FirebaseAuthenticationService } from "../firebase/FirebaseAuthenticationService";

const state = {
  dejimaApiClient: null,
  dejimaImageApiClient: null,
  firebaseService: null,
  firebaseAuthService: null,
};

const getters = {};

const actions = {};

const mutations = {
  initialize() {
    state.firebaseService = new FirebaseService();
    state.firebaseAuthService = new FirebaseAuthenticationService(
      state.firebaseService
    );
    state.dejimaApiClient = new DejimaApiClient();
    state.dejimaApiClient.basePath = "https://nightly.stg.es-e-bukken.jp";
    state.dejimaApiClient.authentications["APIKeyHeader"].apiKey =
      "9FJAuOlAwFBXJJeFNYOU4ujqVlynytVLaJQM2sYHdkcnKGO6Pm";
    state.dejimaImageApiClient = new ImageApiClient();
    state.dejimaImageApiClient.basePath =
      "https://image-nightly.stg.es-e-bukken.jp";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
