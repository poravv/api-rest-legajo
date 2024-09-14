const{DataTypes}=require("sequelize")
const database=require("../database")

const asesor = database.define("asesor",{
    cod_asesor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      apellido: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      idusuario: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.TEXT,
        allowNull: true
      }
},{
    tableName:"asesor",
    timestamps:false
})

module.exports=asesor
