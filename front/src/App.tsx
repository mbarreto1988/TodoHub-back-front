
import './App.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [saludo, setSaludo] = useState('')

  useEffect(()=>{
    const apiss = async()=>{
      try {
        const response = await axios.get('http://localhost:3001')
        setSaludo(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    apiss()
  }, [])


  return (
    <>
      <h1>Hola mundo = {saludo}</h1>
    </>
  )
} 

export default App
