<template>
  <div class="main-container">
    <div class="main-container__img_container">
      <img
        class="main-container__img_container_img"
        :src="require('../assets/oca_loca_logo.png')"
      />
    </div>
    <div class="main-container__options_container">
      <v-btn @click="goToAdd" class="main-container__options_container_button"
        >JUGAR</v-btn
      >
      <v-btn @click="goToShow" class="main-container__options_container_button"
        >VER CARTAS</v-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  },

  methods: {
    goToAdd() {
      this.$router.push("/add");
    },
    goToShow() {
      this.$router.push("/show");
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
  height: 20rem;
  width: 20rem;
}
.main-container__img_container_img {
  height: 100%;
  width: 100%;
}

.main-container__options_container {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50%;
  width: 40%;
  padding-top: 2rem;
}

.main-container__options_container_button {
  width: 100%;
  height: 3rem;
  margin-bottom: 3rem;
  border: 2px solid #f1df64;
  background: #1b1b1b;
  color: #f1df64;
  font-size: 16px;
  font-weight: 600;
}
</style>
