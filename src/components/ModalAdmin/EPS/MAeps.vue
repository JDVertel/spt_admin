<template>
  <div
    class="modal fade"
    id="modalAdminEPS"
    tabindex="-1"
    aria-labelledby="modalAdminEPSLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5" id="MAdmin">Administrar EPS</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          Contenido de administración
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-custom btn-icon mb-5">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "ModalAdminEPS",
  setup() {
    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const cerrarModal = () => {
      modalInstance.value.hide();
    };

    onMounted(() => {
      modalInstance.value = new Modal(document.getElementById("modalAdminEPS"));
    });

    return {
      abrirModal,
      cerrarModal,
    };
  },
};
</script>
