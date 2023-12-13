// Referencias campos formularios
const eventoInput = document.querySelector('#evento');
const contactoInput = document.querySelector('#contacto');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const agendaInput = document.querySelector('#agenda');

// Interface de usuario
const formulario = document.querySelector('#nuevo-evento');
const contenedorEventos = document.querySelector('#eventos');

// Clases
class Eventos {
  // contructor donde inicializo un arreglo vacio de eventos
  constructor() {
    this.eventos = [];
  }

  // Función para agregar un nuevo evento al arreglo de eventos
  agregarEvento(objEvento) {
    // asignamos al arreglo un objeto = evento
    this.eventos = [...this.eventos, objEvento];

    console.log(this.eventos);
  }
}

class InterfazUsuario {
  imprimirAlerta(mensaje, tipo) {
    // Crear Div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

    // Agregar clase en base al tipo de error
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    // Agregar al DOM, con insertBefore
    document
      .querySelector('#contenido')
      .insertBefore(divMensaje, document.querySelector('.agregar-evento'));

    // Quitar la alerta después de 5 segundos
    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }
}

// Instancias de clases
const interfazUsuario = new InterfazUsuario();
const adinistrarEventos = new Eventos();

// Eventos
eventListeners();
function eventListeners() {
  // al rellenar lo datos en las referencia se ejecutara el llenado
  eventoInput.addEventListener('input', datosEvento);
  contactoInput.addEventListener('input', datosEvento);
  telefonoInput.addEventListener('input', datosEvento);
  fechaInput.addEventListener('input', datosEvento);
  horaInput.addEventListener('input', datosEvento);
  agendaInput.addEventListener('input', datosEvento);

  formulario.addEventListener('submit', nuevoEvento);
}

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
function datosEvento(e) {
  // llenar los datos al objeto de evento, con los valores del input
  eventoObj[e.target.name] = e.target.value;
}

// Valida y agrega un nuevo evento a la clase de eventos
function nuevoEvento(e) {
  e.preventDefault();

  // Aplicar destructuración, extraemos la información del obejto de cita
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

  // Generar un id unico, en una nueva propiedad al objeto
  eventoObj.id = Date.now();

  // Creando un nuevo evento, con una copia del objeto agregado no la referencia principal
  adinistrarEventos.agregarEvento({ ...eventoObj });

  // Reiniciar el objeto para la validación
  reinicarObjeto();

  // Reiniciar el formulario
  formulario.reset();
}

function reinicarObjeto() {
  // borramos los valores del objeto prinicipal
  eventoObj.evento = '';
  eventoObj.contacto = '';
  eventoObj.telefono = '';
  eventoObj.fecha = '';
  eventoObj.hora = '';
  eventoObj.agenda = '';
}
