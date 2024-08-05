<template>
  <div class="game-container">
    <div v-if="!isStarted" class="select-order_container">
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
            v-if="!isSelectedOrder"
            class="select-order_container__body_selection_button"
            @click="rollDice(playersGame[actualIndex].name)"
            >Tirar dados</v-btn
          >

          <v-btn
            v-else
            class="select-order_container__body_start_button"
            @click="onToggleStart"
            >Comenzar</v-btn
          >
        </div>
      </div>
    </div>
    <div v-else class="game-container__playing">
      <div v-if="playersGame.length > 0" class="HUD-container">
        <div class="HUD-container__left">
          <div class="HUD-container__left_sub_container">
            <img
              class="HUD-container__left_square"
              :src="require('../assets/square_logo.png')"
            />
            <h2>{{ playersGame[gameIndex].casilla }} / {{ totalSquares }}</h2>
          </div>
          <div class="HUD-container__left_sub_container">
            <img
              class="HUD-container__left_beer"
              :src="require('../assets/beer_logo.png')"
            />
            <h2>x {{ playersGame[gameIndex].tragos }}</h2>
          </div>
          <div class="HUD-container__left_sub_container">
            <img
              class="HUD-container__left_skull"
              :src="require('../assets/skull.png')"
            />
            <h2>x {{ playersGame[gameIndex].hidalgos }}</h2>
          </div>
        </div>
        <div class="HUD-container__center">
          <img
            class="HUD-container__center_logo"
            :src="require('../assets/oca_loca_logo.png')"
          />
        </div>
        <div class="HUD-container__right">
          <v-icon class="HUD-container__right_icon">mdi mdi-information</v-icon>
        </div>
      </div>
      <div v-if="playersGame.length > 0" class="screen-container">
        <div class="screen-container__player_turn">
          <h2>Turno: {{ playersGame[gameIndex].name }}</h2>
        </div>
        <div class="screen-container__player_round">
          <h3>Ronda: {{ playersGame[gameIndex].ronda }}</h3>
        </div>
        <div @click="onShowCard" class="screen-container__card">
          <img
            class="screen-container__card_img"
            :src="require('../assets/cards/Carta_Reverso.png')"
          />
        </div>
        <div class="screen-container__actions">
          <v-btn
            @click="rollDie(playersGame[gameIndex].name)"
            class="screen-container__actions_button"
            :disabled="isDie"
            >Tirar dado</v-btn
          >
          <p>Has sacado: {{ playersGame[gameIndex].roll }}</p>
        </div>
      </div>
    </div>
    <CardModal
      :isShow="isShowCardModal"
      :cardImage="actualCardName"
      @close="onCloseCardModal"
    />
  </div>
</template>

