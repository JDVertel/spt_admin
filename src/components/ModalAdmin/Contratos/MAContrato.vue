<template>
  <div
    class="modal fade"
    id="modalAdminContrato"
    tabindex="-1"
    aria-labelledby="modalAdminContratoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5" id="MAdmin">Administrar Contrato</h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">

          <!-- Información de IPS -->
          <div class="col-lg-12">
            <div class="card mb-2 info-ips-card">
              <div class="card-body py-2 px-3">
                <div class="row text-center">
                  <div class="col-4">
                    <label class="fw-bold">Contrato:</label>
                    <p class="small mb-1">{{ infoIPS.contrato.nombre }}</p>
                  </div>
                  <div class="col-4">
                    <label class="fw-bold">Codigo:</label>
                    <p class="small mb-1">{{ infoIPS.contrato.codigo }}</p>
                  </div>
                  <div class="col-4">
                    <label class="fw-bold">Vigencia:</label>
                    <p class="small mb-1">{{ infoIPS.contrato.vigencia }}</p>
                  </div>
                </div>
              </div>
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
                Tipo de citas
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
                Procesos
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
                Manuales tarifarios
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
              <div class="d-flex align-items-center mb-4">
                <select
                  class="form-select me-2"
                  id="clasificacion-servicio"
                  v-model="selectedOption"
                >
                  <option value="" disabled>Seleccione una opción</option>
                  <option
                    v-for="opcion in tpcitas"
                    :key="opcion.id"
                    :value="opcion.label"
                  >
                    {{ opcion.label }}
                  </option>
                </select>
                <button class="btn btn-custom btn-icon" @click="agregarOpcion">
                  Agregar
                </button>
              </div>

              <!-- DataTable -->
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive">
                      <table
                        ref="dataTable"
                        class="table table-striped table-bordered"
                        style="width: 100%; margin-bottom: 20px"
                      >
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- DataTable -->
            </div>
            <div
              class="tab-pane fade"
              id="tab2"
              role="tabpanel"
              aria-labelledby="tab2-tab"
            >
              <!-- Nested Nav tabs -->
              <ul class="nav nav-tabs" id="nestedTabs" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="nested-tab1-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nested-tab1"
                    type="button"
                    role="tab"
                    aria-controls="nested-tab1"
                    aria-selected="true"
                  >
                    Procedimientos
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="nested-tab2-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nested-tab2"
                    type="button"
                    role="tab"
                    aria-controls="nested-tab2"
                    aria-selected="false"
                  >
                    Laboratorios
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="nested-tab3-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nested-tab3"
                    type="button"
                    role="tab"
                    aria-controls="nested-tab3"
                    aria-selected="false"
                  >
                    Medicamentos
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="nested-tab4-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nested-tab4"
                    type="button"
                    role="tab"
                    aria-controls="nested-tab4"
                    aria-selected="false"
                  >
                    Imagenología
                  </button>
                </li>
              </ul>

              <!-- Nested Tab contents -->
              <div class="tab-content mt-3" id="nestedTabsContent">
                <div
                  class="tab-pane fade show active"
                  id="nested-tab1"
                  role="tabpanel"
                  aria-labelledby="nested-tab1-tab"
                >
                  <div class="d-flex align-items-center mb-4">
                    <input
                      type="text"
                      class="form-control me-2"
                      id="clasificacion-servicio"
                      v-model="selectedOption1"
                      placeholder="Escribe una opción"
                    />
                    <button
                      class="btn btn-custom btn-icon"
                      @click="agregarOpcionNested1"
                    >
                      Agregar
                    </button>
                  </div>

                  <!-- DataTable -->
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table
                            ref="nestedDataTable1"
                            class="table table-striped table-bordered"
                            style="width: 100%; margin-bottom: 20px"
                          >
                            <thead>
                              <tr>
                                <th>Nombre</th>
                                <th>Opciones</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- DataTable -->
                </div>
                <div
                  class="tab-pane fade"
                  id="nested-tab2"
                  role="tabpanel"
                  aria-labelledby="nested-tab2-tab"
                >
                  <div class="d-flex align-items-center mb-4">
                    <input
                      type="text"
                      class="form-control me-2"
                      id="clasificacion-servicio"
                      v-model="selectedOption2"
                      placeholder="Escribe una opción"
                    />
                    <button
                      class="btn btn-custom btn-icon"
                      @click="agregarOpcionNested2"
                    >
                      Agregar
                    </button>
                  </div>

                  <!-- DataTable -->
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table
                            ref="nestedDataTable2"
                            class="table table-striped table-bordered"
                            style="width: 100%; margin-bottom: 20px"
                          >
                            <thead>
                              <tr>
                                <th>Nombre</th>
                                <th>Opciones</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- DataTable -->
                </div>
                <div
                  class="tab-pane fade"
                  id="nested-tab3"
                  role="tabpanel"
                  aria-labelledby="nested-tab3-tab"
                >
                  <div class="d-flex align-items-center mb-4">
                    <input
                      type="text"
                      class="form-control me-2"
                      id="clasificacion-servicio"
                      v-model="selectedOption3"
                      placeholder="Escribe una opción"
                    />
                    <button
                      class="btn btn-custom btn-icon"
                      @click="agregarOpcionNested3"
                    >
                      Agregar
                    </button>
                  </div>

                  <!-- DataTable -->
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table
                            ref="nestedDataTable3"
                            class="table table-striped table-bordered"
                            style="width: 100%; margin-bottom: 20px"
                          >
                            <thead>
                              <tr>
                                <th>Nombre</th>
                                <th>Opciones</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- DataTable -->
                </div>
                <div
                  class="tab-pane fade"
                  id="nested-tab4"
                  role="tabpanel"
                  aria-labelledby="nested-tab4-tab"
                >
                  <div class="d-flex align-items-center mb-4">
                    <input
                      type="text"
                      class="form-control me-2"
                      id="clasificacion-servicio"
                      v-model="selectedOption4"
                      placeholder="Escribe una opción"
                    />
                    <button
                      class="btn btn-custom btn-icon"
                      @click="agregarOpcionNested4"
                    >
                      Agregar
                    </button>
                  </div>

                  <!-- DataTable -->
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table
                            ref="nestedDataTable4"
                            class="table table-striped table-bordered"
                            style="width: 100%; margin-bottom: 20px"
                          >
                            <thead>
                              <tr>
                                <th>Nombre</th>
                                <th>Opciones</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- DataTable -->
                </div>
              </div>
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
            <button type="button" class="btn btn-custom btn-icon mb-5">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import { tpcitas, infoIPS } from "../../../bd/bd";

