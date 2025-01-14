<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-calendar-alt"></i> Agendas
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
                Añadir Nuevo
              </button>
            </div>

            <!-- Información de Agendas -->
            <div class="col-lg-4">
              <div class="card mb-2 info-ips-card">
                <div class="card-body py-2 px-3">
                  <div class="row text-start">
                    <div class="col-12">
                      <label class="fw-bold">Info:</label>
                      <p class="small mb-1">
                        Este modulo permite la gestion de las agendas de las
                        agendas de su IPS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="mt-2" />

          <div class="row">
            <!-- Calendario -->
            <div class="col-lg-4 mb-3">
              <div class="card h-100">
                <div class="card-body">
                  <h6 class="card-title mb-0">Agenda del día</h6>
                  <p>Seleccione la fecha para visualizar las agendas del dia</p>
                  <VDatePicker
                    class="w-100"
                    v-model="selectedDate"
                    is-range
                    :min-date="new Date()"
                  />
                </div>
              </div>
            </div>

            <!-- DataTable -->
            <div class="col-lg-8">
              <div class="table-responsive">
                <table
                  ref="dataTable"
                  class="table table-striped table-bordered"
                  style="width: 100%; margin-bottom: 20px"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Medico</th>
                      <th>Tipo Cita</th>
                      <th>Duración</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th>Hora Inicio</th>
                      <th>Hora Fin</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <MAgenda @agenda-agregada="agregarAgenda" ref="modalAgenda" />
    <MEditAgenda
      ref="modalEdit"
      :agenda="agendaSeleccionada"
      @agenda-actualizada="actualizarAgenda"
    />
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
import MAgenda from "../ModalAdmin/Agendas/MAgenda.vue";
import MEditAgenda from "../ModalAdmin/Agendas/MEditAgenda.vue";

// Importaciones necesarias para PDF y Excel
import jsZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Configuración necesaria para PDF
window.JSZip = jsZip;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  components: {
    MAgenda,
    MEditAgenda,
  },
  setup() {
    const dataTable = ref(null);
    const modalAgenda = ref(null);
    const agendaList = ref([]);
    const modalEdit = ref(null);
    const agendaSeleccionada = ref(null);

    const abrirModal = () => {
      modalAgenda.value.abrirModal();
    };

    const nuevoAgenda = ref({
      id: "",
      medico: "",
      tipoCita: "",
      duracion: "",
      fecha: {
        start: new Date(),
        end: new Date(),
      },
      horaInicio: "",
      horaFin: "",
    });

    const dataTableOptions = {
      lengthMenu: [5, 10, 15, 20, 100, 200, 500],
      columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
        { orderable: false, targets: [8] },
        { searchable: true, targets: [1, 2, 3, 4, 5, 6, 7] },
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

            // Eliminar del array de Agendas
            agendaList.value = agendaList.value.filter(
              (c) => c.id !== idToDelete
            );

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

      $(dataTable.value).on("click", ".custom-edit-btn", function (event) {
        event.preventDefault();
        const row = $(this).closest("tr");
        const rowData = $(dataTable.value).DataTable().row(row).data();
        const agenda = agendaList.value.find((c) => c.id === rowData[0]);
        if (agenda) {
          agendaSeleccionada.value = { ...agenda };
          modalEdit.value.abrirModal();
        }
      });

      $(dataTable.value).on("click", ".custom-view-btn", function (event) {
        event.preventDefault();
        // Acción para el botón de vista (actualmente sin acción)
      });
    };

    const actualizarAgenda = (agendaActualizada) => {
      const index = agendaList.value.findIndex(
        (c) => c.id === agendaActualizada.id
      );
      if (index !== -1) {
        // Actualizar el array
        agendaList.value[index] = agendaActualizada;

        const botonesAccion =
          '<button class="custom-btn custom-edit-btn" data-id="' +
          agendaActualizada.id +
          '"><i class="fa-solid fa-pen"></i></button>' +
          '<button class="custom-btn custom-delete-btn" data-id="' +
          agendaActualizada.id +
          '"><i class="fa-solid fa-trash-can"></i></button>' +
          '<button class="custom-btn custom-view-btn" data-id="' +
          agendaActualizada.id +
          '"><i class="fa-solid fa-eye"></i></button>';

        const table = $(dataTable.value).DataTable();
        const rowData = [
          agendaActualizada.id,
          agendaActualizada.medico,
          agendaActualizada.tipoCita,
          agendaActualizada.duracion,
          formatDate(agendaActualizada.fecha.start),
          formatDate(agendaActualizada.fecha.end),
          agendaActualizada.horaInicio,
          agendaActualizada.horaFin,
          botonesAccion,
        ];

        // Buscar y actualizar la fila
        const rows = table.rows().nodes();
        $(rows).each((index, row) => {
          const rowId = table.row(row).data()[0];
          if (rowId === agendaActualizada.id) {
            table.row(row).data(rowData).draw(false);
          }
        });
      }
    };

    const generarNuevoId = () => {
      if (agendaList.value.length > 0) {
        const ultimoNumero = Math.max(
          ...agendaList.value.map((c) => parseInt(c.id.split("-")[1]))
        );
        return `AGENDA-${String(ultimoNumero + 1).padStart(4, "0")}`;
      }
      return "AGENDA-0001";
    };

    const agregarAgenda = (agenda) => {
      // Crear nueva Agenda con ID
      const agendaConId = {
        ...agenda,
        id: generarNuevoId(),
      };

      // Actualizar el array de Agendas ANTES de agregar a la tabla
      agendaList.value = [...agendaList.value, agendaConId];

      const table = $(dataTable.value).DataTable();
      table.row
        .add([
          agendaConId.id,
          agendaConId.medico,
          agendaConId.tipoCita,
          agendaConId.duracion,
          formatDate(agendaConId.fecha.start),
          formatDate(agendaConId.fecha.end),
          agendaConId.horaInicio,
          agendaConId.horaFin,
          '<button class="custom-btn custom-edit-btn" data-id="' +
            agendaConId.id +
            '"><i class="fa-solid fa-pen"></i></button>' +
            '<button class="custom-btn custom-delete-btn" data-id="' +
            agendaConId.id +
            '"><i class="fa-solid fa-trash-can"></i></button>' +
            '<button class="custom-btn custom-view-btn" data-id="' +
            agendaConId.id +
            '"><i class="fa-solid fa-eye"></i></button>',
        ])
        .draw();

      // Para debug
      console.log("Agendas actuales:", toRaw(agendaList.value));
    };

    const formatDate = (date) => {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString("es-ES", options);
    };

    const selectedDate = ref({
      start: new Date(),
      end: new Date(),
    });

    onMounted(async () => {
      await initDataTable();
    });

    return {
      dataTable,
      abrirModal,
      agregarAgenda,
      modalAgenda,
      agendaList,
      nuevoAgenda,
      modalEdit,
      agendaSeleccionada,
      actualizarAgenda,
      formatDate,
      selectedDate,
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
