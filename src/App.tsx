
import './App.css'
import { useInput } from './hooks/useInput'
import { RegisterFirst } from './components/Screens/RegisterFirst/RegisterFirst'

function App() {

  const { inputState, onInputChange, username}: any = useInput({
    username: '',
})
  return (
    <>
      {/* <InputGeneric 
      placeholder='EL PLAHOLDER EA' 
      value={username} 
      name='username' 
      onChange={onInputChange}
      label="ESTO ES EL LABEL"
      type='password'
      className="inputGeneric"  
      height={40}
      width={500}
      /> */}
      <RegisterFirst/>
    </>
  )
}

export default App
