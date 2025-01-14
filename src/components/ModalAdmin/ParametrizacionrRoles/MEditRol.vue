<template>
    <div
      class="modal fade"
      id="modalEditarRol"
      tabindex="-1"
      aria-labelledby="modalEditarRolLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div id="headerm-general" class="modal-header">
            <h1 class="modal-title fs-5 mt-2" id="MEditRol">Editar Rol</h1>
            <button
              type="button"
              id="closem-general"
              class="close-modal bi bi-x ms-auto"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div id="contenidom-general" class="modal-body">
            <form @submit.prevent="actualizarRol">
              <!-- Paso 1 -->
              <div class="mb-4">
                <p class="fw-bold">
                  1. Seleccione un rol base de SPT y segun su preferencia habilite
                  o inabilite los items del menu que desee que esten disponibles
                  en el nuevo rol segun sea su preferencia
                </p>
                <div class="mb-3">
                  <label class="form-label">Rol BASE en SPT:</label>
                  <select
                    class="form-select"
                    v-model="rolEditado.rolBase"
                    required
                  >
                    <option value="" disabled>Seleccione</option>
                    <option v-for="rol in roles" :key="rol.id" :value="rol.label">
                      {{ rol.label }}
                    </option>
                  </select>
                </div>
              </div>
  
              <!-- Paso 2 -->
              <div class="mb-4">
                <p class="fw-bold">
                  2. Tambien puede agregar items del menu de otro rol al nuevo rol
                  segun sea su preferencia
                </p>
                <div class="mb-3">
                  <label class="form-label">Rol en SPT:</label>
                  <select
                    class="form-select"
                    v-model="rolEditado.rolSPT"
                    required
                  >
                    <option value="" disabled>Seleccione</option>
                    <option v-for="rol in roles" :key="rol.id" :value="rol.label">
                      {{ rol.label }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Items de menu del rol:</label>
                  <select class="form-select" v-model="rolEditado.itemMenu">
                    <option value="" disabled>Seleccione</option>
                    <option
                      v-for="item in items"
                      :key="item.id"
                      :value="item.label"
                    >
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <button
                  type="button"
                  class="btn btn-custom btn-icon mb-2"
                  @click="adicionarItem"
                >
                  Adicionar item
                </button>
              </div>
  
              <!-- Paso 3 -->
              <div class="mb-4">
                <p class="fw-bold">3. Asigne un nombre al nuevo Rol</p>
                <div class="mb-3">
                  <label class="form-label">Nombre del Nuevo Rol</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="rolEditado.nombreNuevo"
                    required
                  />
                </div>
              </div>
  
              <!-- Tabla de módulos -->
              <div class="mt-4">
                <h6>
                  Modulos del rol ({{ rolEditado.rolBase || "No seleccionado" }})
                  en SPT
                </h6>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Rol Base</th>
                        <th>Item de menu</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in modulosSeleccionados"
                        :key="index"
                      >
                        <td>{{ item.rolBase }}</td>
                        <td>{{ item.itemMenu }}</td>
                        <td>
                          <button
                            type="button"
                            class="custom-btn custom-delete-btn"
                            @click="eliminarModulo(index)"
                          >
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import { ref, onMounted, watch } from "vue";
import { Modal } from "bootstrap";

import { roles, items } from "../../../bd/bd";

export default {
  name: "ModalEditarRol",
  props: {
    rol: {
      type: Object,
      required: false,
      default: () => ({
        id: "",
        origen: "",
        nombre: "",
        cantidadItems: "",
        descripcion: "",
        rolBase: "",
        rolSPT: "",
        itemMenu: "",
        nombreNuevo: "",
        modulos: [],
      }),
    },
  },
  emits: ["rol-actualizado"],
  setup(props, { emit }) {
    const modalInstance = ref(null);
    const rolEditado = ref({ ...props.rol });

    const modulosSeleccionados = ref(props.rol ? [...props.rol.modulos] : []);

    const abrirModal = () => {
      if (props.rol) {
        rolEditado.value = { ...props.rol };
        modulosSeleccionados.value = [...props.rol.modulos];
      }
      modalInstance.value.show();
    };

    const actualizarRol = () => {
      emit("rol-actualizado", { ...rolEditado.value, modulos: modulosSeleccionados.value });
      modalInstance.value.hide();
    };

    const adicionarItem = () => {
      if (rolEditado.value.rolSPT && rolEditado.value.itemMenu) {
        modulosSeleccionados.value.push({
          rolBase: rolEditado.value.rolSPT,
          itemMenu: rolEditado.value.itemMenu,
        });
        rolEditado.value.itemMenu = "";
      }
    };

    const eliminarModulo = (index) => {
      modulosSeleccionados.value.splice(index, 1);
    };

    watch(
      () => props.rol,
      (newRol) => {
        if (newRol) {
          rolEditado.value = { ...newRol };
          modulosSeleccionados.value = [...newRol.modulos];
        }
      },
      { deep: true }
    );

    onMounted(() => {
      const modalElement = document.getElementById("modalEditarRol");
      if (modalElement) {
        modalInstance.value = new Modal(modalElement);
      }
    });

    return {
      rolEditado,
      abrirModal,
      actualizarRol,
      modulosSeleccionados,
      adicionarItem,
      eliminarModulo,
      roles,
      items,
    };
  },
};
</script>








<!-- <script>
import { ref, onMounted, watch } from "vue";
import { Modal } from "bootstrap";

import { roles, items } from "../../../bd/bd";

export default {
  name: "ModalEditarRol",
  props: {
    rol: {
      type: Object,
      required: false,
      default: () => ({
        id: "",
        origen: "",
        nombre: "",
        cantidadItems: "",
        descripcion: "",
        rolBase: "",
        rolSPT: "",
        itemMenu: "",
        nombreNuevo: "",
      }),
    },
  },
  emits: ["rol-actualizado"],
  setup(props, { emit }) {
    const modalInstance = ref(null);
    const rolEditado = ref({ ...props.rol });

    const modulosSeleccionados = ref([]);

    const abrirModal = () => {
      if (props.rol) {
        rolEditado.value = { ...props.rol };
      }
      modalInstance.value.show();
    };

    const actualizarRol = () => {
      emit("rol-actualizado", { ...rolEditado.value });
      modalInstance.value.hide();
    };

    const adicionarItem = () => {
      if (rolEditado.value.rolSPT && rolEditado.value.itemMenu) {
        modulosSeleccionados.value.push({
          rolBase: rolEditado.value.rolSPT,
          itemMenu: rolEditado.value.itemMenu,
        });
        rolEditado.value.itemMenu = "";
      }
    };

    const eliminarModulo = (index) => {
      modulosSeleccionados.value.splice(index, 1);
    };

    watch(
      () => props.rol,
      (newRol) => {
        if (newRol) {
          rolEditado.value = { ...newRol };
        }
      },
      { deep: true }
    );

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalEditarRol")
      );
    });

    return {
      rolEditado,
      abrirModal,
      actualizarRol,
      modulosSeleccionados,
      adicionarItem,
      eliminarModulo,
      roles,
      items,
    };
  },
};
</script> -->
