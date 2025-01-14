<template>
  <div class="cards-container">
    <div
      v-for="(servicio, index) in servicios"
      :key="index"
      class="serviciosCR card"
      data-bs-toggle="modal"
      data-bs-target="#ejemplo"
    >
      <h1 class="titulo">{{ servicio.titulo }}</h1>
      <div class="imagen">
        <img :src="servicio.imagen" alt="" />
        <div class="texto-imagen">
          <div class="icono">
            <i :class="`bi ${servicio.icono}`"></i>
          </div>
          <p class="texto-mini">{{ servicio.textoMini }}</p>
          {{ servicio.texto }}
        </div>
      </div>
    </div>
  </div>

  <AppModalServices></AppModalServices>
</template>

<script>
import { servicios } from "../bd/bd.js";
import AppModalServices from "../components/Sections/AppModalServices.vue";

export default {
  components: {
    AppModalServices,
  },
  data() {
    return {
      servicios: servicios,
    };
  },
};
</script>
