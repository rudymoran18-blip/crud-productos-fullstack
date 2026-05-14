const {DataTypes} = require('sequelize');
const db = require('../config/db.config');
const Producto = db.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    categoria:{
        type: DataTypes.ENUM('Electrónica', 'Ropa', 'Alimentos'), defaultValue: 'Electrónica',
        allowNull: true
    }
}, {
    tableName: 'productos',
    timestamps: false
});


module.exports = Producto;