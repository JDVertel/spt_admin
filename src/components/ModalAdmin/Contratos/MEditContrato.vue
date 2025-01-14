<template>
  <div
    class="modal fade"
    id="modalEditarContrato"
    tabindex="-1"
    aria-labelledby="modalEditarContratoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MEedit">Editar Contrato</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="actualizarContrato">
            <div class="mb-3 d-flex align-items-center justify-content-between">
              <label class="form-label mb-0">Estado del Contrato</label>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="estadoSwitch"
                  v-model="contratoEditado.estado"
                />
                <label class="form-check-label" for="estadoSwitch">
                  {{ contratoEditado.estado ? "Activo" : "Inactivo" }}
                </label>
              </div>
            </div>

            <hr class="mt-3" />

            <div class="mb-3">
              <label for="edit-eps" class="form-label">EPS</label>
              <input
                type="text"
                class="form-control"
                id="edit-eps"
                v-model="contratoEditado.eps"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="edit-nombre"
                v-model="contratoEditado.nombre"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-codigo" class="form-label">Código</label>
              <input
                type="text"
                class="form-control"
                id="edit-codigo"
                v-model="contratoEditado.codigo"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-modalidad" class="form-label">Modalidad</label>
              <input
                type="text"
                class="form-control"
                id="edit-modalidad"
                v-model="contratoEditado.modalidad"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-valor" class="form-label">Valor</label>
              <input
                type="number"
                class="form-control"
                id="edit-valor"
                v-model="contratoEditado.valor"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-fechaInicio" class="form-label"
                >Fecha Inicio</label
              >
              <input
                type="date"
                class="form-control"
                id="edit-fechaInicio"
                v-model="contratoEditado.fechaInicio"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-fechaFin" class="form-label">Fecha Fin</label>
              <input
                type="date"
                class="form-control"
                id="edit-fechaFin"
                v-model="contratoEditado.fechaFin"
                required
              />
            </div>

            <div class="modal-footer d-flex justify-content-between">
              <button type="submit" class="btn btn-custom btn-icon mb-5">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "ModalEditarContrato",
  props: {
    contrato: {
      type: Object,
      required: false,
      default: () => ({
        id: "",
        eps: "",
        nombre: "",
        codigo: "",
        modalidad: "",
        valor: "",
        fechaInicio: "",
        fechaFin: "",
        estado: true,
      }),
    },
  },
  emits: ["contrato-actualizado"],
  setup(props, { emit }) {
    const modalInstance = ref(null);
    const contratoEditado = ref({ ...props.contrato });

    const abrirModal = () => {
      if (props.contrato) {
        contratoEditado.value = { ...props.contrato };
      }
      modalInstance.value.show();
    };

    const actualizarContrato = () => {
      emit("contrato-actualizado", { ...contratoEditado.value });
      modalInstance.value.hide();
    };

    watch(
      () => props.contrato,
      (newContrato) => {
        if (newContrato) {
          contratoEditado.value = { ...newContrato };
        }
      },
      { deep: true }
    );

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalEditarContrato")
      );
    });

    return {
      contratoEditado,
      abrirModal,
      actualizarContrato,
    };
  },
};
</script>
