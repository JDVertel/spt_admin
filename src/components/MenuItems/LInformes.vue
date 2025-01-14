<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-vials"></i> Informes de Laboratorio
            </span>
            <span class="opciones-formulario"></span>
          </p>
        </div>

        <div class="card-body">
          <div class="row">
            <!-- Columna izquierda -->
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body">
                  <h6 class="card-title mb-3">Tipo de Informe</h6>
                  <select
                    v-model="tipoInforme"
                    class="form-select mb-4"
                    required
                  >
                    <option value="">Seleccione tipo de informe...</option>
                    <option
                      v-for="tipo in tpcitas"
                      :key="tipo.id"
                      :value="tipo.label"
                    >
                      {{ tipo.label }}
                    </option>
                  </select>

                  <h6 class="card-title mb-3">Rango de Fechas</h6>
                  <VDatePicker
                    class="w-100"
                    v-model="range"
                    is-range
                    :min-date="new Date(2024, 0, 1)"
                  />

                  <button
                    type="button"
                    class="btn btn-custom btn-icon mt-4 w-100"
                    @click="generarInforme"
                  >
                    Generar Informe
                  </button>
                </div>
              </div>
            </div>

            <!-- Columna derecha -->
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title mb-3">Vista Previa del Informe</h6>
                  <div v-if="!informeGenerado" class="text-center py-5">
                    <i class="fas fa-file-medical fa-3x text-muted mb-3"></i>
                    <p class="text-muted">
                      Seleccione un tipo de informe y un rango de fechas para
                      generar el informe
                    </p>
                  </div>
                  <div v-else>
                    <!-- Aquí irá el contenido del informe -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { tpcitas } from "../../bd/bd";

export default {
  name: "LInformes",
  setup() {
    const range = ref({
      start: new Date(),
      end: new Date(),
    });

    const tipoInforme = ref("");
    const informeGenerado = ref(false);

    const generarInforme = () => {
      if (!tipoInforme.value || !range.value.start || !range.value.end) {
        Swal.fire({
          title: "Atención",
          text: "Debe seleccionar un tipo de informe y un rango de fechas",
          icon: "warning",
          iconColor: "#2a3f54",
          confirmButtonText: "Entendido",
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          customClass: {
            confirmButton: "btn btn-custom mb-2",
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        return;
      }

      informeGenerado.value = true;
      console.log("Generando informe:", {
        tipo: tipoInforme.value,
        fechaInicio: range.value.start,
        fechaFin: range.value.end,
      });
    };

    return {
      range,
      tipoInforme,
      tpcitas,
      informeGenerado,
      generarInforme,
    };
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #2a3f54;
  font-weight: 600;
}

:deep(.vc-pane-container) {
  width: 100% !important;
}

.btn-custom {
  background-color: #2a3f54;
  color: white;
}

.btn-custom:hover {
  background-color: #1f2f3d;
  color: white;
}
</style>
