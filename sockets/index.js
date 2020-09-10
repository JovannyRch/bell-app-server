const { io } = require('../index');
io.on('connection', client => {
    client.on('disconnect', () => { console.log("Se desconecto el cliente") });
    client.on('mensaje', (payload) => {
        client.emit("respuesta", `Se recibio tu respuesta ${JSON.stringify(payload)}`)
        console.log(payload)
    });

    client.on('emit-message', (payload) => {
        client.broadcast.emit('send-message', payload);
    })

    client.on('notification', (payload) => {

        client.broadcast.emit('notification', payload);

    })
})


