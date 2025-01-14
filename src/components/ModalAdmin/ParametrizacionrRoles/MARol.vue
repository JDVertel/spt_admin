<template>
  <div
    class="modal fade"
    id="modalAdminRol"
    tabindex="-1"
    aria-labelledby="modalAdminRolLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5" id="MAdmin">Administrar Rol</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <!-- Nav tabs -->
          <ul class="nav nav-tabs" id="configTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="tab1-tab"
                data-bs-toggle="tab"
                data-bs-target="#tab1"
                type="button"
                role="tab"
                aria-controls="tab1"
                aria-selected="true"
              >
                Tab 1
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="tab2-tab"
                data-bs-toggle="tab"
                data-bs-target="#tab2"
                type="button"
                role="tab"
                aria-controls="tab2"
                aria-selected="false"
              >
                Tab 2
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="tab3-tab"
                data-bs-toggle="tab"
                data-bs-target="#tab3"
                type="button"
                role="tab"
                aria-controls="tab3"
                aria-selected="false"
              >
                Tab 3
              </button>
            </li>
          </ul>

          <!-- Tab contents -->
          <div class="tab-content mt-3" id="configTabsContent">
            <div
              class="tab-pane fade show active"
              id="tab1"
              role="tabpanel"
              aria-labelledby="tab1-tab"
            >
              <p>Contenido del tab 1...</p>
            </div>
            <div
              class="tab-pane fade"
              id="tab2"
              role="tabpanel"
              aria-labelledby="tab2-tab"
            >
              <p>Contenido del tab 2...</p>
            </div>
            <div
              class="tab-pane fade"
              id="tab3"
              role="tabpanel"
              aria-labelledby="tab3-tab"
            >
              <p>Contenido del tab 3...</p>
            </div>
          </div>

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
  name: "ModalAdminRol",
  setup() {
    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const cerrarModal = () => {
      modalInstance.value.hide();
    };

    onMounted(() => {
      modalInstance.value = new Modal(document.getElementById("modalAdminRol"));
    });

    return {
      abrirModal,
      cerrarModal,
    };
  },
};
</script>
