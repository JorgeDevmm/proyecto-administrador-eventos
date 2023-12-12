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
  // llenar los datos al objeto de evento
  eventoObj[e.target.name] = e.target.value;

  console.log(eventoObj);
}
