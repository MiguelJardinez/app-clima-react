import React, { useState } from 'react'
import PropTypes from 'prop-types';
import '../assets/App.scss'

//componentes 
import Error from './Error'


const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {


    const [error, guardarError] = useState(false);

    // extraer ciudad y pais
    const { ciudad, pais } = busqueda;

    //Funcion que coloca los elementos en el State
    const handleChange = (e) => {
        //Actualizar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    //Funcion para el envio de formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        //Validad el formulario
        if (ciudad.trim() === '' || pais.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        //Pasarlo al componente padre
        guardarConsultar(true)
    }

    return (
        <form
            onSubmit={handleSubmit}
            >
            { error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >

                    <option value="">-- Selecciones un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>

                </select>
                <label htmlFor="pais">País: </label>

                <div className="input-field col s12">
                    <input
                        type="submit"
                        value="Buscar Clima"
                        className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    />
                </div>
            </div>
        </form>
    );
}
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;