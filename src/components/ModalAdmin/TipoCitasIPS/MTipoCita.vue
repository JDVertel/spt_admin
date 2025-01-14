<template>
  <div
    class="modal fade"
    id="modalAgregarTipoCita"
    tabindex="-1"
    aria-labelledby="modalAgregarTipoCitaLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MTipoCita">Añadir Tipo Cita</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="agregarTipoCita">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="nuevaTipoCita.nombre"
                required
              />
            </div>
            <div class="mb-3">
              <label for="hc" class="form-label">HC</label>
              <input
                type="text"
                class="form-control"
                id="hc"
                v-model="nuevaTipoCita.hc"
                required
              />
            </div>
            <div class="mb-3">
              <label for="rol" class="form-label">Rol</label>
              <input
                type="text"
                class="form-control"
                id="rol"
                v-model="nuevaTipoCita.rol"
                required
              />
            </div>
            <div class="mb-3">
              <label for="reglasValidacion" class="form-label"
                >Reglas de Validación</label
              >
              <input
                type="text"
                class="form-control"
                id="reglasValidacion"
                v-model="nuevaTipoCita.reglasValidacion"
                required
              />
            </div>
            <div class="mb-3">
              <label for="tiempo" class="form-label">Tiempo</label>
              <input
                type="number"
                class="form-control"
                id="tiempo"
                v-model="nuevaTipoCita.tiempo"
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
  name: "ModalAgregarTipoCita",
  emits: ["tipocita-agregada"],
  setup(props, { emit }) {
    const nuevaTipoCita = ref({
      nombre: "",
      hc: "",
      rol: "",
      reglasValidacion: "",
      tiempo: "",
    });

    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarTipoCita = () => {
      emit("tipocita-agregada", { ...nuevaTipoCita.value });
      nuevaTipoCita.value = {
        nombre: "",
        hc: "",
        rol: "",
        reglasValidacion: "",
        tiempo: "",
      };
      modalInstance.value.hide();
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarTipoCita")
      );
    });

    return {
      nuevaTipoCita,
      abrirModal,
      agregarTipoCita,
    };
  },
};
</script>
