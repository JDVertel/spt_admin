<template>
  <div
    class="modal fade"
    id="modalAgregarAgenda"
    tabindex="-1"
    aria-labelledby="modalAgregarAgendaLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="modalAgregarAgendaLabel">
            Agregar Agenda
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
          <form @submit.prevent="agregarAgenda">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="ips" class="form-label">IPS</label>
                <input
                  type="text"
                  class="form-control"
                  id="ips"
                  v-model="nuevaAgenda.ips"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="sucursal" class="form-label">Sucursal</label>
                <input
                  type="text"
                  class="form-control"
                  id="sucursal"
                  v-model="nuevaAgenda.sucursal"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-4">
                <label for="tipoCita" class="form-label">Tipo de Cita</label>
                <select
                  class="form-select"
                  id="tipoCita"
                  v-model="nuevaAgenda.tipoCita"
                  required
                >
                  <option value="">Seleccione...</option>
                  <option
                    v-for="tipo in tpcitas"
                    :key="tipo.id"
                    :value="tipo.label"
                  >
                    {{ tipo.label }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <label for="duracion" class="form-label">Duración (min)</label>
                <input
                  type="number"
                  class="form-control"
                  id="duracion"
                  v-model="nuevaAgenda.duracion"
                  required
                />
              </div>
              <div class="col-md-4">
                <label for="medico" class="form-label">Médico</label>
                <input
                  type="text"
                  class="form-control"
                  id="medico"
                  v-model="nuevaAgenda.medico"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-12">
                <label class="form-label">Rango de Fechas</label>
                <br />
                <VDatePicker
                  class="w-100"
                  v-model="nuevaAgenda.fecha"
                  is-range
                  :min-date="new Date()"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="horaInicio" class="form-label">Hora Inicio</label>
                <input
                  type="time"
                  class="form-control"
                  id="horaInicio"
                  v-model="nuevaAgenda.horaInicio"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="horaFin" class="form-label">Hora Fin</label>
                <input
                  type="time"
                  class="form-control"
                  id="horaFin"
                  v-model="nuevaAgenda.horaFin"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-12">
                <label class="form-label d-block">Tipo de Asistencia</label>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="presencial"
                    value="presencial"
                    v-model="nuevaAgenda.tipoAsistencia"
                  />
                  <label class="form-check-label" for="presencial">
                    Presencial
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="virtual"
                    value="virtual"
                    v-model="nuevaAgenda.tipoAsistencia"
                  />
                  <label class="form-check-label" for="virtual">
                    Virtual
                  </label>
                </div>
              </div>
            </div>

            <div class="modal-footer d-flex justify-content-between">
              <button type="submit" class="btn btn-custom btn-icon mb-5">
                Guardar
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

import { tpcitas } from "../../../bd/bd";

export default {
  name: "MAgenda",
  emits: ["agenda-agregada"],
  setup(props, { emit }) {
    const nuevaAgenda = ref({
      ips: "",
      sucursal: "",
      tipoCita: "",
      duracion: "",
      medico: "",
      fecha: {
        start: new Date(),
        end: new Date(),
      },
      horaInicio: "",
      horaFin: "",
      tipoAsistencia: [],
    });

    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarAgenda = () => {
      emit("agenda-agregada", { ...nuevaAgenda.value });
      nuevaAgenda.value = {
        ips: "",
        sucursal: "",
        tipoCita: "",
        duracion: "",
        medico: "",
        fecha: {
          start: new Date(),
          end: new Date(),
        },
        horaInicio: "",
        horaFin: "",
        tipoAsistencia: [],
      };
      modalInstance.value.hide();
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarAgenda"),
        {
          backdrop: "static",
          keyboard: false,
        }
      );
    });

    return {
      nuevaAgenda,
      abrirModal,
      agregarAgenda,
      tpcitas,
    };
  },
};
</script>

<!-- <style scoped>
.modal-dialog {
  max-width: 800px;
}

.form-label {
  font-weight: 500;
}

.vc-pane-container {
  width: 100% !important;
}
</style> -->
