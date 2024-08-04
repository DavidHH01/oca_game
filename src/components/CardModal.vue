<template>
  <v-dialog
    v-model="isShowed"
    transition="dialog-bottom-transition"
    width="auto"
    @input="emitClose"
    persistent
  >
    <v-card class="card-container">
      <img :src="cardImage" />

      <v-card-actions class="justify-end">
        <v-btn class="card-container__actions_button" @click="closeModal"
          >Cerrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
    cardImage: String,
  },
  data() {
    return {
      isShowed: this.isShow,
      card: "",
    };
  },
  watch: {
    isShow(val) {
      this.isShowed = val;
    },
    cardImage(val) {
      this.card = val;
      console.log(this.card);
    },
  },
  methods: {
    closeModal() {
      this.isShowed = false;
      this.emitClose();
    },
    emitClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.card-container {
  background: #1b1b1b;
}

.card-container__actions_button {
  background: #f1df64;
  color: #1b1b1b;
  font-size: 14px;
  font-weight: 600;
  height: 2.5rem;
}
</style>
