const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const equipoRoutes = require('./routers/equipo');
const port = 3000;
const app = express();

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});




app.use(express.json()); //básicamente se le dice al sistema que desea que se use json.
app.use('/api',equipoRoutes);



mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log('Conectado a MongoAtlas'))
.catch((err)=> console.error(err));


app.listen(port, () => console.log('servidor en:',port));