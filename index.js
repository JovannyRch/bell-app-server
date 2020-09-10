const express = require('express');
const app = express();
const path = require('path');
const { PrismaClient } = require("@prisma/client");
const router = require('./routes');
const prisma = new PrismaClient()



require('dotenv').config();

const publicPath = path.resolve(__dirname, 'public');


app.use(express.static(publicPath));

//Middlewares
app.use(express.json());

//Routes
app.use('/api', router);

//Server 
const server = require('http').createServer(app);
const io = require('socket.io')(server);
module.exports.io = io;


require('./sockets');





server.listen(process.env.PORT, error => {
    if (error) {
        console.log("Ocurrio un error");
    }
    console.log("El servidor esta corriendo en el puerto " + process.env.PORT)
})

