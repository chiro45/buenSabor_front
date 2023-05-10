
import { Routes, Route } from "react-router-dom"
import { Landing } from "../components/Screens/Landing/Landing"
import { ConfigCategory } from "../components/Screens/ConfigCategory/ConfigCategory"
import "../styles/Global.css"
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/config/category" element={<ConfigCategory/>}/>
    </Routes>
  )
}
