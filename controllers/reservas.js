const { query } = require('../models/db');
const lista = require('./listaCircular');  //Importa lista

//GET - listar todas las reservas y cargar lista circular
async function getReservas(req, res) {
    try {
        const [filas] = await query(`
            SELECT r.reserva_id, r.fecha_reserva, r.hora_reserva, r.total_pagado, r.estado,
                   c.nombre AS nombre_cliente, c.email, 
                   p.nombre AS nombre_paquete, p.precio_total
            FROM reservas r 
            JOIN clientes c ON r.clientes_id = c.clientes_id
            JOIN paquetes p ON r.paquete_id = p.paquete_id
            ORDER BY r.fecha_reserva DESC
        `);
        
        lista.vaciar();
        for (var i = 0; i < filas.length; i++) {
            lista.agregar(filas[i]);
        }
        
        res.json(filas);
    } catch (e) {
        res.status(500).json({ mensaje: e.message });
    }
}

//Get siguiente reserva de la lista circular
function getSiguiente(req, res) {
    var dato = lista.siguiente();
    if (dato == null) {
        res.status(404).json({ mensaje: 'Lista vacia. Ve a Reservas primero' });
    } else {
        res.json({ reserva: dato, total: lista.total });
    }
}

//POST - crear reserva
async function postReserva(req, res) {
    try {
        const { clientes_id, paquete_id, fecha_reserva, hora_reserva, total_pagado } = req.body;
        const [resultado] = await query(
            'INSERT INTO reservas (clientes_id, paquete_id, fecha_reserva, hora_reserva, total_pagado) VALUES (?,?,?,?,?)',
            [clientes_id, paquete_id, fecha_reserva, hora_reserva, total_pagado]
        );
        res.json({ mensaje: 'Reserva CREADA', id: resultado.insertId });
    } catch (e) {
        res.status(500).json({ mensaje: e.message });
    }
}

//PUT - cambiar estado de reserva
async function putReserva(req, res) {
    try {
        await query('UPDATE reservas SET estado=? WHERE reserva_id=?', [req.body.estado, req.params.id]);
        res.json({ mensaje: 'Estado ACTUALIZADO' });
    } catch (e) {
        res.status(500).json({ mensaje: e.message });
    }
}

//DELETE - eliminar reserva
async function deleteReserva(req, res) {
    try {
        await query('DELETE FROM reservas WHERE reserva_id=?', [req.params.id]);
        res.json({ mensaje: 'Reserva ELIMINADA' });
    } catch (e) {
        res.status(500).json({ mensaje: e.message });
    }
}

//GET - lista reservas
async function getPaquetes(req, res) {
    try {
        const [filas] = await query('SELECT * FROM paquetes');
        res.json(filas);
    } catch (e) {
        res.status(500).json({ mensaje: e.message });
    }
}

module.exports = { 
    getReservas, 
    getSiguiente, 
    postReserva, 
    putReserva, 
    deleteReserva, 
    getPaquetes 
};