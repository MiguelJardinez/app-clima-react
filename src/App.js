import React, { Fragment, useState, useEffect } from 'react';
import './assets/App.scss';

//Componentes
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'





function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: '',
  });


  const { ciudad, pais } = busqueda;

  const [consultar, guardarConsultar] = useState(false);

  const [resultado, guardarResultado] = useState({})

  const [error, guardarError] = useState(false);

  useEffect(() => {

    const ConsultarApi = async () => {

      if (consultar) {
        const apiId = '1d046ecb5b39074095dc4c881cd7c4ed';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);
      }

      //Detecta si hubo resultados correctos en la consulta 
      if (resultado.cod === '404') {
        guardarError(true);
      } else {
        guardarError(false);
      }

    }
    ConsultarApi()

    //eslint-disable-next-line
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima resultado={resultado}/>
  }


  return (
    <Fragment>
      <Header
        titulo='Aplicación Clima'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
