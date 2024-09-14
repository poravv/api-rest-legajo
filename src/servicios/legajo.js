const express = require('express');
const routes = express.Router();
const legajo = require("../model/model_legajo")
const database = require('../database')
const { QueryTypes } = require("sequelize");
const { keycloak } = require('../middleware/keycloak_validate');
require("dotenv").config()
let fechaActual = new Date();

routes.get('/getsql/', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    await database.query('select * from legajo', { type: QueryTypes.SELECT })
        .then((response) => {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: response
            });
        }).catch(error => {
            res.json({
                mensaje: "error",
                error: error,
                detmensaje: `Error en el servidor, ${error}`
            });
        });
})


routes.get('/get/', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    //Extrae id del usuario
    const userId = authData.sub;
    console.log('User ID:', userId);
    await legajo.findAll().then((response) => {
        res.json({
            mensaje: "successfully",
            authData: authData,
            body: response
        });
    }).catch(error => {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: `Error en el servidor, ${error}`
        });
    });
})

routes.get('/get/:idlegajo', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    await legajo.findByPk(req.params.idlegajo).then((response) => {
        res.json({
            mensaje: "successfully",
            authData: authData,
            body: response
        });
    }).catch(error => {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: `Error en el servidor, ${error}`
        });
    });
})

routes.post('/post/', keycloak.protect(), async (req, res) => {

    const token = req.kauth.grant.access_token;
    const authData = token.content;
    const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
    req.body.fecha_insert = strFecha;
    req.body.fecha_upd = strFecha;
    req.body.idusuario = authData.sub;
    const t = await database.transaction();
    try {
        const token = req.kauth.grant.access_token;
        const authData = token.content;
        await legajo.create(req.body, {
            transaction: t
        }).then(response => {
            t.commit();
            res.json({
                mensaje: "successfully",
                detmensaje: "Registro almacenado satisfactoriamente",
                authData: authData,
                body: response
            });
        });
    } catch (error) {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: `Error en el servidor, ${error}`
        });
        t.rollback();
    }
})

routes.put('/put/:idlegajo', keycloak.protect(), async (req, res) => {

    const token = req.kauth.grant.access_token;
    const authData = token.content;
    const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
    req.body.fecha_upd = strFecha;
    req.body.idusuario = authData.sub;
    const t = await database.transaction();
    try {
        const token = req.kauth.grant.access_token;
        const authData = token.content;
        await legajo.update(req.body, { where: { idlegajo: req.params.idlegajo } }, {
            transaction: t
        }).then(response => {
            t.commit();
            res.json({
                mensaje: "successfully",
                detmensaje: "Registro actualizado satisfactoriamente",
                authData: authData,
                body: response
            });
        });
    } catch (error) {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: `Error en el servidor, ${error}`
        });
        t.rollback();
    }
})

routes.delete('/del/:idlegajo', keycloak.protect(), async (req, res) => {

    const t = await database.transaction();
    try {
        const token = req.kauth.grant.access_token;
        const authData = token.content;
        await legajo.destroy({ where: { idlegajo: req.params.idlegajo } }, {
            transaction: t
        }).then(response => {
            t.commit();
            res.json({
                mensaje: "successfully",
                detmensaje: "Registro eliminado satisfactoriamente",
                authData: authData,
                body: response
            });
        });
    } catch (error) {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: `Error en el servidor, ${error}`
        });
        t.rollback();
    }
})


module.exports = routes;