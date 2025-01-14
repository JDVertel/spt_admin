<template>
  <div
    class="modal fade modal-lg modal-small"
    id="ejemplo"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-servicio modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div
          v-for="(modalp, index) in modalProducto"
          :key="index"
          class="card-body d-flex flex-column"
        >
          <div class="card-imagen-modal mb-3">
            <img :src="modalp.imagenProducto" />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title-modal">{{ modalp.nombreProducto }}</h5>
            <!-- <p class="precio-modal">
              <span>$</span>{{ modalp.precioProducto }}
            </p> -->
          </div>
          <p class="card-detalles-modal">{{ modalp.detaProducto }}</p>
          <p class="card-text-modal">
            {{ modalp.infoProducto }}
          </p>
          <p class="card-mensajeLema-modal">{{ modalp.mensajeLema }}</p>
        </div>

        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-custom btn-icon mx-2 mb-2">
            <i class="bi bi-telephone"></i> 600 343 200
          </button>
          <button type="button" class="btn btn-custom btn-icon mx-2 mb-2">
            <i class="bi bi-whatsapp"></i> 324 543 240
          </button>
          <button type="button" class="btn btn-custom btn-icon mx-2 mb-2">
            <i class="bi bi-envelope"></i> Agenda aquí
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { modalp } from "../../bd/bd.js";

export default {
  name: "AppModalServices",
  data() {
    return {
      modalProducto: modalp,
    };
  },
};
</script>
