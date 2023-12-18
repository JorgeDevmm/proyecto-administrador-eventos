import InterfazUsuario from './classes/InterfazUsuario.js';
import Eventos from './classes/Eventos.js';
import {
  eventoInput,
  contactoInput,
  telefonoInput,
  fechaInput,
  horaInput,
  agendaInput,
  formulario
} from './selectores.js';

// Instancias de clases
const interfazUsuario = new InterfazUsuario();
const administrarEventos = new Eventos();

// variable para validación en la edición del formulario
let editando;

// Objeto de la información del evento
const eventoObj = {
  evento: '',
  contacto: '',
  telefono: '',
  fecha: '',
  hora: '',
  agenda: '',
};

// Agregar datos  al objeto de evento
export function datosEvento(e) {
  // llenar los datos al objeto de evento, con los valores del input
  const cadena = e.target.value;

  if (e.target.name === 'evento' || e.target.name === 'contacto') {
    // llenar los datos al objeto de evento, con los valores del input
    eventoObj[e.target.name] = capitalizarPrimeraLetra(cadena);

    // validación de longitud de telefono
  } else if (e.target.name === 'telefono') {
    // validación de longitud de telefono
    if (e.target.value.length > 9) {
      interfazUsuario.imprimirAlerta(
        'Numero telefono tiene que ser menor igual a 9 digitos',
        'error'
      );
      // limpia campo para que solicite ingresar correctamente
      e.target.value = '';
      return;
    } else {
      // guarda los valores en minuscula
      eventoObj[e.target.name] = cadena.toLowerCase();
    }
  } else {
    // guarda los valores en minuscula
    eventoObj[e.target.name] = cadena.toLowerCase();
  }
}

// función para capitalizar primer letra de una cadena
function capitalizarPrimeraLetra(cadena) {
  // devuelve el pimer caracter en mayuscula y lo demas partidiendo del segundo caracter
  return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
}

// Valida y agrega un nuevo evento a la clase de eventos
export function nuevoEvento(e) {
  e.preventDefault();

  // Aplicar destructuración, extraemos la información del objeto de evento
  const { evento, contacto, telefono, fecha, hora, agenda } = eventoObj;

  // Validar
  if (
    evento === '' ||
    contacto === '' ||
    telefono === '' ||
    fecha === '' ||
    hora === '' ||
    agenda === ''
  ) {
    interfazUsuario.imprimirAlerta(
      `Todos los campos son obligatorios`,
      'error'
    );
    return;
  }

  // utilizamos variable global para comprobar
  if (editando) {
    // Mensaje de agregado correctamente
    interfazUsuario.imprimirAlerta(`Editando correctamente`);

    // Pasar el objeto del evento a edición con un copia del objeto global
    administrarEventos.editarEvento({ ...eventoObj });

    //regresar el texto del boton a su estado original
    formulario.querySelector('button[type="submit"]').textContent =
      'Crear Evento';

    // quitar modo edición
    editando = false;
  } else {
    // Generar un id unico, en una nueva propiedad al objeto
    eventoObj.id = Date.now();

    // Creando un nuevo evento, con una copia del objeto agregado no la referencia principal
    administrarEventos.agregarEvento({ ...eventoObj });

    // Mensaje de agregado correctamente
    interfazUsuario.imprimirAlerta(`Se agregó correctamente`);
  }

  // Reiniciar el objeto para la validación
  reiniciarObjeto();

  // Reiniciar el formulario
  formulario.reset();

  // Mostrar el HTML de los eventos, de acuerdo al arreglo
  interfazUsuario.imprimirEvento(administrarEventos);
}

export function reiniciarObjeto() {
  // borramos los valores del objeto prinicipal
  eventoObj.evento = '';
  eventoObj.contacto = '';
  eventoObj.telefono = '';
  eventoObj.fecha = '';
  eventoObj.hora = '';
  eventoObj.agenda = '';
}

export function eliminarEventosHTML(id) {
  // ELiminar el evento del arreglo de eventos del objeto
  administrarEventos.eliminarEvento(id);

  // Muestra un mensaje
  interfazUsuario.imprimirAlerta(`El Evento se Elimino, Co1rrectamente`);

  // imprimimos los eventos nuevamente, sin el id eliminado de acuero al array del objeto
  interfazUsuario.imprimirEvento(administrarEventos);
}

// Carga los datos y el modo edición
export function editarEventoHTML(eventoActual) {
  const { evento, contacto, telefono, fecha, hora, agenda, id } = eventoActual;

  // Llenar los imputs
  eventoInput.value = evento;
  contactoInput.value = contacto;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  agendaInput.value = agenda;

  // Cargar los valores al objeto global, con los valores del evento actual
  eventoObj.evento = evento;
  eventoObj.contacto = contacto;
  eventoObj.telefono = telefono;
  eventoObj.fecha = fecha;
  eventoObj.hora = hora;
  eventoObj.agenda = agenda;
  eventoObj.id = id;

  // cambiar el texto del botón al editar
  formulario.querySelector('button[type="submit"]').textContent =
    'Guardar Cambios';

  // variable utilizada para validar edición
  editando = true;
}
