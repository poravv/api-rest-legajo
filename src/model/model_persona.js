const{DataTypes}=require("sequelize")
const database = require('../database.js')
const ciudad=require("./model_ciudad")
const legajo = require("./model_legajo.js")
const asesor = require("./model_asesor.js")

const persona = database.define("persona",{
    idpersona:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    documento:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nacimiento:{
        type:DataTypes.DATE,
        allowNull:false
    },
    sexo:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    est_civil:{
        type:DataTypes.STRING,
        allowNull:false
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tipo_doc:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nacionalidad:{
        type:DataTypes.STRING,
        allowNull:false
    },
    idciudad:{
        type:DataTypes.STRING,
        allowNull:false
    },
    correo:{
        type:DataTypes.STRING,
    },
    telefono:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha_insert:{
        type:DataTypes.DATE
    },
    fecha_upd:{
        type:DataTypes.DATE
    },
    idusuario_upd:{
        type:DataTypes.STRING,
        foreignKey:true
    },
    cod_asesor:{
        type:DataTypes.INTEGER,
        foreignKey:true
    },
    photo:{
        type:DataTypes.BLOB,
        foreignKey:true
    },
},
{
    tableName:"Persona",
    timestamps:false
})

persona.hasOne(ciudad,{
    foreignKey:"idciudad",
    primaryKey:"idciudad",
    sourceKey:"idciudad"
})

persona.hasOne(asesor,{
    foreignKey:"cod_asesor",
    primaryKey:"cod_asesor",
    sourceKey:"cod_asesor"
})

persona.hasMany(legajo,{
    foreignKey:"idpersona",
    primaryKey:"idpersona",
    sourceKey:"idpersona"
})

module.exports=persona

