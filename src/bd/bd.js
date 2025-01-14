export const cardsData = [
  {
    title: "HC - Consulta Externa",
    headerClass: "bg-light",
    image: "http://localhost/hc/assets/images/spt/logospt_negra.png",
    items: [
      {
        label: "Registro de la asistencia en salud",
        value: "Salud para Todos",
      },
    ],
  },
  {
    title: "IPS: Cajasan",
    headerClass: "bg-light",
    image: "http://localhost/hc/assets/images/spt/logospt_negra.png",
    items: [
      { label: "Sede", value: "Galan Gomez" },
      { label: "EPS", value: "Sanitas" },
      { label: "Fecha", value: "xxxxxxxx" },
      { label: "Hora atención", value: "xxxx" },
      { label: "Servicio", value: "Consulta externa" },
      { label: "Observaciones del contrato", value: "" },
      { label: "Solo pyp", value: "xxxxxxxxxxxx" },
    ],
  },
  {
    title: "Paciente: Juan David Vertel Holguin",
    headerClass: "bg-light",
    image: "http://localhost/hc/assets/images/spt/logospt_negra.png",
    items: [
      { label: "F nacimiento", value: "05-05-1981" },
      { label: "Edad", value: "38A 3M 15D" },
      { label: "Sexo", value: "Masculino" },
      { label: "Estado civil", value: "Soltero" },
      { label: "Tipo RH", value: "A+" },
      { label: "Profesión", value: "Ingeniero" },
      { label: "Ocupación", value: "auditor" },
    ],
  },
];

// --------------------------------------------

export const menuItems = [
  {
    component: "Home",
    text: "Inicio",
    abbr: "Inicio",
    icon: "fas fa-home", // Representa bien "Inicio"
    route: "/",
  },
  {
    component: "Parametros",
    text: "Parametros",
    abbr: "Parametros",
    icon: "fas fa-cogs", // Mejor para parámetros
    route: "/Parametros",
  },
  {
    component: "Sucursales",
    text: "Sucursales",
    abbr: "Sucursales",
    icon: "fas fa-map-marker-alt", // Más adecuado para sucursales
    route: "/Sucursales",
  },
  {
    component: "EPS",
    text: "EPS",
    abbr: "EPS",
    icon: "fas fa-hospital-alt", // Representa EPS (entidades de salud)
    route: "/EPS",
  },
  {
    component: "Contratos",
    text: "Contratos",
    abbr: "Contratos",
    icon: "fas fa-file-contract", // Más preciso para contratos
    route: "/Contratos",
  },
  {
    component: "BDerechos",
    text: "BD Derechos",
    abbr: "BD",
    icon: "fas fa-balance-scale", // Representa derechos y balance
    route: "/BDerechos",
  },
  {
    component: "TipoCitasIPS",
    text: "Tipo de Citas IPS",
    abbr: "IPS",
    icon: "fas fa-calendar-check", // Más relacionado con citas
    route: "/TipoCitasIPS",
  },
  {
    component: "ParametrizacionRoles",
    text: "Parametrizacion Roles",
    abbr: "Roles",
    icon: "fas fa-users-cog", // Mejor para roles y parametrización
    route: "/ParametrizacionRoles",
  },
  {
    component: "Profesionales",
    text: "Profesionales",
    abbr: "Profesionales",
    icon: "fas fa-user-tie", // Más representativo para profesionales
    route: "/Profesionales",
  },
  {
    component: "CampañasSalud",
    text: "Campañas de Salud",
    abbr: "Campañas",
    icon: "fas fa-heartbeat", // Adecuado para campañas de salud
    route: "/CampanasSalud",
  },

  // Últimos tres submenús
  {
    component: "Pacientes",
    text: "Pacientes",
    abbr: "Pacientes",
    icon: "fas fa-user-injured", // Más acorde para pacientes
    route: "/CampanasSalud",
    subitems: [
      {
        component: "SubItem1",
        text: "Información",
        abbr: "Información",
        route: "/PInformacion",
      },
    ],
  },
  {
    component: "Agendamiento",
    text: "Agendamiento",
    abbr: "Agenda",
    icon: "fas fa-calendar-alt", // Mejor para agendamiento
    route: "/CampanasSalud",
    subitems: [
      {
        component: "SubItem2",
        text: "Agendas",
        abbr: "Agendas",
        route: "/AAgendas",
      },
      {
        component: "SubItem3",
        text: "Citas",
        abbr: "Citas",
        route: "/ACitas",
      },
      {
        component: "SubItem4",
        text: "Informes",
        abbr: "Informes",
        route: "/AInformes",
      },
    ],
  },
  {
    component: "Laboratorio",
    text: "Laboratorio",
    abbr: "Laboratorio",
    icon: "fas fa-vials", // Más representativo para laboratorio
    route: "/CampanasSalud",
    subitems: [
      {
        component: "SubItem5",
        text: "Informes",
        abbr: "Informes",
        route: "/LInformes",
      },
      {
        component: "SubItem6",
        text: "Editar Resultados",
        abbr: "Editar",
        route: "/LEResultados",
      },
    ],
  },
];

