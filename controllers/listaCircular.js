//LISTA CIRCULAR
class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class ListaCircular {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.actual = null;
        this.total = 0;
    }

    // AGREGA reserva a la lista circular
    agregar(dato) {
        var nuevo = new Nodo(dato);
        if (this.cabeza == null) {
            this.cabeza = nuevo;
            this.cola = nuevo;
            nuevo.siguiente = this.cabeza;
        } else {
            this.cola.siguiente = nuevo;
            this.cola = nuevo;
            this.cola.siguiente = this.cabeza;
        }
        if (this.actual == null) this.actual = this.cabeza;
        this.total++;
    }

    // SIGUIENTE reserva vuelve al inicio al final
    siguiente() {
        if (this.actual == null) return null;
        var dato = this.actual.dato;
        this.actual = this.actual.siguiente;
        return dato;
    }

    // VACIA la lista se llama al cargar reservas
    vaciar() {
        this.cabeza = null;
        this.cola = null;
        this.actual = null;
        this.total = 0;
    }
}

const lista = new ListaCircular();
module.exports = lista;