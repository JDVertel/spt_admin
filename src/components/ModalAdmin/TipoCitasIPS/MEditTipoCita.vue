<template>
  <div
    class="modal fade"
    id="modalEditarTipoCita"
    tabindex="-1"
    aria-labelledby="modalEditarTipoCitaLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="MEditTipoCita">
            Editar Tipo Cita
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
          <form @submit.prevent="actualizarTipoCita">
            <div class="mb-3 d-flex align-items-center justify-content-between">
              <label class="form-label mb-0">Estado del Tipo Cita</label>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="estadoSwitch"
                  v-model="tipocitaEditada.estado"
                />
                <label class="form-check-label" for="estadoSwitch">
                  {{ tipocitaEditada.estado ? "Activo" : "Inactivo" }}
                </label>
              </div>
            </div>

            <hr class="mt-3" />

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="edit-tipoCitaSPT" class="form-label"
                  >Tipo de cita en SPT</label
                >
                <select
                  class="form-select"
                  id="edit-tipoCitaSPT"
                  v-model="tipocitaEditada.tipoCitaSPT"
                  required
                >
                  <option value="" disabled>Seleccione un tipo de cita</option>
                  <option
                    v-for="tipo in tiposCita"
                    :key="tipo.id"
                    :value="tipo.label"
                  >
                    {{ tipo.label }}
                  </option>
                </select>
              </div>

              <div class="col-md-6 mb-3">
                <label for="edit-nombreIPS" class="form-label"
                  >Nombre en IPS</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="edit-nombreIPS"
                  v-model="tipocitaEditada.nombreIPS"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="edit-tiempoCita" class="form-label"
                  >Tiempo de cita</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="edit-tiempoCita"
                  v-model="tipocitaEditada.tiempoCita"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="edit-maxCitasMes" class="form-label"
                  >Max citas mes usuario</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="edit-maxCitasMes"
                  v-model="tipocitaEditada.maxCitasMes"
                  required
                />
              </div>
            </div>

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
                  Reglas de validación
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
                  Agregar existente
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
                  Crear nueva
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
                <!-- Tabla normal -->
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Tipo Validación</th>
                        <th>Sexo</th>
                        <th>Metrica</th>
                        <th>Valor Inicial</th>
                        <th>Valor Final</th>
                        <th>Tiempo</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(regla, index) in reglas" :key="index">
                        <td>{{ regla.nombre }}</td>
                        <td>{{ regla.tipoValidacion }}</td>
                        <td>{{ regla.sexo }}</td>
                        <td>{{ regla.metrica }}</td>
                        <td>{{ regla.valorInicial }}</td>
                        <td>{{ regla.valorFinal }}</td>
                        <td>{{ regla.tiempo }}</td>
                        <td>
                          <button
                            class="custom-btn custom-delete-btn"
                            @click="eliminarRegla(index)"
                          >
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="tab2"
                role="tabpanel"
                aria-labelledby="tab2-tab"
              >
                <div class="row">
                  <div class="col-md-8 mb-3">
                    <label for="select-tab2" class="form-label"
                      >Añadir reglas existentes</label
                    >
                    <select
                      class="form-select"
                      id="select-tab2"
                      v-model="selectedOption"
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option
                        v-for="opcion in opciones"
                        :key="opcion.id"
                        :value="opcion.label"
                      >
                        {{ opcion.label }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-4 mb-3 text-md-end">
                    <button
                      type="button"
                      class="btn btn-custom btn-icon mt-4"
                      @click="agregarOpcion"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="tab3"
                role="tabpanel"
                aria-labelledby="tab3-tab"
              >
                <div class="row">
                  <!-- Primera fila: Nombre -->
                  <div class="col-md-6 mb-3">
                    <label for="input-texto" class="form-label">Nombre</label>
                    <input
                      type="text"
                      class="form-control"
                      id="input-texto"
                      v-model="inputTexto"
                    />
                  </div>

                  <!-- Segunda fila: Tipo Validación -->
                  <div class="col-md-6 mb-3">
                    <label for="select1" class="form-label"
                      >Tipo Validación</label
                    >
                    <select class="form-select" id="select1" v-model="select1">
                      <option value="" disabled>Seleccione una opción</option>
                      <option
                        v-for="opcion in tiposValidacion"
                        :key="opcion.id"
                        :value="opcion.label"
                      >
                        {{ opcion.label }}
                      </option>
                    </select>
                  </div>

                  <!-- Tercera fila: Sexo -->
                  <div class="col-md-6 mb-3">
                    <label for="select2" class="form-label">Sexo</label>
                    <select class="form-select" id="select2" v-model="select2">
                      <option value="" disabled>Seleccione una opción</option>
                      <option
                        v-for="opcion in sexos"
                        :key="opcion.id"
                        :value="opcion.label"
                      >
                        {{ opcion.label }}
                      </option>
                    </select>
                  </div>

                  <!-- Cuarta fila: Métrica -->
                  <div class="col-md-6 mb-3">
                    <label for="select3" class="form-label">Métrica</label>
                    <select class="form-select" id="select3" v-model="select3">
                      <option value="" disabled>Seleccione una opción</option>
                      <option
                        v-for="opcion in metricas"
                        :key="opcion.id"
                        :value="opcion.label"
                      >
                        {{ opcion.label }}
                      </option>
                    </select>
                  </div>

                  <!-- Quinta fila: Valores Inicial y Final -->
                  <div class="col-md-6 mb-3">
                    <label for="input-num1" class="form-label"
                      >Valor Inicial</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="input-num1"
                      v-model="inputNum1"
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="input-num2" class="form-label"
                      >Valor Final</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="input-num2"
                      v-model="inputNum2"
                    />
                  </div>

                  <!-- Botón: Agregar Nueva -->
                  <div class="col-12 text-end">
                    <button
                      type="button"
                      class="btn btn-custom btn-icon"
                      @click="agregarNueva"
                    >
                      Agregar Nueva
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mt-3" />
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

import {
  tiposCita,
  opciones,
  tiposValidacion,
  sexos,
  metricas,
} from "../../../bd/bd";

export default {
  name: "ModalEditarTipoCita",
  props: {
    tipocita: {
      type: Object,
      required: false,
      default: () => ({
        id: "",
        tipoCitaSPT: "",
        nombreIPS: "",
        tiempoCita: "",
        maxCitasMes: "",
        estado: true,
      }),
    },
  },
  emits: ["tipocita-actualizada"],
  setup(props, { emit }) {
    const modalInstance = ref(null);
    const tipocitaEditada = ref({ ...props.tipocita });

    const selectedOption = ref("");
    const inputTexto = ref("");
    const select1 = ref("");
    const select2 = ref("");
    const select3 = ref("");
    const inputNum1 = ref("");
    const inputNum2 = ref("");
    const reglas = ref([]);

    const abrirModal = () => {
      if (props.tipocita) {
        tipocitaEditada.value = { ...props.tipocita };
      }
      modalInstance.value.show();
    };

    const actualizarTipoCita = () => {
      emit("tipocita-actualizada", { ...tipocitaEditada.value });
      modalInstance.value.hide();
    };

    const agregarOpcion = () => {
      if (selectedOption.value) {
        reglas.value.push({
          nombre: selectedOption.value,
          tipoValidacion: "Tipo",
          sexo: "Sexo",
          metrica: "Metrica",
          valorInicial: "0",
          valorFinal: "0",
          tiempo: "0",
        });
        selectedOption.value = "";
      }
    };

    const agregarNueva = () => {
      reglas.value.push({
        nombre: inputTexto.value,
        tipoValidacion: select1.value,
        sexo: select2.value,
        metrica: select3.value,
        valorInicial: inputNum1.value,
        valorFinal: inputNum2.value,
        tiempo: "0",
      });
      inputTexto.value = "";
      select1.value = "";
      select2.value = "";
      select3.value = "";
      inputNum1.value = "";
      inputNum2.value = "";
    };

    const eliminarRegla = (index) => {
      reglas.value.splice(index, 1);
    };

    watch(
      () => props.tipocita,
      (newTipoCita) => {
        if (newTipoCita) {
          tipocitaEditada.value = { ...newTipoCita };
        }
      },
      { deep: true }
    );

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalEditarTipoCita")
      );
    });

    return {
      tipocitaEditada,
      abrirModal,
      actualizarTipoCita,
      tiposCita,
      opciones,
      tiposValidacion,
      sexos,
      metricas,
      selectedOption,
      inputTexto,
      select1,
      select2,
      select3,
      inputNum1,
      inputNum2,
      reglas,
      agregarOpcion,
      agregarNueva,
      eliminarRegla,
    };
  },
};
</script>