export default {
  name: "ModalAdminContrato",
  setup() {
    const modalInstance = ref(null);
    const dataTable = ref(null);
    const nestedDataTable1 = ref(null);
    const nestedDataTable2 = ref(null);
    const nestedDataTable3 = ref(null);
    const nestedDataTable4 = ref(null);
    const selectedOption = ref("");

    const selectedOption1 = ref("");
    const selectedOption2 = ref("");
    const selectedOption3 = ref("");
    const selectedOption4 = ref("");

    const agregarOpcion = () => {
      if (selectedOption.value) {
        const table = $(dataTable.value).DataTable();
        table.row
          .add([
            selectedOption.value,
            '<button class="custom-btn custom-delete-btn" @click="eliminarOpcion"><i class="fa-solid fa-trash-can"></button>',
          ])
          .draw();
        selectedOption.value = "";
      }
    };

    const agregarOpcionNested1 = () => {
      if (selectedOption1.value) {
        const table = $(nestedDataTable1.value).DataTable();
        table.row
          .add([
            selectedOption1.value,
            '<button class="custom-btn custom-delete-btn"><i class="fa-solid fa-trash-can"></i></button>',
          ])
          .draw();
        selectedOption1.value = "";
      }
    };

    const agregarOpcionNested2 = () => {
      if (selectedOption2.value) {
        const table = $(nestedDataTable2.value).DataTable();
        table.row
          .add([
            selectedOption2.value,
            '<button class="custom-btn custom-delete-btn"><i class="fa-solid fa-trash-can"></i></button>',
          ])
          .draw();
        selectedOption2.value = "";
      }
    };

    const agregarOpcionNested3 = () => {
      if (selectedOption3.value) {
        const table = $(nestedDataTable3.value).DataTable();
        table.row
          .add([
            selectedOption3.value,
            '<button class="custom-btn custom-delete-btn"><i class="fa-solid fa-trash-can"></i></button>',
          ])
          .draw();
        selectedOption3.value = "";
      }
    };

    const agregarOpcionNested4 = () => {
      if (selectedOption4.value) {
        const table = $(nestedDataTable4.value).DataTable();
        table.row
          .add([
            selectedOption4.value,
            '<button class="custom-btn custom-delete-btn"><i class="fa-solid fa-trash-can"></i></button>',
          ])
          .draw();
        selectedOption3.value = "";
      }
    };

    const abrirModal = () => {
      if (modalInstance.value) {
        modalInstance.value.show();
      }
    };

    const cerrarModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      }
    };

    const eliminarOpcion = (event) => {
      const table = $(dataTable.value).DataTable();
      const row = table.row($(event.target).closest("tr"));
      row.remove().draw();
    };

    const eliminarOpcionNested = (event, tableRef) => {
      const table = $(tableRef.value).DataTable();
      const row = table.row($(event.target).closest("tr"));
      row.remove().draw();
    };

    const initDataTable = async () => {
      if ($.fn.DataTable.isDataTable(dataTable.value)) {
        $(dataTable.value).DataTable().destroy();
      }

      $(dataTable.value).DataTable({
        lengthMenu: [5, 10, 15, 20, 100, 200, 500],
        columnDefs: [
          { className: "centered", targets: [0, 1] },
          { orderable: false, targets: [1] },
          { searchable: true, targets: [0] },
        ],
        pageLength: 5,
        destroy: true,
        dom: `<"row mb-3"
                <"col-12"B>
              >
              <"row mb-3"
                <"col-12"f>
              >
              rt
              <"row"
                <"col-sm-12 col-md-5"l>
                <"col-sm-12 col-md-7"p>
              >`,
        buttons: [
          {
            extend: "copy",
            text: "Copy",
            className: "export-button",
          },
          {
            extend: "csv",
            text: "CSV",
            className: "export-button",
          },
          {
            extend: "excel",
            text: "Excel",
            className: "export-button",
          },
          {
            extend: "pdf",
            text: "PDF",
            className: "export-button",
          },
          {
            extend: "print",
            text: "Print",
            className: "export-button",
          },
        ],
        language: {
          lengthMenu: "Mostrar _MENU_ registros por página",
          zeroRecords: "Ningún registro encontrado",
          info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
          infoEmpty: "Ningún registro encontrado",
          infoFiltered: "(filtrados desde _MAX_ registros totales)",
          search: "Buscar:",
          loadingRecords: "Cargando...",
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior",
          },
        },
      });

      $(dataTable.value).on("click", ".custom-btn", eliminarOpcion);
    };

    const initNestedDataTable = async (ref) => {
      if ($.fn.DataTable.isDataTable(ref.value)) {
        $(ref.value).DataTable().destroy();
      }

      $(ref.value).DataTable({
        lengthMenu: [5, 10, 15, 20, 100, 200, 500],
        columnDefs: [
          { className: "centered", targets: [0, 1] },
          { orderable: false, targets: [1] },
          { searchable: true, targets: [0] },
        ],
        pageLength: 5,
        destroy: true,
        dom: `<"row mb-3"
            <"col-12"B>
          >
          <"row mb-3"
            <"col-12"f>
          >
          rt
          <"row"
            <"col-sm-12 col-md-5"l>
            <"col-sm-12 col-md-7"p>
          >`,
        buttons: [
          {
            extend: "copy",
            text: "Copy",
            className: "export-button",
          },
          {
            extend: "csv",
            text: "CSV",
            className: "export-button",
          },
          {
            extend: "excel",
            text: "Excel",
            className: "export-button",
          },
          {
            extend: "pdf",
            text: "PDF",
            className: "export-button",
          },
          {
            extend: "print",
            text: "Print",
            className: "export-button",
          },
        ],
        language: {
          lengthMenu: "Mostrar _MENU_ registros por página",
          zeroRecords: "Ningún registro encontrado",
          info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
          infoEmpty: "Ningún registro encontrado",
          infoFiltered: "(filtrados desde _MAX_ registros totales)",
          search: "Buscar:",
          loadingRecords: "Cargando...",
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior",
          },
        },
      });

      $(ref.value).on("click", ".custom-btn", (event) => {
        eliminarOpcionNested(event, ref);
      });
    };

    onMounted(async () => {
      modalInstance.value = new Modal(
        document.getElementById("modalAdminContrato")
      );
      await initDataTable();
      await initNestedDataTable(nestedDataTable1);
      await initNestedDataTable(nestedDataTable2);
      await initNestedDataTable(nestedDataTable3);
      await initNestedDataTable(nestedDataTable4);
    });

    return {
      abrirModal,
      cerrarModal,
      dataTable,

      nestedDataTable1,
      nestedDataTable2,
      nestedDataTable3,
      nestedDataTable4,

      selectedOption1,
      selectedOption2,
      selectedOption3,
      selectedOption4,
      agregarOpcionNested1,
      agregarOpcionNested2,
      agregarOpcionNested3,
      agregarOpcionNested4,

      selectedOption,
      agregarOpcion,
      tpcitas,
      infoIPS,
    };
  },
};
</script>
