const { query } = require('../models/db');

//CRUD CLIENTES
//GET - listar todos los clientes
async function getClientes(req, res) {
    try {
        const [filas] = await query('SELECT * FROM clientes ORDER BY nombre');
        res.json(filas);
    } catch (e) {
        res.status(500).json({ mensaje: e.message });
    }
}

//POST - crear cliente
async function postCliente(req, res) {
    try {
        const { nombre, email, telefono } = req.body;
        const [resultado] = await query(
            'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)',
            [nombre, email, telefono]
        );
        res.json({ mensaje: 'Cliente CREADO', id: resultado.insertId });
    } catch (e) {
        res.status(500).json({ mensaje: e.message });
    }
}

//PUT - actualizar cliente
async function putCliente(req, res) {
    try {
        const { nombre, email, telefono } = req.body;
        await query(
            'UPDATE clientes SET nombre=?, email=?, telefono=? WHERE clientes_id=?',
            [nombre, email, telefono, req.params.id]
        );
        res.json({ mensaje: 'Cliente ACTUALIZADO' });
    } catch (e) {
        res.status(500).json({ mensaje: e.message });
    }
}

//DELETE - eliminar cliente
async function deleteCliente(req, res) {
    try {
        await query('DELETE FROM clientes WHERE clientes_id=?', [req.params.id]);
        res.json({ mensaje: 'Cliente ELIMINADO' });
    } catch (e) {
        res.status(500).json({ mensaje: e.message });
    }
}

module.exports = { 
    getClientes,   // LISTAR
    postCliente,  // CREAR  
    putCliente,   // ACTUALIZAR
    deleteCliente   // ELIMINAR
};