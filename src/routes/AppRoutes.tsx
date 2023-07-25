import { Routes, Route} from "react-router-dom"
import { Landing } from "../components/Screens/Landing/Landing"
import useUser from "../hooks/useUser"
import useUserRole from "../hooks/useUserRole"

import "../styles/Global.css"
import { routesConfig } from "./RoutesConfig"

export const AppRoutes = () => {
  const roleAuth0 = useUserRole();

  const user: any = useUser();

  const hasPermission = (allowedRoles: any) => {
    if (!roleAuth0 || !user) {
      // User is not logged in, deny access to all routes
      return false;
    }

    if (roleAuth0.rol !== 'ERROR' && roleAuth0.rol !== undefined && roleAuth0.rol !== '') {
      // Check if the user's role matches the role from the authentication library
      if (roleAuth0.rol === user.rol) {
        // console.log(allowedRoles.includes(user.rol))
        return allowedRoles.includes(user.rol);
      }
    }

    return false;
  };

  const allowedRoutes = routesConfig.filter((route) => hasPermission(route.allowedRoles));

  return (
    <Routes>
      {/* Rutas permitidas */}
      {allowedRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={<route.component />} />
      ))}

      {/* Ruta por defecto en caso de que el usuario no tenga acceso a ninguna ruta */}

      <Route path="*" element={<Landing/>}  />
    </Routes>
  );
};