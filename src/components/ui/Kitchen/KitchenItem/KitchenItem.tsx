import React from 'react'
import '../CardKitchen/CardKitchen.css'

const KitchenItem = ({ cantidad, denominacion }: { cantidad: number, denominacion: string }) => {
  return (
    <div className='cardKitchen_body-item'>
      <div className='cardKitchen_item-number'>
        <div className="item-number"> {cantidad}</div>
      </div>
      <div className='cardKitchen_item-name'>{denominacion}</div>
    </div>
  )
}

export default KitchenItem
