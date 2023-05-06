
import './App.css'
import { useInput } from './hooks/useInput'
import { RegisterFirst } from './components/Screens/RegisterFirst/RegisterFirst'
import { InputGeneric } from './components/ui/InputGeneric/InputGeneric'
import { NavBarMobile } from './components/ui/NavBarMobile/NavBarMobile'

function App() {

  const [inputState, onInputChange, username]: any = useInput({
    username: '',
})
  return (
    <>
      
      <RegisterFirst/>
      <NavBarMobile/>
    </>
  )
}

export default App
