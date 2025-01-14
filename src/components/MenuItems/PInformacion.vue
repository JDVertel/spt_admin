<template>
  <div class="container">
    <form enctype="multipart/form-data" method="post">
      <!-- Card principal -->
      <div id="card-formulario" class="card mb-5">
        <!-- Encabezado de la card -->
        <div
          id="card-header-formulario"
          class="card-header py-3 d-flex justify-content-between align-items-center"
        >
          <div class="d-flex align-items-center">
            <img
              :src="medicoInfo.avatar"
              alt="Foto de perfil"
              class="rounded-circle me-3"
              style="width: 50px; height: 50px; object-fit: cover"
            />
            <div>
              <h5 class="m-0" style="color: #fff;">{{ medicoInfo.nombre }}</h5>
              <small class="text-muted" style="color: #fff !important;"
                >{{ medicoInfo.documento }} - M/{{ medicoInfo.edad }}</small
              >
            </div>
          </div>
          <div>
            <!-- <button type="button" class="btn btn-outline-primary btn-sm">Editar Perfil</button> -->
          </div>
        </div>

        <!-- Cuerpo de la card -->
        <div class="card-body">
          <!-- Tabs de navegación -->
          <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="actividad-tab"
                data-bs-toggle="tab"
                data-bs-target="#actividad"
                type="button"
                role="tab"
                aria-controls="actividad"
                aria-selected="true"
              >
                Historial de Actividades
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="programas-tab"
                data-bs-toggle="tab"
                data-bs-target="#programas"
                type="button"
                role="tab"
                aria-controls="programas"
                aria-selected="false"
              >
                Programas
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="incapacidades-tab"
                data-bs-toggle="tab"
                data-bs-target="#incapacidades"
                type="button"
                role="tab"
                aria-controls="incapacidades"
                aria-selected="false"
              >
                Incapacidades
              </button>
            </li>
          </ul>

          <!-- Contenido de los tabs -->
          <div class="tab-content" id="myTabContent">
            <!-- Historial de Actividades -->
            <div
              class="tab-pane fade show active"
              id="actividad"
              role="tabpanel"
              aria-labelledby="actividad-tab"
            >
              <div
                v-for="actividad in historialActividades"
                :key="actividad.id"
                class="mb-4"
              >
                <div class="d-flex align-items-center mb-2">
                  <img
                    :src="actividad.avatar"
                    alt="Foto del médico"
                    class="rounded-circle me-3"
                    style="width: 40px; height: 40px; object-fit: cover"
                  />
                  <div>
                    <h6 class="m-0">{{ actividad.nombre }}</h6>
                    <small class="text-muted">{{
                      actividad.tipoConsulta
                    }}</small>
                    <br />
                    <small class="text-muted">{{ actividad.fecha }}</small>
                    <br />
                    <small class="text-primary" style="cursor: pointer"
                      >Cargar datos de consulta</small
                    >
                  </div>
                </div>
                <div class="card p-3">
                  <ul
                    class="nav nav-tabs mb-4"
                    id="actividadTab"
                    role="tablist"
                  >
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="diagnostico-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#diagnostico"
                        type="button"
                        role="tab"
                        aria-controls="diagnostico"
                        aria-selected="true"
                      >
                        Diagnóstico
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="examenes-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#examenes"
                        type="button"
                        role="tab"
                        aria-controls="examenes"
                        aria-selected="false"
                      >
                        Exámenes
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="medicamentos-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#medicamentos"
                        type="button"
                        role="tab"
                        aria-controls="medicamentos"
                        aria-selected="false"
                      >
                        Medicamentos
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="imagenologia-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#imagenologia"
                        type="button"
                        role="tab"
                        aria-controls="imagenologia"
                        aria-selected="false"
                      >
                        Imagenología
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="actividadTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="diagnostico"
                      role="tabpanel"
                      aria-labelledby="diagnostico-tab"
                    >
                      <p>Contenido de Diagnóstico aquí.</p>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="examenes"
                      role="tabpanel"
                      aria-labelledby="examenes-tab"
                    >
                      <p>Contenido de Exámenes aquí.</p>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="medicamentos"
                      role="tabpanel"
                      aria-labelledby="medicamentos-tab"
                    >
                      <p>Contenido de Medicamentos aquí.</p>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="imagenologia"
                      role="tabpanel"
                      aria-labelledby="imagenologia-tab"
                    >
                      <p>Contenido de Imagenología aquí.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Programas -->
            <div
              class="tab-pane fade"
              id="programas"
              role="tabpanel"
              aria-labelledby="programas-tab"
            >
              <!-- Información de IPS SUCURSALES -->
              <div class="col-lg-4">
                <div class="card mb-2 info-ips-card">
                  <div class="card-body py-2 px-3">
                    <div class="row text-center">
                      <div class="col-3">
                        <label class="fw-bold">Nombre:</label>
                        <p class="small mb-1">{{ infoIPS.sucursal.nombre }}</p>
                      </div>
                      <div class="col-3">
                        <label class="fw-bold">Nit:</label>
                        <p class="small mb-1">{{ infoIPS.sucursal.nit }}</p>
                      </div>
                      <div class="col-3">
                        <label class="fw-bold">Código:</label>
                        <p class="small mb-1">{{ infoIPS.sucursal.codigo }}</p>
                      </div>
                      <div class="col-3">
                        <label class="fw-bold">Nivel:</label>
                        <p class="small mb-1">{{ infoIPS.sucursal.nivel }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Incapacidades -->
            <div
              class="tab-pane fade"
              id="incapacidades"
              role="tabpanel"
              aria-labelledby="incapacidades-tab"
            >
              <p>Contenido de incapacidades aquí.</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { infoIPS, medicoInfo, historialActividades } from "../../bd/bd";

export default {
  data() {
    return {
      infoIPS,
      medicoInfo,
      historialActividades,
    };
  },
};
</script>
