// Referencias campos formularios
const eventoInput = document.querySelector('#evento');
const contactoInput = document.querySelector('#contacto');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const agendaInput = document.querySelector('#agenda');

// Referencias de Interfaz de usuario, formulario de eventos
const formulario = document.querySelector('#nuevo-evento');

// Contenedor para eventos
const contenedorEventos = document.querySelector('#eventos');

export {
  eventoInput,
  contactoInput,
  telefonoInput,
  fechaInput,
  horaInput,
  agendaInput,
  formulario,
  contenedorEventos,
};
