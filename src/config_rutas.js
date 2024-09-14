const express = require('express');
const rutas = express()

const ciudad = require('./servicios/ciudad')
const legajo = require('./servicios/legajo')
const persona = require('./servicios/persona')
const asesor = require('./servicios/asesor')

rutas.use('/legajo/api/ciudad',ciudad);
rutas.use('/legajo/api/legajo',legajo);
rutas.use('/legajo/api/persona',persona)
rutas.use('/legajo/api/asesor',asesor)

module.exports = rutas;