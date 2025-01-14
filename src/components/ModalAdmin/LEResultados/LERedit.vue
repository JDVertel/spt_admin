<template>
  <div
    class="modal fade"
    id="modalEditarResultado"
    tabindex="-1"
    aria-labelledby="modalEditarResultadoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="modalEditarResultadoLabel">
            Editar resultados de laboratorio
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
          <form @submit.prevent="actualizarResultado">
            <!-- Información del paciente -->
            <div class="row mb-4">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Nombres y Apellidos</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="resultado.nombreCompleto"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Fecha de nacimiento /edad</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="resultado.fechaNacimiento"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Sexo</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="resultado.sexo"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Tipo doc/Numero</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="resultado.documento"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Nombre de laboratorio</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="resultado.nombreLaboratorio"
                    disabled
                  />
                </div>
              </div>
            </div>

            <!-- Tabla de resultados -->
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Valores de referencia</th>
                    <th>Variable</th>
                    <th>Resultados</th>
                    <th>Unidad de Medida</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ resultado.valorReferencia }}</td>
                    <td>{{ resultado.variable }}</td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        v-model="resultado.resultados"
                        required
                      />
                    </td>
                    <td>{{ resultado.unidadMedida }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Observaciones -->
            <div class="mb-3">
              <label class="form-label">Observaciones</label>
              <textarea
                class="form-control"
                v-model="resultado.observaciones"
                rows="4"
              ></textarea>
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

export default {
  name: "MEditResultado",
  props: {
    resultado: {
      type: Object,
      required: false,
      default: () => ({
        nombreCompleto: "",
        fechaNacimiento: "",
        sexo: "",
        documento: "",
        nombreLaboratorio: "",
        valorReferencia: "",
        variable: "",
        resultados: "",
        unidadMedida: "",
        observaciones: "",
      }),
    },
  },
  emits: ["resultado-actualizado"],
  setup(props, { emit }) {
    const modalInstance = ref(null);
    const resultado = ref({ ...props.resultado });

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const actualizarResultado = () => {
      emit("resultado-actualizado", { ...resultado.value });
      modalInstance.value.hide();
    };

    watch(
      () => props.resultado,
      (newResultado) => {
        resultado.value = { ...newResultado };
      },
      { deep: true }
    );

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalEditarResultado"),
        {
          backdrop: "static",
          keyboard: false,
        }
      );
    });

    return {
      resultado,
      abrirModal,
      actualizarResultado,
    };
  },
};
</script>
