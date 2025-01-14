<template>
  <div
    class="modal fade"
    id="modalAgregarEPS"
    tabindex="-1"
    aria-labelledby="modalAgregarEPSLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MEPS">Añadir EPS</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="agregarEPS">
            <div class="mb-3">
              <label for="nit" class="form-label">NIT</label>
              <input
                type="text"
                class="form-control"
                id="nit"
                v-model="nuevaEPS.nit"
                required
              />
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="nuevaEPS.nombre"
                required
              />
            </div>
            <div class="mb-3">
              <label for="representante" class="form-label"
                >Representante Legal</label
              >
              <input
                type="text"
                class="form-control"
                id="representante"
                v-model="nuevaEPS.representante"
                required
              />
            </div>
            <div class="mb-3">
              <label for="direccion" class="form-label">Dirección</label>
              <input
                type="text"
                class="form-control"
                id="direccion"
                v-model="nuevaEPS.direccion"
                required
              />
            </div>
            <div class="mb-3">
              <label for="ciudad" class="form-label">Ciudad</label>
              <input
                type="text"
                class="form-control"
                id="ciudad"
                v-model="nuevaEPS.ciudad"
                required
              />
            </div>
            <div class="mb-3">
              <label for="correo" class="form-label">Correo</label>
              <input
                type="email"
                class="form-control"
                id="correo"
                v-model="nuevaEPS.correo"
                required
              />
            </div>
            <div class="mb-3">
              <label for="celular" class="form-label">Celular</label>
              <input
                type="number"
                class="form-control"
                id="celular"
                v-model="nuevaEPS.celular"
                required
              />
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

export default {
  name: "ModalAgregarEPS",
  emits: ["eps-agregada"],
  setup(props, { emit }) {
    const nuevaEPS = ref({
      nit: "",
      nombre: "",
      representante: "",
      direccion: "",
      ciudad: "",
      correo: "",
      celular: "",
    });

    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarEPS = () => {
      emit("eps-agregada", { ...nuevaEPS.value });
      nuevaEPS.value = {
        nit: "",
        nombre: "",
        representante: "",
        direccion: "",
        ciudad: "",
        correo: "",
        celular: "",
      };
      modalInstance.value.hide();
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarEPS")
      );
    });

    return {
      nuevaEPS,
      abrirModal,
      agregarEPS,
    };
  },
};
</script>