export const servicios = [
  {
    titulo: "Consulta medica virtual",
    imagen:
      "https://www.softwaremedico.org/wp-content/uploads/2022/08/software-medico-consultorio-virtual.png",
    icono: "bi-activity",
    textoMini: "Servicio de",
    texto: "Orientación en Salud",
  },

  {
    titulo: "Consulta medica virtual",
    imagen:
      "https://www.softwaremedico.org/wp-content/uploads/2022/08/software-medico-consultorio-virtual.png",
    icono: "bi-activity",
    textoMini: "Servicio de",
    texto: "Orientación en Salud",
  },

  {
    titulo: "Consulta medica virtual",
    imagen:
      "https://www.softwaremedico.org/wp-content/uploads/2022/08/software-medico-consultorio-virtual.png",
    icono: "bi-activity",
    textoMini: "Servicio de",
    texto: "Orientación en Salud",
  },

  {
    titulo: "Consulta medica virtual",
    imagen:
      "https://www.softwaremedico.org/wp-content/uploads/2022/08/software-medico-consultorio-virtual.png",
    icono: "bi-activity",
    textoMini: "Servicio de",
    texto: "Orientación en Salud",
  },

  {
    titulo: "Consulta medica virtual",
    imagen:
      "https://www.softwaremedico.org/wp-content/uploads/2022/08/software-medico-consultorio-virtual.png",
    icono: "bi-activity",
    textoMini: "Servicio de",
    texto: "Orientación en Salud",
  },

  {
    titulo: "Consulta medica virtual",
    imagen:
      "https://www.softwaremedico.org/wp-content/uploads/2022/08/software-medico-consultorio-virtual.png",
    icono: "bi-activity",
    textoMini: "Servicio de",
    texto: "Orientación en Salud",
  },

  {
    titulo: "Consulta medica virtual",
    imagen:
      "https://www.softwaremedico.org/wp-content/uploads/2022/08/software-medico-consultorio-virtual.png",
    icono: "bi-activity",
    textoMini: "Servicio de",
    texto: "Orientación en Salud",
  },

  {
    titulo: "Consulta medica virtual",
    imagen:
      "https://www.softwaremedico.org/wp-content/uploads/2022/08/software-medico-consultorio-virtual.png",
    icono: "bi-activity",
    textoMini: "Servicio de",
    texto: "Orientación en Salud",
  },

  {
    titulo: "Consulta medica virtual",
    imagen:
      "https://www.softwaremedico.org/wp-content/uploads/2022/08/software-medico-consultorio-virtual.png",
    icono: "bi-activity",
    textoMini: "Servicio de",
    texto: "Orientación en Salud",
  },
];

export const modalp = [
  {
    imagenProducto:
      "https://www.clinicavirtual.com/files/empresas/programas/telemedicinamodal-2.png",
    nombreProducto:
      "Servicio orientación en la salud por medio de telemedicina",
    precioProducto: 15000,
    detaProducto:
      "Para hacer uso de este servicio,  presiona “Agenda aquí” o “Comunicate a los números que se muestran”",
    infoProducto:
      "El Programa está disponible las 24 horas del día, los 7 días de la semana y nuestros médicos podrán atender, generar recetas médicas, revisar resultados y/o generar ordenes de exámenes. El servicio corresponde a la entrega de atención médica a distancia para resolver dudas inmediatas y recibir diagnósticos frente a enfermedades de baja.",
    mensajeLema:
      "¿Estás listo para comenzar a vivir esta nueva experiencia en salud y bienestar?",
  },
];

