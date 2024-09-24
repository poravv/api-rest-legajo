const express = require('express');
const routes = express.Router();
const persona = require("../model/model_persona")
const ciudad = require("../model/model_ciudad")
const database = require('../database');
const e = require('express');
const { keycloak } = require('../middleware/keycloak_validate');
const { QueryTypes } = require('sequelize');
require("dotenv").config()
let fechaActual = new Date();
const Sequelize = require('sequelize');
const legajo = require('../model/model_legajo');
const asesor = require('../model/model_asesor');
const Op = Sequelize.Op;

routes.get('/getsql/', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    await database.query(`select * from vw_persona where estado='AC'`, { type: QueryTypes.SELECT })
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

routes.get('/getagendamiento/', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;

    await persona.findAll({
        where: {
            estado: 'AG',
            fecha_agendamiento: {
                [Op.lte]: Sequelize.fn('CURDATE') // Menor o igual a la fecha actual
            }
        },
        include: [
            { model: ciudad },
            { model: legajo },
            { model: asesor }
        ]
    }).then((response) => {
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

routes.get('/likePersona/:documento', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    await persona.findAll({
        where: {
            documento: {
                [Op.like]: `${req.params.documento}%`
            }
        },
        include: [{ model: ciudad }, { model: legajo }, { model: asesor }]
    }).then((response) => {
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

    // Obtener los parámetros de paginación de la solicitud
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    try {
        let response;
        if (!page || !limit) {
            // Si no se especifican page y limit, obtener todos los registros
            response = await persona.findAll({
                include: [{ model: ciudad }, { model: legajo }, { model: asesor }]
            });
        } else {
            // Realizar la consulta con paginación
            response = await persona.findAndCountAll({
                include: [{ model: ciudad }, { model: legajo }, { model: asesor }],
                limit: limit,
                offset: offset
            });
        }
        res.json({
            mensaje: "successfully",
            authData: authData,
            body: response.rows || response,
            pagination: response.count ? {
                totalItems: response.count,
                totalPages: Math.ceil(response.count / limit),
                currentPage: page,
                pageSize: limit
            } : undefined
        });
    } catch (error) {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: `Error en el servidor, ${error}`
        });
    }
});

routes.get('/getForAsesor/', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;

    // Obtener los parámetros de paginación de la solicitud
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    try {
        let response;
        if (!page || !limit) {
            // Si no se especifican page y limit, obtener todos los registros
            response = await persona.findAll({

                include: [{ model: ciudad }, { model: legajo },{ model: asesor },
                {
                    model: asesor,
                    where: {
                        idusuario: {
                            [Op.eq]: authData.sub // Usamos authData.sub para el filtro de asesor
                        }
                    }
                }
                ]
            });
        } else {
            // Realizar la consulta con paginación
            response = await persona.findAndCountAll({
                include: [{ model: ciudad }, { model: legajo },
                {
                    model: asesor,
                    where: {
                        idusuario: {
                            [Op.eq]: authData.sub // Usamos authData.sub para el filtro de asesor
                        }
                    }
                }
                ],
                limit: limit,
                offset: offset
            });
        }
        res.json({
            mensaje: "successfully",
            authData: authData,
            body: response.rows || response,
            pagination: response.count ? {
                totalItems: response.count,
                totalPages: Math.ceil(response.count / limit),
                currentPage: page,
                pageSize: limit
            } : undefined
        });
    } catch (error) {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: `Error en el servidor, ${error}`
        });
    }
});

routes.get('/get/:idpersona', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;

    await persona.findByPk(req.params.idpersona, {
        include: [
            { include: ciudad }, { model: legajo }, { model: asesor }
        ]
    })
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

routes.get('/search_doc/:documento', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    await persona.findOne({
        where: {
            documento: {
                [Op.eq]: req.params.documento
            }
        }
    }).then((response) => {
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
        const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
        req.body.fecha_insert = strFecha;
        req.body.fecha_upd = strFecha;
        req.body.idusuario_upd = authData.sub;

        // Buscamos si la persona ya existe por su documento
        const personaExistente = await persona.findOne({
            where: { documento: req.body.documento }, // Ajusta 'documento' según tu columna
            transaction: t
        });

        if (personaExistente) {
            // Si la persona ya existe, hacemos un PUT (update)
            await personaExistente.update(req.body, { transaction: t });
            await t.commit();
            res.json({
                mensaje: "successfully",
                detmensaje: "Registro actualizado satisfactoriamente",
                authData: authData,
                body: personaExistente
            });
        } else {
            // Si la persona no existe, creamos un nuevo registro (POST)
            const nuevaPersona = await persona.create(req.body, { transaction: t });
            await t.commit();
            res.json({
                mensaje: "successfully",
                detmensaje: "Registro almacenado satisfactoriamente",
                authData: authData,
                body: nuevaPersona
            });
        }
    } catch (error) {
        await t.rollback();
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: `Error en el servidor, ${error}`
        });
    }
});


routes.put('/put/:idpersona', keycloak.protect(), async (req, res) => {
    const t = await database.transaction();
    try {
        const token = req.kauth.grant.access_token;
        const authData = token.content;
        const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
        req.body.fecha_upd = strFecha;
        req.body.idusuario_upd = authData.sub;
        await persona.update(req.body, { where: { idpersona: req.params.idpersona }, transaction: t })
            .then(response => {
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

routes.delete('/del/:idpersona', keycloak.protect(), async (req, res) => {
    const t = await database.transaction();
    try {
        const token = req.kauth.grant.access_token;
        const authData = token.content;
        await persona.destroy({ where: { idpersona: req.params.idpersona }, transaction: t })
            .then(response => {
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