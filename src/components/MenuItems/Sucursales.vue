<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-map-marker-alt"></i> Sucursales
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
                Añadir Sucursal
              </button>
            </div>

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
                        <th>Nombre</th>
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
    <MSucursal @sucursal-agregada="agregarSucursal" ref="modalSucursal" />
    <MSconfig
      ref="modalConfig"
      :sucursal-id="sucursalSeleccionada"
      @actualizar-horarios="actualizarHorarios"
    />
    <MSedit
      ref="modalEdit"
      :sucursal="sucursalSeleccionadaParaEditar"
      @sucursal-actualizada="actualizarSucursal"
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
import MSucursal from "../ModalAdmin/Sucursales/MSucursal.vue";
import MSconfig from "../ModalAdmin/Sucursales/MSconfig.vue";
import MSedit from "../ModalAdmin/Sucursales/MSedit.vue";

import { infoIPS } from '../../bd/bd';

// Importaciones necesarias para PDF y Excel
import jsZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Configuración necesaria para PDF
window.JSZip = jsZip;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  components: {
    MSucursal,
    MSconfig,
    MSedit,
  },
  setup() {
    const dataTable = ref(null);
    const modalSucursal = ref(null);
    const modalConfig = ref(null);
    const modalEdit = ref(null);
    const sucursales = ref([]);

    const sucursalSeleccionada = ref(null);
    const sucursalSeleccionadaParaEditar = ref(null);

    const nuevaSucursal = ref({
      id: "",
      nombre: "",
      direccion: "",
      ciudad: "",
      celular: "",
      correo: "",
      usuario: "",
      contrasena: "",
      estado: true,
      horarios: {
        manana: {
          ingreso: "",
          salida: "",
        },
        tarde: {
          ingreso: "",
          salida: "",
        },
      },
    });

    // actualizar horarios
    const actualizarHorarios = ({ id, horarios }) => {
      const sucursalIndex = sucursales.value.findIndex((s) => s.id === id);
      if (sucursalIndex !== -1) {
        sucursales.value[sucursalIndex].horarios = horarios;
        console.log("Horarios actualizados para sucursal:", id);
      }
    };

    const dataTableOptions = {
      lengthMenu: [5, 10, 15, 20, 100, 200, 500],
      columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
        { orderable: false, targets: [7] },
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

            // Eliminar del array de sucursales
            sucursales.value = sucursales.value.filter(
              (s) => s.id !== idToDelete
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

      $(dataTable.value).on("click", ".custom-configure-btn", function (event) {
        event.preventDefault();
        const row = $(this).closest("tr");
        const rowData = $(dataTable.value).DataTable().row(row).data();
        sucursalSeleccionada.value = rowData[0]; // Guardar ID de la sucursal
        modalConfig.value.abrirModal();
      });

      $(dataTable.value).on("click", ".custom-edit-btn", function (event) {
        event.preventDefault();
        const row = $(this).closest("tr");
        const rowData = $(dataTable.value).DataTable().row(row).data();
        const sucursal = sucursales.value.find((s) => s.id === rowData[0]);
        if (sucursal) {
          sucursalSeleccionadaParaEditar.value = { ...sucursal };
          modalEdit.value.abrirModal();
        }
      });
    };

    const actualizarSucursal = (sucursalActualizada) => {
      const index = sucursales.value.findIndex(
        (s) => s.id === sucursalActualizada.id
      );
      if (index !== -1) {
        // Actualizar el array de sucursales
        sucursales.value[index] = sucursalActualizada;

        const botonesAccion =
          '<button class="custom-btn custom-edit-btn" data-id="' +
          sucursalActualizada.id +
          '"><i class="fa-solid fa-pen"></i></button>' +
          '<button class="custom-btn custom-configure-btn" data-id="' +
          sucursalActualizada.id +
          '"><i class="fa-solid fa-cog"></i></button>' +
          '<button class="custom-btn custom-delete-btn" data-id="' +
          sucursalActualizada.id +
          '"><i class="fa-solid fa-trash-can"></i></button>';

        const table = $(dataTable.value).DataTable();
        const rowData = [
          sucursalActualizada.id,
          sucursalActualizada.estado ? "Activo" : "Inactivo",
          sucursalActualizada.nombre,
          sucursalActualizada.direccion,
          sucursalActualizada.ciudad,
          sucursalActualizada.correo,
          sucursalActualizada.celular,
          botonesAccion,
        ];

        // Buscar y actualizar la fila correcta
        const rows = table.rows().nodes();
        $(rows).each((index, row) => {
          const rowId = table.row(row).data()[0];
          if (rowId === sucursalActualizada.id) {
            table.row(row).data(rowData).draw(false);
          }
        });
      }
    };

    const abrirModal = () => {
      modalSucursal.value.abrirModal();
    };

    const generarNuevoId = () => {
      if (sucursales.value.length > 0) {
        const ultimoNumero = Math.max(
          ...sucursales.value.map((s) => parseInt(s.id.split("-")[1]))
        );
        return `SUC-${String(ultimoNumero + 1).padStart(4, "0")}`;
      }
      return "SUC-0001";
    };

    const agregarSucursal = (sucursal) => {
      // Crear nueva sucursal con ID
      const sucursalConId = {
        ...sucursal,
        id: generarNuevoId(),
        estado: true,
      };

      // Actualizar el array de sucursales ANTES de agregar a la tabla
      sucursales.value = [...sucursales.value, sucursalConId];

      const table = $(dataTable.value).DataTable();
      table.row
        .add([
          sucursalConId.id,
          "Activo",
          sucursalConId.nombre,
          sucursalConId.direccion,
          sucursalConId.ciudad,
          sucursalConId.correo,
          sucursalConId.celular,
          '<button class="custom-btn custom-edit-btn" data-id="' +
            sucursalConId.id +
            '"><i class="fa-solid fa-pen"></i></button>' +
            '<button class="custom-btn custom-configure-btn" data-id="' +
            sucursalConId.id +
            '"><i class="fa-solid fa-cog"></i></button>' +
            '<button class="custom-btn custom-delete-btn" data-id="' +
            sucursalConId.id +
            '"><i class="fa-solid fa-trash-can"></i></button>',
        ])
        .draw();

      // Para debug
      console.log("Sucursales actuales:", toRaw(sucursales.value));
    };

    onMounted(async () => {
      await initDataTable();
    });

    return {
      dataTable,
      abrirModal,
      agregarSucursal,
      modalSucursal,
      modalConfig,
      modalEdit,
      sucursales,
      sucursalSeleccionada,
      actualizarHorarios,
      nuevaSucursal,
      actualizarSucursal,
      sucursalSeleccionadaParaEditar,

      infoIPS,
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
