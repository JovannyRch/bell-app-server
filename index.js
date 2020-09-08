const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

const publicPath = path.resolve(__dirname, 'public');


app.use(express.static(publicPath));


//Server 
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/saludo', (req, res) => {
    res.json({
        saludo: 'hola a todos'
    })
})

io.on('connection', client => {
    client.on('disconnect', () => { console.log("Se desconecto el cliente") });
    client.on('mensaje', (payload) => {
        client.emit("respuesta", `Se recibio tu respuesta ${JSON.stringify(payload)}`)
        console.log(payload)
    })
})

server.listen(process.env.PORT, error => {
    if (error) {
        console.log("Ocurrio un error");
    }
    console.log("El servidor esta corriendo en el puerto " + process.env.PORT)
})

