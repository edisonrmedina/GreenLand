const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'greenland'
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_640.png'
    },
    genre: {
      type: DataTypes.STRING
    },
    birth_date: {
      type: DataTypes.DATEONLY
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    phone_number: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.TEXT
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: false
  })
}
