const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql (){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err)=>{
        if(err){
            console.log('[db err]', err)
            setTimeout(conMysql, 200);
        }else{
            console.log('Db conectada!', err)
        }
    });

    conexion.on('error', err =>{
        console.log('[db err]', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();


/// *** CRUD DE USUARIOS *** ///

function consutaUsuario (tabla){
    return new Promise((resolve, reject)=>{
      conexion.query(`SELECT * FROM ${tabla}`, (error, result)=>{
        return error ? reject(error) : resolve(result);
      })
    });
  }

function consultaUnUsuario (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE username=?`, data.username, (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function agregarUsuario (tabla, data){
    if(data && data.id == 0){
        return insertar(tabla, data);
    }else{
        return actualizar(tabla, data);
    }
}

function insertar (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function actualizar (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE id=?`,[data, data.id], (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function eliminarUsuario (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`, data.id, (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function query (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, data, (error, result)=>{
            return error ? reject(error) : resolve(result[0]);
        })
      });
}

/// ***FIN DEL CRUD DE USUARIOS *** ///

/// *** CRUD DE EVENTOS *** ///
function consutaEventos (tabla){
    return new Promise((resolve, reject)=>{
      conexion.query(`SELECT * FROM ${tabla}`, (error, result)=>{
        return error ? reject(error) : resolve(result);
      })
    });
  }

function consultaUnEventos (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE nombreEvento=?`, data.nombreEvento, (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function agregarEventos (tabla, data){
    if(data && data.id == 0){
        return insertarE(tabla, data);
    }else{
        return actualizarE(tabla, data);
    }
}

function insertarE (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function actualizarE (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE id=?`,[data, data.id], (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function eliminarEventos (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`, data.id, (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

/// *** FIN DEL CRUD DE EVENTOS *** ///


/// *** CRUD DE TICKETS *** ///
function consutatickets (tabla){
    return new Promise((resolve, reject)=>{
      conexion.query(`SELECT * FROM ${tabla}`, (error, result)=>{
        return error ? reject(error) : resolve(result);
      })
    });
  }

function consultaUntickets (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE idEvento=?`, data.idEvento, (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function agregartickets (tabla, data){
    if(data && data.id == 0){
        return insertarT(tabla, data);
    }else{
        return actualizarT(tabla, data);
    }
}

function insertarT (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function actualizarT (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE id=?`,[data, data.id], (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

function eliminarTickets (tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`, data.id, (error, result)=>{
            return error ? reject(error) : resolve(result);
        })
      });
}

/// *** FIN DEL CRUD DE TICKETS *** ///



module.exports={
    //USUARIOS//
    consutaUsuario,
    consultaUnUsuario,
    agregarUsuario,
    eliminarUsuario,
    query,

   //EVENTOS//
   consutaEventos,
   consultaUnEventos,
   agregarEventos,
   eliminarEventos,

   //TICKET//
   consutatickets,
   consultaUntickets,
   agregartickets,
   eliminarTickets
}