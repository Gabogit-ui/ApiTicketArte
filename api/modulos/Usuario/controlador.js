const TablaUser = 'usuario';
const bcrypt = require('bcrypt');
const auth = require('../../auth');

module.exports= function(dbInyectada){
    
    let db = dbInyectada;

    if(!db){
        db=require('../../DB/mysql');
    }

    function consutaUsuario(){
        return db.consutaUsuario(TablaUser);
    }
    
    function consultaUnUsuario(body){
        return db.consultaUnUsuario(TablaUser, body);
    }
    
    async function agregarUsuario(body){
       if (body.password){
        // encriptar password con bcrypt, el número (5). Indica la cantidad de veces que se hashea el password.
        body.password = await bcrypt.hash(body.password.toString(), 5);
       }
        return db.agregarUsuario(TablaUser, body);
    }
    
    function eliminarUsuario(body){
        return db.eliminarUsuario(TablaUser, body);
    }

    async function login (username, password){
        const data = await db.query(TablaUser, {username: username});
        return bcrypt.compare(password, data.password)
        .then(resultado =>{
            if(resultado === true){
                return data.body;

            }else{
                return  data.body;
            }
        })
    }

    return{
        consutaUsuario,
        consultaUnUsuario,
        agregarUsuario,
        login,
        eliminarUsuario
    }
}