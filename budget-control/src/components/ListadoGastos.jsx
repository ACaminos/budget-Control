import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
        {
          filtro ? (
            <>
              <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>
              { //Las llaves en este caso sirven para hacerle saber que es codigo js y no un componente
                gastosFiltrados.map( gasto => (
                  <Gasto 
                      key={gasto.id}
                      gasto={gasto}
                      setGastoEditar={setGastoEditar}
                      eliminarGasto={eliminarGasto}
                  />
                ))
              }
            </>
          ) : (
            <>
            <h2>{gastos ? 'Gastos' : 'No hay gastos aun'}</h2>
            { //Las llaves en este caso sirven para hacerle saber que es codigo js y no un componente
              gastos.map( gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
              ))
            }
            </>
          )
        }
    </div>
  )
}

export default ListadoGastos