<template>
  <div
    class="modal fade"
    id="modalAgregarBDerecho"
    tabindex="-1"
    aria-labelledby="modalAgregarBDerechoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MBDerecho">Añadir BDerecho</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="agregarBDerecho">
            <div class="mb-3">
              <label for="eps" class="form-label">EPS</label>
              <select
                class="form-select"
                id="eps"
                v-model="nuevoBDerecho.eps"
                required
              >
                <option value="" disabled selected>Seleccione una EPS</option>
                <option
                  v-for="eps in epsData"
                  :key="eps.id"
                  :value="eps.nombre"
                >
                  {{ eps.nombre }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="nombreBD" class="form-label">Nombre Contrato</label>
              <input
                type="text"
                class="form-control"
                id="nombreBD"
                v-model="nuevoBDerecho.nombreBD"
                required
              />
            </div>
            <div class="mb-3">
              <label for="codigoBD" class="form-label">Código Contrato</label>
              <input
                type="text"
                class="form-control"
                id="codigoBD"
                v-model="nuevoBDerecho.codigoBD"
                required
              />
            </div>
            <div class="mb-3">
              <label for="vigencia" class="form-label">Vigencia Final</label>
              <input
                type="date"
                class="form-control"
                id="vigencia"
                v-model="nuevoBDerecho.vigencia"
                required
              />
            </div>
            <div class="mb-3">
              <label for="regimen" class="form-label">Régimen</label>
              <select
                class="form-select"
                id="regimen"
                v-model="nuevoBDerecho.regimen"
                required
              >
                <option value="" disabled>Seleccione un régimen</option>
                <option
                  v-for="regimen in regimenes"
                  :key="regimen.id"
                  :value="regimen.label"
                >
                  {{ regimen.label }}
                </option>
              </select>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="submit" class="btn btn-custom btn-icon mb-5">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

import { regimenes, epsData } from "../../../bd/bd";

export default {
  name: "ModalAgregarBDerecho",
  emits: ["bderecho-agregado"],
  setup(props, { emit }) {
    const nuevoBDerecho = ref({
      eps: "",
      nombreBD: "",
      codigoBD: "",
      vigencia: "",
      regimen: "",
    });

    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarBDerecho = () => {
      emit("bderecho-agregado", { ...nuevoBDerecho.value });
      nuevoBDerecho.value = {
        eps: "",
        nombreBD: "",
        codigoBD: "",
        vigencia: "",
        regimen: "",
      };
      modalInstance.value.hide();
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarBDerecho")
      );
    });

    return {
      nuevoBDerecho,
      abrirModal,
      agregarBDerecho,

      regimenes,
      epsData,
    };
  },
};
</script>
