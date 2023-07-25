import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Landing } from "../components/Screens/Landing/Landing"
import useUser from "../hooks/useUser"
import useUserRole from "../hooks/useUserRole"

import "../styles/Global.css"
import { routesConfig } from "./RoutesConfig"

export const AppRoutes = () => {
  const { rol} = useUserRole();
  const [allowedRoutes, setAllowedRoutes] = useState<any>([])
  const user: any = useUser();

  const hasPermission = (allowedRoles: any) => {
    if (!rol || !user) {
      return false;
    }
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
      fetchRoutes();
    }
  }, [user])

  return (
    <Routes>
      {/* Rutas permitidas */}
      {allowedRoutes.map((route: any, i: any) => (
        <Route key={i} path={route.path} element={<route.component />} />
      ))}

      {/* Ruta por defecto en caso de que el usuario no tenga acceso a ninguna ruta */}

      <Route path="*" element={<Landing />} />
    </Routes>
  );
};