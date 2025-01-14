<template>
  <div
    class="modal fade"
    id="modalAgregarRol"
    tabindex="-1"
    aria-labelledby="modalAgregarRolLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MRol">Añadir Rol</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="agregarRol">
            <!-- Paso 1 -->
            <div class="mb-4">
              <p class="fw-bold">
                1. Seleccione un rol base de SPT y segun su preferencia habilite
                o inabilite los items del menu que desee que esten disponibles
                en el nuevo rol segun sea su preferencia
              </p>
              <div class="mb-3">
                <label class="form-label">Rol BASE en SPT:</label>
                <select class="form-select" v-model="nuevoRol.rolBase" required>
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
                <select class="form-select" v-model="nuevoRol.rolSPT" required>
                  <option value="" disabled>Seleccione</option>
                  <option v-for="rol in roles" :key="rol.id" :value="rol.label">
                    {{ rol.label }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Items de menu del rol:</label>
                <select class="form-select" v-model="nuevoRol.itemMenu">
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
                  v-model="nuevoRol.nombreNuevo"
                  required
                />
              </div>
            </div>

            <!-- Tabla de módulos -->
            <div class="mt-4">
              <h6>
                Modulos del rol ({{ nuevoRol.rolBase || "No seleccionado" }}) en
                SPT
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

import { roles, items } from "../../../bd/bd";

export default {
  name: "ModalAgregarRol",
  emits: ["rol-agregado"],
  setup(props, { emit }) {
    const nuevoRol = ref({
      origen: "",
      nombre: "",
      cantidadItems: "",
      descripcion: "",
      rolBase: "",
      rolSPT: "",
      itemMenu: "",
      nombreNuevo: "",
    });

    const modulosSeleccionados = ref([]);

    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarRol = () => {
      emit("rol-agregado", { ...nuevoRol.value, modulos: modulosSeleccionados.value });
      nuevoRol.value = {
        origen: "",
        nombre: "",
        cantidadItems: "",
        descripcion: "",
        rolBase: "",
        rolSPT: "",
        itemMenu: "",
        nombreNuevo: "",
      };
      modulosSeleccionados.value = [];
      modalInstance.value.hide();
    };

    const adicionarItem = () => {
      if (nuevoRol.value.rolSPT && nuevoRol.value.itemMenu) {
        modulosSeleccionados.value.push({
          rolBase: nuevoRol.value.rolSPT,
          itemMenu: nuevoRol.value.itemMenu,
        });
        nuevoRol.value.itemMenu = "";
      }
    };

    const eliminarModulo = (index) => {
      modulosSeleccionados.value.splice(index, 1);
    };

    onMounted(() => {
      const modalElement = document.getElementById("modalAgregarRol");
      if (modalElement) {
        modalInstance.value = new Modal(modalElement);
      }
    });

    return {
      nuevoRol,
      abrirModal,
      agregarRol,
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
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

import { roles, items } from "../../../bd/bd";

export default {
  name: "ModalAgregarRol",
  emits: ["rol-agregado"],
  setup(props, { emit }) {
    const nuevoRol = ref({
      origen: "",
      nombre: "",
      cantidadItems: "",
      descripcion: "",
      rolBase: "",
      rolSPT: "",
      itemMenu: "",
      nombreNuevo: "",
    });

    const modulosSeleccionados = ref([]);

    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarRol = () => {
      emit("rol-agregado", { ...nuevoRol.value });
      nuevoRol.value = {
        origen: "",
        nombre: "",
        cantidadItems: "",
        descripcion: "",
        rolBase: "",
        rolSPT: "",
        itemMenu: "",
        nombreNuevo: "",
      };
      modulosSeleccionados.value = [];
      modalInstance.value.hide();
    };

    const adicionarItem = () => {
      if (nuevoRol.value.rolSPT && nuevoRol.value.itemMenu) {
        modulosSeleccionados.value.push({
          rolBase: nuevoRol.value.rolSPT,
          itemMenu: nuevoRol.value.itemMenu,
        });
        nuevoRol.value.itemMenu = "";
      }
    };

    const eliminarModulo = (index) => {
      modulosSeleccionados.value.splice(index, 1);
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarRol")
      );
    });

    return {
      nuevoRol,
      abrirModal,
      agregarRol,
      modulosSeleccionados,
      adicionarItem,
      eliminarModulo,
      roles,
      items,
    };
  },
};
</script> -->
