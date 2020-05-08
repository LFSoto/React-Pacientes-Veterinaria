import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  //Citas en local storage
  //Se debe parsear de array a string
  let citasInciales = JSON.parse(localStorage.getItem("citas"));
  //Si no hay citas, se inicializa como arreglo vacio
  if (!citasInciales) {
    citasInciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasInciales);

  //Use Effect para realizar ciertas operaciones cuando el state cambia
  //SIEMPRE es un arrow function
  //Se ejecuta cuando el componente esta listo(carga) o cuando hay cambios en el componente(actualizacion)
  //Para que se ejecute una sola vez, hay que pasar un arreglo vacio(se llama dependencias).
  //Se ejecuta cada vez que el state cambie
  useEffect(() => {
    let citasInciales = JSON.parse(localStorage.getItem("citas"));
    if (citasInciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  //Funcion que muestre las citas actuales y agregue la nueva

  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //Funcion que eliminar una cita por su ID

  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Admninistrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>

          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              //Cuando se itera con map, se debe enviar una key
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default App;
