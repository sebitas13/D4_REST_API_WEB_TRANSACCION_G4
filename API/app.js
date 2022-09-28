const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const equipoRoutes = require('./routers/equipo');
const port = 3000;
const app = express();

app.use(express.json());
app.use('/api',equipoRoutes);


mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log('Conectado a MongoAtlas'))
.catch((err)=> console.error(err));
app.listen(port, () => console.log('servidor en:',port));