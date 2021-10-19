

const socketController = (socket) => {
    console.log('cliente conectado', socket.id)

    socket.on('disconnect', () =>{
        console.log('cliente desconectado', socket.id);
    });

    // Lo que escucha el socket cuando el cliente emite enviar-mensaje ()=> Lo que hace
    socket.on('enviar-mensaje', ( payload, callback ) =>{ // payload= Informacion introducida
        //callback: referencia al 3º argumento de enviar-mensaje

//this.io o socket.broadcast (es lo mismo)
//cuando el servidor de sockets lo envia. emit: emite un evento a todos los clientes conectados
        socket.broadcast.emit('enviar-mensaje', payload)

        const id = 12345
        callback( { id, fecha: new Date().getTime() });
    })
}


module.exports = {
    socketController
}