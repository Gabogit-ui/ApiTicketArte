const Tablaeventos = 'eventos';
const Tablatickets = 'tickets';
const bcrypt = require('bcrypt');
const auth = require('../../auth');

module.exports= function(dbInyectada){
    
    let db = dbInyectada;

    if(!db){
        db=require('../../DB/mysql');
    }

    /// *** Eventos ***///
    function consutaEventos(){
        return db.consutaEventos(Tablaeventos);
    }
    
    function consultaUnEventos(body){
        return db.consultaUnEventos(Tablaeventos, body);
    }
    
    async function agregarEventos(body){
        return db.agregarEventos(Tablaeventos, body);
    }
    
    function eliminarEventos(body){
        return db.eliminarEventos(Tablaeventos, body);
    }




    /// *** Tickets *** ///
    function consutatickets(){
        return db.consutatickets(Tablatickets);
    }
    
    function consultaUntickets(body){
        return db.consultaUntickets(Tablatickets, body);
    }
    
    async function agregartickets(body){
        return db.agregartickets(Tablatickets, body);
    }
    
    function eliminarTickets(body){
        return db.eliminarTickets(Tablatickets, body);
    }

    return{
        consutaEventos,
        consultaUnEventos,
        agregarEventos,
        eliminarEventos,
        consutatickets,
        consultaUntickets,
        agregartickets,
        eliminarTickets
    }
}