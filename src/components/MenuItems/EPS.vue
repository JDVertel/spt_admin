<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-hospital-alt"></i> EPS
            </span>
            <span class="opciones-formulario"></span>
          </p>
        </div>

        <div class="card-body">
          <div class="row align-items-start">
            <!-- Botón -->
            <div class="col-lg-8">
              <button
                type="button"
                class="btn btn-custom btn-icon mb-2"
                @click="abrirModal"
              >
                Añadir EPS
              </button>
            </div>

            <!-- Información de IPS -->
            <div class="col-lg-4">
              <div class="card mb-2 info-ips-card">
                <div class="card-body py-2 px-3">
                  <div class="row text-start">
                    <div class="col-6">
                      <label class="fw-bold">Info:</label>
                      <p class="small mb-1">EPS parametrizadas en el sistema</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="mt-2" />

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
                        <th>ID</th>
                        <th>Estado</th>
                        <th>NIT</th>
                        <th>Nombre</th>
                        <th>Representante legal</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Correo</th>
                        <th>Celular</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Data Table -->
        </div>
      </div>
    </form>
    <MEPS @eps-agregada="agregarEPS" ref="modalEPS" />
    <MEedit
      ref="modalEdit"
      :eps="epsSeleccionada"
      @eps-actualizada="actualizarEPS"
    />
    <MAeps ref="modalAdmin" />
  </div>
</template>

<script>
import { ref, onMounted, toRaw } from "vue";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import MEPS from "../ModalAdmin/EPS/MEPS.vue";
import MEedit from "../ModalAdmin/EPS/MEedit.vue";
import MAeps from "../ModalAdmin/EPS/MAeps.vue";

