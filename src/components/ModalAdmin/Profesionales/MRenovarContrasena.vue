<template>
  <div
    class="modal fade"
    id="modalRenovarContrasena"
    tabindex="-1"
    aria-labelledby="modalRenovarContrasenaLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5" id="MAdmin">Renovar Contraseña</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="renovarContrasena">
            <div class="mb-3">
              <label for="nuevaContrasena" class="form-label"
                >Nueva Contraseña</label
              >
              <input
                type="password"
                class="form-control"
                v-model="nuevaContrasena"
                required
              />
            </div>
            <div class="mb-3">
              <label for="confirmarContrasena" class="form-label"
                >Confirmar Contraseña</label
              >
              <input
                type="password"
                class="form-control"
                v-model="confirmarContrasena"
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
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "MRenovarContrasena",
  emits: ["contrasena-renovada"],
  setup(props, { emit }) {
    const nuevaContrasena = ref("");
    const confirmarContrasena = ref("");
    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const renovarContrasena = () => {
      if (nuevaContrasena.value === confirmarContrasena.value) {
        emit("contrasena-renovada", nuevaContrasena.value);
        nuevaContrasena.value = "";
        confirmarContrasena.value = "";
        modalInstance.value.hide();
      } else {
        Swal.fire({
          title: "Error",
          text: "Las contraseñas no coinciden",
          icon: "error",
          iconColor: "#2a3f54",
          confirmButtonText: "Entendido",
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          customClass: {
            confirmButton: "btn btn-custom mb-2",
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalRenovarContrasena"),
        {
          backdrop: "static",
          keyboard: false,
        }
      );
    });

    return {
      nuevaContrasena,
      confirmarContrasena,
      abrirModal,
      renovarContrasena,
    };
  },
};
</script>
