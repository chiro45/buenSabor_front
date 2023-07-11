import { Landing } from "../components/Screens/Landing/Landing"
import { ConfigCategory } from "../components/Screens/ConfigCategory/ConfigCategory"
import { ConfigArticuloInsumo } from "../components/Screens/ConfigArticuloInsumo/ConfigArticuloInsumo"
import { ConfigUnidadMedida } from "../components/Screens/ConfigUnidadMedida/ConfigUnidadMedida"
import { ConfigArtiruloManufacturado } from "../components/Screens/ConfigArtiruloManufacturado/ConfigArtiruloManufacturado";
import { PruebaAuth0 } from "../components/Screens/PruebaAuth0/PruebaAuth0";
import { StorePage } from "../components/Screens/Store/StorePage";
import { Cart } from "../components/Screens/Cart";
import { ViewProduct } from "../components/Screens/ViewProduct/ViewProduct";
import { Link } from "react-router-dom";
import PedidosPrueba from "../components/Screens/Pedidos/PedidosPrueba";
import PedidosPruebaPrivate from "../components/Screens/Pedidos/PedidosPruebaPrivate";

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
  {
    path: '/config/articuloManufacturado',
    component: ConfigArtiruloManufacturado,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/login',
    component: PruebaAuth0,
  },
  {
    path: '/store',
    component: StorePage,
  },
  {
    path: '/order',
    component: () => <Link to={'/'}>¡Próximamente!</Link>,
  },  
  {
    path: '/ViewProduct',
    component: ViewProduct,
  },
  {
    path: '/viewPedido',
    component: PedidosPrueba,
  },
  {
    path: '/viewPedidoPrivate',
    component: PedidosPruebaPrivate,
  }
];