export const modalCIE10 = {
  id: "modalCIE10",
  title: "Buscar CIE-10",
};

export const accordionConfig = {
  id: "accordionExample",
  items: [
    {
      id: "flush-collapseOne",
      title: "Accordion Item #1",
      content:
        "Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.",
    },
    {
      id: "flush-collapseTwo",
      title: "Accordion Item #2",
      content:
        "Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.",
    },
    {
      id: "flush-collapseThree",
      title: "Accordion Item #3",
      content:
        "Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.",
    },
  ],
};

// --------------------------------------------

export const parentescos = [
  { id: 1, label: "Amigo" },
  { id: 2, label: "Pareja" },
  { id: 3, label: "Padrino-Madrina" },
  { id: 4, label: "Hijo" },
  { id: 5, label: "Hija" },
  { id: 6, label: "Hermano" },
  { id: 7, label: "Hermana" },
  { id: 8, label: "Mamá" },
  { id: 9, label: "Papá" },
  { id: 10, label: "Primos Maternos" },
  { id: 11, label: "Primos Paternos" },
  { id: 12, label: "Tios Maternos" },
  { id: 13, label: "Tios Paternos" },
  { id: 14, label: "Abuelos Maternos" },
  { id: 15, label: "Abuelos Paternos" },
  { id: 16, label: "Ninguno" },
];

export const mediosllegada = [
  { id: 1, label: "Caminando Solo" },
  { id: 2, label: "Caminando Ayudado por Acompañante" },
  { id: 3, label: "Silla de Ruedas" },
  { id: 4, label: "Muletas" },
  { id: 5, label: "Caminador" },
  { id: 6, label: "Camilla" },
];

export const esdolor = [
  { id: 1, label: "0 - Minimo" },
  { id: 2, label: "1 - Poco" },
  { id: 3, label: "4 - Moderado" },
  { id: 4, label: "6 - Fuerte" },
  { id: 5, label: "8 - Muy Fuerte" },
  { id: 6, label: "10 - Insoportable" },
];

export const gestante = [
  { id: 1, label: "Si" },
  { id: 2, label: "No" },
];

export const familiares = [
  { id: "padre", label: "Padre" },
  { id: "madre", label: "Madre" },
  { id: "hermano", label: "Hermano" },
  { id: "hermana", label: "Hermana" },
  { id: "abuelo_paterno", label: "Abuelo paterno" },
  { id: "abuela_paterna", label: "Abuela paterna" },
  { id: "abuelo_materno", label: "Abuelo materno" },
  { id: "abuela_materna", label: "Abuela materna" },
  { id: "tio", label: "Tío" },
  { id: "tia", label: "Tía" },
  { id: "primo", label: "Primo" },
  { id: "prima", label: "Prima" },
  { id: "otro", label: "Otro" },
];

// --------------------------------------------

export const ExamenFisico = {
  glasgowVerbal: [
    { id: 5, label: "Espontanea" },
    { id: 4, label: "Orden Verbal" },
    { id: 3, label: "Dolor" },
    { id: 2, label: "No Responde" },
    { id: 1, label: "Ninguna" },
  ],
  glasgowOcular: [
    { id: 5, label: "Orientado y Conservado" },
    { id: 4, label: "Desorientado y Hablando" },
    { id: 3, label: "Palabras Incoherentes" },
    { id: 2, label: "Sonidos Inconprensibles" },
    { id: 1, label: "Ninguna" },
  ],
  glasgowMotora: [
    { id: 6, label: "Obedece órdenes" },
    { id: 5, label: "Localiza el dolor" },
    { id: 4, label: "Retirada y flexion" },
    { id: 3, label: "Flexión anormal" },
    { id: 2, label: "Extensión" },
    { id: 1, label: "Ninguna" },
  ],
};

// --------------------------------------------

export const Diagnostico = {
  clasificacionesDiagnostico: [
    { id: 1, label: "Impresión diagnóstica" },
    { id: 2, label: "Confirmado nuevo" },
  ],
  finalidadesConsulta: [
    { id: 1, label: "Atención del parto" },
    { id: 2, label: "Atención del recién nacido" },
  ],
  causasExternas: [
    { id: 1, label: "Accidente de trabajo" },
    { id: 2, label: "Accidente de tránsito" },
  ],
};

