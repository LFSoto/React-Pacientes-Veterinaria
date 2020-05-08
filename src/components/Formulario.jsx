import React, { Fragment, useState } from "react";
//Libreria para los id's npm i uuid
import uuid from "react-uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  //Crear state de Citas
  //Para iniciar el state se usa {} para iniciar la cita como un objeto con los valores de abajo asignados a un string vacio
  //Crear el state inicial que es un objeto
  const stateInicial = {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  };

  //Se llama el state inicial en el useState
  const [cita, actualizarCita] = useState(stateInicial);

  //Otro State par los errores
  //Inicia en false porque no hay error cuando carga el form
  const [error, actualizarError] = useState(false);

  //Funcion que se ejecuta cada que el usuario escribe en el input
  //Pasar un evento por parametro
  const handleChange = (e) => {
    //e.target.name = muestra el campo donde estoy escribiendo
    //e.target.value = muestra el valor que estoy escribiendo

    //Para diferentes tipos de input type
    //const value = target.name === 'isGoing' ? target.checked : target.value;

    //Usa {} porque el State inicial es un objeto
    actualizarCita({
      //Necesito mantener la informacion del State por cada actualizacion, por esto se usa spread operator
      ...cita,
      //Con array destructuring
      //Escribir correctamente la informacion del input dentro de la propiedad
      [e.target.name]: e.target.value,
    });
  };

  //Extraer los valores y usar value en las input con los nombres
  //Destructuring para la cita
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Cuando el usuario presiona AGREGAR CITA
  const submitCita = (e) => {
    //Para evitar que envie por metodo GET
    e.preventDefault();

    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      //En la validacion cuando haya un problema usar un return para que no siga ejecutando el codigo siguiente
      actualizarError(true);
      return;
    }

    //Eliminar el mensaje previo
    actualizarError(false);

    //Asignar un id
    cita.id = uuid();
    //console.log(cita);

    //Crear la cita
    crearCita(cita);

    //Reiniciar el form
    actualizarCita(stateInicial);
  };

  return (
    <Fragment>
      <h2>Crear cita</h2>
      {/*Para mostrar el error*/}
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          //Para comunicar el input con la funcion
          onChange={handleChange}
          //Se agrega value con los valores de destructuring. Asi se manejan los componentes CONTROLADOS en un form
          value={mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre dueño mascota"
          onChange={handleChange}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleChange}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleChange}
          value={hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={handleChange}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
