const express = require('express');
const routes = express.Router();
const asesor = require("../model/model_asesor")
const database = require('../database')
const { QueryTypes } = require("sequelize");
const { keycloak } = require('../middleware/keycloak_validate');
require("dotenv").config()

routes.get('/getsql/', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    await database.query('select * from asesor order by descripcion asc', { type: QueryTypes.SELECT })
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
    await asesor.findAll().then((response) => {
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

routes.get('/get/:cod_asesor', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    await asesor.findByPk(req.params.cod_asesor).then((response) => {
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

    const t = await database.transaction();
    try {
        const token = req.kauth.grant.access_token;
        const authData = token.content;
        await asesor.create(req.body, {
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

routes.put('/put/:cod_asesor', keycloak.protect(), async (req, res) => {

    const t = await database.transaction();
    try {
        const token = req.kauth.grant.access_token;
        const authData = token.content;
        await asesor.update(req.body, { where: { cod_asesor: req.params.cod_asesor } }, {
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

routes.delete('/del/:cod_asesor', keycloak.protect(), async (req, res) => {

    const t = await database.transaction();
    try {
        const token = req.kauth.grant.access_token;
        const authData = token.content;
        await asesor.destroy({ where: { cod_asesor: req.params.cod_asesor } }, {
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