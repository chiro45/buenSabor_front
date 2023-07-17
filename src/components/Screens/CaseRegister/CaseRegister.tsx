import { Header, Subheader } from '../../ui'
import { CaseTable } from '../../ui/CaseRegister/CaseRegisterTable/CaseRegisterTable'
import './CaseRegister.css'
const caseRegisterRoutes = [
  { route: "/caseRegister/process", text: "Espera / Preparacion", icon: "" },
  { route: "/caseRegister/done", text: "Entregado / Cancelado", icon: "" }
];

export const CaseRegister = () => {
  return (
    <div className='caseRegiter__mainContainer' >
        <Header/>
        <Subheader routes={caseRegisterRoutes} />
        <CaseTable/>

    </div>
  )
}
