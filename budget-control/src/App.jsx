import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import Filtros from './components/Filtros';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import { generarId } from './helpers/index.js';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

import { Analytics } from "@vercel/analytics/react"

function App() {
  
  const [gastos, setGastos] = useState(
    localStorage.getItem('Gastos') ? JSON.parse(localStorage.getItem('Gastos')) : [])
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('Presupuesto')) ?? 0 );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0 ){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      },500);

    }
  },[gastoEditar])

  useEffect(() => {
    localStorage.setItem('Presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('Presupuesto')) ?? 0

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  },[])

  useEffect(() => {
    localStorage.setItem('Gastos', JSON.stringify(gastos) ?? 0)
  },[gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    },500);
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      //actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
    }
    else{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
       />

       {isValidPresupuesto && (
         <>
         <main>
           <Filtros
           filtro={filtro}
           setFiltro={setFiltro}
            />
           <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro} gastosFiltrados={gastosFiltrados} />
         </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt='Icono Nuevo Gasto' onClick={handleNuevoGasto} />
          </div>
        </>
       )}

       { modal && 
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
           /> }
           
           <Analytics/>
    </div>
  )
}

export default App
