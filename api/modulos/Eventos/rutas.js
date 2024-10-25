const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('../Eventos/index');
const router = express.Router();

router.get('/Eventos', consutaEventos);
router.post('/Eventos/nombreEvento', consultaUnEventos);
router.post('/Eventos', agregarEventos);
router.put('/Eventos', eliminarEventos);

router.get('/Eventos/tickets', consutatickets);
router.post('/Eventos/tickets/id', consultaUntickets);
router.post('/Eventos/tickets', agregartickets);
router.put('/Eventos/tickets', eliminartickets);

// ** Eventos **//

async function consutaEventos (req, res) {
    try{
        const items = await controlador.consutaEventos();
        respuesta.success(req, res, items, 200);
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function consultaUnEventos (req, res) {
    try{
        const items = await controlador.consultaUnEventos(req.body);
        respuesta.success(req, res, items, 200)
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function agregarEventos (req, res) {
    try{
        const items = await controlador.agregarEventos(req.body);
        if(req.body.id == 0){
            mensaje = 'Solicitud guardada con exito';
        }
        else{
            mensaje = 'Solicitud actualizada con exito';
        }
        respuesta.success(req, res, mensaje, 201)
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function eliminarEventos (req, res) {
    try{
        const items = await controlador.eliminarEventos(req.body);
        respuesta.success(req, res, 'Solicitud ejecuta satisfactoriamente', 200)
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};


/// *** tickets *** ///


async function consutatickets (req, res) {
    try{
        const items = await controlador.consutatickets();
        respuesta.success(req, res, items, 200);
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function consultaUntickets (req, res) {
    try{
        const items = await controlador.consultaUntickets(req.body);
        respuesta.success(req, res, items, 200)
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function agregartickets (req, res) {
    try{
        const items = await controlador.agregartickets(req.body);
        if(req.body.id == 0){
            mensaje = 'Solicitud guardada con exito';
        }
        else{
            mensaje = 'Solicitud actualizada con exito';
        }
        respuesta.success(req, res, mensaje, 201)
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function eliminartickets (req, res) {
    try{
        const items = await controlador.eliminartickets(req.body);
        respuesta.success(req, res, 'Solicitud ejecuta satisfactoriamente', 200)
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

module.exports = router;