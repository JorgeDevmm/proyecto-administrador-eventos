import {
  eventoInput,
  contactoInput,
  telefonoInput,
  fechaInput,
  horaInput,
  agendaInput,
  formulario,
} from '../selectores.js';
import { datosEvento, nuevoEvento, crearDB } from '../funciones.js';

class App {
  constructor() {
    // similar al un DomContent
    window.onload = () => {
      // creamos nuestra base de datos en indexesDB
      crearDB();

      // llamamos al metodo initApp al ejectuar constructor
      this.initApp();
    };
  }

  initApp() {
    // al rellenar los datos en las referencia se ejecutara el llenado
    eventoInput.addEventListener('input', datosEvento);
    contactoInput.addEventListener('input', datosEvento);
    telefonoInput.addEventListener('input', datosEvento);
    fechaInput.addEventListener('input', datosEvento);
    horaInput.addEventListener('input', datosEvento);
    agendaInput.addEventListener('input', datosEvento);

    // formulario para nuevo eventos
    formulario.addEventListener('submit', nuevoEvento);
  }
}

export default App;
