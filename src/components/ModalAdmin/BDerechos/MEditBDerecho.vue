<template>
  <div
    class="modal fade"
    id="modalEditarBDerecho"
    tabindex="-1"
    aria-labelledby="modalEditarBDerechoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MEditBDerecho">
            Editar BDerecho
          </h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="actualizarBDerecho">
            <div class="mb-3 d-flex align-items-center justify-content-between">
              <label class="form-label mb-0">Estado del BDerecho</label>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="estadoSwitch"
                  v-model="bderechoEditado.estado"
                />
                <label class="form-check-label" for="estadoSwitch">
                  {{ bderechoEditado.estado ? "Activo" : "Inactivo" }}
                </label>
              </div>
            </div>

            <hr class="mt-3" />

            <div class="mb-3">
              <label for="edit-eps" class="form-label">EPS</label>
              <select
                class="form-select"
                id="edit-eps"
                v-model="bderechoEditado.eps"
                required
              >
                <option value="" disabled>Seleccione una EPS</option>
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
              <label for="edit-nombreBD" class="form-label"
                >Nombre BDerecho</label
              >
              <input
                type="text"
                class="form-control"
                id="edit-nombreBD"
                v-model="bderechoEditado.nombreBD"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-codigoBD" class="form-label"
                >Código BDerecho</label
              >
              <input
                type="text"
                class="form-control"
                id="edit-codigoBD"
                v-model="bderechoEditado.codigoBD"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-vigencia" class="form-label">Vigencia</label>
              <input
                type="text"
                class="form-control"
                id="edit-vigencia"
                v-model="bderechoEditado.vigencia"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-regimen" class="form-label">Régimen</label>
              <select
                class="form-select"
                id="edit-regimen"
                v-model="bderechoEditado.regimen"
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

import { regimenes, epsData } from "../../../bd/bd";

export default {
  name: "ModalEditarBDerecho",
  props: {
    bderecho: {
      type: Object,
      required: false,
      default: () => ({
        id: "",
        eps: "",
        nombreBD: "",
        codigoBD: "",
        vigencia: "",
        regimen: "",
        estado: true,
      }),
    },
  },
  emits: ["bderecho-actualizado"],
  setup(props, { emit }) {
    const modalInstance = ref(null);
    const bderechoEditado = ref({ ...props.bderecho });

    const abrirModal = () => {
      if (props.bderecho) {
        bderechoEditado.value = { ...props.bderecho };
      }
      modalInstance.value.show();
    };

    const actualizarBDerecho = () => {
      emit("bderecho-actualizado", { ...bderechoEditado.value });
      modalInstance.value.hide();
    };

    watch(
      () => props.bderecho,
      (newBDerecho) => {
        if (newBDerecho) {
          bderechoEditado.value = { ...newBDerecho };
        }
      },
      { deep: true }
    );

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalEditarBDerecho")
      );
    });

    return {
      bderechoEditado,
      abrirModal,
      actualizarBDerecho,
      regimenes,
      epsData,
    };
  },
};
</script>
