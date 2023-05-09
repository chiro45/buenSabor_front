
import { useInput } from './hooks/useInput'
import { NavBarMobile } from './components/ui/NavBarMobile/NavBarMobile'
import { RegisterFirst } from './components/Screens/Register/RegisterFirst/RegisterFirst'
import { Landing } from './components/Screens/Landing/Landing'

import './styles/Global.css'

function App() {
  
  return (
    <div >
      <Landing/>
      <NavBarMobile/>
    </div>
  )
}

export default App
