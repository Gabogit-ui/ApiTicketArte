const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const Usuario = require('./modulos/Usuario/rutas')
const Eventos = require('./modulos/Eventos/rutas')

const app = express();

//Middlewere
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Configuración CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Reemplaza '*' con el origen específico si deseas restringirlo
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
//Configuración  
app.set('port', config.app.port);
//Rutas
app.use('/api/ticketarte', Usuario);
app.use('/api/ticketarte', Eventos);

module.exports = app;