<script>
import CardModal from "@/components/CardModal.vue";
export default {
  components: {
    CardModal,
  },
  data() {
    return {
      isSelectedOrder: false,
      isStarted: false,
      isDie: false,
      isGameEnd: false,
      isShowCardModal: false,
      actualIndex: 0,
      actualCardName: "",
      gameIndex: 0,
      playersGame: [],
      totalSquares: 43,
      cards: [
        {
          name: require("../assets/cards/Parabara.png"),
          squares: [3, 18, 32],
          tragos: 0,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Oca_loca.png"),
          squares: [7, 14, 17, 20, 24],
          tragos: 1,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Dioses_del_amor.png"),
          squares: [5, 25, 35],
          tragos: 0,
          hidalgo: 1,
          back: 0,
        },
        {
          name: require("../assets/cards/No_te_sale_la_caca.png"),
          squares: [12, 30],
          tragos: 2,
          hidalgo: 0,
          back: 4,
        },
        {
          name: require("../assets/cards/Tragos_locos.png"),
          squares: [8, 16, 26, 28, 39],
          tragos: 0,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Palabreo.png"),
          squares: [33, 38],
          tragos: 3,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Feliz_cum.png"),
          squares: [22, 42],
          tragos: 4,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Reglas_puneteras.jpg"),
          squares: [10, 19, 27],
          tragos: 0,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/moneda.png"),
          squares: [4, 9, 23],
          tragos: 1,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Todos.png"),
          squares: [1],
          tragos: 1,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Los_pibes.png"),
          squares: [2],
          tragos: 1,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Las_minas.png"),
          squares: [6],
          tragos: 1,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Ferxxo_mora.png"),
          squares: [11],
          tragos: 1,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Verdad.png"),
          squares: [13, 21],
          tragos: 0,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/El_cani.png"),
          squares: [15],
          tragos: 2,
          hidalgo: 0,
          back: 2,
        },
        {
          name: require("../assets/cards/Marry.png"),
          squares: [29],
          tragos: 0,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Racugrafia.png"),
          squares: [31],
          tragos: 3,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Baile_sensual.png"),
          squares: [34],
          tragos: 4,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Policia_maritima.png"),
          squares: [36],
          tragos: 3,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Shin_chan.png"),
          squares: [37],
          tragos: 5,
          hidalgo: 0,
          back: 0,
        },
        {
          name: require("../assets/cards/Fantasma.png"),
          squares: [40],
          tragos: 0,
          hidalgo: 1,
          back: 0,
        },
        {
          name: require("../assets/cards/La_Borracha.png"),
          squares: [41],
          tragos: 2,
          hidalgo: 0,
          back: 10,
        },
        {
          name: require("../assets/cards/El_plan.png"),
          squares: [43],
          tragos: 0,
          hidalgo: 1,
          back: 0,
        },
      ],
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
    rollDie(name) {
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const total = dice1;

      for (let player of this.playersGame) {
        if (player.name.toLowerCase() == name.toLowerCase()) {
          player.roll = total;
          player.casilla = player.casilla + total;
          if (player.casilla > this.totalSquares) {
            player.casilla = this.totalSquares;
            this.isGameEnd = true;
          }
        }
      }
      this.isDie = true;
    },
    onToggleStart() {
      this.isStarted = true;

      let i = 0;
      for (let player of this.sortedPlayers) {
        player.turno = i;

        i++;
      }
      this.playersGame = this.sortedPlayers;
      for (let player of this.playersGame) {
        player.round++;
        player.roll = 0;
      }
    },
    onShowCard() {
      for (let card of this.cards) {
        for (let square of card.squares)
          if (this.playersGame[this.gameIndex].casilla == square) {
            this.playersGame[this.gameIndex].tragos =
              this.playersGame[this.gameIndex].tragos + card.tragos;
            this.playersGame[this.gameIndex].hidalgos =
              this.playersGame[this.gameIndex].hidalgos + card.hidalgo;
            this.playersGame[this.gameIndex].casilla =
              this.playersGame[this.gameIndex].casilla - card.back;
            this.actualCardName = card.name;
            this.isShowCardModal = true;
          }
      }
    },
    onCloseCardModal() {
      this.isShowCardModal = false;
      this.isDie = false;
      if (this.gameIndex < this.playersGame.length - 1) {
        this.gameIndex++;
      } else {
        for (let player of this.playersGame) {
          player.ronda++;
        }
        this.gameIndex = 0;
      }
    },
  },
};
</script>

<style scoped>
.game-container {
  height: 100vh; /* Asegura que ocupe toda la altura de la ventana */
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
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

.select-order_container__body_start_button {
  width: auto;
  height: 2rem;
  background: #f1df64;
  color: #1b1b1b;
  font-size: 14px;
  font-weight: 600;
  margin-top: 0.5rem;
}

.game-container__playing {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.HUD-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  width: 100%;
}

.HUD-container__left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
}

.HUD-container__left_sub_container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.HUD-container__left_sub_container h2 {
  color: #f1df64;
}

.HUD-container__center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
}
.HUD-container__right {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.HUD-container__left_square {
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
}

.HUD-container__left_beer {
  height: 3rem;
  width: 3rem;
  margin-right: 1rem;
}

.HUD-container__left_skull {
  height: 3rem;
  width: 3rem;
  margin-right: 1rem;
}
.HUD-container__center_logo {
  height: 9rem;
  width: 9rem;
}

.HUD-container__right_icon {
  transform: scale(1.3);
  color: #f1df64;
}

.screen-container {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.screen-container__player_turn {
  color: #f1df64;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  width: 100%;
  padding: 1rem;
}

.screen-container__player_round {
  color: #f1df64;
  text-align: center;
  font-weight: bold;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.screen-container__card_img {
  height: 28rem;
  width: 20rem;
}

.screen-container__actions {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.screen-container__actions_button {
  idth: 100%;
  height: 3rem;
  margin-bottom: 1rem;
  background: #f1df64;
  color: #1b1b1b;
  font-size: 16px;
  font-weight: 600;
}

.screen-container__actions p {
  color: #f1df64;
  font-size: 18px;
  font-weight: 600;
}
</style>
