<template>
  <div class="main-container">
    <div class="main-container__img_container">
      <img
        class="main-container__img_container_img"
        :src="require('../assets/oca_loca_logo.png')"
      />
    </div>
    <div class="main-container__show">
      <v-container class="main-container__show_container" fluid>
        <v-row>
          <v-col
            v-for="(card, index) in cardImages"
            :key="index"
            cols="4"
            md="4"
            class="d-flex justify-center"
          >
            <v-btn
              @click="onToggleCardModal(card)"
              class="main-container__show_container_button"
            >
              {{ index + 1 }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="main-container__back">
      <v-btn @click="onGoBack" class="main-container__back_button">
        <v-icon>mdi mdi-chevron-left</v-icon>
      </v-btn>
    </div>
    <CardModal
      :isShow="showCardModal"
      :cardImage="actualCard"
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
      cardImages: [
        { image: require("../assets/cards/Baile_sensual.png") },
        { image: require("../assets/cards/Dioses_del_amor.png") },
        { image: require("../assets/cards/El_cani.png") },
        { image: require("../assets/cards/El_plan.png") },
        { image: require("../assets/cards/Fantasma.png") },
        { image: require("../assets/cards/Feliz_cum.png") },
        { image: require("../assets/cards/Ferxxo_mora.png") },
        { image: require("../assets/cards/La_Borracha.png") },
        { image: require("../assets/cards/Las_minas.png") },
        { image: require("../assets/cards/Los_pibes.png") },
        { image: require("../assets/cards/Marry.png") },
        { image: require("../assets/cards/moneda.png") },
        { image: require("../assets/cards/No_te_sale_la_caca.png") },
        { image: require("../assets/cards/Oca_loca.png") },
        { image: require("../assets/cards/Palabreo.png") },
        { image: require("../assets/cards/Parabara.png") },
        { image: require("../assets/cards/Policia_maritima.png") },
        { image: require("../assets/cards/Racugrafia.png") },
        { image: require("../assets/cards/Reglas_puneteras.jpg") },
        { image: require("../assets/cards/Shin_chan.png") },
        { image: require("../assets/cards/Todos.png") },
        { image: require("../assets/cards/Tragos_locos.png") },
        { image: require("../assets/cards/Verdad.png") },
      ],
      showCardModal: false,
      actualCard: "",
    };
  },
  methods: {
    onToggleCardModal(card) {
      this.actualCard = card.image;
      this.showCardModal = true;
    },
    onCloseCardModal() {
      this.showCardModal = false;
    },
    onGoBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.main-container__img_container {
  height: 10rem;
  width: 10rem;
}

.main-container__img_container_img {
  height: 100%;
  width: 100%;
}

.main-container__show {
  width: 100%;
  padding-top: 2rem;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-container__show_container {
  height: 100%;
}

.main-container__show_container_button {
  width: 100%;
  height: 3rem;
  border: 2px solid #f1df64;
  background: #1b1b1b;
  color: #f1df64;
  font-size: 16px;
  font-weight: 600;
}

.main-container__back {
  margin-bottom: 4rem;
}

.main-container__back_button {
  width: 100%;
  height: 3rem;
  background: #f1df64;
  color: #1b1b1b;
  font-size: 16px;
  font-weight: 600;
}
</style>