// --------------------------------------------

export const clasificacionesServicio = [
  { id: 1, label: "Programa PyP" },
  { id: 2, label: "Especialista" },
  { id: 3, label: "Servicio Externo" },
];

export const especificacionesServicio = [
  { id: 1, label: "Programa PyP" },
  { id: 2, label: "Especialista Pediatria" },
  { id: 3, label: "Especialista Ortopedia" },
  { id: 4, label: "Especialista Gimnecologia" },
  { id: 5, label: "Internista" },
];

// --------------------------------------------

export const antecedentesGoData = {
  gestas: 3,
  partos: 2,
  abortos: 1,
  nVivos: 2,
  nMuertos: 0,
  cesareas: 0,
  embarazosMultiples: 0,
  gestante: "No",
  ciclo: "Regular",
  metodosPlanificacion: "Preservativo",
  seRealizaCitologias: "Sí",
  companerosSeuxales: 1,
  edadInicioRelaciones: 18,
  orientacionSexual: "Heterosexual",
  menarquia: "2000-10-13",
  fUltNacidoVivo: "2020-05-15",
  fUltNacidoMuerto: "",
  fUltMestruacion: "2023-05-01",
  fUltParto: "2020-05-15",
  fInicioPFC: "2020-06-01",
};

export const labels = {
  gestas: "Gestas",
  partos: "Partos",
  abortos: "Abortos",
  nVivos: "N Vivos",
  nMuertos: "N Muertos",
  cesareas: "Cesáreas",
  embarazosMultiples: "Embarazos Múltiples",
  gestante: "Gestante",
  ciclo: "Ciclo",
  metodosPlanificacion: "Métodos Planificación",
  seRealizaCitologias: "Se realiza citologías",
  companerosSeuxales: "Compañeros sexuales",
  edadInicioRelaciones: "Edad inicio relaciones sex",
  orientacionSexual: "Orientación sexual",
  menarquia: "Menarquía",
  fUltNacidoVivo: "F ult nacido Vivo",
  fUltNacidoMuerto: "F ult nacido muerto",
  fUltMestruacion: "F ult mestruación",
  fUltParto: "F ult parto",
  fInicioPFC: "F inicio PFC",
  // -------------------------------------
  circuncision: "Circuncisión",
  criptorquidea: "Criptorquidea",
  policionesNocturnas: "Policiones nocturnas",
  numeroParejasexuales: "Número de parejas sexuales",
  trastornosEreccion: "Trastornos de la erección",
  edadEspermaca: "Edad Espermaca",
  edadInicioVidaSexual: "Edad Inicio vida sexual",
  orientacionSexual: "Orientación sexual",
  mProteccionSexual: "M protección sexual",
  infTransmisionSexual: "Inf de transmisión sexual",
  andropausia: "Andropausia",
};

export const selectOptions = {
  gestante: [
    { value: "Sí", label: "Sí" },
    { value: "No", label: "No" },
  ],
  ciclo: [
    { value: "Regular", label: "Regular" },
    { value: "Irregular", label: "Irregular" },
  ],
  metodosPlanificacion: [
    { value: "Ninguno", label: "Ninguno" },
    { value: "Preservativo", label: "Preservativo" },
    { value: "Píldora", label: "Píldora" },
  ],
  seRealizaCitologias: [
    { value: "Sí", label: "Sí" },
    { value: "No", label: "No" },
  ],
  orientacionSexual: [
    { value: "Heterosexual", label: "Heterosexual" },
    { value: "Homosexual", label: "Homosexual" },
    { value: "Bisexual", label: "Bisexual" },
  ],
  // -------------------------------------
  circuncision: [
    { value: "Sí", label: "Sí" },
    { value: "No", label: "No" },
  ],
  criptorquidea: [
    { value: "Sí", label: "Sí" },
    { value: "No", label: "No" },
  ],
  policionesNocturnas: [
    { value: "Sí", label: "Sí" },
    { value: "No", label: "No" },
  ],
  trastornosEreccion: [
    { value: "Sí", label: "Sí" },
    { value: "No", label: "No" },
  ],
  orientacionSexual: [
    { value: "Heterosexual", label: "Heterosexual" },
    { value: "Homosexual", label: "Homosexual" },
    { value: "Bisexual", label: "Bisexual" },
  ],
  mProteccionSexual: [
    { value: "Ninguno", label: "Ninguno" },
    { value: "Preservativo", label: "Preservativo" },
    { value: "Otro", label: "Otro" },
  ],
  infTransmisionSexual: [
    { value: "No", label: "No" },
    { value: "Sífilis", label: "Sífilis" },
    { value: "Gonorrea", label: "Gonorrea" },
    { value: "VIH", label: "VIH" },
  ],
};

