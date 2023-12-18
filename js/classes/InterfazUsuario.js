
import { eliminarEventosHTML, editarEventoHTML, } from '../funciones.js';
import { contenedorEventos } from '../selectores.js';

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

    // limpia la alerta de duplicidad
    this.limpiarAlertas('#contenido', '.alert');

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

      // boton para eliminar evento
      const btnEliminiar = document.createElement('button');
      btnEliminiar.classList.add('btn', 'btn-danger', 'p-2', 'mr-2');
      btnEliminiar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`;

      btnEliminiar.addEventListener('click', () => {
        eliminarEventosHTML(id);
      });

      // boton para editar evento
      const btnEditar = document.createElement('button');
      btnEditar.classList.add('btn', 'btn-info', 'p-2');
      btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>`;

      // pasamos el objeto por parametro para poder cargar mas adelante los datos
      btnEditar.addEventListener('click', () => {
        editarEventoHTML(eventoObj);
      });

      // Agregar los parrafos al divEvento
      divEvento.appendChild(eventoParrafo);
      divEvento.appendChild(contactoParrafo);
      divEvento.appendChild(telefonoParrafo);
      divEvento.appendChild(fechaParrafo);
      divEvento.appendChild(horaParrafo);
      divEvento.appendChild(agendaParrafo);
      divEvento.appendChild(btnEliminiar);
      divEvento.appendChild(btnEditar);

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

  // limpiar la duplicidad alertas, mediante el contenedor y la clase que usaremos como referencia para eliminar
  limpiarAlertas(referenciaContenedor, claseReferencia) {
    //Validación si ya hay una alerta presente, mediante la referencia de la clase alert
    const alertaExistente = document.querySelector(
      `${referenciaContenedor} ${claseReferencia}`
    );
    if (alertaExistente) {
      // Si ya hay una alerta, no agregamos otra
      alertaExistente.remove();
    }
  }
}

export default InterfazUsuario;
