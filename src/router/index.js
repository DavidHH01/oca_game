import { createRouter, createWebHistory } from "vue-router";
import GameView from "../views/GameView.vue";
import ShowCardsView from "../views/ShowCardsView.vue";
import AddPlayersView from "../views/AddPlayersView.vue";
import MainView from "../views/MainView.vue";

const routes = [
  {
    path: "/",
    name: "MainView",
    component: MainView,
  },
  {
    path: "/show",
    name: "ShowCardsView",
    component: ShowCardsView,
  },
  {
    path: "/add",
    name: "AddPlayersView",
    component: AddPlayersView,
  },
  {
    path: "/game",
    name: "GameView",
    component: GameView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
