import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Landing } from "../components/Screens/Landing/Landing"
import LoginEmployed from "../components/Screens/LoginEmployed/LoginEmployed"
import DefaultRoute from "../components/ui/DefaultRoute/DefaultRoute"
import { LoginRegisterAdminEmployed } from "../components/ui/LoginRegisterAdminEmployed/LoginRegisterAdminEmployed"
import useUser from "../hooks/useUser"
import useUserRole from "../hooks/useUserRole"

import "../styles/Global.css"
import { routesConfig } from "./RoutesConfig"
import { AddressPage } from "../components/Screens/AddressPage/AddressPage"

export const AppRoutes = () => {
  const {isLoading} = useAuth0()
  const { rol, loading } = useUserRole();
  const [allowedRoutes, setAllowedRoutes] = useState<any>([])
  const user: any = useUser();

  const hasPermission = (allowedRoles: any) => {
    if (!rol || !user) {
      // console.log(user)
      return false;
    }
    // console.log(user.rol, rol)
    if (rol === user.rol) {
      return allowedRoles.includes(user.rol);
    }
    return false;
  };
  const fetchRoutes = async () => {
    setAllowedRoutes(routesConfig.filter((route) => hasPermission(route.allowedRoles)))
  }
  useEffect(() => {
    if (rol !== 'ERROR' && rol !== undefined && rol !== '') {
      // console.log(rol)
      fetchRoutes();
      // console.log(allowedRoutes)
    }
  }, [user])

  return (
    <Routes>
      {/* Rutas permitidas */}
      {allowedRoutes.map((route: any, i: any) => (
        <Route key={i} path={route.path} element={<route.component />} />
      ))}
      {/* {(rol === 'COCINERO' || rol === 'CAJERO' || rol === 'DELIVERY') && <Route path="/config/loginEmployed" element={<LoginEmployed/>}/>} */}
      <Route path="/config/loginEmployed" element={<LoginEmployed/>}/>
      <Route path="/address" element={<AddressPage/>}/>
      <Route path="/config/employedRegister" element={<LoginRegisterAdminEmployed/>}/>

      <Route path="*" element={
        <DefaultRoute user={rol} children={<Landing />} />}
      />
      
    </Routes>
  );
};