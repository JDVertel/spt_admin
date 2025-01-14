<!-- MSedit.vue -->
<template>
  <div
    class="modal fade"
    id="modalEditarSucursal"
    tabindex="-1"
    aria-labelledby="modalEditarSucursalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MEdit">Editar Sucursal</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="actualizarSucursal">
            <div class="mb-3 d-flex align-items-center justify-content-between">
              <label class="form-label mb-0">Estado del la sucursal</label>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="estadoSwitch"
                  v-model="sucursalEditada.estado"
                />
                <label class="form-check-label" for="estadoSwitch">
                  {{ sucursalEditada.estado ? "Activo" : "Inactivo" }}
                </label>
              </div>
            </div>

            <hr class="mt-3" />

            <div class="mb-3">
              <label for="edit-nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="edit-nombre"
                v-model="sucursalEditada.nombre"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-direccion" class="form-label">Dirección</label>
              <input
                type="text"
                class="form-control"
                id="edit-direccion"
                v-model="sucursalEditada.direccion"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-ciudad" class="form-label">Ciudad</label>
              <input
                type="text"
                class="form-control"
                id="edit-ciudad"
                v-model="sucursalEditada.ciudad"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-celular" class="form-label">Celular</label>
              <input
                type="number"
                class="form-control"
                id="edit-celular"
                v-model="sucursalEditada.celular"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-correo" class="form-label">Correo</label>
              <input
                type="email"
                class="form-control"
                id="edit-correo"
                v-model="sucursalEditada.correo"
                required
              />
            </div>
            <hr class="mt-4" />
            <div class="mb-3">
              <label for="edit-usuario" class="form-label"
                >Usuario Encargado</label
              >
              <input
                type="text"
                class="form-control"
                id="edit-usuario"
                v-model="sucursalEditada.usuario"
                required
              />
            </div>
            <div class="mb-3">
              <label for="edit-contrasena" class="form-label">Contraseña</label>
              <input
                type="text"
                class="form-control"
                id="edit-contrasena"
                v-model="sucursalEditada.contrasena"
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
  name: "ModalEditarSucursal",
  props: {
    sucursal: {
      type: Object,
      required: false,
      default: () => ({
        id: "",
        nombre: "",
        direccion: "",
        ciudad: "",
        celular: "",
        correo: "",
        usuario: "",
        contrasena: "",
        estado: true,
        horarios: {
          manana: { ingreso: "", salida: "" },
          tarde: { ingreso: "", salida: "" },
        },
      }),
    },
  },
  emits: ["sucursal-actualizada"],
  setup(props, { emit }) {
    const modalInstance = ref(null);
    const sucursalEditada = ref({ ...props.sucursal });

    const abrirModal = () => {
      if (props.sucursal) {
        sucursalEditada.value = { ...props.sucursal };
      }
      modalInstance.value.show();
    };

    const actualizarSucursal = () => {
      emit("sucursal-actualizada", { ...sucursalEditada.value });
      modalInstance.value.hide();
    };

    watch(
      () => props.sucursal,
      (newSucursal) => {
        if (newSucursal) {
          sucursalEditada.value = { ...newSucursal };
        }
      },
      { deep: true }
    );

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalEditarSucursal")
      );
    });

    return {
      sucursalEditada,
      abrirModal,
      actualizarSucursal,
    };
  },
};
</script>
