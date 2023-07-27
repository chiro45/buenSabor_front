import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Landing } from "../components/Screens/Landing/Landing"
import LoginEmployed from "../components/Screens/LoginEmployed/LoginEmployed"
import DefaultRoute from "../components/ui/DefaultRoute/DefaultRoute"
import { LoginRegisterAdminEmployed } from "../components/ui/LoginRegisterAdminEmployed/LoginRegisterAdminEmployed"
import useUserRole from "../hooks/useUserRole"

import "../styles/Global.css"
import { routesConfig } from "./RoutesConfig"
import { AddressPage } from "../components/Screens/AddressPage/AddressPage"
import { fetchGet } from "../helpers"
import { IUsuario } from "../interfaces"
import { Deliveryview } from "../components/Screens/DeliveryView/Deliveryview"

export const AppRoutes = () => {
  const { getAccessTokenSilently , user} = useAuth0();
  const { rol } = useUserRole();
  const [allowedRoutes, setAllowedRoutes] = useState<any>([])
  // const user: any = useUser();
  const idAuth0 = user?.sub?.split('|').pop();
  const urlUsuario = `${import.meta.env.VITE_URL_USUARIO}`
  const [usuarioListo, setusuarioListo] = useState<IUsuario>()

  const getusers = async () => {
    const token = await getAccessTokenSilently();
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const userfetch = await fetchGet(`${urlUsuario}/getByIdAuth0/${idAuth0}`, headers);
    // console.log(userfetch)
   setusuarioListo(userfetch)
  }

  
  const hasPermission = (allowedRoles: any) => {

    if (!rol || !usuarioListo) {
      // console.log(usuarioListo)
      return false;
    }
    // console.log(usuarioListo?.rol, rol)
    if (rol === usuarioListo?.rol) {
      console.log(usuarioListo.rol, rol)
      return allowedRoles.includes(usuarioListo?.rol);
    }
    return false;
  };
  const fetchRoutes = async () => {
   getusers()
  }
  useEffect(() => {
    if (rol !== 'ERROR' && rol !== undefined && rol !== '') {
      // console.log(rol)
      fetchRoutes();
      // console.log(allowedRoutes)
    }
  }, [rol])
  useEffect(() => {
    // console.log(usuarioListo)
    
    setAllowedRoutes(routesConfig.filter((route) => hasPermission(route.allowedRoles)))

  }, [usuarioListo])


  return (
    <Routes>
      {/* Rutas permitidas */}
      {allowedRoutes.map((route: any, i: any) => (
        <Route key={i} path={route.path} element={<route.component />} />
      ))}
      {/* {(rol === 'COCINERO' || rol === 'CAJERO' || rol === 'DELIVERY') && <Route path="/config/loginEmployed" element={<LoginEmployed/>}/>} */}
      <Route path="/config/loginEmployed" element={<LoginEmployed />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="/deliveryView" element={<Deliveryview />} />
      <Route path="/config/employedRegister" element={<LoginRegisterAdminEmployed />} />

      <Route path="*" element={
        <DefaultRoute user={rol} children={<Landing />} />}
      />

    </Routes>
  );
};