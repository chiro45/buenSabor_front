import React from 'react'
import { Header, Subheader } from '../../ui'
import { Footer } from '../../ui/Footer/Footer'
import CardKitchen from '../../ui/Kitchen/CardKitchen/CardKitchen'
import PedidosKitchen from '../../ui/Kitchen/PedidosKitchen/PedidosKitchen'
import './Kitchen.css'
const kitchenRoutes = [
  { route: "/kitchen/process", text: "Espera / Preparacion", icon: "" },
  { route: "/kitchen/done", text: "Terminado / Rechazado", icon: "" }
];

const Kitchen = () => {
  return (
    <div className='kitchen_container-principal'>
      <Header />
      <Subheader routes={kitchenRoutes} />
      <PedidosKitchen/>
    </div>
  )
}

export default Kitchen
