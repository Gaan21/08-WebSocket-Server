

// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


//El socket del cliente que esta usando la aplicacion
const socket = io();


socket.on('connect', () => {
    /* console.log('Conectado'); */

    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
});

socket.on('disconnect', () => {
    /* console.log('Desconectado del servidor'); */

    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
});

socket.on('enviar-mensaje', ( payload ) => {
    console.log( payload )
});


//Cada vez que se haga click se dispara
btnEnviar.addEventListener( 'click', () =>{
//El valor de lo que hemos escrito en el recuadro del html
    const mensaje = txtMensaje.value; 
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    // Emitir mensaje para que escuche el servidor
    socket.emit( 'enviar-mensaje', payload, ( id ) =>{ 
//Callback 3º argumento para que el cliente que emite reciba a la vez una confirmacion 
        console.log('Desde el server', id );
    });
});