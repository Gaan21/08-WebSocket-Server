const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');


//const { dbConnection } = require('../database/config');


class Server {

    constructor() { //En el constructor se declaran las propiedades en javascript

        this.app = express(); //Creamos la app de express como propiedad en la clase
        this.port = process.env.PORT;

        this.server = require('http').createServer( this.app );//Mandamos el servidor de express(app)
        //http es una importacion de node
        this.io = require('socket.io')(this.server);

        //Rutas para la autenticacion y para los usuarios
        this.paths = {  }

        //Midlewares:  Funciones que se van a ejecutar siempre cuando levantemos el servidor
        this.middlewares();

        //Rutas de mi app:
        this.routes();

        //configuracion de Sockets
        this.sockets();
    }


    middlewares() { //Todo esto se ejecuta antes de llegar a las rutas

        //CORS: te quita muchos errores con navegadores. Protege el servidor de manera superficial.
        this.app.use( cors() );

        //Directorio publico:   //Sirve el contenido que hay en la carpeta public en index.html
        this.app.use( express.static('public') ); 
    }

    
    routes(){
        //Definimos las rutas:
    //Midleware condicional, se solicita a /usuarios y se llama a /routes/user
        //this.app.use(this.paths.usuarios,   require('../routes/user'));
    }


    sockets(){

        this.io.on('connection', socketController );
    }


    listen(){
        //Se levanta el server de sockets en lugar de la app de express
        this.server.listen( this.port, () => { 

            console.log('Servidor corriendo en el puerto: ', this.port )
        });
    }
}


module.exports = Server;