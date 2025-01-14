<template>
  <div
    class="modal fade"
    id="modalEditarEPS"
    tabindex="-1"
    aria-labelledby="modalEditarEPSLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MEedit">Editar EPS</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="actualizarEPS">
            <div class="mb-3 d-flex align-items-center justify-content-between">
              <label class="form-label mb-0">Estado de la EPS</label>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="estadoSwitch"
                  v-model="epsEditada.estado"
                />
                <label class="form-check-label" for="estadoSwitch">
                  {{ epsEditada.estado ? "Activo" : "Inactivo" }}
                </label>
              </div>
            </div>

            <hr class="mt-3" />

            <div class="mb-3">
              <label for="edit-nit" class="form-label">NIT</label>
              <input
                type="text"
                class="form-control"
                id="edit-nit"
                v-model="epsEditada.nit"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="edit-nombre"
                v-model="epsEditada.nombre"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-representante" class="form-label"
                >Representante Legal</label
              >
              <input
                type="text"
                class="form-control"
                id="edit-representante"
                v-model="epsEditada.representante"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-direccion" class="form-label">Dirección</label>
              <input
                type="text"
                class="form-control"
                id="edit-direccion"
                v-model="epsEditada.direccion"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-ciudad" class="form-label">Ciudad</label>
              <input
                type="text"
                class="form-control"
                id="edit-ciudad"
                v-model="epsEditada.ciudad"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-correo" class="form-label">Correo</label>
              <input
                type="email"
                class="form-control"
                id="edit-correo"
                v-model="epsEditada.correo"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-celular" class="form-label">Celular</label>
              <input
                type="number"
                class="form-control"
                id="edit-celular"
                v-model="epsEditada.celular"
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
  name: "ModalEditarEPS",
  props: {
    eps: {
      type: Object,
      required: false,
      default: () => ({
        id: "",
        nit: "",
        nombre: "",
        representante: "",
        direccion: "",
        ciudad: "",
        correo: "",
        celular: "",
        estado: true,
      }),
    },
  },
  emits: ["eps-actualizada"],
  setup(props, { emit }) {
    const modalInstance = ref(null);
    const epsEditada = ref({ ...props.eps });

    const abrirModal = () => {
      if (props.eps) {
        epsEditada.value = { ...props.eps };
      }
      modalInstance.value.show();
    };

    const actualizarEPS = () => {
      emit("eps-actualizada", { ...epsEditada.value });
      modalInstance.value.hide();
    };

    watch(
      () => props.eps,
      (newEPS) => {
        if (newEPS) {
          epsEditada.value = { ...newEPS };
        }
      },
      { deep: true }
    );

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalEditarEPS")
      );
    });

    return {
      epsEditada,
      abrirModal,
      actualizarEPS,
    };
  },
};
</script>
