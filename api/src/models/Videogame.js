const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
   description:{
      type: DataTypes.TEXT,
      allowNull: false,
   },
   platform:{
    type: DataTypes.STRING,
    allowNull: false,
   },
   image:{
      type: DataTypes.STRING,
      allowNull: false,
   },
  release:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating:{
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate:{
      min: 0,
      max: 5,
    },
    defaultValue: 0,
  },
  createInDb:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
  },{timestamps: false});
};
