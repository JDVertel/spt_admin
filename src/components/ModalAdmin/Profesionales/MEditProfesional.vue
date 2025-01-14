<template>
  <div
    class="modal fade"
    id="modalEditarProfesional"
    tabindex="-1"
    aria-labelledby="modalEditarProfesionalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5" id="MAdmin">Editar Profesional</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="editarProfesional">
            <div class="row">
              <!-- Informacion del profesional -->
              <div class="col-md-6">
                <h6
                  style="
                    text-align: center;
                    background-color: #2a3f54;
                    color: #fff;
                    padding: 10px;
                    border-radius: 5px;
                  "
                  class="mb-4"
                >
                  Profesional
                </h6>
                <div class="mb-3">
                  <label for="perfil" class="form-label">Perfil</label>
                  <select
                    v-model="profesional.perfil"
                    class="form-select"
                    required
                  >
                    <option disabled value="">Seleccione</option>
                    <option
                      v-for="rol in roles"
                      :key="rol.id"
                      :value="rol.label"
                    >
                      {{ rol.label }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="rol" class="form-label">Rol</label>
                  <select
                    v-model="profesional.rol"
                    class="form-select"
                    required
                  >
                    <option disabled value="">Seleccione</option>
                    <option
                      v-for="rol in roles"
                      :key="rol.id"
                      :value="rol.label"
                    >
                      {{ rol.label }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="profesional.nombre"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="numeroDocumento" class="form-label"
                    >Numero de Documento</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="profesional.numeroDocumento"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="registroMedico" class="form-label"
                    >Registro Medico</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="profesional.registroMedico"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="fechaNacimiento" class="form-label"
                    >Fecha de nacimiento</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    v-model="profesional.fechaNacimiento"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="genero" class="form-label">Genero</label>
                  <select
                    v-model="profesional.genero"
                    class="form-select"
                    required
                  >
                    <option disabled value="">Seleccione Genero</option>
                    <option
                      v-for="sexo in sexos"
                      :key="sexo.id"
                      :value="sexo.label"
                    >
                      {{ sexo.label }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="imagenPerfil" class="form-label"
                    >Imagen de perfil</label
                  >
                  <input
                    type="file"
                    class="form-control"
                    @change="handleFileUpload"
                  />
                </div>
              </div>
              <!-- Credenciales de acceso -->
              <div class="col-md-6">
                <h6
                  style="
                    text-align: center;
                    background-color: #2a3f54;
                    color: #fff;
                    padding: 10px;
                    border-radius: 5px;
                  "
                  class="mb-4"
                >
                  Credenciales
                </h6>
                <div class="mb-3">
                  <label for="correoElectronico" class="form-label"
                    >Correo electronico</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    v-model="profesional.correoElectronico"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="telefono" class="form-label">Telefono</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="profesional.telefono"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="usuario" class="form-label">Usuario</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="profesional.usuario"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="contrasena" class="form-label">Contraseña</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="profesional.contrasena"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="confirmaContrasena" class="form-label"
                    >Confirma Contraseña</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="profesional.confirmaContrasena"
                    required
                  />
                </div>
              </div>
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
import { ref, watch, onMounted } from "vue";
import { Modal } from "bootstrap";
import { roles, sexos } from "../../../bd/bd";

export default {
  name: "MEditProfesional",
  props: {
    profesional: {
      type: Object,
      required: false,
      default: () => ({
        estado: "",
        perfil: "",
        rol: "",
        nombre: "",
        usuario: "",
        ips: "",
        numeroDocumento: "",
        registroMedico: "",
        fechaNacimiento: "",
        genero: "",
        imagenPerfil: "",
        correoElectronico: "",
        telefono: "",
        contrasena: "",
        confirmaContrasena: "",
      }),
    },
  },
  emits: ["profesional-actualizado"],
  setup(props, { emit }) {
    const modalInstance = ref(null);
    const profesional = ref({ ...props.profesional });

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const editarProfesional = () => {
      emit("profesional-actualizado", { ...profesional.value });
      modalInstance.value.hide();
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profesional.value.imagenPerfil = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    watch(
      () => props.profesional,
      (newProfesional) => {
        profesional.value = { ...newProfesional };
      },
      { deep: true }
    );

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalEditarProfesional"),
        {
          backdrop: "static",
          keyboard: false,
        }
      );
    });

    return {
      profesional,
      abrirModal,
      editarProfesional,
      handleFileUpload,
      roles,
      sexos,
    };
  },
};
</script>
