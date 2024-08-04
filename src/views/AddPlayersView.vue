<template>
  <div class="main-container">
    <div class="main-container__img_container">
      <img
        class="main-container__img_container_img"
        :src="require('../assets/oca_loca_logo.png')"
      />
    </div>
    <div class="main-container__add">
      <div class="main-container__add_container">
        <v-text-field
          v-for="(field, index) in textFields"
          :key="index"
          v-model="textFields[index]"
          variant="solo-filled"
          class="main-container__add_input"
          label="Nombre del jugador"
        />
      </div>
      <div class="main-container__add_plus_container">
        <v-btn class="main-container__add_plus" @click="addTextField">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <div class="main-container__add_players">
        <p>{{ this.numPlayers }} / {{ this.totalPlayers }}</p>
      </div>
      <div class="main-container__add_start_container">
        <v-btn class="main-container__add_start_button" @click="startGame"
          >Comenzar</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numPlayers: 1,
      totalPlayers: 10,
      textFields: [""],
    };
  },
  methods: {
    addTextField() {
      if (this.textFields.length < this.totalPlayers) {
        this.numPlayers++;
        this.textFields.push("");
      }
    },
    startGame() {
      console.log(this.textFields);
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
.main-container__img_container {
  height: 10rem;
  width: 10rem;
}
.main-container__img_container_img {
  height: 100%;
  width: 100%;
}

.main-container__add {
  width: 100%;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
}

.main-container__add_input {
  width: 80%;
  margin: 0 auto;
}

.main-container__add_container {
  width: 100%;
}

.main-container__add_plus {
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
  border: 2px solid #f1df64;
  background: #1b1b1b;
  color: #f1df64;
  font-size: 16px;
  font-weight: 600;
}

.main-container__add_players {
  margin-bottom: 1rem;
  color: #f1df64;
  font-size: 18px;
  font-weight: 600;
}

.main-container__add_start_button {
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
  background: #f1df64;
  color: #1b1b1b;
  font-size: 16px;
  font-weight: 600;
}
</style>
