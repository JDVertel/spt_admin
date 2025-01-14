<template>
  <div
    class="modal fade"
    id="modalAdminBDerecho"
    tabindex="-1"
    aria-labelledby="modalAdminBDerechoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5" id="MAdmin">Administrar BDerecho</h1>
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
                Vigencia
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
                Cargar Archivo
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
                Vaciar BD
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
              <div class="mb-3">
                <label for="fecha" class="form-label">Fecha</label>
                <input
                  type="date"
                  class="form-control"
                  id="fecha"
                  v-model="fecha"
                />
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea
                  class="form-control"
                  id="descripcion"
                  rows="3"
                  v-model="descripcion"
                ></textarea>
              </div>
              <button class="btn btn-custom btn-icon" @click="guardarCambios">
                Guardar Cambios
              </button>
            </div>
            <div
              class="tab-pane fade"
              id="tab2"
              role="tabpanel"
              aria-labelledby="tab2-tab"
            >
              <!-- Título y conteo actual -->
              <h5>
                Cargar archivo
                <span class="text-muted"
                  >({{ registrosActuales }} Registros actualmente)</span
                >
              </h5>

              <!-- Estructura del archivo -->
              <div class="mb-3">
                <p class="mb-2">
                  Estructura:<span class="text-muted">
                    (Referencia-codigo-descripcion-uvr-valor)</span
                  >
                </p>
              </div>

              <!-- Área de carga de archivo -->
              <div class="file-upload-area mb-3 p-4 border rounded text-center">
                <label>
                  <i class="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                  <p class="mb-1">
                    Se admiten archivos con la extension xls o csv.
                  </p>
                  <input
                    type="file"
                    class="form-control"
                    id="archivo"
                    @change="cargarArchivo"
                    accept=".xls,.xlsx,.csv"
                /></label>
              </div>

              <!-- Barra de progreso -->
              <div v-if="mostrarProgreso" class="mb-3">
                <div class="progress">
                  <div
                    class="progress-bar bg-dark"
                    role="progressbar"
                    :style="{ width: progreso + '%' }"
                    :aria-valuenow="progreso"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {{ progreso }}%
                  </div>
                </div>
              </div>

              <!-- Resultados de la carga -->
              <div v-if="mostrarResultados" class="results-container mt-3">
                <div class="text-center">
                  <p>
                    {{ registrosCargados }} Registros cargados exitosamente.
                  </p>
                  <p>{{ totalRegistros }} Registros en esta BD.</p>
                  <p v-if="registrosExcluidos > 0" class="text-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    {{ registrosExcluidos }} Registros excluidos o con errores
                    en la carga.
                  </p>
                </div>
              </div>

              <!-- Botón de carga -->
              <button
                class="btn btn-custom btn-icon mt-3"
                @click="subirArchivo"
              >
                Cargar Archivo
              </button>
            </div>
            <div
              class="tab-pane fade"
              id="tab3"
              role="tabpanel"
              aria-labelledby="tab3-tab"
            >
              <div class="text-center p-4">
                <i
                  class="fas fa-exclamation-triangle text-warning fa-3x mb-3"
                ></i>
                <h5 class="mb-3">¿Está seguro de vaciar la base de datos?</h5>
                <p class="text-muted mb-4">
                  Esta acción eliminará todos los registros actuales. Esta
                  operación no se puede deshacer.
                </p>
                <div class="d-grid gap-2 col-5 mx-auto">
                  <button
                    class="btn btn-custom btn-icon"
                    @click="confirmarVaciarBD"
                  >
                    Vaciar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer d-flex justify-content-between mb-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "ModalAdminBDerecho",
  setup() {
    const modalInstance = ref(null);
    const fecha = ref("");
    const descripcion = ref("");
    const archivo = ref(null);

    const registrosActuales = ref(1563);
    const progreso = ref(0);
    const mostrarProgreso = ref(false);
    const mostrarResultados = ref(false);
    const registrosCargados = ref(0);
    const totalRegistros = ref(0);
    const registrosExcluidos = ref(0);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const cerrarModal = () => {
      modalInstance.value.hide();
    };

    const guardarCambios = () => {
      console.log("Fecha:", fecha.value);
      console.log("Descripción:", descripcion.value);
    };

    const cargarArchivo = (event) => {
      archivo.value = event.target.files[0];
      mostrarResultados.value = false;
      progreso.value = 0;
    };

    const subirArchivo = async () => {
      if (archivo.value) {
        mostrarProgreso.value = true;
        mostrarResultados.value = false;

        // Simulación de carga
        for (let i = 0; i <= 100; i += 25) {
          progreso.value = i;
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        // Simulación de resultados
        registrosCargados.value = 2546;
        totalRegistros.value = 8546;
        registrosExcluidos.value = 0;
        mostrarResultados.value = true;

        console.log("Archivo seleccionado:", archivo.value.name);
      } else {
        console.log("No se ha seleccionado ningún archivo.");
      }
    };

    const confirmarVaciarBD = () => {
      console.log("Vacia la base de datos");
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAdminBDerecho")
      );
    });

    return {
      abrirModal,
      cerrarModal,
      fecha,
      descripcion,
      archivo,
      guardarCambios,
      cargarArchivo,
      subirArchivo,
      confirmarVaciarBD,
      registrosActuales,
      progreso,
      mostrarProgreso,
      mostrarResultados,
      registrosCargados,
      totalRegistros,
      registrosExcluidos,
    };
  },
};
</script>
