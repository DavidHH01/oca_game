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
          label="Player Name"
        />
      </div>
      <div>
        <v-btn @click="addTextField">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn @click="startGame">Comenzar</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numPlayers: 0,
      totalPlayers: 10,
      textFields: [""], // Inicializa con un campo de texto vacío
    };
  },
  methods: {
    addTextField() {
      this.textFields.push(""); // Añade un nuevo campo de texto vacío al array
    },
    startGame() {
      console.log(this.textFields); // Realiza alguna acción con los valores de los campos de texto
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
  background-color: aqua;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
}

.main-container__add_input {
}

.main-container__add_container {
  width: 100%;
  background-color: red;
}
</style>
