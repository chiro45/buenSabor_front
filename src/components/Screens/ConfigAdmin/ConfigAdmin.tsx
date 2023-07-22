
import { useAuth0 } from '@auth0/auth0-react'
import { alertConfirm } from '../../../functions/alerts'
import { ButtonStandard, Header, Subheader } from '../../ui'
import { Footer } from '../../ui/Footer/Footer'
import TableEmployed from '../../ui/TableEmployed/TableEmployed'
const urlAdminLogoutRegister = `${import.meta.env.VITE_URL_LOGOUT_ADMIN_REGISTER_EMPLOYED}`
const ConfigAdmin = () => {
    const { logout } = useAuth0()

    const handleRegisterEmployed = () => {
        alertConfirm('Su sesion sera cerrada, desea continuar?',
            'Registrar empleado',
            'Si',
            () => logout({ logoutParams: { returnTo: urlAdminLogoutRegister } }),
            'No')
    }
    return (
        <div>
            <Header />

            <Subheader />
            <div className="Body-Modals">
                <div className="containerButtonAndSearchArticulo" >
                    <ButtonStandard
                        text={"Registrar nuevo empleado"}
                        handleClick={() => { handleRegisterEmployed()}}
                        width={"20vw"}
                        fontSize={"1.2vw"}
                        height={"4.3vh"}
                        backgroundColor={"#0080FF"}
                        colorText={"#fff"}
                    />
                </div>
                <TableEmployed />
            </div>
            <Footer />
        </div>
    )
}

export default ConfigAdmin
