const { Sequelize } = require("sequelize");
require("dotenv").config();

const masterConfig = {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    insecureAuth: true,
    timezone: 'America/Asuncion',
    dialectOptions: { timezone: 'Z' },
};

const slaveConfigs = [
    {
        host: process.env.DB_SLAVE1_HOST,
        port: process.env.DB_SLAVE1_PORT
    },
    {
        host: process.env.DB_SLAVE2_HOST,
        port: process.env.DB_SLAVE2_PORT
    },
    {
        host: process.env.DB_SLAVE3_HOST,
        port: process.env.DB_SLAVE3_PORT
    }
].map(config => ({
    ...masterConfig,
    host: config.host,
    port: config.port
}));

const sequelize = new Sequelize({
    ...masterConfig,
    replication: {
        read: slaveConfigs,
        write: masterConfig
    }
});

module.exports = sequelize;