// --------------------------------------------

export const antecedentesAndroData = {
  circuncision: "No",
  criptorquidea: "No",
  policionesNocturnas: "No",
  numeroParejasexuales: 2,
  trastornosEreccion: "No",
  edadEspermaca: 15,
  edadInicioVidaSexual: 17,
  orientacionSexual: "Heterosexual",
  mProteccionSexual: "Preservativo",
  infTransmisionSexual: "No",
  andropausia: "",
};

// -------------------------------------------- AD1

export const tpcitas = [
  { id: 1, label: "C Externa" },
  { id: 2, label: "Odontologia" },
  { id: 3, label: "Otros" },
];

export const infoIPS = {
  contrato: {
    nombre: "Sanitas PYP",
    codigo: "COD-123",
    vigencia: "15/12/2020",
  },
  sucursal: {
    nombre: "Cajasan IPs",
    nit: "829001846-5",
    codigo: "493840938jfu",
    nivel: "2",
  },
};

export const regimenes = [
  { id: 1, label: "Vinculado" },
  { id: 2, label: "Contributivo" },
  { id: 3, label: "Subsidiado" },
];

export const epsData = [
  { id: 1, nombre: "Sanitas EPS" },
  { id: 2, nombre: "Nueva EPS" },
  { id: 3, nombre: "Compensar" },
  { id: 4, nombre: "Famisanar" },
  { id: 5, nombre: "Sura EPS" },
];

export const tiposCita = [
  { id: 1, label: "C_Externa" },
  { id: 2, label: "C_Urgencias" },
];

export const opciones = [
  { id: 1, label: "Regla 1" },
  { id: 2, label: "Regla 2" },
  { id: 3, label: "Regla 3" },
];

export const tiposValidacion = [
  { id: 1, label: "Metrica" },
  { id: 2, label: "Asistencial" },
];

export const sexos = [
  { id: 1, label: "Masculino" },
  { id: 2, label: "Femenino" },
  { id: 3, label: "Ambos" },
];

export const metricas = [
  { id: 1, label: "Años" },
  { id: 2, label: "Meses" },
  { id: 3, label: "Días" },
];

export const roles = [
  { id: 1, label: "Medico C Externa" },
  { id: 2, label: "Medico Urgencias" },
  { id: 3, label: "Medico Internista" },
  { id: 4, label: "Enfermera(o) Jefe" },
];

export const items = [
  { id: 1, label: "Agenda del Día" },
  { id: 2, label: "Historia Clinica" },
  { id: 3, label: "Consultar Paciente" },
  { id: 4, label: "Agendamiento" },
];

export const medicoInfo = {
  nombre: "Juan David Vertel Holguín",
  documento: "CC/13862345",
  edad: "40",
  avatar: "https://via.placeholder.com/50",
};

export const historialActividades = [
  {
    id: 1,
    nombre: "Dr. Juan Pérez",
    tipoConsulta: "Consulta Externa",
    fecha: "45 días atrás",
    avatar: "https://via.placeholder.com/40",
  },
];

export const tiposDocumento = [
  { id: 1, label: "Cédula de Ciudadanía" },
  { id: 2, label: "Tarjeta de Identidad" },
  { id: 3, label: "Registro Civil" },
  { id: 4, label: "Cédula de Extranjería" },
  { id: 5, label: "Pasaporte" },
  { id: 6, label: "Carné Diplomático" },
  { id: 7, label: "Permiso Especial de Permanencia" },
  { id: 8, label: "NIT" },
];
