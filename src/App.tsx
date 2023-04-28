import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { InputGeneric } from './components/InputGeneric'
import { useInput } from './hooks/useInput'

function App() {

  const { inputState, onInputChange, username}: any = useInput({
    username: '',
})
  return (
    <>
      <InputGeneric 
      placeholder='EL PLAHOLDER EA' 
      value={username} 
      name='username' 
      onChange={onInputChange}
      label="ESTO ES EL LABEL"
      type='password'  
      height={200}
      width={500}
      />
    </>
  )
}

export default App
