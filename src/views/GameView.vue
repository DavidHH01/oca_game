<template>
  <div class="game-container">
    <div v-if="!isSelectedOrder" class="select-order_container">
      <div class="select-order_container__title">
        <h2>
          ¡Antes de empezar a jugar debéis seleccionar el orden de los
          jugadores!
        </h2>
      </div>
      <div class="select-order_container__body">
        <div class="select-order_container__body_order">
          <div
            class="select-order_container__body_order_content"
            v-for="(player, index) in sortedPlayers"
            :key="index"
          >
            {{ index + 1 }} - {{ player.name }}:
            {{ player.roll !== undefined ? player.roll : "-" }}
          </div>
        </div>
        <div
          class="select-order_container__body_selection"
          v-if="playersGame.length > 0"
        >
          <h3>Es tu turno: {{ playersGame[actualIndex].name }}</h3>
          <v-btn
            class="select-order_container__body_selection_button"
            @click="rollDice(playersGame[actualIndex].name)"
            >Tirar dados</v-btn
          >
        </div>
      </div>
    </div>
    <div v-else class="game_container">
      <!-- Game content here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelectedOrder: false,
      actualIndex: 0,
      playersGame: [],
    };
  },
  computed: {
    sortedPlayers() {
      return [...this.playersGame].sort(
        (a, b) => (b.roll || 0) - (a.roll || 0)
      );
    },
  },
  mounted() {
    const players = this.$store.state.players || [];
    if (players.length > 0) {
      this.playersGame = players.map((player) => ({
        ...player,
        roll: 0,
      }));
    } else {
      console.error("No players found in store.");
    }
  },
  methods: {
    rollDice(name) {
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      const total = dice1 + dice2;

      for (let player of this.playersGame) {
        if (player.name.toLowerCase() == name.toLowerCase()) {
          player.roll = total;
        }
      }
      if (this.actualIndex < this.playersGame.length - 1) {
        this.actualIndex++;
      } else {
        this.isSelectedOrder = true;
      }
    },
  },
};
</script>

<style scoped>
.game-container {
  height: 100%;
}

.select-order_container {
  padding: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.select-order_container__title {
  color: #f1df64;
  font-size: 18px;
  text-align: center;
}

.select-order_container__body {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.select-order_container__body_order {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding-top: 2rem;
}

.select-order_container__body_order_content {
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 0.6rem;
  margin-bottom: 0.5rem;
  border: 2px solid #f1df64;
  background: #1b1b1b;
  color: #f1df64;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.select-order_container__body_selection {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 2rem;
}
.select-order_container__body_selection h3 {
  color: #f1df64;
}

.select-order_container__body_selection_button {
  width: auto;
  height: 2rem;
  background: #f1df64;
  color: #1b1b1b;
  font-size: 14px;
  font-weight: 600;
  margin-top: 0.5rem;
}
</style>
