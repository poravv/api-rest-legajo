
const Keycloak = require('keycloak-connect');
const session = require('express-session');
require("dotenv").config()

const kcConfig = {
    clientId: "cli-legajo-user",
    bearerOnly:true,
    serverUrl:"https://kc.mindtechpy.net",
    realm:"LegajoUser",
    realmPublicKey:process.env.REALM_PUBLICK_KEY,
    issuer: 'https://kc.mindtechpy.net/realms/LegajoUser',
    tokenEndpoint: 'https://kc.mindtechpy.net/realms/LegajoUser/protocol/openid-connect/token',
    responseType: 'code',
    scope: 'openid profile',
    showDebugInformation: true,
    //clave: 'FjE6UUh6Njj7ALmBpEeJbUPwY1bKCtCF',
}

// Configuración de la sesión para Keycloak
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore },kcConfig);

module.exports = {
    session: session({
        secret: 'mySecretVendelo',
        resave: false,
        saveUninitialized: false,
        store: memoryStore
    }),
    keycloak
}