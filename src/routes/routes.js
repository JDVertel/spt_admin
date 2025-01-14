import AppHeader from "../components/AppHeader.vue";
import AppHome from "../components/AppHome.vue";

import Parametros from "../components/MenuItems/Parametros.vue";
import Sucursales from "../components/MenuItems/Sucursales.vue";
import EPS from "../components/MenuItems/EPS.vue";
import Contratos from "../components/MenuItems/Contratos.vue";
import BDerechos from "../components/MenuItems/BDerechos.vue";
import TipoCitasIPS from "../components/MenuItems/TipoCitasIPS.vue";
import ParametrizacionRoles from "../components/MenuItems/ParametrizacionRoles.vue";
import Profesionales from "../components/MenuItems/Profesionales.vue";
import CampanasSalud from "../components/MenuItems/CampañasSalud.vue";
import PInformacion from "../components/MenuItems/PInformacion.vue";
import AAgendas from "../components/MenuItems/AAgendas.vue";
import ACitas from "../components/MenuItems/ACitas.vue";
import AInformes from "../components/MenuItems/AInformes.vue";
import LInformes from "../components/MenuItems/LInformes.vue";
import LEResultados from "../components/MenuItems/LEResultados.vue";

export const routes = [
  {
    path: "/AppHeader",
    component: AppHeader,
    children: [
      { path: "/", component: AppHome },

      { path: "/Parametros", component: Parametros },
      { path: "/Sucursales", component: Sucursales },
      { path: "/EPS", component: EPS },
      { path: "/Contratos", component: Contratos },
      { path: "/BDerechos", component: BDerechos },
      { path: "/TipoCitasIPS", component: TipoCitasIPS },
      { path: "/ParametrizacionRoles", component: ParametrizacionRoles },
      { path: "/Profesionales", component: Profesionales },
      { path: "/CampanasSalud", component: CampanasSalud },
      { path: "/PInformacion", component: PInformacion },
      { path: "/AAgendas", component: AAgendas },
      { path: "/ACitas", component: ACitas },
      { path: "/AInformes", component: AInformes },
      { path: "/LInformes", component: LInformes },
      { path: "/LEResultados", component: LEResultados },

    ],
  },
];
