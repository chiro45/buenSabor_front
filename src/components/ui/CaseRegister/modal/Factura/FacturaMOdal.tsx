import { FC } from "react"
import { ViewFacture } from "../../../ViewFacture/ViewFacture"
import { LayoutModalCaseRegister } from "../Layout/LayoutModalCaseRegister"
import { IPedido } from "../../../../../interfaces"

export const FacturaModal: FC<{ facture: IPedido, setFacture: Function }> = ({ facture, setFacture }) => {
  return (
      <LayoutModalCaseRegister height={'90vh'} width={'50vw'} >
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ border: '1px solid #ccc', minHeight: '85%', borderRadius: '.4rem' }}>
                  <ViewFacture pedido={facture} indice={facture.id}/>
              </div>
              <div style={{ marginTop: '2vh' }}>
                  <button className='buttonFactureCaseRegister' onClick={() => { setFacture(null) }}>cerrar</button>
              </div>
          </div>


      </LayoutModalCaseRegister>
  )
}
