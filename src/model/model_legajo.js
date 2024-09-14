const{DataTypes}=require("sequelize")
const database=require("../database")

const legajo = database.define("legajo",{
    
    idlegajo:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    detalle: {
        type: DataTypes.TEXT
    },
    idusuario: {
        type: DataTypes.BIGINT
    },
    fecha_insert: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_upd: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING(2)
    },
    idpersona: {
        type: DataTypes.INTEGER,
    },
    img:{
        type:DataTypes.BLOB,
        foreignKey:true
    },
},{
    tableName:"legajo",
    timestamps:false
})

module.exports=legajo
