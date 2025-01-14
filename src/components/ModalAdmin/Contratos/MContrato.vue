<template>
  <div
    class="modal fade"
    id="modalAgregarContrato"
    tabindex="-1"
    aria-labelledby="modalAgregarContratoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MContrato">Añadir Contrato</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="agregarContrato">
            <div class="mb-3">
              <label for="eps" class="form-label">EPS</label>
              <input
                type="text"
                class="form-control"
                id="eps"
                v-model="nuevoContrato.eps"
                required
              />
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="nuevoContrato.nombre"
                required
              />
            </div>
            <div class="mb-3">
              <label for="codigo" class="form-label">Código</label>
              <input
                type="text"
                class="form-control"
                id="codigo"
                v-model="nuevoContrato.codigo"
                required
              />
            </div>
            <div class="mb-3">
              <label for="modalidad" class="form-label">Modalidad</label>
              <input
                type="text"
                class="form-control"
                id="modalidad"
                v-model="nuevoContrato.modalidad"
                required
              />
            </div>
            <div class="mb-3">
              <label for="valor" class="form-label">Valor</label>
              <input
                type="number"
                class="form-control"
                id="valor"
                v-model="nuevoContrato.valor"
                required
              />
            </div>
            <div class="mb-3">
              <label for="fechaInicio" class="form-label">Fecha Inicio</label>
              <input
                type="date"
                class="form-control"
                id="fechaInicio"
                v-model="nuevoContrato.fechaInicio"
                required
              />
            </div>
            <div class="mb-3">
              <label for="fechaFin" class="form-label">Fecha Fin</label>
              <input
                type="date"
                class="form-control"
                id="fechaFin"
                v-model="nuevoContrato.fechaFin"
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
  name: "ModalAgregarContrato",
  emits: ["contrato-agregado"],
  setup(props, { emit }) {
    const nuevoContrato = ref({
      eps: "",
      nombre: "",
      codigo: "",
      modalidad: "",
      valor: "",
      fechaInicio: "",
      fechaFin: "",
    });

    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarContrato = () => {
      emit("contrato-agregado", { ...nuevoContrato.value });
      nuevoContrato.value = {
        eps: "",
        nombre: "",
        codigo: "",
        modalidad: "",
        valor: "",
        fechaInicio: "",
        fechaFin: "",
      };
      modalInstance.value.hide();
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarContrato")
      );
    });

    return {
      nuevoContrato,
      abrirModal,
      agregarContrato,
    };
  },
};
</script>
