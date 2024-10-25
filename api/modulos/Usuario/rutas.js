const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('../Usuario/index');
const router = express.Router();

router.get('/Usuario', consutaUsuario);
router.post('/Usuario/username', consultaUnUsuario);
router.post('/Usuario', agregarUsuario);
router.put('/Usuario', eliminarUsuario);
router.post('/Login',login);

async function consutaUsuario (req, res) {
    try{
        const items = await controlador.consutaUsuario();
        respuesta.success(req, res, items, 200);
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function consultaUnUsuario (req, res) {
    try{
        const items = await controlador.consultaUnUsuario(req.body);
        respuesta.success(req, res, items, 200)
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function agregarUsuario (req, res) {
    try{
        const items = await controlador.agregarUsuario(req.body);
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

async function eliminarUsuario (req, res) {
    try{
        const items = await controlador.eliminarUsuario(req.body);
        respuesta.success(req, res, 'Solicitud ejecuta satisfactoriamente', 200)
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function login(req, res) {
    try{
        const token = await controlador.login(req.body.username, req.body.password);
        respuesta.success(req, res, token, 200);
    }catch(err){
        err = 'Estimado cliente, sus credenciales son incorrectas';
        respuesta.error(req, res, err, 500);
    }
}
module.exports = router;