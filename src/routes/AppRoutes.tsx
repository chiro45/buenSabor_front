import { Routes, Route } from "react-router-dom"

import "../styles/Global.css"
import { routesConfig } from "./RoutesConfig"

export const AppRoutes = () => {
  return (
    <Routes>
      {routesConfig.map((route, i) => (
        <Route key={i} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  )
}