// Importaciones necesarias para PDF y Excel
import jsZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Configuración necesaria para PDF
window.JSZip = jsZip;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  components: {
    MEPS,
    MEedit,
    MAeps,
  },
  setup() {
    const dataTable = ref(null);
    const modalEPS = ref(null);
    const epsList = ref([]);

    const modalEdit = ref(null);
    const epsSeleccionada = ref(null);
    const modalAdmin = ref(null);
    const abrirModalAdmin = () => {
      modalAdmin.value.abrirModal();
    };

    const nuevaEPS = ref({
      id: "",
      nit: "",
      nombre: "",
      representante: "",
      direccion: "",
      ciudad: "",
      correo: "",
      celular: "",
      estado: true,
    });

    const dataTableOptions = {
      lengthMenu: [5, 10, 15, 20, 100, 200, 500],
      columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
        { orderable: false, targets: [9] },
        { searchable: true, targets: [1, 2] },
      ],
      pageLength: 3,
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
          copySuccess: false,
          title: "",
          copyTitle: "",
          init: function (dt, button, config) {
            var originalInfo = dt.buttons.info;
            dt.buttons.info = function () {
              return false;
            };
          },
          action: function (e, dt, button, config) {
            e.preventDefault();
            var data = dt.buttons.exportData();
            var text =
              data.header.join("\t") +
              "\n" +
              data.body.map((row) => row.join("\t")).join("\n");

            navigator.clipboard.writeText(text).then(() => {
              Swal.fire({
                title: "¡Copiado!",
                text: "Los datos han sido copiados al portapapeles",
                icon: "success",
                iconColor: "#2a3f54",
                showConfirmButton: false,
                timer: 1500,
                background: "#ededed",
                position: "top-end",
                toast: true,
                customClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
              });
            });
          },
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
          customize: function (doc) {
            doc.defaultStyle.fontSize = 10;
            doc.styles.tableHeader.fontSize = 11;
            doc.styles.tableHeader.alignment = "left";
          },
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
    };

    const initDataTable = async () => {
      if ($.fn.DataTable.isDataTable(dataTable.value)) {
        $(dataTable.value).DataTable().destroy();
      }

      $(dataTable.value).DataTable(dataTableOptions);

      $(dataTable.value).on("click", ".custom-delete-btn", function (event) {
        event.preventDefault();

        const table = $(dataTable.value).DataTable();
        const row = table.row($(this).parents("tr"));
        const rowData = row.data();
        const idToDelete = rowData[0];

        Swal.fire({
          title: "¿Está seguro?",
          text: "¿Desea eliminar esta fila? Esta acción no se puede deshacer.",
          icon: "warning",
          iconColor: "#2a3f54",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          customClass: {
            confirmButton: "btn btn-custom mb-2 mr-2",
            cancelButton: "btn btn-custom mb-2",
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // Eliminar de la tabla
            row.remove().draw();

            // Eliminar del array de EPS
            epsList.value = epsList.value.filter((e) => e.id !== idToDelete);

            Swal.fire({
              title: "¡Eliminado!",
              text: "La fila ha sido eliminada.",
              icon: "success",
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
          }
        });
      });

      $(dataTable.value).on("click", ".custom-configure-btn", function (event) {
        event.preventDefault();
        modalAdmin.value.abrirModal();
      });

      $(dataTable.value).on("click", ".custom-edit-btn", function (event) {
        event.preventDefault();
        const row = $(this).closest("tr");
        const rowData = $(dataTable.value).DataTable().row(row).data();
        const eps = epsList.value.find((e) => e.id === rowData[0]);
        if (eps) {
          epsSeleccionada.value = { ...eps };
          modalEdit.value.abrirModal();
        }
      });
    };

    const actualizarEPS = (epsActualizada) => {
      const index = epsList.value.findIndex((e) => e.id === epsActualizada.id);
      if (index !== -1) {
        // Actualizar el array
        epsList.value[index] = epsActualizada;

        const botonesAccion =
          '<button class="custom-btn custom-edit-btn" data-id="' +
          epsActualizada.id +
          '"><i class="fa-solid fa-pen"></i></button>' +
          '<button class="custom-btn custom-configure-btn" data-id="' +
          epsActualizada.id +
          '"><i class="fa-solid fa-cog"></i></button>' +
          '<button class="custom-btn custom-delete-btn" data-id="' +
          epsActualizada.id +
          '"><i class="fa-solid fa-trash-can"></i></button>';

        const table = $(dataTable.value).DataTable();
        const rowData = [
          epsActualizada.id,
          epsActualizada.estado ? "Activo" : "Inactivo",
          epsActualizada.nit,
          epsActualizada.nombre,
          epsActualizada.representante,
          epsActualizada.direccion,
          epsActualizada.ciudad,
          epsActualizada.correo,
          epsActualizada.celular,
          botonesAccion,
        ];

        // Buscar y actualizar la fila
        const rows = table.rows().nodes();
        $(rows).each((index, row) => {
          const rowId = table.row(row).data()[0];
          if (rowId === epsActualizada.id) {
            table.row(row).data(rowData).draw(false);
          }
        });
      }
    };

    const abrirModal = () => {
      modalEPS.value.abrirModal();
    };

    const generarNuevoId = () => {
      if (epsList.value.length > 0) {
        const ultimoNumero = Math.max(
          ...epsList.value.map((e) => parseInt(e.id.split("-")[1]))
        );
        return `EPS-${String(ultimoNumero + 1).padStart(4, "0")}`;
      }
      return "EPS-0001";
    };

    const agregarEPS = (eps) => {
      // Crear nueva EPS con ID
      const epsConId = {
        ...eps,
        id: generarNuevoId(),
        estado: true,
      };

      // Actualizar el array de EPS ANTES de agregar a la tabla
      epsList.value = [...epsList.value, epsConId];

      const table = $(dataTable.value).DataTable();
      table.row
        .add([
          epsConId.id,
          "Activo",
          epsConId.nit,
          epsConId.nombre,
          epsConId.representante,
          epsConId.direccion,
          epsConId.ciudad,
          epsConId.correo,
          epsConId.celular,
          '<button class="custom-btn custom-edit-btn" data-id="' +
            epsConId.id +
            '"><i class="fa-solid fa-pen"></i></button>' +
            '<button class="custom-btn custom-configure-btn" data-id="' +
            epsConId.id +
            '"><i class="fa-solid fa-cog"></i></button>' +
            '<button class="custom-btn custom-delete-btn" data-id="' +
            epsConId.id +
            '"><i class="fa-solid fa-trash-can"></i></button>',
        ])
        .draw();

      // Para debug
      console.log("EPS actuales:", toRaw(epsList.value));
    };

    onMounted(async () => {
      await initDataTable();
    });

    return {
      dataTable,
      abrirModal,
      agregarEPS,
      modalEPS,
      epsList,
      nuevaEPS,
      modalEdit,
      epsSeleccionada,
      actualizarEPS,
      modalAdmin,
      abrirModalAdmin,
    };
  },
};
</script>

<style scoped>
:deep(.export-button) {
  background-color: #2a3f54 !important;
  border: none !important;
  color: white !important;
  padding: 6px 12px !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  font-weight: normal !important;
  text-transform: none !important;
  box-shadow: none !important;
}

:deep(.export-button:hover) {
  background-color: #2a3f54 !important;
}
</style>
