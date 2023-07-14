import { Landing } from "../components/Screens/Landing/Landing"
import { ConfigCategory } from "../components/Screens/ConfigCategory/ConfigCategory"
import { ConfigArticuloInsumo } from "../components/Screens/ConfigArticuloInsumo/ConfigArticuloInsumo"
import { ConfigUnidadMedida } from "../components/Screens/ConfigUnidadMedida/ConfigUnidadMedida"
import { ConfigArtiruloManufacturado } from "../components/Screens/ConfigArtiruloManufacturado/ConfigArtiruloManufacturado";
import { ProfilePage } from "../components/Screens/ProfilePage/ProfilePage";
import { StorePage } from "../components/Screens/Store/StorePage";
import { Cart } from "../components/Screens/Cart";
import { ViewProduct } from "../components/Screens/ViewProduct/ViewProduct";
import { Ordenes } from "../components/Screens/Ordenes/Ordenes";
import PedidosPrueba from "../components/Screens/Pedidos/PedidosPrueba";
import PedidosPruebaPrivate from "../components/Screens/Pedidos/PedidosPruebaPrivate";
import { AddressPage } from "../components/Screens/AddressPage/AddressPage";
import Kitchen from "../components/Screens/Kitchen/Kitchen";

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
    path: '/address',
    component: AddressPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
  {
    path: '/store',
    component: StorePage,
  },
  {
    path: '/order',
    component: Ordenes,
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
  },
  {
    path: '/kitchen/process',
    component: Kitchen,
  },
  {
    path: '/kitchen/done',
    component: Kitchen,
  }
];
