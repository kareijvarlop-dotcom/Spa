const express = require('express');
const cors = require('cors');
const path = require('path');
const { conectar } = require('./models/db');

//Importar mis controladores
const clientesCtrl = require('./controllers/clientes');
const reservasCtrl = require('./controllers/reservas');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));  // index.html 

//Rutas CRUD cliente
app.get('/clientes', clientesCtrl.getClientes);         
app.post('/clientes', clientesCtrl.postCliente);      
app.put('/clientes/:id', clientesCtrl.putCliente);        
app.delete('/clientes/:id', clientesCtrl.deleteCliente);  

//Rutas CRUD reservas y lista circular
app.get('/reservas', reservasCtrl.getReservas);           
app.get('/reservas/siguiente', reservasCtrl.getSiguiente); 
app.post('/reservas', reservasCtrl.postReserva);        
app.put('/reservas/:id', reservasCtrl.putReserva);        
app.delete('/reservas/:id', reservasCtrl.deleteReserva);   
app.get('/paquetes', reservasCtrl.getPaquetes);            

//Inicio
conectar().then(() => {
    app.listen(3000, () => {
        console.log('Servidor en http://localhost:3000');
    });
});








