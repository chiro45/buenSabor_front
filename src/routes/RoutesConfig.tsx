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
import { CaseRegister } from "../components/Screens/CaseRegister/CaseRegister";
import { Deliveryview } from "../components/Screens/DeliveryView/Deliveryview";
import { LoginRegisterAdminEmployed } from "../components/ui/LoginRegisterAdminEmployed/LoginRegisterAdminEmployed";
import LoginEmployed from "../components/Screens/LoginEmployed/LoginEmployed";
import ConfigAdmin from "../components/Screens/ConfigAdmin/ConfigAdmin";
import { Analytics } from "../components/Screens/Analytics/Analytics";

// export const routesConfig = [
//   {
//     path: '/',
//     component: Landing,
//   },
//   {
//     path: '/config/category',
//     component: ConfigCategory,
//   },
//   {
//     path: '/config/articuloInsumo',
//     component: ConfigArticuloInsumo,
//   },
//   {
//     path: '/config/unidadMedida',
//     component: ConfigUnidadMedida,
//   },
//   {
//     path: '/config/articuloManufacturado',
//     component: ConfigArtiruloManufacturado,
//   },
//   {
//     path: '/cart*',
//     component: Cart,
//   },
//   {
//     path: '/address',
//     component: AddressPage,
//   },
//   {
//     path: '/profile',
//     component: ProfilePage,
//   },
//   {
//     path: '/store',
//     component: StorePage,
//   },
//   {
//     path: '/order',
//     component: Ordenes,
//   },  
//   {
//     path: '/ViewProduct',
//     component: ViewProduct,
//   },
//   {
//     path: '/viewPedido',
//     component: PedidosPrueba,
//   },
//   {
//     path: '/viewPedidoPrivate',
//     component: PedidosPruebaPrivate,
//   },
//   {
//     path: '/kitchen/process',
//     component: Kitchen,
//   },
//   {
//     path: '/kitchen/done',
//     component: Kitchen,
//   },
//   {
//     path: '/caseRegister/process',
//     component: CaseRegister,
//   },
//   {
//     path: '/caseRegister/done',
//     component: CaseRegister,
//   },
//   {
//     path: '/deliveryView',
//     component: Deliveryview,
//   },
//   {
//     path: '/config/employedRegister',
//     component: LoginRegisterAdminEmployed,
//   },
//   {
//     path: '/config/loginEmployed',
//     component: LoginEmployed,
//   },
//   {
//     path: '/config/admin',
//     component: ConfigAdmin,
//   },
//   {
//     path: '/analytics',
//     component: Analytics,
//   }
// ];
export const routesConfig = [
  {
    path: '/',
    component: Landing,
    allowedRoles: [],
  },
  {
    path: '/config/category',
    component: ConfigCategory,
    allowedRoles: ['ADMIN'],
  },
  {
    path: '/config/articuloInsumo',
    component: ConfigArticuloInsumo,
    allowedRoles: ['ADMIN'],
  },
  {
    path: '/config/unidadMedida',
    component: ConfigUnidadMedida,
    allowedRoles: ['ADMIN'],
  },
  {
    path: '/config/articuloManufacturado',
    component: ConfigArtiruloManufacturado,
    allowedRoles: ['ADMIN'],
  },
  {
    path: '/cart*',
    component: Cart,
    allowedRoles: ['CAJERO', 'CLIENTE'],
  },
  {
    path: '/address',
    component: AddressPage,
    allowedRoles: ['CLIENTE'],
  },
  {
    path: '/profile',
    component: ProfilePage,
    allowedRoles: ['CLIENTE'],
  },
  {
    path: '/store',
    component: StorePage,
    allowedRoles: ['CAJERO', 'CLIENTE'],
  },
  {
    path: '/order',
    component: Ordenes,
    allowedRoles: ['CLIENTE'],
  },
  {
    path: '/ViewProduct',
    component: ViewProduct,
    allowedRoles: ['CAJERO', 'CLIENTE'],
  },
  // {
  //   path: '/viewPedido',
  //   component: PedidosPrueba,
  //   allowedRoles: ['ADMIN', 'COCINERO', 'DELIVERY'],
  // },
  // {
  //   path: '/viewPedidoPrivate',
  //   component: PedidosPruebaPrivate,
  //   allowedRoles: ['ADMIN', 'COCINERO', 'DELIVERY'],
  // },
  {
    path: '/kitchen/process',
    component: Kitchen,
    allowedRoles: ['COCINERO'],
  },
  {
    path: '/kitchen/done',
    component: Kitchen,
    allowedRoles: ['COCINERO'],
  },
  {
    path: '/caseRegister/process',
    component: CaseRegister,
    allowedRoles: ['CAJERO'],
  },
  {
    path: '/caseRegister/done',
    component: CaseRegister,
    allowedRoles: ['CAJERO'],
  },
  {
    path: '/deliveryView',
    component: Deliveryview,
    allowedRoles: ['DELIVERY'],
  },
  {
    path: '/config/employedRegister',
    component: LoginRegisterAdminEmployed,
    allowedRoles: ['ADMIN'],
  },
  {
    path: '/config/loginEmployed',
    component: LoginEmployed,
    allowedRoles: ['CAJERO','DELIVERY','COCINERO'],
  },
  {
    path: '/config/admin',
    component: ConfigAdmin,
    allowedRoles: ['ADMIN'],
  },
  {
    path: '/analytics',
    component: Analytics,
    allowedRoles: ['ADMIN'],
  },
];
