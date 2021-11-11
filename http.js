const express = require('express');
const app = express();
const PORT = 8080;
const Contenedor = require('./classes/Contenedor');
const contenedor = new Contenedor();

const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en: ${PORT}`);
})
server.on('error', (error)=>console.log(`Error en el servidor ${error}`))

app.get('/', (req, res)=>{
    res.send('<h1 style="color:orange"> Bienvenido al servidor </h1> <br> <h3> Franco Chachagua - Camada 17045 <h3>');
})

app.get('/productos', (req,res)=>{
    contenedor.getAll().then(result=>{
        res.status(200).send(result.products)
    })
})

app.get('/productosrandom', (req,res)=>{
    contenedor.randomId().then(result=>{
        res.status(200).send(result.product)
    })
})