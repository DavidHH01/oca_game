import { createStore } from "vuex";

export default createStore({
  state: {
    players: [],
    currentPlayerIndex: 0,
  },
  getters: {
    players: (state) => state.players,
    currentPlayer: (state) => state.players[state.currentPlayerIndex],
  },
  mutations: {
    ADD_PLAYER(state, player) {
      state.players.push(player);
    },
    SET_PLAYERS(state, players) {
      state.players = players;
    },
    UPDATE_PLAYER_POSITION(state, { playerId, position }) {
      const player = state.players.find((p) => p.id === playerId);
      if (player) {
        player.position = position;
      }
    },
    UPDATE_PLAYER_DRINKS(state, { playerId, drinks }) {
      const player = state.players.find((p) => p.id === playerId);
      if (player) {
        player.drinks += drinks;
      }
    },
    SET_CURRENT_PLAYER(state, index) {
      state.currentPlayerIndex = index;
    },
  },
  actions: {
    addPlayer({ commit }, player) {
      commit("ADD_PLAYER", player);
    },
    setPlayers({ commit }, players) {
      commit("SET_PLAYERS", players);
    },
    updatePlayerPosition({ commit }, payload) {
      commit("UPDATE_PLAYER_POSITION", payload);
    },
    updatePlayerDrinks({ commit }, payload) {
      commit("UPDATE_PLAYER_DRINKS", payload);
    },
    setCurrentPlayer({ commit }, index) {
      commit("SET_CURRENT_PLAYER", index);
    },
  },
  modules: {},
});
