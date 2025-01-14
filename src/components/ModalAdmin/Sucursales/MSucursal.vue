<template>
  <div
    class="modal fade"
    id="modalAgregarSucursal"
    tabindex="-1"
    aria-labelledby="modalAgregarSucursalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MSucursal">Añadir Sucursal</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="agregarSucursal">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="nuevaSucursal.nombre"
                required
              />
            </div>
            <div class="mb-3">
              <label for="direccion" class="form-label">Dirección</label>
              <input
                type="text"
                class="form-control"
                id="direccion"
                v-model="nuevaSucursal.direccion"
                required
              />
            </div>
            <div class="mb-3">
              <label for="ciudad" class="form-label">Ciudad</label>
              <input
                type="text"
                class="form-control"
                id="ciudad"
                v-model="nuevaSucursal.ciudad"
                required
              />
            </div>
            <div class="mb-3">
              <label for="celular" class="form-label">Celular</label>
              <input
                type="number"
                class="form-control"
                id="celular"
                v-model="nuevaSucursal.celular"
                required
              />
            </div>
            <div class="mb-3">
              <label for="correo" class="form-label">Correo</label>
              <input
                type="email"
                class="form-control"
                id="correo"
                v-model="nuevaSucursal.correo"
                required
              />
            </div>

            <hr class="mt-4" />

            <div class="mb-3">
              <label for="usuario" class="form-label">Usuario Encargado</label>
              <input
                type="text"
                class="form-control"
                id="usuario"
                v-model="nuevaSucursal.usuario"
                required
              />
            </div>

            <div class="mb-3">
              <label for="contrasena" class="form-label">Contraseña</label>
              <input
                type="text"
                class="form-control"
                id="contrasena"
                v-model="nuevaSucursal.contrasena"
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
  name: "ModalAgregarSucursal",
  emits: ["sucursal-agregada"],
  setup(props, { emit }) {
    const nuevaSucursal = ref({
      // id: "",
      nombre: "",
      direccion: "",
      ciudad: "",
      celular: "",
      correo: "",
      usuario: "",
      contrasena: "",
    });

    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarSucursal = () => {
      emit("sucursal-agregada", { ...nuevaSucursal.value });
      nuevaSucursal.value = {
        nombre: "",
        direccion: "",
        ciudad: "",
        celular: "",
        correo: "",
        usuario: "",
        contrasena: "",
      };
      modalInstance.value.hide();
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarSucursal")
      );
    });

    return {
      nuevaSucursal,
      abrirModal,
      agregarSucursal,
    };
  },
};
</script>
