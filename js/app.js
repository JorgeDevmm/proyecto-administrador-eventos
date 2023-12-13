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

  // guardo en un nuevo array sin el id a eliminar
  eliminarEvento(id) {
    this.eventos = this.eventos.filter((evento) => evento.id != id);
  }
}

class InterfazUsuario {
  // Método que muestra un alerta segun su tipo
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

  // Imprime el evento en el html, despues de ingresarlo, destructurandolo en el arreglo
  imprimirEvento({ eventos }) {
    // limpiamos los elementos del contenedorEventos para evitar duplicidad
    this.limpiarHtml(contenedorEventos);
    // iteramos el arreglo de eventos
    eventos.forEach((eventoObj) => {
      // Aplicar destructuración, extraemos la información del objeto de evento
      const { evento, contacto, telefono, fecha, hora, agenda, id } = eventoObj;

      const divEvento = document.createElement('div');
      divEvento.classList.add('evento', 'p-3');
      divEvento.dataset.id = id;

      // Scripting de los elementos del evento
      const eventoParrafo = document.createElement('h2');
      eventoParrafo.classList.add('card-title', 'font-weight-bolder');
      eventoParrafo.textContent = evento;

      const contactoParrafo = document.createElement('p');
      contactoParrafo.innerHTML = `<span class="font-weight-bolder">Contacto: </span> ${contacto}`;

      const telefonoParrafo = document.createElement('p');
      telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telf: </span> ${telefono}`;

      const fechaParrafo = document.createElement('p');
      fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

      const horaParrafo = document.createElement('p');
      horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

      const agendaParrafo = document.createElement('p');
      agendaParrafo.innerHTML = `<span class="font-weight-bolder">Agenda: </span> ${agenda}`;

      // boton para eliminar este evetno
      const btnEliminiar = document.createElement('button');
      btnEliminiar.classList.add('btn', 'btn-danger', 'p-2');
      btnEliminiar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`;

      btnEliminiar.addEventListener('click', () => {
        eliminarEventosHTML(id);
      });

      // Agregar los parrafos al divEvento
      divEvento.appendChild(eventoParrafo);
      divEvento.appendChild(contactoParrafo);
      divEvento.appendChild(telefonoParrafo);
      divEvento.appendChild(fechaParrafo);
      divEvento.appendChild(horaParrafo);
      divEvento.appendChild(agendaParrafo);
      divEvento.appendChild(btnEliminiar);

      // Agregar los eventos al html
      contenedorEventos.appendChild(divEvento);
    });
  }

  // Eliminar elementos de la referencia de alertas
  limpiarHtml(referencia) {
    // si contenedor tiene al menos un elemento
    while (referencia.firstChild) {
      // eliminar un hijo por el primero
      referencia.removeChild(referencia.firstChild);
    }
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
  const cadena = e.target.value;

  if (e.target.name === 'evento' || e.target.name === 'contacto') {
    // llenar los datos al objeto de evento, con los valores del input
    eventoObj[e.target.name] = capitalizarPrimeraLetra(cadena);

    // validación de longitud de telefono
  } else if (e.target.name === 'telefono' && e.target.value.length > 9) {

    interfazUsuario.imprimirAlerta(
      'Numero telefono tiene que ser menor igual a 9 digitos',
      'error'
    );
    return;
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
function nuevoEvento(e) {
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

  // Generar un id unico, en una nueva propiedad al objeto
  eventoObj.id = Date.now();

  // Creando un nuevo evento, con una copia del objeto agregado no la referencia principal
  adinistrarEventos.agregarEvento({ ...eventoObj });

  // Reiniciar el objeto para la validación
  reiniciarObjeto();

  // Reiniciar el formulario
  formulario.reset();

  // Mostrar el HTML de los eventos, de acuerdo al arreglo
  interfazUsuario.imprimirEvento(adinistrarEventos);
}

function reiniciarObjeto() {
  // borramos los valores del objeto prinicipal
  eventoObj.evento = '';
  eventoObj.contacto = '';
  eventoObj.telefono = '';
  eventoObj.fecha = '';
  eventoObj.hora = '';
  eventoObj.agenda = '';
}

function eliminarEventosHTML(id) {
  // ELiminar el evento del arreglo de eventos del objeto
  adinistrarEventos.eliminarEvento(id);

  // Muestra un mensaje
  interfazUsuario.imprimirAlerta(`El Evento se Elimino, Correctamente`);

  // imprimimos los eventos nuevamente, sin el id eliminado de acuero al array del objeto
  interfazUsuario.imprimirEvento(adinistrarEventos);
}
