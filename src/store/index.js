import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stations: [],
    currentStation: null
  },
  mutations: {
    LOAD_STATIONS: (state, data) => {
      state.stations = data;
    },
    LOAD_CURRENT_STATION: (state, data) => {
      state.currentStation = data;
    },
  },
  actions: {
    loadStations: (context, data) => {
      context.commit("LOAD_STATIONS", data);
    },
    loadCurrentStation: (context, data) => {
      context.commit("LOAD_CURRENT_STATION", data);
    },
  },
  getters: {
    
  }
})
