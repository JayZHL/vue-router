import Vue from "vue";
import VueRouter from "vue-router";
import Cursos from "../views/Cursos.vue";
import Estudiantes from "../views/Estudiantes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Estudiantes",
    component: Estudiantes
  },
  {
    path: "/cursos",
    name: "Cursos",
    component: Cursos
  },
];

const router = new VueRouter({
  routes
});

export default router;
