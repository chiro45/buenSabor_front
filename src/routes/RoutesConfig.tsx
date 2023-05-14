import { Landing } from "../components/Screens/Landing/Landing"
import { ConfigCategory } from "../components/Screens/ConfigCategory/ConfigCategory"
import { ConfigArticuloInsumo } from "../components/Screens/ConfigArticuloInsumo/ConfigArticuloInsumo"
import { ConfigUnidadMedida } from "../components/Screens/ConfigUnidadMedida/ConfigUnidadMedida"

export const routesConfig = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/config/category',
    component: ConfigCategory,
  },
  {
    path: '/config/articuloInsumo',
    component: ConfigArticuloInsumo,
  },
  {
    path: '/config/unidadMedida',
    component: ConfigUnidadMedida,
  },
];
