<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-vials"></i> Resultados de Laboratorio
            </span>
            <span class="opciones-formulario"></span>
          </p>
        </div>

        <div class="card-body">
          <!-- Stepper -->
          <div class="stepper-wrapper mb-4">
            <div
              class="stepper-item"
              :class="{ completed: currentStep > 1, active: currentStep === 1 }"
            >
              <div class="step-counter">1</div>
              <div class="step-name">Búsqueda</div>
            </div>
            <div
              class="stepper-item"
              :class="{ completed: currentStep > 2, active: currentStep === 2 }"
            >
              <div class="step-counter">2</div>
              <div class="step-name">Editar Resultados</div>
            </div>
          </div>

          <!-- Contenido del Step 1 -->
          <div v-if="currentStep === 1">
            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mb-0">Datos del Paciente</h5>
                    <p>
                      Ingrese los datos solicitados para visualizar los
                      resultados disponibles para correccion
                    </p>
                    <form @submit.prevent="buscarResultados">
                      <div class="mb-3">
                        <label class="form-label">Tipo de Documento</label>
                        <select
                          v-model="busqueda.tipoDocumento"
                          class="form-select"
                          required
                        >
                          <option value="">Seleccione...</option>
                          <option
                            v-for="tipo in tiposDocumento"
                            :key="tipo.id"
                            :value="tipo.label"
                          >
                            {{ tipo.label }}
                          </option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Número de Documento</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="busqueda.numeroDocumento"
                          required
                        />
                      </div>
                      <button type="submit" class="btn btn-custom w-100">
                        Buscar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contenido del Step 2 -->
          <div v-if="currentStep === 2">
            <!-- Datos del Paciente -->
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title mb-3">Datos del Paciente</h5>
                <div class="table-responsive">
                  <table class="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Tipo/Número Doc.</th>
                        <th>Fecha Nac./Edad</th>
                        <th>Sexo</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Juan David</td>
                        <td>Vertel Holguin</td>
                        <td>CC 1234567890</td>
                        <td>05-05-1981 (42 años)</td>
                        <td>Masculino</td>
                        <td>juan@email.com</td>
                        <td>3001234567</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Resultados de Laboratorio -->
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mb-3">Resultados de Laboratorio</h5>
                <div class="table-responsive">
                  <table class="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>N° Orden</th>
                        <th>Fecha Admisión</th>
                        <th>CUPS</th>
                        <th>Tipo Examen</th>
                        <th>Alias</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(resultado, index) in resultados" :key="index">
                        <td>{{ resultado.orden }}</td>
                        <td>{{ resultado.fechaAdmision }}</td>
                        <td>{{ resultado.cups }}</td>
                        <td>{{ resultado.tipoExamen }}</td>
                        <td>{{ resultado.alias }}</td>
                        <td>{{ resultado.nombre }}</td>
                        <td>
                          <button
                            class="custom-btn custom-edit-btn"
                            @click="abrirModalEditar(resultado)"
                          >
                            <i class="fa-solid fa-pen"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- Botones de navegación -->
            <div class="d-flex justify-content-between mt-4">
              <button
                class="btn btn-outline-secondary"
                @click="currentStep = 1"
              >
                <i class="fas fa-arrow-left me-2"></i>
                Anterior
              </button>
              <button class="btn btn-custom" @click="subirCambios">
                <i class="fas fa-upload me-2"></i>
                Subir
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <MEditResultado
      :resultado="resultadoSeleccionado"
      @resultado-actualizado="actualizarResultado"
      ref="modalEditarResultado"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { tiposDocumento } from "../../bd/bd";
import MEditResultado from "../ModalAdmin/LEResultados/LERedit.vue";

export default {
  name: "LEResultados",
  components: {
    MEditResultado,
  },
  setup() {
    const currentStep = ref(1);
    const busqueda = ref({
      tipoDocumento: "",
      numeroDocumento: "",
    });
    const resultados = ref([
      {
        orden: "001",
        fechaAdmision: "2024-03-20",
        cups: "908436",
        tipoExamen: "Hemograma",
        alias: "HMG",
        nombre: "Hemograma Tipo III",
      },
      {
        orden: "002",
        fechaAdmision: "2024-03-20",
        cups: "907106",
        tipoExamen: "Química",
        alias: "GLU",
        nombre: "Glucosa en Suero",
      },
    ]);
    const resultadoSeleccionado = ref(null);

    const buscarResultados = () => {
      // Aquí irá la lógica de búsqueda
      currentStep.value = 2;
    };

    const subirCambios = () => {
      Swal.fire({
        title: "¿Está seguro?",
        text: "¿Desea subir los cambios realizados?",
        icon: "question",
        iconColor: "#2a3f54",
        showCancelButton: true,
        confirmButtonText: "Sí, subir",
        cancelButtonText: "Cancelar",
        background: "#ededed",
        backdrop: `rgba(0, 0, 0, 0.5)`,
        customClass: {
          confirmButton: "btn btn-custom mb-2 me-2",
          cancelButton: "btn btn-outline-secondary mb-2",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí va la lógica para subir los cambios
          Swal.fire({
            title: "¡Éxito!",
            text: "Los cambios han sido guardados",
            icon: "success",
            iconColor: "#2a3f54",
            confirmButtonText: "Entendido",
            background: "#ededed",
            customClass: {
              confirmButton: "btn btn-custom mb-2",
            },
          });
        }
      });
    };

    const abrirModalEditar = (resultado) => {
      resultadoSeleccionado.value = { ...resultado };
      const modal = ref(null);
      modal.value = new bootstrap.Modal(
        document.getElementById("modalEditarResultado")
      );
      modal.value.show();
    };

    const actualizarResultado = (resultadoActualizado) => {
      const index = resultados.value.findIndex(
        (r) => r.orden === resultadoActualizado.orden
      );
      if (index !== -1) {
        resultados.value[index] = resultadoActualizado;
      }
    };

    return {
      currentStep,
      busqueda,
      tiposDocumento,
      buscarResultados,
      resultados,
      resultadoSeleccionado,
      abrirModalEditar,
      actualizarResultado,
      subirCambios,
    };
  },
};
</script>

<style scoped>
.stepper-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.stepper-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stepper-item::before {
  position: absolute;
  content: "";
  border-bottom: 2px solid #ccc;
  width: 100%;
  top: 20px;
  left: -50%;
  z-index: 2;
}

.stepper-item::after {
  position: absolute;
  content: "";
  border-bottom: 2px solid #ccc;
  width: 100%;
  top: 20px;
  left: 50%;
  z-index: 2;
}

.stepper-item .step-counter {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ccc;
  margin-bottom: 6px;
  color: #fff;
}

.stepper-item.active .step-counter {
  background-color: #2a3f54;
}

.stepper-item.completed .step-counter {
  background-color: #1ab89d;
}

.stepper-item.completed::after,
.stepper-item.completed::before {
  border-color: #1ab89d;
}

.stepper-item:first-child::before {
  content: none;
}

.stepper-item:last-child::after {
  content: none;
}

.step-name {
  color: #555;
  font-size: 14px;
}
</style>
