import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes/routes.js";

// main.js o main.ts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// V-Calendar imports
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import "./style.css";
import App from "./App.vue";

//objeto rutas - vue router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//instancia de vue
const app = createApp(App);

app.use(router);
app.use(VCalendar, {});

app.mount("#app");
