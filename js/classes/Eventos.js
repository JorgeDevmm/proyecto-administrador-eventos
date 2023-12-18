// Clase Eventos
class Eventos {
  // contructor donde inicializo un arreglo vacio de eventos
  constructor() {
    this.eventos = [];
  }

  // Función para agregar un nuevo evento al arreglo de eventos
  agregarEvento(objEvento) {
    // asignamos al arreglo un objeto = evento
    this.eventos = [...this.eventos, objEvento];
  }

  // guardo en un nuevo array sin el id a eliminar
  eliminarEvento(id) {
    this.eventos = this.eventos.filter((evento) => evento.id != id);
  }

  editarEvento(objEventoActualizodo) {
    // si coincide en id pasa el obj actualizado al objeto actual, sino mantiene el actual
    this.eventos = this.eventos.map((evento) =>
      evento.id === objEventoActualizodo.id ? objEventoActualizodo : evento
    );
  }
}

export default Eventos;
