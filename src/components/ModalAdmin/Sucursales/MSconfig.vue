<template>
  <div
    class="modal fade"
    id="modalConfigSucursal"
    tabindex="-1"
    aria-labelledby="modalConfigSucursalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5" id="MConfig">Admistrar Sucursal</h1>
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
                id="horario-tab"
                data-bs-toggle="tab"
                data-bs-target="#horario"
                type="button"
                role="tab"
                aria-controls="horario"
                aria-selected="true"
              >
                Horario
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
              id="horario"
              role="tabpanel"
              aria-labelledby="horario-tab"
            >
              <!-- Horario de atención -->
              <div class="horario-container">
                <!-- <h5 class="text-center mb-4">Horario de atención</h5> -->
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Jornada</th>
                        <th>Ingreso</th>
                        <th>Salida</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mañana</td>
                        <td>
                          <div class="input-group">
                            <input
                              type="time"
                              class="form-control"
                              v-model="horarios.manana.ingreso"
                            />
                          </div>
                        </td>
                        <td>
                          <div class="input-group">
                            <input
                              type="time"
                              class="form-control"
                              v-model="horarios.manana.salida"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Tarde</td>
                        <td>
                          <div class="input-group">
                            <input
                              type="time"
                              class="form-control"
                              v-model="horarios.tarde.ingreso"
                            />
                          </div>
                        </td>
                        <td>
                          <div class="input-group">
                            <input
                              type="time"
                              class="form-control"
                              v-model="horarios.tarde.salida"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
            <button
              type="button"
              class="btn btn-custom btn-icon mb-5"
              @click="guardarCambios"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "ModalConfigSucursal",
  props: {
    sucursalId: {
      type: String,
      default: null,
    },
  },
  emits: ["actualizar-horarios"],
  setup(props, { emit }) {
    const modalInstance = ref(null);

    const resetHorarios = () => {
      return {
        manana: {
          ingreso: "",
          salida: "",
        },
        tarde: {
          ingreso: "",
          salida: "",
        },
      };
    };

    const horarios = ref(resetHorarios());

    const abrirModal = () => {
      horarios.value = resetHorarios();
      modalInstance.value.show();
    };

    const cerrarModal = () => {
      modalInstance.value.hide();
    };

    const guardarCambios = () => {
      if (props.sucursalId) {
        emit("actualizar-horarios", {
          id: props.sucursalId,
          horarios: horarios.value,
        });
      }
      cerrarModal();
    };

    watch(
      () => props.sucursalId,
      (newId) => {
        if (newId) {
          console.log("Sucursal seleccionada:", newId);
        } else {
          horarios.value = resetHorarios();
        }
      }
    );

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalConfigSucursal")
      );
    });

    return {
      horarios,
      abrirModal,
      cerrarModal,
      guardarCambios,
    };
  },
};
</script>

<style scoped>
.horario-container {
  padding: 20px;
}

.table {
  margin-bottom: 0;
}

.table th {
  font-weight: 600;
  color: #333;
}

.input-group {
  width: 100%;
}

.form-control {
  border-radius: 4px;
}

/* Estilo para los inputs type="time" */
input[type="time"] {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  width: 100%;
}

input[type="time"]:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  outline: 0;
}
</style>
